import React from "react";
import Slider from "react-slick"; // Import the Slick Slider component
import { Icon } from "../../../constans/icon";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../partnerSlider/partner.css'

const Partners = () => {

    const settings = {
        infinite: true,
        autoplay: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        pauseOnHover: false,
        speed: 3000,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    infinite: true,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <>
            <scetion className="partnerSection py-4">
                <div className="container py-3">
                    <div className="partners py-3">
                        <Slider {...settings}>

                            <div className="partnerBox">
                                <img src={Icon.logo01} alt="" className="m-auto" />
                            </div>
                            <div className="partnerBox">
                                <img src={Icon.logo02} alt="" className="m-auto" />
                            </div>
                            <div className="partnerBox">
                                <img src={Icon.logo03} alt="" className="m-auto" />
                            </div>
                            <div className="partnerBox">
                                <img src={Icon.logo04} alt="" className="m-auto" />
                            </div>
                            <div className="partnerBox">
                                <img src={Icon.logo05} alt="" className="m-auto" />
                            </div>
                            <div className="partnerBox">
                                <img src={Icon.logo01} alt="" className="m-auto" />
                            </div>
                        </Slider>
                    </div>
                </div>
            </scetion>
        </>
    );
}

export default Partners
