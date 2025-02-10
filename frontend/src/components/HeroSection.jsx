import { motion } from 'framer-motion';
import Burger from "../assets/burger1.png";

const HeroSection = () => {
  // Animation variants for text elements
  const textVariants = {
    hidden: { opacity: 0, x: '100vw' },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start max-w-7xl w-full mx-auto">
        {/* Left Text Section - Animation unchanged */}
        <motion.div
          className="text-green-500 text-center lg:text-left lg:w-1/2"
          initial={{ x: '-100vw' }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 50, duration: 2, delay: 1 }}
        >
          <p className="text-orange-400 poppins text-sm uppercase mb-4">Crispy, Every Bite Taste</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase leading-tight montserrat">
            Hot Spicy <br />
            <span className="text-orange-500 montserrat">Chicken Burger</span>
          </h1>
          <p className="text-lg mt-4 poppins mb-6">Limited Offer / <span className="text-orange-400 text-2xl font-bold">$5</span></p>
          <motion.button
            className="bg-orange-500 text-white cursor-pointer font-semibold py-3 px-6 rounded-full text-lg hover:bg-orange-400 poppins transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Order Now
          </motion.button>
        </motion.div>

        {/* Right Image and Text Section with Step-by-Step Animation */}
        <motion.div
          className="relative mt-10 lg:mt-0 lg:ml-10 lg:w-1/2"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.3 }
            }
          }}
        >
          {/* Floating Text with Step Animation */}
          <motion.span
            className="absolute top-0 left-1/2 poppins transform -translate-x-1/2 -translate-y-16 text-orange-500 text-xl sm:text-2xl italic"
            variants={textVariants}
          >
            Today's Best Deal
          </motion.span>

          {/* Burger Image */}
          <motion.img
            src={Burger}
            alt="Burger"
            className="w-full max-w-sm sm:max-w-md lg:max-w-full rotate-6 sm:rotate-12"
            variants={textVariants}
            transition={{ type: 'spring', stiffness: 50 }}
            whileHover={{ scale: 1.1 }}
          />

          <motion.p className="text-lg mt-3 text-green-400 poppins" variants={textVariants}>
            Enjoy the crunch!
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;