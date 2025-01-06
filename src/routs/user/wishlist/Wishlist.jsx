import React, { useEffect } from 'react'
import { Tooltip } from 'bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong, faCartPlus, faShirt, faHandPointRight } from '@fortawesome/free-solid-svg-icons';
import { product } from '../../../constans/product';
import './wishlist.css'

const Wishlist = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = Cookies.get('token');
        console.log(token)
        if (!token) {
            navigate("/");
        }
    }, [navigate]);




    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltips = Array.from(tooltipTriggerList).map(
            (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
        );
        return () => {
            tooltips.forEach((tooltip) => tooltip.dispose());
        };
    }, []);




    const goBack = () => {
        navigate(-1);
    };
    return (
        <>
            <section className="showAllProducts">
                <div className="container">

                    <div className=" allProdctFiltSect d-flex py-2 justify-content-between align-items-center mb-5 border-bottom">
                        <div className="text-sm-left text-center my-2 w-300">
                            <button
                                className="btn whiteIcon btn-dark d-flex align-items-center justify-content-center m-auto m-sm-0"
                                onClick={goBack}>
                                <FontAwesomeIcon icon={faLeftLong} className='me-2' />
                                <span className="text-light fw-bold">Go back</span>
                            </button>
                        </div>

                        <h1 className="text-center roboto fs-4 w-300">WishList</h1>

                        <div className="filterBox d-flex align-items-center justify-content-center justify-content-sm-end w-300">

                        </div>

                    </div>


                    {/* <!-- all products will appear here  --> */}
                    <div className="products d-flex flex-wrap justify-content-center my-3">

                        <div className="card onSale">
                            {/* <!-- product image   --> */}

                            <img src={product.hoodie} className="card-img-top" alt="" />

                            <div className="cardPrice">
                                <span className="priceBox fw-bold text-dark">
                                    <span className="text-decoration-line-through hotcolor pe-3">
                                        &#8377;<span className="price fw-bold hotcolor">2599</span>/
                                    </span>
                                    &#8377;<span className="price fw-bold text-dark">1599</span>/-
                                </span>
                            </div>

                            <div className="card-header">
                                {/* <!-- product name  --> */}
                                <h5 className="card-title">Yellow Reserved Hoodie</h5>
                            </div>
                            <div className="card-body">
                                {/* <!-- key points  --> */}
                                <div className="card-text">
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">100% Cotton</span>
                                    </div>
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">Breathable Fabric</span>
                                    </div>
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">260gsm</span>
                                    </div>
                                </div>

                            </div>
                            <div className="card-footer">
                                <div className="text-center">
                                    <a href="cart.html" className="me-1 btn whiteIcon btn-dark m-auto">
                                        <FontAwesomeIcon icon={faCartPlus} className='me-1' />
                                        Add
                                    </a>
                                    <a href="product-details.html" className="btn whiteIcon btn-dark m-auto">
                                        <FontAwesomeIcon icon={faShirt} className='me-1' />
                                        View
                                    </a>
                                </div>
                            </div>
                            <button className="btn btn-close position-absolute top-0 end-0" data-bs-toggle="tooltip"
                                data-bs-placement="bottom" data-bs-title="Remove" title="Remove from cart"></button>
                        </div>

                        <div className="card">
                            {/* <!-- product image   --> */}
                            <img src={product.jogger} className="card-img-top" alt="" />

                            <div className="cardPrice">
                                <span className="priceBox fw-bold text-dark">
                                    &#8377;<span className="price fw-bold text-dark">549</span>/-
                                </span>
                            </div>
                            <div className="card-header">
                                {/* <!-- product name  --> */}
                                <h5 className="card-title">Adicolor Classics Joggers</h5>
                            </div>
                            <div className="card-body">
                                {/* <!-- key points  --> */}
                                <div className="card-text">
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">100% Cotton</span>
                                    </div>
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">Breathable Fabric</span>
                                    </div>
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">260gsm</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="text-center">
                                    <a href="cart.html" className="me-1 btn whiteIcon btn-dark m-auto">
                                        <FontAwesomeIcon icon={faCartPlus} className='me-1' />
                                        Add
                                    </a>
                                    <a href="product-details.html" className="btn whiteIcon btn-dark m-auto">
                                        <FontAwesomeIcon icon={faShirt} className='me-1' />
                                        View
                                    </a>
                                </div>
                            </div>
                            <button className="btn btn-close position-absolute top-0 end-0" data-bs-toggle="tooltip"
                                data-bs-placement="bottom" data-bs-title="Remove" title="Remove from cart"></button>
                        </div>

                        <div className="card">
                            {/* <!-- product image   --> */}
                            <img src={product.futuraLuxe} className="card-img-top" alt="" />

                            <div className="cardPrice">
                                <span className="priceBox fw-bold text-dark">
                                    &#8377;<span className="price fw-bold text-dark">2199</span>/-
                                </span>
                            </div>
                            <div className="card-header">
                                {/* <!-- product name  --> */}
                                <h5 className="card-title">Nike Sportswear Futura Luxe</h5>

                            </div>

                            <div className="card-body">
                                {/* <!-- key points  --> */}
                                <div className="card-text">
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">100% Cotton</span>
                                    </div>
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">Breathable Fabric</span>
                                    </div>
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">260gsm</span>
                                    </div>
                                </div>
                            </div>

                            <div className="card-footer">
                                <div className="text-center">
                                    <a href="cart.html" className="me-1 btn whiteIcon btn-dark m-auto">
                                        <FontAwesomeIcon icon={faCartPlus} className='me-1' />
                                        Add
                                    </a>
                                    <a href="product-details.html" className="btn whiteIcon btn-dark m-auto">
                                        <FontAwesomeIcon icon={faShirt} className='me-1' />
                                        View
                                    </a>
                                </div>
                            </div>
                            <button className="btn btn-close position-absolute top-0 end-0" data-bs-toggle="tooltip"
                                data-bs-placement="bottom" data-bs-title="Remove" title="Remove from cart"></button>
                        </div>

                        <div className="card">
                            {/* <!-- product image   --> */}
                            <img src={product.scarf} className="card-img-top" alt="" />

                            <div className="cardPrice">
                                <span className="priceBox fw-bold text-dark">
                                    &#8377;<span className="price fw-bold text-dark">349</span>/-
                                </span>
                            </div>
                            <div className="card-header">
                                {/* <!-- product name  --> */}
                                <h5 className="card-title">Geometric print Scarf</h5>

                            </div>

                            <div className="card-body">
                                {/* <!-- key points  --> */}
                                <div className="card-text">
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">100% Cotton</span>
                                    </div>
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">Breathable Fabric</span>
                                    </div>
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">260gsm</span>
                                    </div>
                                </div>
                            </div>

                            <div className="card-footer">
                                <div className="text-center">
                                    <a href="cart.html" className="me-1 btn whiteIcon btn-dark m-auto">
                                        <FontAwesomeIcon icon={faCartPlus} className='me-1' />
                                        Add
                                    </a>
                                    <a href="product-details.html" className="btn whiteIcon btn-dark m-auto">
                                        <FontAwesomeIcon icon={faShirt} className='me-1' />
                                        View
                                    </a>
                                </div>
                            </div>
                            <button className="btn btn-close position-absolute top-0 end-0" data-bs-toggle="tooltip"
                                data-bs-placement="bottom" data-bs-title="Remove" title="Remove from cart"></button>
                        </div>

                        <div className="card onHot">
                            {/* <!-- product image   --> */}
                            <img src={product.dress} className="card-img-top" alt="" />
                            <div className="cardPrice">
                                <span className="priceBox fw-bold text-dark">
                                    &#8377;<span className="price fw-bold text-dark">2499</span>/-
                                </span>
                            </div>
                            <div className="card-header">
                                {/* <!-- product name  --> */}
                                <h5 className="card-title">Basic Dress Green</h5>

                            </div>
                            <div className="card-body">
                                {/* <!-- key points  --> */}
                                <div className="card-text">
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">100% Cotton</span>
                                    </div>
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">Breathable Fabric</span>
                                    </div>
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">260gsm</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="text-center">
                                    <a href="cart.html" className="me-1 btn whiteIcon btn-dark m-auto">
                                        <FontAwesomeIcon icon={faCartPlus} className='me-1' />
                                        Add
                                    </a>
                                    <a href="product-details.html" className="btn whiteIcon btn-dark m-auto">
                                        <FontAwesomeIcon icon={faShirt} className='me-1' />
                                        View
                                    </a>
                                </div>
                            </div>
                            <button className="btn btn-close position-absolute top-0 end-0" data-bs-toggle="tooltip"
                                data-bs-placement="bottom" data-bs-title="Remove" title="Remove from cart"></button>
                        </div>

                        <div className="card onSale">
                            {/* <!-- product image   --> */}
                            <img src={product.airZoom} className="card-img-top" alt="" />
                            <div className="cardPrice">
                                <span className="priceBox fw-bold text-dark">
                                    <span className="text-decoration-line-through hotcolor pe-3">
                                        &#8377;<span className="price fw-bold hotcolor">2999</span>/
                                    </span>
                                    &#8377;<span className="price fw-bold text-dark">1989</span>/-
                                </span>
                            </div>
                            <div className="card-header">
                                {/* <!-- product name  --> */}
                                <h5 className="card-title">Nike Air Zoom Pegasus</h5>

                            </div>
                            <div className="card-body">
                                {/* <!-- key points  --> */}
                                <div className="card-text">
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">100% Cotton</span>
                                    </div>
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">Breathable Fabric</span>
                                    </div>
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">260gsm</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="text-center">
                                    <a href="cart.html" className="me-1 btn whiteIcon btn-dark m-auto">
                                        <FontAwesomeIcon icon={faCartPlus} className='me-1' />
                                        Add
                                    </a>
                                    <a href="product-details.html" className="btn whiteIcon btn-dark m-auto">
                                        <FontAwesomeIcon icon={faShirt} className='me-1' />
                                        View
                                    </a>
                                </div>
                            </div>
                            <button className="btn btn-close position-absolute top-0 end-0" data-bs-toggle="tooltip"
                                data-bs-placement="bottom" data-bs-title="Remove" title="Remove from cart"></button>
                        </div>

                        <div className="card">
                            {/* <!-- product image   --> */}
                            <img src="assets/images/products/repelmiler.jpg" className="card-img-top" alt="" />
                            <div className="cardPrice">
                                <span className="priceBox fw-bold text-dark">
                                    &#8377;<span className="price fw-bold text-dark">1699</span>/-
                                </span>
                            </div>
                            <div className="card-header">
                                {/* <!-- product name  --> */}
                                <h5 className="card-title">Nike Repel Miler</h5>
                            </div>
                            <div className="card-body">
                                {/* <!-- key points  --> */}
                                <div className="card-text">
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">100% Cotton</span>
                                    </div>
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">Breathable Fabric</span>
                                    </div>
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">260gsm</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="text-center">
                                    <a href="cart.html" className="me-1 btn whiteIcon btn-dark m-auto">
                                        <FontAwesomeIcon icon={faCartPlus} className='me-1' />
                                        Add
                                    </a>
                                    <a href="product-details.html" className="btn whiteIcon btn-dark m-auto">
                                        <FontAwesomeIcon icon={faShirt} className='me-1' />
                                        View
                                    </a>
                                </div>
                            </div>
                            <button className="btn btn-close position-absolute top-0 end-0" data-bs-toggle="tooltip"
                                data-bs-placement="bottom" data-bs-title="Remove" title="Remove from cart"></button>
                        </div>

                        <div className="card">
                            {/* <!-- product image   --> */}
                            <img src={product.glass} className="card-img-top" alt="" />
                            <div className="cardPrice">
                                <span className="priceBox fw-bold text-dark">
                                    &#8377;<span className="price fw-bold text-dark">2349</span>/-
                                </span>
                            </div>
                            <div className="card-header">
                                {/* <!-- product name  --> */}
                                <h5 className="card-title">Buffet vision</h5>
                            </div>
                            <div className="card-body">

                                {/* <!-- key points  --> */}
                                <div className="card-text">
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">100% Cotton</span>
                                    </div>
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">Breathable Fabric</span>
                                    </div>
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">260gsm</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="text-center">
                                    <a href="cart.html" className="me-1 btn whiteIcon btn-dark m-auto">
                                        <FontAwesomeIcon icon={faCartPlus} className='me-1' />
                                        Add
                                    </a>
                                    <a href="product-details.html" className="btn whiteIcon btn-dark m-auto">
                                        <FontAwesomeIcon icon={faShirt} className='me-1' />
                                        View
                                    </a>
                                </div>
                            </div>
                            <button className="btn btn-close position-absolute top-0 end-0" data-bs-toggle="tooltip"
                                data-bs-placement="bottom" data-bs-title="Remove" title="Remove from cart"></button>
                        </div>


                        <div className="card onSale">
                            {/* <!-- product image   --> */}
                            <img src={product.hoodie} className="card-img-top" alt="" />

                            <div className="cardPrice">
                                <span className="priceBox fw-bold text-dark">
                                    <span className="text-decoration-line-through hotcolor pe-3">
                                        &#8377;<span className="price fw-bold hotcolor">2599</span>/
                                    </span>
                                    &#8377;<span className="price fw-bold text-dark">1599</span>/-
                                </span>
                            </div>
                            <div className="card-header">
                                {/* <!-- product name  --> */}
                                <h5 className="card-title">Yellow Reserved Hoodie</h5>
                            </div>
                            <div className="card-body">
                                {/* <!-- key points  --> */}
                                <div className="card-text">
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">100% Cotton</span>
                                    </div>
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">Breathable Fabric</span>
                                    </div>
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">260gsm</span>
                                    </div>
                                </div>

                            </div>
                            <div className="card-footer">
                                <div className="text-center">
                                    <a href="cart.html" className="me-1 btn whiteIcon btn-dark m-auto">
                                        <FontAwesomeIcon icon={faCartPlus} className='me-1' />
                                        Add
                                    </a>
                                    <a href="product-details.html" className="btn whiteIcon btn-dark m-auto">
                                        <FontAwesomeIcon icon={faShirt} className='me-1' />
                                        View
                                    </a>
                                </div>
                            </div>
                            <button className="btn btn-close position-absolute top-0 end-0" data-bs-toggle="tooltip"
                                data-bs-placement="bottom" data-bs-title="Remove" title="Remove from cart"></button>
                        </div>

                        <div className="card">
                            {/* <!-- product image   --> */}
                            <img src={product.jogger} className="card-img-top" alt="" />

                            <div className="cardPrice">
                                <span className="priceBox fw-bold text-dark">
                                    &#8377;<span className="price fw-bold text-dark">549</span>/-
                                </span>
                            </div>
                            <div className="card-header">
                                {/* <!-- product name  --> */}
                                <h5 className="card-title">Adicolor Classics Joggers</h5>
                            </div>
                            <div className="card-body">
                                {/* <!-- key points  --> */}
                                <div className="card-text">
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">100% Cotton</span>
                                    </div>
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">Breathable Fabric</span>
                                    </div>
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">260gsm</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="text-center">
                                    <a href="cart.html" className="me-1 btn whiteIcon btn-dark m-auto">
                                        <FontAwesomeIcon icon={faCartPlus} className='me-1' />
                                        Add
                                    </a>
                                    <a href="product-details.html" className="btn whiteIcon btn-dark m-auto">
                                        <FontAwesomeIcon icon={faShirt} className='me-1' />
                                        View
                                    </a>
                                </div>
                            </div>
                            <button className="btn btn-close position-absolute top-0 end-0" data-bs-toggle="tooltip"
                                data-bs-placement="bottom" data-bs-title="Remove" title="Remove from cart"></button>
                        </div>

                        <div className="card">
                            {/* <!-- product image   --> */}
                            <img src={product.futuraLuxe} className="card-img-top" alt="" />

                            <div className="cardPrice">
                                <span className="priceBox fw-bold text-dark">
                                    &#8377;<span className="price fw-bold text-dark">2199</span>/-
                                </span>
                            </div>
                            <div className="card-header">
                                {/* <!-- product name  --> */}
                                <h5 className="card-title">Nike Sportswear Futura Luxe</h5>

                            </div>

                            <div className="card-body">
                                {/* <!-- key points  --> */}
                                <div className="card-text">
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">100% Cotton</span>
                                    </div>
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">Breathable Fabric</span>
                                    </div>
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">260gsm</span>
                                    </div>
                                </div>
                            </div>

                            <div className="card-footer">
                                <div className="text-center">
                                    <a href="cart.html" className="me-1 btn whiteIcon btn-dark m-auto">
                                        <FontAwesomeIcon icon={faCartPlus} className='me-1' />
                                        Add
                                    </a>
                                    <a href="product-details.html" className="btn whiteIcon btn-dark m-auto">
                                        <FontAwesomeIcon icon={faShirt} className='me-1' />
                                        View
                                    </a>
                                </div>
                            </div>
                            <button className="btn btn-close position-absolute top-0 end-0" data-bs-toggle="tooltip"
                                data-bs-placement="bottom" data-bs-title="Remove" title="Remove from cart"></button>
                        </div>

                        <div className="card">
                            {/* <!-- product image   --> */}
                            <img src={product.scarf} className="card-img-top" alt="" />

                            <div className="cardPrice">
                                <span className="priceBox fw-bold text-dark">
                                    &#8377;<span className="price fw-bold text-dark">349</span>/-
                                </span>
                            </div>
                            <div className="card-header">
                                {/* <!-- product name  --> */}
                                <h5 className="card-title">Geometric print Scarf</h5>

                            </div>

                            <div className="card-body">
                                {/* <!-- key points  --> */}
                                <div className="card-text">
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">100% Cotton</span>
                                    </div>
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">Breathable Fabric</span>
                                    </div>
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">260gsm</span>
                                    </div>
                                </div>
                            </div>

                            <div className="card-footer">
                                <div className="text-center">
                                    <a href="cart.html" className="me-1 btn whiteIcon btn-dark m-auto">
                                        <FontAwesomeIcon icon={faCartPlus} className='me-1' />
                                        Add
                                    </a>
                                    <a href="product-details.html" className="btn whiteIcon btn-dark m-auto">
                                        <FontAwesomeIcon icon={faShirt} className='me-1' />
                                        View
                                    </a>
                                </div>
                            </div>
                            <button className="btn btn-close position-absolute top-0 end-0" data-bs-toggle="tooltip"
                                data-bs-placement="bottom" data-bs-title="Remove" title="Remove from cart"></button>
                        </div>

                        <div className="card onHot">
                            {/* <!-- product image   --> */}
                            <img src={product.dress} className="card-img-top" alt="" />
                            <div className="cardPrice">
                                <span className="priceBox fw-bold text-dark">
                                    &#8377;<span className="price fw-bold text-dark">2499</span>/-
                                </span>
                            </div>
                            <div className="card-header">
                                {/* <!-- product name  --> */}
                                <h5 className="card-title">Basic Dress Green</h5>

                            </div>
                            <div className="card-body">
                                {/* <!-- key points  --> */}
                                <div className="card-text">
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">100% Cotton</span>
                                    </div>
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">Breathable Fabric</span>
                                    </div>
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">260gsm</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="text-center">
                                    <a href="cart.html" className="me-1 btn whiteIcon btn-dark m-auto">
                                        <FontAwesomeIcon icon={faCartPlus} className='me-1' />
                                        Add
                                    </a>
                                    <a href="product-details.html" className="btn whiteIcon btn-dark m-auto">
                                        <FontAwesomeIcon icon={faShirt} className='me-1' />
                                        View
                                    </a>
                                </div>
                            </div>
                            <button className="btn btn-close position-absolute top-0 end-0" data-bs-toggle="tooltip"
                                data-bs-placement="bottom" data-bs-title="Remove" title="Remove from cart"></button>
                        </div>

                        <div className="card onSale">
                            {/* <!-- product image   --> */}
                            <img src={product.airZoom} className="card-img-top" alt="" />
                            <div className="cardPrice">
                                <span className="priceBox fw-bold text-dark">
                                    <span className="text-decoration-line-through hotcolor pe-3">
                                        &#8377;<span className="price fw-bold hotcolor">2999</span>/
                                    </span>
                                    &#8377;<span className="price fw-bold text-dark">1989</span>/-
                                </span>
                            </div>
                            <div className="card-header">
                                {/* <!-- product name  --> */}
                                <h5 className="card-title">Nike Air Zoom Pegasus</h5>

                            </div>
                            <div className="card-body">
                                {/* <!-- key points  --> */}
                                <div className="card-text">
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">100% Cotton</span>
                                    </div>
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">Breathable Fabric</span>
                                    </div>
                                    <div className="pointKeysCard">
                                        <span><FontAwesomeIcon icon={faHandPointRight} className='me-1' /></span>
                                        <span className="keys">260gsm</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="text-center">
                                    <a href="cart.html" className="me-1 btn whiteIcon btn-dark m-auto">
                                        <FontAwesomeIcon icon={faCartPlus} className='me-1' />
                                        Add
                                    </a>
                                    <a href="product-details.html" className="btn whiteIcon btn-dark m-auto">
                                        <FontAwesomeIcon icon={faShirt} className='me-1' />
                                        View
                                    </a>
                                </div>
                            </div>
                            <button className="btn btn-close position-absolute top-0 end-0" data-bs-toggle="tooltip"
                                data-bs-placement="bottom" data-bs-title="Remove" title="Remove from cart"></button>
                        </div>


                    </div>



                </div>
            </section>
        </>
    )
}

export default Wishlist
