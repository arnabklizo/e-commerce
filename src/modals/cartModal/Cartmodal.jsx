import React, { useState } from "react";
import '../cartModal/cartModal.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faLeftLong, faPrint } from "@fortawesome/free-solid-svg-icons";
import { getCart } from "../../services/api";

const Cartmodal = ({ isVisible, onClose }) => {
    const [cart, setCart] = useState(null);

    // back 
    if (isVisible == true) {
        document.body.classList.add('overlayed')
    } else {
        document.body.classList.remove('overlayed')
    }

    return (
        <>
            <div
                className={`offcanvas offcanvas-end ${isVisible ? "show" : ""}`}
                tabIndex="-1"
                id="shoppicartSlide"
                style={{ visibility: isVisible ? "visible" : "hidden" }}
                aria-labelledby="shoppicartSlideLabel"
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="shoppicartSlideLabel">
                        Shopping Cart
                    </h5>
                    <button type="button" className="btn-close" onClick={onClose}></button>
                </div>
                <div className="offcanvas-body ">
                    {/* Cart Items */}
                    <div className="cartContext  overflow-y-auto">
                        <ul className="list-unstyled">

                            {/* <!--  cart list loop  --> */}

                            <li className="cartList d-flex">
                                <a href="" className="productCartImg overflow-hidden d-block border">
                                    <img src="assets/images/products/scarf.jpg" alt="" className="w-100" />
                                </a>
                                <div className=" ps-3 productcartBoxs d-flex flex-column justify-content-between position-relative">
                                    <div className="productCategoryOnCart fw-bold pb-2">
                                        Scarf
                                    </div>
                                    <div className="productNameOncart fw-bold text-dark pb-2">
                                        Geometric print Scarf
                                    </div>
                                    <div className=" d-flex align-items-center justify-content-between">
                                        <span className="priceBox text-dark">
                                            &#8377;<span className="cartPrice text-dark">349</span>/-
                                        </span>

                                        <label htmlFor="qty d-flex">
                                            <span className=" text-dark">QTY</span>
                                            <input className="cartQty border ps-1 ms-1" type="number" defaultValue="1" />
                                        </label>
                                    </div>

                                    <button type="button" className="btn cardDlt position-absolute fs-4 top-0 end-0">
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </button>
                                </div>
                            </li>

                            <li className="cartList d-flex">
                                <a href="" className="productCartImg overflow-hidden d-block border">
                                    <img src="assets/images/products/dress.jpg" alt="" className="w-100" />
                                </a>
                                <div className=" ps-3 productcartBoxs d-flex flex-column justify-content-between position-relative">
                                    <div className="productCategoryOnCart fw-bold pb-2">
                                        Dress
                                    </div>
                                    <div className="productNameOncart fw-bold text-dark pb-2">
                                        Basic Dress Green
                                    </div>
                                    <div className=" d-flex align-items-center justify-content-between">
                                        <span className="priceBox text-dark">
                                            &#8377;<span className="cartPrice text-dark">2449</span>/-
                                        </span>

                                        <label htmlFor="qty d-flex">
                                            <span className=" text-dark">QTY</span>
                                            <input className="cartQty border ps-1 ms-1" type="number" defaultValue="1" />
                                        </label>
                                    </div>

                                    <button type="button" className="btn cardDlt position-absolute fs-4 top-0 end-0">
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </button>
                                </div>
                            </li>

                            <li className="cartList d-flex">
                                <a href="" className="productCartImg overflow-hidden d-block border">
                                    <img src="assets/images/products/jogger.jpg" alt="" className="w-100" />
                                </a>
                                <div className=" ps-3 productcartBoxs d-flex flex-column justify-content-between position-relative">
                                    <div className="productCategoryOnCart fw-bold pb-2">
                                        Dress
                                    </div>
                                    <div className="productNameOncart fw-bold text-dark pb-2">
                                        Adicolor Classics Joggers
                                    </div>
                                    <div className=" d-flex align-items-center justify-content-between">
                                        <span className="priceBox text-dark">
                                            &#8377;<span className="cartPrice text-dark">549</span>/-
                                        </span>

                                        <label htmlFor="qty d-flex">
                                            <span className=" text-dark">QTY</span>
                                            <input className="cartQty border ps-1 ms-1" type="number" defaultValue="1" />
                                        </label>
                                    </div>

                                    <button type="button" className="btn cardDlt position-absolute fs-4 top-0 end-0">
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </button>
                                </div>
                            </li>

                            <li className="cartList d-flex">
                                <a href="" className="productCartImg overflow-hidden d-block border">
                                    <img src="assets/images/products/futuraLuxe.jpg" alt="" className="w-100" />
                                </a>
                                <div className=" ps-3 productcartBoxs d-flex flex-column justify-content-between position-relative">
                                    <div className="productCategoryOnCart fw-bold pb-2">
                                        Bag
                                    </div>
                                    <div className="productNameOncart fw-bold text-dark pb-2">
                                        Nike Sportswear Futura Luxe
                                    </div>
                                    <div className=" d-flex align-items-center justify-content-between">
                                        <span className="priceBox text-dark">
                                            &#8377;<span className="cartPrice text-dark">2199</span>/-
                                        </span>

                                        <label htmlFor="qty d-flex">
                                            <span className=" text-dark">QTY</span>
                                            <input className="cartQty border ps-1 ms-1" type="number" defaultValue="1" />
                                        </label>
                                    </div>

                                    <button type="button" className="btn cardDlt position-absolute fs-4 top-0 end-0">
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </button>
                                </div>
                            </li>

                            <li className="cartList d-flex">
                                <a href="" className="productCartImg overflow-hidden d-block border">
                                    <img src="assets/images/products/hoodie.jpg" alt="" className="w-100" />
                                </a>
                                <div className=" ps-3 productcartBoxs d-flex flex-column justify-content-between position-relative">
                                    <div className="productCategoryOnCart fw-bold pb-2">
                                        Dress
                                    </div>
                                    <div className="productNameOncart fw-bold text-dark pb-2">
                                        Yellow Reserved Hoodie
                                    </div>
                                    <div className=" d-flex align-items-center justify-content-between">
                                        <span className="priceBox text-dark">
                                            &#8377;<span className="cartPrice text-dark">1599</span>/-
                                        </span>

                                        <label htmlFor="qty d-flex">
                                            <span className=" text-dark">QTY</span>
                                            <input className="cartQty border ps-1 ms-1" type="number" defaultValue="1" />
                                        </label>
                                    </div>

                                    <button type="button" className="btn cardDlt position-absolute fs-4 top-0 end-0">
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </button>
                                </div>
                            </li>

                            <li className="cartList d-flex">
                                <a href="" className="productCartImg overflow-hidden d-block border">
                                    <img src="assets/images/products/airZoom.jpg" alt="" className="w-100" />
                                </a>
                                <div className=" ps-3 productcartBoxs d-flex flex-column justify-content-between position-relative">
                                    <div className="productCategoryOnCart fw-bold pb-2">
                                        Shoe
                                    </div>
                                    <div className="productNameOncart fw-bold text-dark pb-2">
                                        Nike Air Zoom Pegasus
                                    </div>
                                    <div className=" d-flex align-items-center justify-content-between">
                                        <span className="priceBox text-dark">
                                            &#8377;<span className="cartPrice text-dark">1989</span>/-
                                        </span>

                                        <label htmlFor="qty d-flex">
                                            <span className=" text-dark">QTY</span>
                                            <input className="cartQty border ps-1 ms-1" type="number" defaultValue="1" />
                                        </label>
                                    </div>

                                    <button type="button" className="btn cardDlt position-absolute fs-4 top-0 end-0">
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </button>
                                </div>
                            </li>

                            <li className="cartList d-flex">
                                <a href="" className="productCartImg overflow-hidden d-block border">
                                    <img src="assets/images/products/glass.jpg" alt="" className="w-100" />
                                </a>
                                <div className=" ps-3 productcartBoxs d-flex flex-column justify-content-between position-relative">
                                    <div className="productCategoryOnCart fw-bold pb-2">
                                        Glasses
                                    </div>
                                    <div className="productNameOncart fw-bold text-dark pb-2">
                                        Buffet vision
                                    </div>
                                    <div className=" d-flex align-items-center justify-content-between">
                                        <span className="priceBox text-dark">
                                            &#8377;<span className="cartPrice text-dark">2349</span>/-
                                        </span>

                                        <label htmlFor="qty d-flex">
                                            <span className=" text-dark">QTY</span>
                                            <input className="cartQty border ps-1 ms-1" type="number" defaultValue="1" />
                                        </label>
                                    </div>

                                    <button type="button" className="btn cardDlt position-absolute fs-4 top-0 end-0">
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </button>
                                </div>
                            </li>

                            <li className="cartList d-flex">
                                <a href="" className="productCartImg overflow-hidden d-block border">
                                    <img src="assets/images/products/repelmiler.jpg" alt="" className="w-100" />
                                </a>
                                <div className=" ps-3 productcartBoxs d-flex flex-column justify-content-between position-relative">
                                    <div className="productCategoryOnCart fw-bold pb-2">
                                        Dress
                                    </div>
                                    <div className="productNameOncart fw-bold text-dark pb-2">
                                        Nike Repel Miler
                                    </div>
                                    <div className=" d-flex align-items-center justify-content-between">
                                        <span className="priceBox text-dark">
                                            &#8377;<span className="cartPrice text-dark">1699</span>/-
                                        </span>

                                        <label htmlFor="qty d-flex">
                                            <span className=" text-dark">QTY</span>
                                            <input className="cartQty border ps-1 ms-1" type="number" defaultValue="1" />
                                        </label>
                                    </div>

                                    <button type="button" className="btn cardDlt position-absolute fs-4 top-0 end-0">
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </button>
                                </div>
                            </li>

                        </ul>
                    </div>
                    <div className="text-center mt-2">
                        <a className="btn rounded-0 btn-dark mx-auto" href="cart.html">
                            Continue Shopping
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cartmodal;