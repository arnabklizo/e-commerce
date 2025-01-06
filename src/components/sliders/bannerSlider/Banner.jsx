import React from "react";
import Slider from "react-slick"; // Import the Slick Slider component
import { background } from "../../../constans/background";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../bannerSlider/banner.css'
const Banner = () => {

    const settings = {
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        fade: true,
        speed: 3000,
    };
    return (
        <>
            <section className="banner mb-3">
                <div className="container-fluid p-0">
                    <div className="bannerSlider">
                        <Slider {...settings}>
                            <a href="product-details.html">
                                <img src={background.slider1} alt="" className="bannerimage" />
                            </a>
                            <a href="product-details.html">
                                <img src={background.slider2} alt="" className="bannerimage" />
                            </a>
                            <a href="product-details.html">
                                <img src={background.slider3} alt="" className="bannerimage" />
                            </a>
                            <a href="product-details.html">
                                <img src={background.slider4} alt="" className="bannerimage" />
                            </a>
                        </Slider>
                    </div>
                </div>
            </section>

        </>
    );
}

export default Banner
