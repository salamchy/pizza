import React from "react";
import icon1 from "../assets/feature-icon-1.svg";
import icon2 from "../assets/feature-icon-2.svg";
import icon3 from "../assets/feature-icon-3.svg";
import featureTopLayer from "../assets/feature-top-layer.png";
import featureBottomLayer from "../assets/feature-bottom-layer.png";

const Service = () => {
  return (
    <div className="relative py-12 bg-primary md:py-20">
      {/* Top Layer */}
      <div className="absolute w-full h-32 top-[-8rem] bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${featureTopLayer})` }}></div>

      <div className="container mx-auto z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0">
          {/* Feature 1 */}
          <div className="mb-5 md:mb-0 text-center">
            <div className="icon mb-6">
              <img src={icon1} alt="" className="w-24 h-24 mx-auto" />
            </div>
            <h4 className="text-lg font-bold mb-2">ORDER YOUR FOOD</h4>
            <p className="text-sm">
              Ehungry is a restaurant site. <br /> With this you can order the food of your choice online.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="text-center">
            <div className="icon mb-6">
              <img src={icon2} alt="" className="w-24 h-24 mx-auto" />
            </div>
            <h4 className="text-lg font-bold mb-2">DELIVERY OR PICK UP</h4>
            <p className="text-sm">
              Ehungry is a restaurant site. With this <br /> you can order the food of your choice online.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="text-center">
            <div className="icon mb-6">
              <img src={icon3} alt="" className="w-24 h-24 mx-auto" />
            </div>
            <h4 className="text-lg font-bold mb-2">DELICIOUS RECIPE</h4>
            <p className="text-sm">
              Ehungry is a restaurant site. With this you can order <br /> the food of your choice online.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Layer - Placed after content to ensure it's below in z-index */}
      <div className="absolute w-full h-32 bottom-[-8rem] bg-center bg-no-repeat bg-cover z-10" style={{ backgroundImage: `url(${featureBottomLayer})` }}></div>
    </div>
  );
};

export default Service;