import React from 'react';
import Slider from "react-slick";
import { product } from '../../../constans/product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../bestSeller/bestseller.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Bestseller = () => {
    const CustomPrevArrow = (props) => {
        const { className, onClick } = props;
        return (
            <button
                type="button"
                className={`${className} prevSeller sellerButton`}
                onClick={onClick}
                aria-label="Previous Slide"
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
        );
    };

    const CustomNextArrow = (props) => {
        const { className, onClick } = props;
        return (
            <button
                type="button"
                className={`${className} nextSeller sellerButton`}
                onClick={onClick}
                aria-label="Next Slide"
            >
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        );
    };


    const settings = {
        infinite: true,
        autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        speed: 1000,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    infinite: true,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 530,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 375,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <>
            <section className="bestSellerSection mb-5">
                <div className="container">
                    <h1 className="text-center roboto sectHead text-capitalize text-dark">
                        Best sellers
                    </h1>

                    <div className="bestSellerSliderBox position-relative">
                        <div className="sellerSlider pb-md-5 pt-5">
                            <Slider {...settings}>
                                <div className="bestsellerCard">
                                    <a className=" text-decoration-none productCard  position-relative mb-4"
                                        href="product-details.html">
                                        <div className="productCardImg mb-2">
                                            <img src={product.jogger} alt="" className="w-100 h-100" />
                                        </div>
                                        <h3 className="roboto itemName px-1">Adicolor Classics Joggers</h3>
                                        <div className="itemName flex-column-reverse flex-sm-row px-1 d-flex justify-content-between">
                                            <span className="catagory">Dress</span>
                                            <span className="priceBox fw-bold text-dark">
                                                &#8377;<span className="price fw-bold text-dark">549</span>/-
                                            </span>
                                        </div>
                                    </a>
                                </div>
                                <div className="bestsellerCard">
                                    <a className=" text-decoration-none productCard position-relative mb-4" href="product-details.html">
                                        <div className="productCardImg mb-2">
                                            <img src={product.futuraLuxe} alt="" className="w-100 h-100" />
                                        </div>
                                        <h3 className="roboto itemName px-1">Nike Sportswear Futura Luxe</h3>
                                        <div className="itemName flex-column-reverse flex-sm-row px-1 d-flex justify-content-between">
                                            <span className="catagory">Bag</span>
                                            <span className="priceBox fw-bold text-dark">
                                                &#8377;<span className="price fw-bold text-dark">2199</span>/-
                                            </span>
                                        </div>
                                    </a>
                                </div>
                                <div className="bestsellerCard">
                                    <a className=" text-decoration-none productCard position-relative mb-4" href="product-details.html">
                                        <div className="productCardImg mb-2">
                                            <img src={product.scarf} alt="" className="w-100 h-100" />
                                        </div>
                                        <h3 className="roboto itemName px-1">Geometric print Scarf</h3>
                                        <div className="itemName flex-column-reverse flex-sm-row px-1 d-flex justify-content-between">
                                            <span className="catagory">Scarf</span>
                                            <span className="priceBox fw-bold text-dark">
                                                &#8377;<span className="price fw-bold text-dark">349</span>/-
                                            </span>
                                        </div>
                                    </a>
                                </div>
                                <div className="bestsellerCard">
                                    {/* <!-- remove onSale class to change tag on screen --> */}
                                    <a className=" text-decoration-none productCard position-relative mb-4 onSale"
                                        href="product-details.html">
                                        <div className="productCardImg mb-2">
                                            <img src={product.hoodie} alt="" className="w-100 h-100" />
                                        </div>
                                        <h3 className="roboto itemName px-1">Yellow Reserved Hoodie</h3>
                                        <div className="itemName flex-column-reverse flex-sm-row px-1 d-flex justify-content-between">
                                            <span className="catagory">Dress</span>
                                            <span className="priceBox fw-bold text-dark">
                                                <span className="text-decoration-line-through hotcolor pe-1">
                                                    &#8377;<span className="price fw-bold hotcolor">2599</span>/
                                                </span>
                                                &#8377;<span className="price fw-bold text-dark">1599</span>/-
                                            </span>
                                        </div>
                                    </a>
                                </div>
                                <div className="bestsellerCard">
                                    {/* <!-- remove hot class to change tag on screen --> */}
                                    <a className=" text-decoration-none productCard position-relative mb-4 onHot"
                                        href="product-details.html">
                                        <div className="productCardImg mb-2">
                                            <img src={product.dress} alt="" className="w-100 h-100" />
                                        </div>
                                        <h3 className="roboto itemName px-1">Basic Dress Green</h3>
                                        <div className="itemName flex-column-reverse flex-sm-row px-1 d-flex justify-content-between">
                                            <span className="catagory">Dress</span>
                                            <span className="priceBox fw-bold text-dark">
                                                &#8377;<span className="price fw-bold text-dark">2449</span>/-
                                            </span>
                                        </div>
                                    </a>
                                </div>
                                <div className="bestsellerCard">
                                    {/* <!-- remove onSale class to change tag on screen --> */}
                                    <a className=" text-decoration-none productCard position-relative onSale mb-4"
                                        href="product-details.html">
                                        <div className="productCardImg mb-2">
                                            <img src={product.airZoom} alt="" className="w-100 h-100" />
                                        </div>
                                        <h3 className="roboto itemName px-1">Nike Air Zoom Pegasus</h3>
                                        <div className="itemName flex-column-reverse flex-sm-row px-1 d-flex justify-content-between">
                                            <span className="catagory">Shoe</span>
                                            <span className="priceBox fw-bold text-dark">
                                                <span className="text-decoration-line-through hotcolor pe-1">
                                                    &#8377;<span className="price fw-bold hotcolor">2999</span>/
                                                </span>
                                                &#8377;<span className="price fw-bold text-dark">1989</span>/-
                                            </span>
                                        </div>
                                    </a>
                                </div>
                                <div className="bestsellerCard">
                                    <a className=" text-decoration-none productCard position-relative mb-4" href="product-details.html">
                                        <div className="productCardImg mb-2">
                                            <img src={product.repelmiler} alt="" className="w-100 h-100" />
                                        </div>
                                        <h3 className="roboto itemName px-1">Nike Repel Miler</h3>
                                        <div className="itemName flex-column-reverse flex-sm-row px-1 d-flex justify-content-between">
                                            <span className="catagory">Dress</span>
                                            <span className="priceBox fw-bold text-dark">
                                                &#8377;<span className="price fw-bold text-dark">1699</span>/-
                                            </span>
                                        </div>
                                    </a>
                                </div>
                                <div className="bestsellerCard">
                                    <a className=" text-decoration-none productCard position-relative mb-4" href="product-details.html">
                                        <div className="productCardImg mb-2">
                                            <img src={product.glass} alt="" className="w-100 h-100" />
                                        </div>
                                        <h3 className="roboto itemName px-1">Buffet vision</h3>
                                        <div className="itemName flex-column-reverse flex-sm-row px-1 d-flex justify-content-between">
                                            <span className="catagory">Glasses</span>
                                            <span className="priceBox fw-bold text-dark">
                                                &#8377;<span className="price fw-bold text-dark">2349</span>/-
                                            </span>
                                        </div>
                                    </a>
                                </div>
                            </Slider>
                        </div>
                    </div>


                </div>
            </section>
        </>
    );
};

export default Bestseller;