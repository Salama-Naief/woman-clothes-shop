import Slider from "react-slick";
import {Camera} from '@icon-park/svg';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const Panner =()=>{
    const settings = {
      className: "slider variable-width",
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2000,
      cssEase: "linear",
      arrows:false
    };
    
  return(
    <div className="" >
    
      <Slider {...settings} className="relative font-serif" >
        <div className=" relative z-10 h-fit justify-center flex" >
            <img src="https://cdn.shopify.com/s/files/1/1825/4753/files/slider-1-co_8e82dc0d-1260-41fd-bf33-84290e213b3c.jpg?v=1638362558" className="  w-full h-screen object-cover" alt=""/>
              <div className="absolute z-20 w-fit max-h-fit bg-white p-2 md:p-4 inset-y-1/4 inset-x-5 md:inset-x-1/2">
                <div className="border-2 border-gray-400 p-4 md:px-16 md:py-12 text-center">
                    <div className="text-gray-900  text-lg md:text-3xl capitalize">new collection</div>
                    <div className="text-gray-900 text-3xl md:text-5xl font-semibold py-4 capitalize">word of denim</div>
                    <div className="text-gray-900 mb-4">greate new collection of new colthes</div>
                    <button className="bg-primary text-white md:py-4 py-2 md:text-xl text-center w-full md:font-bold">click here</button>
                </div>
              </div>
        </div>
        <div className=" relative z-10 h-fit" >
            <img src="https://cdn.shopify.com/s/files/1/1825/4753/files/banner-collection.jpg?v=1605179956" className="w-full object-cover" alt="" style={{height:"100vh"}}/>
              <div className="absolute z-20 w-fit max-h-fit bg-white p-2 md:p-4 inset-y-1/4 inset-x-6 md:inset-x-1/2">
                <div className="border-2 border-gray-400 p-4 md:px-16 md:py-12 text-center">
                    <div className="text-gray-900  text-lg md:text-3xl capitalize">new collection</div>
                    <div className="text-gray-900 text-3xl md:text-5xl font-semibold py-4 capitalize">word of denim</div>
                    <div className="text-gray-900 mb-4">greate new collection of new colthes</div>
                    <button className="bg-primary text-white md:py-4 py-2 md:text-xl text-center w-full md:font-bold">click here</button>
                </div>
              </div>
        </div>
      </Slider>
    </div>
    )
}

export default Panner;