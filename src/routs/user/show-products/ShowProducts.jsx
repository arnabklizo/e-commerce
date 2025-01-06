import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong, faFilter, faHeart, faHandPointRight } from '@fortawesome/free-solid-svg-icons';
import { product } from '../../../constans/product';
import './ShowProducts.css';

const ShowProducts = () => {
    const navigate = useNavigate();

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
                                className="btn goBackBtn whiteIcon roboto btn-dark d-flex align-items-center justify-content-center m-auto m-sm-0"
                                onclick="history.back()">
                                <FontAwesomeIcon icon={faLeftLong} className='me-2' />
                                <span className="text-light roboto" onClick={goBack}>Go back</span>
                            </button>
                        </div>

                        <h1 className="text-center roboto fs-4 w-300">All Products</h1>

                        <div className="filterBox d-flex align-items-center justify-content-center justify-content-sm-end w-300">
                            <label for="filterCategory" className="me-2 fw-bold">
                                <FontAwesomeIcon icon={faFilter} className='me-1' />
                                Catagory :
                            </label>
                            <select id="filterCategory" className="form-select w-50" aria-label="Default select example">
                                <option value="all" selected>All products</option>
                                <option value="shirt">Shirt</option>
                                <option value="bag">Bag</option>
                                <option value="shoe">Shoe</option>
                            </select>
                        </div>

                    </div>


                    {/* <!-- all products will appear here  --> */}
                    <div className="products d-flex flex-wrap justify-content-center">

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
                            <button className="btn btn-wishlist" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                data-bs-title="Add to wishlist">
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
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
                                    <a href="/product" className="btn btn-dark roboto m-auto">View Details</a>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            {/* <!-- product image   --> */}
                            <img src={product.jogger} className="card-img-top" alt="" />

                            <div className="cardPrice">
                                <span className="priceBox fw-bold text-dark">
                                    &#8377;<span className="price fw-bold text-dark">549</span>/-
                                </span>
                            </div>
                            <button className="btn btn-wishlist" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                data-bs-title="Add to wishlist">
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
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
                                    <a href="/product" className="btn btn-dark roboto m-auto">View Details</a>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            {/* <!-- product image   --> */}
                            <img src={product.futuraLuxe} className="card-img-top" alt="" />

                            <div className="cardPrice">
                                <span className="priceBox fw-bold text-dark">
                                    &#8377;<span className="price fw-bold text-dark">2199</span>/-
                                </span>
                            </div>
                            <button className="btn btn-wishlist" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                data-bs-title="Add to wishlist">
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
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
                                    <a href="/product" className="btn btn-dark roboto m-auto">View Details</a>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            {/* <!-- product image   --> */}
                            <img src={product.scarf} className="card-img-top" alt="" />

                            <div className="cardPrice">
                                <span className="priceBox fw-bold text-dark">
                                    &#8377;<span className="price fw-bold text-dark">349</span>/-
                                </span>
                            </div>
                            <button className="btn btn-wishlist" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                data-bs-title="Add to wishlist">
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
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
                                    <a href="/product" className="btn btn-dark roboto m-auto">View Details</a>
                                </div>
                            </div>
                        </div>

                        <div className="card onHot">
                            {/* <!-- product image   --> */}
                            <img src={product.dress} className="card-img-top" alt="" />
                            <div className="cardPrice">
                                <span className="priceBox fw-bold text-dark">
                                    &#8377;<span className="price fw-bold text-dark">2499</span>/-
                                </span>
                            </div>
                            <button className="btn btn-wishlist" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                data-bs-title="Add to wishlist">
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
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
                                    <a href="/product" className="btn btn-dark roboto m-auto">View Details</a>
                                </div>
                            </div>
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
                            <button className="btn btn-wishlist" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                data-bs-title="Add to wishlist">
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
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
                                    <a href="/product" className="btn btn-dark roboto m-auto">View Details</a>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            {/* <!-- product image   --> */}
                            <img src={product.repelmiler} className="card-img-top" alt="" />
                            <div className="cardPrice">
                                <span className="priceBox fw-bold text-dark">
                                    &#8377;<span className="price fw-bold text-dark">1699</span>/-
                                </span>
                            </div>
                            <button className="btn btn-wishlist" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                data-bs-title="Add to wishlist">
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
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
                                    <a href="/product" className="btn btn-dark roboto m-auto">View Details</a>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            {/* <!-- product image   --> */}
                            <img src={product.glass} className="card-img-top" alt="" />
                            <div className="cardPrice">
                                <span className="priceBox fw-bold text-dark">
                                    &#8377;<span className="price fw-bold text-dark">2349</span>/-
                                </span>
                            </div>
                            <button className="btn btn-wishlist" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                data-bs-title="Add to wishlist">
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
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
                                    <a href="/product" className="btn btn-dark roboto m-auto">View Details</a>
                                </div>
                            </div>
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
                            <button className="btn btn-wishlist" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                data-bs-title="Add to wishlist">
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
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
                                    <a href="/product" className="btn btn-dark roboto m-auto">View Details</a>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            {/* <!-- product image   --> */}
                            <img src={product.jogger} className="card-img-top" alt="" />

                            <div className="cardPrice">
                                <span className="priceBox fw-bold text-dark">
                                    &#8377;<span className="price fw-bold text-dark">549</span>/-
                                </span>
                            </div>
                            <button className="btn btn-wishlist" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                data-bs-title="Add to wishlist">
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
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
                                    <a href="/product" className="btn btn-dark roboto m-auto">View Details</a>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            {/* <!-- product image   --> */}
                            <img src={product.futuraLuxe} className="card-img-top" alt="" />

                            <div className="cardPrice">
                                <span className="priceBox fw-bold text-dark">
                                    &#8377;<span className="price fw-bold text-dark">2199</span>/-
                                </span>
                            </div>
                            <button className="btn btn-wishlist" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                data-bs-title="Add to wishlist">
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
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
                                    <a href="/product" className="btn btn-dark roboto m-auto">View Details</a>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            {/* <!-- product image   --> */}
                            <img src={product.scarf} className="card-img-top" alt="" />

                            <div className="cardPrice">
                                <span className="priceBox fw-bold text-dark">
                                    &#8377;<span className="price fw-bold text-dark">349</span>/-
                                </span>
                            </div>
                            <button className="btn btn-wishlist" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                data-bs-title="Add to wishlist">
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
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
                                    <a href="/product" className="btn btn-dark roboto m-auto">View Details</a>
                                </div>
                            </div>
                        </div>

                        <div className="card onHot">
                            {/* <!-- product image   --> */}
                            <img src={product.dress} className="card-img-top" alt="" />
                            <div className="cardPrice">
                                <span className="priceBox fw-bold text-dark">
                                    &#8377;<span className="price fw-bold text-dark">2499</span>/-
                                </span>
                            </div>
                            <button className="btn btn-wishlist" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                data-bs-title="Add to wishlist">
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
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
                                    <a href="/product" className="btn btn-dark roboto m-auto">View Details</a>
                                </div>
                            </div>
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
                            <button className="btn btn-wishlist" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                data-bs-title="Add to wishlist">
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
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
                                    <a href="/product" className="btn btn-dark roboto m-auto">View Details</a>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="text-left my-3 pt-4 border-top">
                        <button
                            className="mt-3 btn goBackBtn whiteIcon roboto btn-dark d-flex align-items-center justify-content-center"
                            onclick="history.back()">
                            <FontAwesomeIcon icon={faLeftLong} className='me-2' />
                            <span className="text-light roboto" onClick={goBack}>Go back</span>
                        </button>
                    </div>

                </div>
            </section>
        </>
    )
}

export default ShowProducts
