import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../product/ProductCard";
import {  MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";


function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
            
     <MdArrowForwardIos className={`${className} `} style={{ ...style, display: "block",fontSize:"15rem", color:"#000066" }} onClick={onClick}/>
      
 
    );
  }
  function SampleprevArrow(props) {
    const { className, style, onClick } = props;
    return (
            
    <MdArrowBackIosNew className={`${className} `} style={{ ...style, display: "block",fontSize:"5rem", color:"#000066" }} onClick={onClick}/>
 
    );
  }

export default function ProductSlider({title}){


    const settings = {
        
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        cssEase: "linear",
        arrows:false,
        responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    arrows:true,
                   nextArrow: <SampleNextArrow />,
                   prevArrow: <SampleprevArrow />,
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows:true,
                   nextArrow: <SampleNextArrow />,
                   prevArrow: <SampleprevArrow />,
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows:false
                  }
                }
              ]
              
    
      };

    return(
        <div className="my-16 font-serif container mx-auto ">
           <div className="flex justify-center w-full my-4">
             <div className="uppercase text-3xl ">{title?title:""}</div>
           </div>
           <Slider {...settings} className="" >
            <ProductCard />
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
           </Slider>

        </div>
    )
}