import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Bestseller from '../../../components/sliders/bestSeller/Bestseller'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import { faCircleDot, faCartPlus, faHeart, faStar, faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { isUser, getProduct, getReviews } from '../../../services/api';
import './product.css';
import Loader from '../../../components/loader/Loader';
import parse from 'html-react-parser';


const ProductDetails = () => {
    const [users, setUsers] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [productItem, setProductItem] = useState('')
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();

    // Redirect if ID is missing
    useEffect(() => {
        if (!id) navigate(-1);
    }, [id, navigate]);

    // fetch products 
    const fetchProduct = async () => {
        setLoading(true);
        try {
            const response = await getProduct(id);
            setProductItem(response.data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
            toast.error('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    //fetch Reviews
    const fetchReviews = async () => {
        try {
            const response = await getReviews(id);
            setReviews(response.data);
        } catch (error) {
            console.error("Error fetching reviews:", error.response?.data?.message || error.message);
        }
    };

    // suerCheck 
    const userCheck = async () => {
        try {
            const response = await isUser();
            setUsers(response.data);
        } catch (error) {
            console.error("Error occurred:", error.message);
        }
    }

    // Fetch products from the backend
    useEffect(() => { fetchProduct(); fetchReviews(); userCheck() }, []);




    // back 


    const FormatDate = (date) => {
        const inputDate = new Date(date); // or use the input dynamically from props/state

        const formattedDate = inputDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        return { formattedDate };
    }

    const renderPrice = (product) => {
        return product.discountPrice > 0 ? (
            <>
                <span>
                    <span className="text-decoration-line-through hotcolor pe-1">
                        &#8377;<span className="price fw-bold hotcolor">{product.price}</span>/
                    </span>
                    <span className="priceDetails fs-4 fw-bold">&#8377; {product.price - product.discountPrice} /-</span>
                </span>
            </>
        ) : (
            <><span className="priceDetails fs-4 fw-bold">&#8377; {product.price} /-</span>/</>
        );
    };
    return (
        <>
            <section className="SingleProduct">

                {loading ? (
                    <div className="h-100 my-5 py-5">
                        <Loader itemName="Loading product" admin={false} />
                    </div>
                ) : (
                    <div className="container">
                        <div className="row py-5">
                            <div className="col-12 col-lg-6">
                                <div className="productSingleImg m-auto">
                                    {productItem.imageUrl.map((item) => (
                                        <div className="overflow-hidden" key={item}>
                                            <img src={item} alt="" className="w-100" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="col-12 col-lg-6">
                                <div className="singleDetailsBox pt-2">
                                    <div className="categoryNameBox text-uppercase">
                                        {productItem.productFor}
                                    </div>
                                    <h1 className="productHead text-capitalize text-dark fw-bold roboto">
                                        {productItem.name}
                                    </h1>
                                    <div className="text-dark mt-4 fw-bold">
                                        Description :
                                    </div>
                                    <div className="productDescription">
                                        {parse(productItem.description)}
                                    </div>
                                    <div className="productPrice mt-3">
                                        {renderPrice(productItem)}
                                        <span> &amp; Free Shipping.</span>
                                    </div>
                                    <div className="text-dark my-3 fw-bold">
                                        About the product
                                    </div>
                                    <ul className="list-unstyled">
                                        {productItem.productFeatures.map((product) => (
                                            <li key={product}>
                                                <span><FontAwesomeIcon icon={faCircleDot} className='me-1' /></span>
                                                <span>{product}</span>
                                            </li>
                                        ))}
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

                                        {users.isAuthenticated ? (
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
                                                            {[5, 4, 3, 2, 1].map((rating) => (
                                                                <input value={rating} name="value-radio" id={`value-${rating}`} key={rating} type="radio"
                                                                    className={`star s${rating}`} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <button className="btn btn-dark roboto">Submit review</button>
                                                </form>
                                            </div>
                                        ) : <></>}

                                        <div className="shwoRev mt-3">
                                            {reviews.map((review) => (
                                                <div className="reviewBox my-2 border rounded p-3 " key={review._id}>
                                                    {/* <div className="reviewer fw-bold text-dark fs-4">
                                                        Apple Orange
                                                    </div> */}
                                                    <div className="reviewTime">
                                                        {FormatDate(review.createdAt).formattedDate}
                                                    </div>
                                                    <div className="reviewStars mt-2">
                                                        {(Array.from({ length: review.rating }, (_, index) => index)).map((rating) => (
                                                            <FontAwesomeIcon icon={faStar} className='me-2' key={rating} />
                                                        ))}
                                                    </div>

                                                    <p className="reviewText text-dark">{review.review}</p>
                                                    <div className="text-end">
                                                        &mdash; {review.userId.firstName || "Anonymous"}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                }
            </section>
            <hr />
            <Bestseller />
            <div className="text-center mb-3">
                <button className="btn whiteIcon btn-dark d-flex align-items-center justify-content-center m-auto"
                    onClick={() => navigate(-1)}>
                    <FontAwesomeIcon icon={faLeftLong} className='me-2' />
                    <span className="text-light roboto">Go back</span>
                </button>
            </div>
        </>
    )
}

export default ProductDetails
