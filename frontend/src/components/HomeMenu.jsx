import React from "react";
import blackTopLayer from "../assets/black-top-layer.png";
import blackBottomLayer from "../assets/black-bottom-layer.png";
import Menu1 from "../assets/menu-1.png";
import Menu2 from "../assets/menu-2.png";
import Menu3 from "../assets/menu-3.png";
import Menu4 from "../assets/menu-4.png";
import Menu5 from "../assets/menu-5.png";
import Menu6 from "../assets/menu-6.png";
import Menu7 from "../assets/menu-7.png";
import Menu8 from "../assets/menu-8.png";
import Menu9 from "../assets/menu-9.png";
import Menu10 from "../assets/menu-10.png";

const menus = [
  {
    _id: "1",
    image: Menu1,
    name: "Classic Burger",
    description: "A juicy beef patty with fresh lettuce, tomato, and our special sauce on a toasted brioche bun.",
    price: 10.99
  },
  {
    _id: "2",
    image: Menu2,
    name: "Margherita Pizza",
    description: "Traditional Italian pizza with fresh mozzarella, basil, and tomato sauce. hi hf",
    price: 12.50
  },
  {
    _id: "3",
    image: Menu3,
    name: "Caesar Salad",
    description: "Crisp romaine lettuce tossed with Caesar dressing, croutons, and parmesan cheese.",
    price: 8.00
  },
  {
    _id: "4",
    image: Menu4,
    name: "California Roll",
    description: "Avocado, cucumber, and crabmeat wrapped in seaweed and rice. good food",
    price: 6.99
  },
  {
    _id: "5",
    image: Menu5,
    name: "Pesto Pasta",
    description: "Al dente pasta with a rich, homemade basil pesto sauce, pine nuts, and cherry tomatoes.",
    price: 14.00
  },
  {
    _id: "6",
    image: Menu6,
    name: "Chocolate Lava Cake",
    description: "Warm, gooey chocolate center with a crisp outer layer, served with a scoop of vanilla ice cream.",
    price: 7.50
  },
  {
    _id: "7",
    image: Menu7,
    name: "Chocolate pizza Cake",
    description: "Warm, gooey chocolate center with a crisp outer layer, served with a scoop of vanilla ice cream.",
    price: 9.50
  },
  {
    _id: "8",
    image: Menu8,
    name: "Chocolate burger pro",
    description: "Warm, gooey chocolate center with a crisp outer layer, served with a scoop of vanilla ice cream.",
    price: 6.99
  },
  {
    _id: "9",
    image: Menu9,
    name: "Chocolate big Burger ",
    description: "Warm, gooey chocolate center with a crisp outer layer, served with a scoop of vanilla ice cream.",
    price: 9.50
  },
  {
    _id: "10",
    image: Menu10,
    name: "Chocolate Lava Cake",
    description: "Warm, gooey chocolate center with a crisp outer layer, served with a scoop of vanilla ice cream.",
    price: 8.99
  }
];

const Menu = ({ menu }) => {
  return (
    <div className="bg-gray-800 mx-5 md:mx-0 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition  duration-300 ease-in-out transform hover:-translate-y-1">
      <img
        src={menu.image}
        alt={menu.name}
        className="w-full h-auto py-2 px-2 hover:transition  hover:duration-300 hover:ease-in-out hover:transform hover:scale-105 object-contain"
      />
      <div className="p-4 bg-white space-y-4">
        <h3 className="text-xl font-bold text-black">{menu.name}</h3>
        <p className="text-black text-sm mb-2">{menu.description.slice(0, 80)}...</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-orange-400">${menu.price.toFixed(2)}</span>
          <button className="text-xs px-6 py-3 cursor-pointer bg-primary text-white rounded-full hover:bg-orange-600 transition duration-200">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const HomeMenu = () => {
  return (
    <div className="menu-section bg-gray-900 relative py-32">
      {/* Top Layer */}
      <div className="absolute w-full h-32 top-0 bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${blackTopLayer})` }}></div>

      {/* Bottom Layer */}
      <div className="absolute w-full h-32 bottom-0 bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${blackBottomLayer})` }}></div>

      <div className="container mx-auto text-white">
        <div className="header-text mt-10 text-center mb-12">
          <span className=" font-cursive text-2xl text-primary">Fresh From Ehungry</span>
          <h1 className="text-4xl font-bold">OUR SPECIAL MENU</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9">
          {menus.map((menu) => (
            <Menu
              menu={menu}
              key={menu._id}
            />
          ))}
        </div>
        <div className="bottom text-center mt-12 mb-12">
          <button onClick={() => { }} className="btn-orange rounded-full px-12 py-4 bg-primary text-white hover:bg-orange-600">
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeMenu;