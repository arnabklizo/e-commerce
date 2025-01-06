import React from 'react';
import { useNavigate } from 'react-router-dom';
import Bestseller from '../../../components/sliders/bestSeller/Bestseller'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot, faCartPlus, faHeart, faStar, faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { product } from '../../../constans/product';
import './product.css';

const ProductDetails = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };
    return (
        <>
            <section className="SingleProduct">
                <div className="container">
                    <div className="row py-5">
                        <div className="col-12 col-lg-6">
                            <div className="productSingleImg m-auto">
                                <div className="overflow-hidden">
                                    <img src={product.product1} alt="" className="w-100" />
                                </div>
                                <div className="overflow-hidden">
                                    <img src={product.product1} alt="" className="w-100" />
                                </div>
                                <div className="overflow-hidden">
                                    <img src={product.product1} alt="" className="w-100" />
                                </div>
                                <div className="overflow-hidden">
                                    <img src={product.product1} alt="" className="w-100" />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="singleDetailsBox pt-2">
                                {/* <!-- this product is for which gender  --> */}
                                <div className="categoryNameBox text-uppercase">
                                    Men
                                </div>


                                {/* <!-- product title  --> */}
                                <h1 className="productHead text-capitalize text-dark fw-bold roboto">
                                    Pink T-Shirt for Men
                                </h1>

                                {/* <!-- product description  --> */}
                                <div className="text-dark mt-4 fw-bold">
                                    Description :
                                </div>
                                <div className="productDescription">
                                    Our T-Shirts are lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
                                    luctus nec ullamcorper mattis,
                                    pulvinar dapibus leo.
                                </div>


                                {/* <!-- product price  --> */}
                                <div className="productPrice mt-3">
                                    <span>
                                        <span className="text-decoration-line-through hotcolor pe-1">
                                            &#8377;<span className="price fw-bold hotcolor">2999</span>/
                                        </span>
                                        <span className="priceDetails fs-4 fw-bold">&#8377; 699 /-</span>
                                    </span>

                                    <span> &amp; Free Shipping.</span>
                                </div>


                                {/* <!-- key features of the product  --> */}
                                <div className="text-dark my-3 fw-bold">
                                    About the product
                                </div>
                                <ul className="list-unstyled">
                                    <li>
                                        <span><FontAwesomeIcon icon={faCircleDot} className='me-1' /></span>
                                        <span>100% Cotton</span>
                                    </li>
                                    <li>
                                        <span><FontAwesomeIcon icon={faCircleDot} className='me-1' /></span>
                                        <span>260gsm</span>
                                    </li>
                                    <li>
                                        <span><FontAwesomeIcon icon={faCircleDot} className='me-1' /></span>
                                        <span>Breathable Fabric</span>
                                    </li>
                                </ul>

                                <hr />

                                {/* <!-- cart option  --> */}
                                <div className="text-center text-sm-start">
                                    <div className="btn-group my-1" role="group" aria-label="Basic example">
                                        <button type="button" className="btn btn-dark">-</button>
                                        <div
                                            className="productNumb d-flex align-items-center justify-content-center border border-dark">
                                            1
                                        </div>
                                        <button type="button" className="btn btn-dark">+</button>
                                    </div>
                                    <button className="btn btn-dark roboto whiteIcon ms-sm-3 my-1">
                                        <FontAwesomeIcon icon={faCartPlus} className='me-1' />
                                        ADD TO CART
                                    </button>
                                    <button className="btn btn-dark roboto whiteIcon ms-3 ms-lg-0 ms-xl-3 my-1">
                                        <FontAwesomeIcon icon={faHeart} className='me-1' />
                                        ADD TO WISHLIST
                                    </button>
                                </div>
                                <hr />

                                {/* <!-- category of this product  --> */}
                                <div className="categoryBox">
                                    Category: <span className="text-dark text-capitalized fw-bold">T-shirt</span>
                                </div>


                                {/* <!-- review box  --> */}

                                <div className="reviewBox my-2 mt-4">
                                    <div className="leaveRev border rounded p-2">
                                        <div className="text-dark fw-bold fs-5 text-center mb-3">Leave a review for this product
                                        </div>
                                        <form action="">
                                            <div className="form-floating mb-2">
                                                <textarea className="form-control revInp" placeholder="Leave a comment here"
                                                    id="reviewBoxInp"></textarea>
                                                <label htmlFor="reviewBoxInp">Comments</label>
                                            </div>
                                            <div className="ratingBox d-flex align-items-center fw-bold text-dark">
                                                <span className="rt">Rate Us :</span>
                                                <div className="ratingStars ms-2">
                                                    <input value="5" name="value-radio" id="value-1" type="radio"
                                                        className="star s1" />
                                                    <input value="4" name="value-radio" id="value-2" type="radio"
                                                        className="star s2" />
                                                    <input value="3" name="value-radio" id="value-3" type="radio"
                                                        className="star s3" />
                                                    <input value="2" name="value-radio" id="value-4" type="radio"
                                                        className="star s4" />
                                                    <input value="1" name="value-radio" id="value-5" type="radio"
                                                        className="star s5" />
                                                </div>
                                            </div>
                                            <button className="btn btn-dark roboto">Submit review</button>
                                        </form>
                                    </div>
                                    <div className="shwoRev mt-3">
                                        <div className="reviewBox my-2 border rounded p-3 ">
                                            <div className="reviewer fw-bold text-dark fs-4">
                                                Apple Orange
                                            </div>
                                            <div className="reviewTime">
                                                January 19, 2024
                                            </div>
                                            <div className="reviewStars mt-2">
                                                <FontAwesomeIcon icon={faStar} className='me-2' />
                                                <FontAwesomeIcon icon={faStar} className='me-2' />
                                                <FontAwesomeIcon icon={faStar} className='me-2' />
                                                <FontAwesomeIcon icon={faStar} className='me-2' />
                                            </div>
                                            <p className="reviewText">
                                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis officia
                                                asperiores maxime soluta numquam enim nihil! Ullam tempore similique illum earum
                                                totam, a omnis illo doloribus blanditiis distinctio aut qui.
                                            </p>
                                        </div>
                                        <div className="reviewBox my-2 border rounded p-3 ">
                                            <div className="reviewer fw-bold text-dark fs-4">
                                                Apple Orange
                                            </div>
                                            <div className="reviewTime">
                                                January 19, 2024
                                            </div>
                                            <div className="reviewStars mt-2">
                                                <FontAwesomeIcon icon={faStar} className='me-2' />
                                                <FontAwesomeIcon icon={faStar} className='me-2' />
                                            </div>
                                            <p className="reviewText">
                                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis officia
                                                asperiores maxime soluta numquam enim nihil! Ullam tempore similique illum earum
                                                totam, a omnis illo doloribus blanditiis distinctio aut qui.
                                            </p>
                                        </div>
                                        <div className="reviewBox my-2 border rounded p-3 ">
                                            <div className="reviewer fw-bold text-dark fs-4">
                                                Apple Orange
                                            </div>
                                            <div className="reviewTime">
                                                January 19, 2024
                                            </div>
                                            <div className="reviewStars mt-2">
                                                <FontAwesomeIcon icon={faStar} className='me-2' />
                                                <FontAwesomeIcon icon={faStar} className='me-2' />
                                                <FontAwesomeIcon icon={faStar} className='me-2' />
                                                <FontAwesomeIcon icon={faStar} className='me-2' />
                                                <FontAwesomeIcon icon={faStar} className='me-2' />
                                            </div>
                                            <p className="reviewText">
                                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis officia
                                                asperiores maxime soluta numquam enim nihil! Ullam tempore similique illum earum
                                                totam, a omnis illo doloribus blanditiis distinctio aut qui.
                                            </p>
                                        </div>
                                        <div className="reviewBox my-2 border rounded p-3 ">
                                            <div className="reviewer fw-bold text-dark fs-4">
                                                Apple Orange
                                            </div>
                                            <div className="reviewTime">
                                                January 19, 2024
                                            </div>
                                            <div className="reviewStars mt-2">
                                                <FontAwesomeIcon icon={faStar} className='me-2' />
                                                <FontAwesomeIcon icon={faStar} className='me-2' />
                                                <FontAwesomeIcon icon={faStar} className='me-2' />

                                            </div>
                                            <p className="reviewText">
                                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis officia
                                                asperiores maxime soluta numquam enim nihil! Ullam tempore similique illum earum
                                                totam, a omnis illo doloribus blanditiis distinctio aut qui.
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </section>
            <hr />
            <Bestseller />
            <div className="text-center mb-3">
                <button className="btn whiteIcon btn-dark d-flex align-items-center justify-content-center m-auto"
                    onClick={goBack}>
                    <FontAwesomeIcon icon={faLeftLong} className='me-2' />
                    <span className="text-light roboto">Go back</span>
                </button>
            </div>
        </>
    )
}

export default ProductDetails
