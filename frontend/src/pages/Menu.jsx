import { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { useGetAllMenuItemsForUserQuery } from "../features/createApi/menuApi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Menu = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch all menu items
  const { data, isLoading, error } = useGetAllMenuItemsForUserQuery();
  const allMenuItems = data?.data || [];

  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    // Filter menu items based on search and filters
    const filtered = allMenuItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(item.category);

      const matchesPrice =
        (!priceRange.min || item.price >= parseFloat(priceRange.min)) &&
        (!priceRange.max || item.price <= parseFloat(priceRange.max));

      return matchesSearch && matchesCategory && matchesPrice;
    });

    setFilteredItems(filtered);
  }, [allMenuItems, searchQuery, selectedCategories, priceRange]);

  // Pagination logic applied AFTER filtering
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  if (isLoading) return <p className="text-center py-12 text-gray-500">Loading...</p>;
  if (error) return <p className="text-center py-12 text-red-500">Error fetching menu items</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      <div className="mb-8 max-w-4xl mx-auto">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search menu items..."
            className="w-full p-4 pr-12 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-yellow-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black cursor-pointer">
            <IoSearch size={25} />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
        {/* Filters */}
        <div className="w-full md:w-64 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            {["pizza", "burger", "salad", "dessert", "noodles"].map((category) => (
              <label key={category} className="flex items-center space-x-2 mb-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="rounded text-yellow-500 focus:ring-yellow-400"
                />
                <span className="capitalize">{category}</span>
              </label>
            ))}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-md font-semibold mb-4">Price Range</h3>
            <div className="space-y-3">
              <input
                type="number"
                placeholder="Min"
                className="w-full p-2 border rounded-lg"
                value={priceRange.min}
                onChange={(e) => setPriceRange((prev) => ({ ...prev, min: e.target.value }))}
              />
              <input
                type="number"
                placeholder="Max"
                className="w-full p-2 border rounded-lg"
                value={priceRange.max}
                onChange={(e) => setPriceRange((prev) => ({ ...prev, max: e.target.value }))}
              />
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {paginatedItems.map((item, index) => (
              <div
                key={item._id || index}
                className="bg-gray-800 p-3 mx-5 md:mx-0 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-auto py-2 px-2 hover:transition hover:duration-300 hover:ease-in-out hover:transform hover:scale-105 object-contain"
                />
                <div className="p-4 bg-white rounded-lg space-y-4">
                  <h3 className="text-xl font-bold text-black">{item.name}</h3>
                  <p className="text-black text-sm mb-2">{item.description.slice(0, 80)}...</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-orange-400">${item.price.toFixed(2)}</span>
                    <button className="text-xs px-6 py-3 cursor-pointer bg-primary text-white rounded-full hover:bg-orange-600 transition duration-200">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {error && (
            <p className="text-center py-12 text-red-500">
              Error fetching menu items. Please try again later.
            </p>
          )}

          {!error && filteredItems.length > 0 && (
            <div className="flex justify-center mt-8">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn-orange cursor-pointer p-3 bg-primary rounded-full  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <IoIosArrowBack className="w-6 h-6 text-white" />
              </button>

              <span className="px-4 py-2 text-black font-semibold">{currentPage}</span>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="btn-orange cursor-pointer p-3 bg-primary rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <IoIosArrowForward className="w-6 h-6 text-white" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
