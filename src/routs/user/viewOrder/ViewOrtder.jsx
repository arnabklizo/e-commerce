import React, { useEffect } from 'react';
import './viewOrder.css'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faLeftLong, faPrint } from "@fortawesome/free-solid-svg-icons";

const ViewOrtder = () => {
    const navigate = useNavigate();



    const goBack = () => {
        navigate(-1);
    };


    const handlePrint = () => {
        window.print();
    }
    return (
        <>
            <section className="ordrDetails">
                <div className="container">
                    <h1 className="text-center roboto sectHead text-capitalize text-dark pt-5 pageHeader my-2">
                        Order Details
                    </h1>

                    <div
                        className="shoppingBag bg-light d-flex flex-column flex-lg-row justify-content-between rounded border align-items-lg-center p-3 pt-3">
                        <div>
                            <button className="btn btn-dark bckBtn whiteIcon" onClick={goBack}>
                                <FontAwesomeIcon icon={faLeftLong} className='me-2' />
                                Go back
                            </button>
                        </div>
                        <div className="text-dark mt-lg-0 mt-2">
                            Order Placed :
                            <span className="text-dark fw-bold">Monday, November 28, 2024</span>
                        </div>
                    </div>

                    <div className="p-3 my-3 border rounded bg-light">
                        <h2 className="roboto text-dark mb-2 fs-4">
                            Customer Details:
                        </h2>
                        <div className="d-flex justify-content-between flex-column flex-lg-row">
                            <div>
                                <div className="my-2">
                                    <label htmlFor="">Name :</label>
                                    <span className="text-dark">Jaydan Walker</span>
                                </div>
                                <div className="my-2">
                                    <label htmlFor="">Email :</label>
                                    <span className="text-dark">jaydan@walker.com</span>
                                </div>
                                <div className="my-2">
                                    <label htmlFor="">Phone :</label>
                                    <span className="text-dark">01234569879</span>
                                </div>
                            </div>
                            <div>
                                <div className="d-flex">
                                    <label htmlFor="" className="me-1">Address :</label>
                                    <span className="text-dark addressSpanOrder">
                                        Address Line 1, Street, State/ Province /Region, City, Country, 714151
                                        0123456789
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-light rounded border p-3 my-3">
                        <h2 className="roboto text-dark mb-2 fs-4">
                            Order Details:
                        </h2>
                        <div className=" fw-bold d-flex flex-column flex-lg-row align-items-lg-center justify-content-lg-between">
                            <div>
                                <div>
                                    <label htmlFor="">Order ID :</label>
                                    <span className="text-dark">ABCD12340G6</span>
                                </div>
                                <div>
                                    <label htmlFor="">Item Number :</label>
                                    <span className="text-dark">3</span>
                                </div>
                                <div>
                                    <label htmlFor="">Expected Delivery Date :</label>
                                    <span className="text-dark">Wednesday, December 4, 2024</span>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="">Total Price :</label>
                                    <span className="text-dark">&#8377; 3498</span>
                                </div>
                                <div>
                                    <label htmlFor="">Payment Status :</label>
                                    <span className="pending">pending</span>
                                </div>
                                <div>
                                    <label htmlFor="">Order Status :</label>
                                    <span className="shipped">shipped</span>

                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="my-2 bg-light p-3 rounded border">
                        <h2 className="roboto text-dark mb-2 fs-4">
                            Product Details:
                        </h2>

                        <div className="productTableOrders">
                            <div className="productCardOrder py-2">
                                <div className="prdctOrderedName">
                                    <span className="quantity">1</span>
                                    X
                                    <span className="productName">Men Yellow Hoodie</span>
                                </div>
                                <div className="d-flex justify-content-between px-1 px-lg-0">
                                    <div>
                                        <label htmlFor="">Price :</label>
                                        <span>&#8377; 166</span>
                                    </div>
                                    <div>
                                        <label htmlFor="">Total :</label>
                                        <span>&#8377; 498</span>
                                    </div>
                                </div>
                            </div>
                            <div className="productCardOrder py-2">
                                <div className="prdctOrderedName">
                                    <span className="quantity">1</span>
                                    X
                                    <span className="productName">Men Yellow Hoodie</span>
                                </div>
                                <div className="d-flex justify-content-between px-1 px-lg-0">
                                    <div>
                                        <label htmlFor="">Price :</label>
                                        <span>&#8377; 166</span>
                                    </div>
                                    <div>
                                        <label htmlFor="">Total :</label>
                                        <span>&#8377; 498</span>
                                    </div>
                                </div>
                            </div>
                            <div className="productCardOrder py-2">
                                <div className="prdctOrderedName">
                                    <span className="quantity">1</span>
                                    X
                                    <span className="productName">Men Yellow Hoodie</span>
                                </div>
                                <div className="d-flex justify-content-between px-1 px-lg-0">
                                    <div>
                                        <label htmlFor="">Price :</label>
                                        <span>&#8377; 166</span>
                                    </div>
                                    <div>
                                        <label htmlFor="">Total :</label>
                                        <span>&#8377; 498</span>
                                    </div>
                                </div>
                            </div>
                            <div className="productCardOrder total-Price py-2">
                                <div className="prdctOrderedName">
                                    <span>Price : </span>
                                </div>
                                <div className="d-flex justify-content-between px-1 px-lg-0 fw-bold">
                                    <div>
                                        <label htmlFor="">Items :</label>
                                        <span>3</span>
                                    </div>
                                    <div>
                                        <label htmlFor="">Total :</label>
                                        <span>&#8377; 3498</span>
                                    </div>
                                </div>
                            </div>
                            <div className="px-1 total-Price bg-light border-top border-dark py-2">
                                <div className="d-flex justify-content-between px-1 px-lg-0 fw-bold">
                                    <div className="text-dark">Platform Fee :</div>
                                    <div className="text-dark">
                                        &#8377;
                                        <span className="text-dark">20</span>
                                    </div>
                                </div>
                            </div>
                            <div className="px-1 total-Price bg-light border-top border-dark py-2">
                                <div className="d-flex justify-content-between px-1 px-lg-0 fw-bold">
                                    <div className="text-dark">Discount :</div>
                                    <div className="text-dark">
                                        &#8377;
                                        <span className="text-dark">0</span>
                                    </div>
                                </div>
                            </div>
                            <div className="px-1 total-Price border-top border-dark py-2">
                                <div className="d-flex justify-content-between px-1 px-lg-0 fw-bold">
                                    <div className="text-dark">Total :</div>
                                    <div className="text-dark">
                                        &#8377;
                                        <span className="text-dark">3518</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="my-2 border rounded bg-light p-3">
                        <button className="btn btn-dark bckBtn m-1">
                            <FontAwesomeIcon icon={faCircleXmark} className='me-2' />
                            Cancel Order
                        </button>

                        <button className="btn btn-dark bckBtn m-1" onClick={handlePrint}>
                            <FontAwesomeIcon icon={faPrint} className='me-2' />
                            Print
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ViewOrtder
