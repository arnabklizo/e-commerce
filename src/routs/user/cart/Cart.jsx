import React from 'react';
import './cart.css'

const Cart = () => {


    return (
        <>
            <section className="cartSection">
                <div className="container">
                    <h1 className="text-center roboto sectHead text-capitalize text-dark pt-5 pageHeader my-2">
                        Checkout
                    </h1>

                    <div className="shoppingBag d-flex flex-column flex-lg-row justify-content-between rounded border p-3 pt-3">
                        <div>
                            <h1 className="roboto text-dark fs-3 py-2 border-bottom">Shopping Bag</h1>
                            <div className="text-dark">
                                <span className="fw-bold text-dark">2</span> Items in your bag
                            </div>
                        </div>
                        <div className="text-dark">
                            Expected Delivery : <span className="text-dark fw-bold">Monday, November 28, 2024</span>
                        </div>
                    </div>

                    <div className="tableOfCart my-3 rounded border p-3 position-relative">
                        <div>
                            <button className="delBtn fs-4 my-3 border-0 bg-transparent">
                                <i className="fa-solid fa-trash-can me-2"></i>
                                Delete Selected
                            </button>
                        </div>
                        <div className="row">
                            <div className="col-12 col-lg-6">
                                <div className="cartarea">
                                    <div
                                        className="productCartCard m-1 rounded border position-relative d-flex flex-column flex-sm-row">
                                        <img src="assets/images/products/airZoom.jpg" alt="" className="cartDataImgPrdct" />
                                        <button type="button" className="btn-close position-absolute top-0 end-0"
                                            aria-label="Close"></button>
                                        <label className="selectOrder position-absolute top-0 start-0">
                                            <input name="dummy" type="checkbox" />
                                            <span className="orderSpan"></span>
                                        </label>
                                        <div className="bodyOfCartCard p-2">
                                            <h1 className="roboto fs-4 text-dark">Nike Air Zoom Pegasus</h1>
                                            <div>Free Shipping</div>
                                            <div className="py-1">
                                                <span>
                                                    <span className="text-decoration-line-through hotcolor pe-1">
                                                        &#8377;<span className="price fw-bold hotcolor">2999</span>/
                                                    </span>
                                                    <span className="priceDetails fs-4 fw-bold">&#8377; 699 /-</span>
                                                </span>
                                            </div>
                                            <div className="py-2">
                                                <div className="btn-group" role="group" aria-label="Basic example">
                                                    <button type="button" className="btn btn-dark">-</button>
                                                    <div
                                                        className="productNumb d-flex align-items-center justify-content-center border border-dark">
                                                        1
                                                    </div>
                                                    <button type="button" className="btn btn-dark">+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="productCartCard m-1 rounded border position-relative d-flex flex-column flex-sm-row">
                                        <img src="assets/images/products/airZoom.jpg" alt="" className="cartDataImgPrdct" />
                                        <button type="button" className="btn-close position-absolute top-0 end-0"
                                            aria-label="Close"></button>
                                        <label className="selectOrder position-absolute top-0 start-0">
                                            <input name="dummy" type="checkbox" />
                                            <span className="orderSpan"></span>
                                        </label>
                                        <div className="bodyOfCartCard p-2">
                                            <h1 className="roboto fs-4 text-dark">Nike Air Zoom Pegasus</h1>
                                            <div>Free Shipping</div>
                                            <div className="py-1">
                                                <span>
                                                    <span className="text-decoration-line-through hotcolor pe-1">
                                                        &#8377;<span className="price fw-bold hotcolor">2999</span>/
                                                    </span>
                                                    <span className="priceDetails fs-4 fw-bold">&#8377; 699 /-</span>
                                                </span>
                                            </div>
                                            <div className="py-2">
                                                <div className="btn-group" role="group" aria-label="Basic example">
                                                    <button type="button" className="btn btn-dark">-</button>
                                                    <div
                                                        className="productNumb d-flex align-items-center justify-content-center border border-dark">
                                                        1
                                                    </div>
                                                    <button type="button" className="btn btn-dark">+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="productCartCard m-1 rounded border position-relative d-flex flex-column flex-sm-row">
                                        <img src="assets/images/products/airZoom.jpg" alt="" className="cartDataImgPrdct" />
                                        <button type="button" className="btn-close position-absolute top-0 end-0"
                                            aria-label="Close"></button>
                                        <label className="selectOrder position-absolute top-0 start-0">
                                            <input name="dummy" type="checkbox" />
                                            <span className="orderSpan"></span>
                                        </label>
                                        <div className="bodyOfCartCard p-2">
                                            <h1 className="roboto fs-4 text-dark">Nike Air Zoom Pegasus</h1>
                                            <div>Free Shipping</div>
                                            <div className="py-1">
                                                <span>
                                                    <span className="text-decoration-line-through hotcolor pe-1">
                                                        &#8377;<span className="price fw-bold hotcolor">2999</span>/
                                                    </span>
                                                    <span className="priceDetails fs-4 fw-bold">&#8377; 699 /-</span>
                                                </span>
                                            </div>
                                            <div className="py-2">
                                                <div className="btn-group" role="group" aria-label="Basic example">
                                                    <button type="button" className="btn btn-dark">-</button>
                                                    <div
                                                        className="productNumb d-flex align-items-center justify-content-center border border-dark">
                                                        1
                                                    </div>
                                                    <button type="button" className="btn btn-dark">+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6">
                                <div className="osrderSumm border rounded bg-white p-2">
                                    <h1 className="roboto fs-3 text-center text-dark">Order Summary</h1>
                                    <div className="border-top p-2 ">

                                        <div className="d-flex justify-content-between fs-5">
                                            <span className="text-capitalize text-dark">Subtotal</span>
                                            <span className="priceOrderedCart text-dark fw-bold">&#8377;
                                                <span className="text-dark fw-bold"> 1234</span>
                                            </span>
                                        </div>

                                        <div className="d-flex justify-content-between fs-5">
                                            <span className="text-capitalize text-dark">Shipping</span>
                                            <span className="priceOrderedCart text-dark fw-bold">
                                                Free
                                            </span>
                                        </div>

                                        <div className="d-flex justify-content-between fs-5">
                                            <span className="text-capitalize text-dark">Discount</span>
                                            <span className="priceOrderedCart text-dark fw-bold"> &#8377;
                                                <span className="text-dark fw-bold"> 234</span>
                                            </span>
                                        </div>

                                        <div className="d-flex mt-3 border-top py-1 border-dark justify-content-between fs-5">
                                            <span className="text-capitalize text-dark">Total</span>
                                            <span className="priceOrderedCart text-dark fw-bold"> &#8377;
                                                <span className="text-dark fw-bold">1000</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="addressBox border rounded bg-white p-2 my-2">
                                    <h1 className="roboto fs-3 text-center text-dark">Shipping Address</h1>
                                    <div className="border-top p-2">
                                        <div className="address">
                                            Address Line 1, Street, State/ Province /Region, City, Country, 714151
                                            <div className="mobile py-1">0123456789</div>
                                        </div>
                                    </div>
                                    <div className="text-center border-top">
                                        <button className="btn-dark btn my-2" data-bs-target="#changeAddressModal"
                                            data-bs-toggle="modal">
                                            Change Address</button>
                                    </div>
                                </div>

                                <div className="my-2 py-2 text-center">
                                    <button className="btn btn-dark">Proceed to checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </section>
        </>
    )
}

export default Cart
