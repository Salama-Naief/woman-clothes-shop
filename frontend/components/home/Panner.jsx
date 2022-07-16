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
        <div className=" relative z-10 h-fit" >
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKohNCwmAwI7PtV9Fn0unR8T49HfgXYeQjIg&usqp=CAU" className="w-full object-cover" alt="" style={{height:"40vh"}}/>
              <div className="absolute z-20 w-fit bg-white p-2 md:p-4 inset-y-1/2 inset-x-1 md:inset-x-1/2">
                <div className="border-2 border-secondary p-2 md:p-6 text-center">
                    <div className="text-third  text-xl md:text-3xl capitalize">new collection</div>
                    <div className="text-third text-xl md:text-3xl py-4 capitalize">word of denim</div>
                    <div className="text-third mb-4">greate new collection of new colthes</div>
                    <button className="bg-primary mb-4 text-white md:py-2 py-1 text-center w-full font-bold">click here</button>
                </div>
              </div>
        </div>
      </Slider>
    </div>
    )
}

export default Panner;