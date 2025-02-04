import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong, faFilter, faHeart, faHandPointRight } from '@fortawesome/free-solid-svg-icons';
import './ShowProducts.css';
import { getProductsByCategory } from '../../../services/api';
import Loader from '../../../components/loader/Loader';
import { Link } from 'react-router-dom';
import { Tooltip } from "bootstrap";


const ShowProducts = () => {
    const [filter, setFilter] = useState()
    const [category, setCategory] = useState()
    const [productFor, setProductFor] = useState('')
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (!id) navigate(-1);
    }, [id, navigate]);


    // Fetch products by category
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await getProductsByCategory(id, productFor);

            setCategory(response.data.category);

            const fetchedProducts = response.data.products;
            setProducts(fetchedProducts);

            // Log unique productFor types
            if (filter === undefined) {
                const productForTypes = [...new Set(fetchedProducts.map(product => product.productFor))];
                setFilter(productForTypes);
            }

        } catch (error) {
            console.error('Failed to fetch categories :', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchProducts(); }, [id, productFor]);

    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl));
    }, [navigate]);

    const renderPrice = (product) => {
        return product.discountPrice > 0 ? (
            <>
                <span className="text-decoration-line-through discountClr hotcolor pe-3">
                    &#8377;<span className="price fw-bold hotcolor">{product.price}</span>/
                </span>
                &#8377;<span className="price fw-bold text-dark">
                    {product.price - product.discountPrice}
                </span>/-
            </>
        ) : (
            <>&#8377;<span className="price fw-bold text-dark">{product.price}</span>/</>
        );
    };

    return (
        <section className="showAllProducts">
            <div className="container">
                <div className="allProdctFiltSect d-flex py-2 justify-content-between align-items-center mb-5 border-bottom">
                    <div className='w-300'>
                        <button
                            className="btn goBackBtn whiteIcon roboto btn-dark d-flex align-items-center justify-content-center"
                            onClick={() => navigate(-1)}
                        >
                            <FontAwesomeIcon icon={faLeftLong} className="me-2" />
                            <span className="text-light roboto">Go back</span>
                        </button>
                    </div>

                    <h1 className="text-center roboto fs-4">{category ? category : 'All Products'}</h1>

                    <div className="filterBox d-flex align-items-center w-300 justify-content-end">
                        {filter && filter.length > 1 && <>
                            <label htmlFor="filterCategory" className="me-2 fw-bold">
                                <FontAwesomeIcon icon={faFilter} className="me-1" />
                                Short by:
                            </label>
                            <select
                                id="filterCategory"
                                className="form-select w-50"
                                aria-label="Default select example"
                                onChange={(e) => setProductFor(e.target.value)}
                            >
                                <option value="" defaultValue>
                                    All products
                                </option>
                                {filter.map((selector, index) => (
                                    <option value={selector} key={index}>{selector.toUpperCase()}</option>
                                ))}
                            </select>
                        </>}
                    </div>
                </div>

                <div className="products d-flex flex-wrap justify-content-center">
                    {loading ? (
                        <Loader itemName="Loading product" admin={false} />
                    ) : products.length == 0 ? (
                        <div className="py-5 text-center my-5">
                            No products available.
                        </div>
                    ) : (products.map((product) => (

                        <div key={product._id}
                            className={`card ${product.productFor === 'women'
                                ? 'onHot'
                                : product.discountPrice > 0
                                    ? 'onSale'
                                    : ''
                                }`}
                        >
                            <img
                                src={product.imageUrl[0]}
                                className="card-img-top"
                                alt={product.name}
                            />
                            <div className="cardPrice">
                                <span className="priceBox fw-bold text-dark">
                                    {renderPrice(product)}
                                </span>
                            </div>
                            <button
                                className="btn btn-wishlist"
                                data-bs-toggle="tooltip"
                                data-bs-placement="bottom"
                                data-bs-title="Add to wishlist"
                            >
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
                            <div className="card-header">
                                <h5 className="card-title">{product.name}</h5>
                            </div>
                            <div className="card-body">
                                <div className="card-text">
                                    {product.productFeatures.slice(0, 3).map((feature, index) => (
                                        <div className="pointKeysCard" key={index}>
                                            <FontAwesomeIcon icon={faHandPointRight} className="me-1" />
                                            <span className="keys">
                                                {index === 2 && product.productFeatures.length > 3 ? '...' : feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="text-center">
                                    <Link to={`/product/${product._id}`} className="btn btn-dark roboto">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>

                    )))}

                </div>
                {products.length > 4 &&
                    <div className="text-left my-3 pt-4 border-top">
                        <button
                            className="mt-3 btn goBackBtn whiteIcon roboto btn-dark d-flex align-items-center justify-content-center"
                            onClick={() => navigate(-1)}
                        >
                            <FontAwesomeIcon icon={faLeftLong} className="me-2" />
                            <span className="text-light roboto">Go back</span>
                        </button>
                    </div>
                }
            </div>
        </section>
    );
};

export default ShowProducts;
