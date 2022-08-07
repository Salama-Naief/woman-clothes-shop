import Slider from "react-slick";
import {Camera} from '@icon-park/svg';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { API_URL } from "../../utils/connectionConfig";
import Link from "next/link";


const Panner =({carousal})=>{
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
        {carousal.length>0&&carousal.map((item)=>(
          <div key={item.id} className=" relative z-10 h-fit justify-center flex" >
          <img src={`${API_URL}${item.attributes.img.data.attributes.url}`} className="  w-full h-screen object-cover" alt=""/>
            <div className="absolute z-20 w-fit max-h-fit bg-white p-2 md:p-4 inset-y-1/4 inset-x-5 md:inset-x-1/2">
              <div className="border-2 border-gray-400 p-4 md:px-16 md:py-12 text-center">
                  <div className="text-gray-900  text-lg md:text-3xl capitalize">{item.attributes.subTitle}</div>
                  <div className="text-gray-900 text-3xl md:text-4xl font-semibold py-4 capitalize">{item.attributes.title}</div>
                  <div className="text-gray-900 mb-4">{item.attributes.desc}</div>
                 <Link href={`/products/collections-${item.attributes.collection.data[0].attributes.slug}`}><a><div className="bg-primary text-white md:py-4 py-2 md:text-xl text-center w-full md:font-bold">{item.attributes.btnText}</div></a></Link>
              </div>
            </div>
        </div>
        ))
        }
      </Slider>
    </div>
    )
}

export default Panner;