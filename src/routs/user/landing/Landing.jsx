import React from 'react'
import Banner from '../../../components/sliders/bannerSlider/Banner';
import { Link } from 'react-router-dom';
import Partners from '../../../components/sliders/partnerSlider/Partners';
import { background } from '../../../constans/background';
import { product } from '../../../constans/product';
import Bestseller from '../../../components/sliders/bestSeller/Bestseller';
import './landing.css'

const Landing = () => {

    // const productData=[
    //     {name:'', }
    // ]
    return (
        <>
            <Banner />

            <Partners />

            {/* <!--newStyles  --> */}
            <section className="newStyles py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-6 position-relative">
                            <h1 className="roboto text-uppercase newStyleHead text-dark text-center text-md-left w-100">
                                Explore new and popular styles
                            </h1>
                            <Link to="/product" className="w-100 productImgLink overflow-hidden d-block mb-4 mb-lg-0">
                                <img src={product.product18} alt="" className="w-100" />
                            </Link>
                        </div>
                        <div className="col-12 col-lg-6 explore">
                            <div className="row">
                                <div className="col-6 position-relative">
                                    <Link to="/product" className="w-100 productImgLink overflow-hidden d-block ">
                                        <img src={product.itemCat} alt="" className="w-100" />
                                    </Link>
                                </div>


                                {/* <!-- remove onSale class to change tag on screen --> */}
                                <div className="col-6 position-relative">
                                    <Link to="/product" className="w-100 productImgLink overflow-hidden d-block onSale">
                                        <img src={product.itemCat1} alt="" className="w-100" />
                                    </Link>
                                </div>
                                {/* <!-- remove onSale class to change tag on screen --> */}
                                <div className="col-6 position-relative">
                                    <Link to="/product" className="w-100 productImgLink overflow-hidden d-block onSale">
                                        <img src={product.itemCat2} alt="" className="w-100" />
                                    </Link>
                                </div>
                                <div className="col-6 position-relative">
                                    <Link to="/product" className="w-100 productImgLink overflow-hidden d-block ">
                                        <img src={product.itemCat3} alt="" className="w-100" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>


            {/* <!--newsletters  --> */}
            <section className="newsletterSection py-4">
                <div className="container">
                    <h1 className="text-center roboto sectHead text-capitalize text-dark">
                        Or subscribe to the newsletter
                    </h1>

                    <div className="productItemBox">
                        <ul className="shortProduct list-unstyled d-flex justify-content-center justify-content-lg-start">

                            {/* <!-- switch activated class to show the active shorted product list --> */}

                            <li>
                                <button className="btn activated">All Products</button>
                            </li>
                            <li>
                                <button className="btn ">T-shirt</button>
                            </li>
                            <li>
                                <button className="btn ">Hoodies</button>
                            </li>
                            <li>
                                <button className="btn ">Jacket</button>
                            </li>
                        </ul>
                    </div>
                    <div className="productList d-flex justify-content-evenly justify-content-lg-between flex-wrap ">
                        <Link className=" text-decoration-none productCard  position-relative mb-4" to="/product">
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
                        </Link>

                        <Link className=" text-decoration-none productCard position-relative mb-4" to="/product">
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
                        </Link>
                        <Link className=" text-decoration-none productCard position-relative mb-4" to="/product">
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
                        </Link>
                        {/* <!-- remove onSale class to change tag on screen --> */}
                        <Link className=" text-decoration-none productCard position-relative mb-4 onSale" to="/product">
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
                        </Link>
                        {/* <!-- remove hot class to change tag on screen --> */}
                        <Link className=" text-decoration-none productCard position-relative mb-4 onHot" to="/product">
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
                        </Link>

                        {/* <!-- remove onSale class to change tag on screen --> */}
                        <Link className=" text-decoration-none productCard position-relative onSale mb-4" to="/product">
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
                        </Link>
                        <Link className=" text-decoration-none productCard position-relative mb-4" to="/product">
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
                        </Link>
                        <Link className=" text-decoration-none productCard position-relative mb-4" to="/product">
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
                        </Link>
                    </div>

                </div>
            </section>


            {/* <!--Zara branding-- > */}
            <section className="zaraBranding position-relative my-5">
                <img src={background.Zara_Logo1} alt="" className="position-absolute brandingImg top-0 end-0" />
                <div className="container h-100">
                    <div className="leftpannelZara">
                        <img src={background.Zara_logo2} alt="" className="zaraHead mb-0 mb-md-4 mx-auto mx-md-0" />
                        <p className="mb-md-3 mb-0 zaraText roboto text-light">
                            Lustrous yet understated. The new evening
                            wear collection exclusively offered at the
                            reopened Giorgio Armani boutique in Los
                            Angeles.
                        </p>
                        <div className=" mx-auto mx-md-0">
                            <Link className="btn btn-light rounded-0 zaraBtn roboto" href="show-products.html">
                                See Collection
                            </Link>
                        </div>
                    </div>
                </div>
            </section>


            {/* <!--best seller-- > */}
            <Bestseller />


            {/* <!--follow us section-- > */}
            <section className="followUssection py-5">
                <div className="container">
                    <div className="">
                        <h1 className="text-center roboto sectHead text-capitalize text-dark pt-2 pt-sm-5">
                            Follow products and discounts on Instagram
                        </h1>
                        <div className="dispPicFollow d-flex justify-content-between py-3 py-sm-5">
                            <div className="followBoxDiv">
                                <img src={background.follow1} alt="" className="followImage w-100" />
                            </div>
                            <div className="followBoxDiv">
                                <img src={background.follow2} alt="" className="followImage w-100" />
                            </div>
                            <div className="followBoxDiv">
                                <img src={background.follow3} alt="" className="followImage w-100" />
                            </div>
                            <div className="followBoxDiv">
                                <img src={background.follow4} alt="" className="followImage w-100" />
                            </div>
                            <div className="followBoxDiv">
                                <img src={background.follow5} alt="" className="followImage w-100" />
                            </div>
                            <div className="followBoxDiv">
                                <img src={background.follow6} alt="" className="followImage w-100" />
                            </div>
                        </div>
                        <h1 className="text-center roboto sectHead text-capitalize text-dark pb-3 pb-sm-5">
                            Or subscribe to the newsletter
                        </h1>
                        <div className="formFollow">
                            <form className="text-center d-flex align-items-center justify-content-center" action="">
                                <input className="followInp w-100" type="email" name="" id="" placeholder="Email Address" />
                                <button className="btn ms-2 rounded-0 followBtn">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Landing
