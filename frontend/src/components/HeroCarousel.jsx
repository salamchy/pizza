import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import homeBg from "../assets/home-bg.png";
import Banner1 from "../assets/burger.png";
import Banner2 from "../assets/burger3.png";
import Banner3 from "../assets/pizza-banner.png";

const bannerData = [
  {
    id: 1,
    title1: "QUALITY",
    title2: "FOODS",
    subtitle: "HEALTHY FOOD FOR HEALTHY BODY",
    image: Banner1,
  },
  {
    id: 2,
    title1: "FRESH",
    title2: "INGREDIENTS",
    subtitle: "SUSTAINABLE AND TASTY",
    image: Banner2,
  },
  {
    id: 3,
    title1: "FAST",
    title2: "DELIVERY",
    subtitle: "FROM OUR KITCHEN TO YOUR DOOR",
    image: Banner3,
  },
];

const HeroCarousel = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    setBanners(bannerData);
  }, []);

  return (
    <div className="bg-gray-900 sm:h-[70vh] relative h-[90vh] md:h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${homeBg})` }}
      ></div>

      <div className="container mx-auto sm:gap-6 px-6 md:px-12 max-w-7xl h-full flex flex-col justify-center items-center relative z-10">
        {/* Carousel */}
        <Carousel
          infiniteLoop
          autoPlay
          interval={2000}
          showArrows={false}
          showThumbs={false}
          showStatus={false}
          swipeable={true}
          emulateTouch={true}
        >
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="w-full flex flex-col md:flex-row items-center gap-4 md:gap-6"
            >
              {/* Left Section (Text) */}
              <div className="w-full md:w-5/12 flex justify-center md:justify-center">
                <div className="max-w-[350px] md:max-w-[400px] lg:max-w-[450px] flex flex-col text-center md:justify-center text-white">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    {banner.title1}
                  </h1>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-primary">
                    {banner.title2}
                  </h1>
                  <p className="text-md sm:text-lg md:text-xl tracking-widest text-primary">
                    {banner.subtitle}
                  </p>
                </div>
              </div>

              {/* Right Section (Image) */}
              <div className="w-full md:w-7/12 flex justify-center items-center">
                <img
                  src={banner.image}
                  alt="Banner"
                  className="w-auto max-w-[220px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[400px] object-contain"
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default HeroCarousel;