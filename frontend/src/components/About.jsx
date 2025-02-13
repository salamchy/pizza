import AboutImg from '../assets/about2.png';

const About = () => {
  return (
    <div className="about-section relative z-10 mt-[100px] md:mt-[-175px] sm:mt-[50px]">
      <div className="container mx-auto">
        <div className="flex flex-col mx-5 md:flex-row items-center">
          <div className="md:w-1/2 pr-0 md:pr-10 mb-10 md:mt-30 md:mb-0 flex justify-center items-center">
            <div className="header-text text-center">
              <span className="text-primary font-cursive text-2xl">Delicious Restaurant</span>
              <h1 className="text-4xl font-bold mb-6">OUR SPECIALITY</h1>
              <p className="mb-6 font-yeseva">
                Ehungry is a restaurant site. With this you can order the food of your choice online. Ehungry is a restaurant site. With this you can order the food of your choice online. Ehungry is a restaurant site. With this you can order the food of your choice online.
              </p>
              <button className="btn-orange px-9 py-3 cursor-pointer bg-primary text-white hover:bg-orange-600 rounded-full">View More</button>
            </div>
          </div>
          <div className="md:w-1/2 pl-0 md:pl-32 text-center">
            <div className="img-box">
              <img src={AboutImg} alt="" className="w-[12rem] h-[18rem] md:w-[25rem] md:h-[40rem]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;