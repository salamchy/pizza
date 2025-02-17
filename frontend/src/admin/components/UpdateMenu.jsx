import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetMenuItemByIdQuery, useUpdateMenuItemMutation } from "../../features/createApi/menuApi";
import { toast } from "react-toastify";

const UpdateMenu = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetMenuItemByIdQuery(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "Select Category",
    stock: "",
    image: null,
  });

  const [updateMenuItem, { isLoading: isUpdating, isError }] = useUpdateMenuItemMutation();

  // Populate form with product data when fetched
  useEffect(() => {
    if (data?.data) {
      setFormData({
        name: data.data.name || "",
        price: data.data.price || "",
        description: data.data.description || "",
        category: data.data.category || "",
        stock: data.data.stock || "",
        image: null,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        image: files[0], // Store the uploaded file
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const menuItem = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        menuItem.append(key, formData[key]);
      }
    })

    try {
      await updateMenuItem({ id, menuData: menuItem }).unwrap();
      toast.success("Menu Item updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
      navigate("/admin/view-menu");

    } catch (error) {
      console.error("Error updating Menu Items:", error);
      toast.error(error?.data?.message || "Failed to update Menu Item. Please try again.", {

        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  }

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10">Error fetching Menu data.</p>;

  if (!data?.data) {
    return <p className="text-center mt-10">Menu not found.</p>;
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Update Menu</h1>
      <div className="container mx-auto p-4 w-full sm:w-11/12 md:w-10/12 lg:w-4/5 xl:w-3/4">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="shadow appearance-none cursor-pointer border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Category</option>
              <option value="dessert">Dessert</option>
              <option value="pizza">Pizza</option>
              <option value="burger">Burger</option>
              <option value="salad">Salad</option>
              <option value="noodles">Noodles</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="shadow appearance-none cursor-pointer border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-between gap-10">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-green-500 cursor-pointer hover:bg-green-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isLoading ? "Updating..." : "Update Menu Item"}
            </button>
            <button
              type="button"
              className="bg-red-500 w-full hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg cursor-pointer"
              onClick={() => navigate("/admin/view-menu")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateMenu;
