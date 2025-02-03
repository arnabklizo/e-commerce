import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Bestseller from '../../../components/sliders/bestSeller/Bestseller';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ConfirmationModal from '../../../modals/confirmationModal/ConfirmationModal';
import ReviewModal from '../../../modals/reviewModal/ReviewModal';
import { Tooltip } from "bootstrap";
import { faCircleDot, faCartPlus, faHeart, faStar, faLeftLong, faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';
import { getProduct, getReviews, addReview, deleteReview, addToCart } from '../../../services/api';
import './product.css';
import Loader from '../../../components/loader/Loader';
import parse from 'html-react-parser';



const ProductDetails = ({ userId }) => {
    const [quantity, setQuantity] = useState(1)
    const [isReviewVisible, setReviewVisible] = useState(false); // for edit review modal
    const [selectedReview, setSelectedReview] = useState(null); // for edit review modal
    const [isConfirmModalVisible, setConfirmModalVisible] = useState(false); //for confirmation Modal
    const [confirmationId, setConfirmationId] = useState(''); //for confirmation Modal
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(5);
    const [users, setUsers] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [productItem, setProductItem] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (!id) navigate(-1);
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltips = Array.from(tooltipTriggerList).map(el => new Tooltip(el));
        return () => tooltips.forEach(tooltip => tooltip.dispose());
    }, [id, navigate]);


    // initial fetch data
    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const [productResponse, reviewsResponse] = await Promise.all([
                getProduct(id),
                getReviews(id)
            ]);
            setProductItem(productResponse.data);
            setReviews(reviewsResponse.data);
            if (userId) {
                setUsers(true);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => { fetchInitialData(); }, [id, users]);

    //add to cart
    const addAtCart = async () => {
        try {
            const response = await addToCart({ userId: userId, productId: id, quantity });
            toast.success(response.data.message);
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    // submite review 
    const handleSubmitReview = async (e) => {
        e.preventDefault();
        console.log(reviewText);
        console.log(rating);
        try {
            const response = await addReview({
                productId: id,
                userId: userId,
                review: reviewText,
                rating,
            })

            setReviewText("");
            setRating(5);
            toast.success(response.data.message);
            fetchInitialData();
        } catch (error) {
            console.error("Error adding review:", error.response?.data?.message || error.message);
        }
    }

    //delete review
    const deleteReviewById = async (id) => {
        try {
            const response = await deleteReview(id);
            toast.success(response.data.message);
            fetchInitialData();
            setConfirmModalVisible(false);
        } catch (error) {
            console.error("Error deleting review:", error.response?.data?.message || error.message);
        }
    }

    // on click review edit button
    const handleEditClick = (review) => {
        setSelectedReview(review);
        setReviewVisible(true);
    };

    const closeModal = () => {
        setSelectedReview(null);
        setReviewVisible(false);
        fetchInitialData();
    };

    const closeConfirmModal = () => { setConfirmModalVisible(false) } //for confirmation Modal

    const deleteReviews = (id) => { //for confirmation Modal
        setConfirmModalVisible(true);
        setConfirmationId(id); // Store the product ID to delete
    };

    const FormatDate = (date) =>
        new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

    const renderPrice = ({ price, discountPrice }) =>
        discountPrice > 0 ? (
            <span>
                <span className="text-decoration-line-through hotcolor pe-1">
                    &#8377;<span className="price fw-bold hotcolor">{price}</span>/
                </span>
                <span className="priceDetails fs-4 fw-bold">&#8377; {price - discountPrice} /-</span>
            </span>
        ) : (
            <span className="priceDetails fs-4 fw-bold">&#8377; {price} /-</span>
        );

    if (loading) {
        return (
            <section className="py-5">
                <div className="h-100 my-5 py-5">
                    <Loader itemName="Loading product" admin={false} />
                </div>
            </section>
        );
    }

    return (
        <>
            <section className="SingleProduct">
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
                                <div className="text-dark mt-4 fw-bold">Description :</div>
                                <div className="productDescription">
                                    {parse(productItem.description)}
                                </div>
                                <div className="productPrice mt-3">
                                    {renderPrice(productItem)}
                                    <span> &amp; Free Shipping.</span>
                                </div>
                                <div className="text-dark my-3 fw-bold">About the product</div>
                                <ul className="list-unstyled">
                                    {productItem.productFeatures.map((feature) => (
                                        <li key={feature}>
                                            <FontAwesomeIcon icon={faCircleDot} className="me-1" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <hr />

                                <div className="text-center text-sm-start">
                                    <div className="btn-group my-1" role="group">
                                        <button type="button" className="btn btn-dark" onClick={() => quantity > 1 ? setQuantity(quantity - 1) : 1}>-</button>
                                        <div className="productNumb d-flex align-items-center justify-content-center border border-dark">
                                            {quantity}
                                        </div>
                                        <button type="button" className="btn btn-dark" onClick={() => setQuantity(quantity + 1)}>+</button>
                                    </div>
                                    <button className="btn btn-dark roboto whiteIcon ms-sm-3 my-1" onClick={addAtCart}>
                                        <FontAwesomeIcon icon={faCartPlus} className="me-1" />
                                        ADD TO CART
                                    </button>
                                    {users && (
                                        <button className="btn btn-dark roboto whiteIcon ms-3 ms-lg-0 ms-xl-3 my-1">
                                            <FontAwesomeIcon icon={faHeart} className="me-1" />
                                            ADD TO WISHLIST
                                        </button>
                                    )}
                                </div>

                                <hr />

                                <div className="categoryBox">
                                    Category: <span className="text-dark text-capitalized fw-bold">T-shirt</span>
                                </div>

                                <div className="reviewBox my-2 mt-4">
                                    {users && (
                                        <div className="leaveRev border rounded p-2">
                                            <div className="text-dark fw-bold fs-5 text-center mb-3">
                                                Leave a review for this product
                                            </div>
                                            <form onSubmit={handleSubmitReview}>
                                                <div className="form-floating mb-2">
                                                    <textarea
                                                        className="form-control revInp"
                                                        placeholder="Leave a comment here"
                                                        id="reviewBoxInp"
                                                        value={reviewText}
                                                        onChange={(e) => setReviewText(e.target.value)}
                                                    ></textarea>
                                                    <label htmlFor="reviewBoxInp">Comments</label>
                                                </div>
                                                <div className="ratingBox d-flex align-items-center fw-bold text-dark">
                                                    <span className="rt">Rate Us :</span>
                                                    <div className="ratingStars ms-2">
                                                        {[5, 4, 3, 2, 1].map((rate) => (
                                                            <input
                                                                value={rate}
                                                                name="value-radio"
                                                                id={`value-${rate}`}
                                                                key={rate}
                                                                type="radio"
                                                                className={`star s${rate}`}
                                                                onClick={() => setRating(rate)}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <button className="btn btn-dark roboto">Submit review</button>
                                            </form>
                                        </div>
                                    )}

                                    <div className="shwoRev mt-3">
                                        {reviews.map((review) => (
                                            <div className="reviewBox my-2 border rounded p-3 position-relative" key={review._id}>
                                                <div className="reviewTime">
                                                    {FormatDate(review.createdAt)}
                                                </div>
                                                <div className="reviewStars mt-2">
                                                    {Array.from({ length: review.rating }).map((_, index) => (
                                                        <FontAwesomeIcon icon={faStar} className="me-2" key={index} />
                                                    ))}
                                                </div>
                                                <p className="reviewText text-dark">{review.review}</p>
                                                <div className="text-end">
                                                    &mdash; {review.userId.firstName || "Anonymous"}
                                                </div>
                                                {review.userId._id === userId && (
                                                    <div className="d-flex text-center position-absolute top-0 end-0">
                                                        <button
                                                            data-bs-toggle="tooltip"
                                                            title="Edit review"
                                                            data-bs-placement="bottom"
                                                            className="btn btn-sm btn-dark whiteIcon me-2"
                                                            onClick={() => handleEditClick(review)}
                                                        >
                                                            <FontAwesomeIcon icon={faPencil} />
                                                        </button>
                                                        <button
                                                            data-bs-toggle="tooltip"
                                                            title="Delete review"
                                                            data-bs-placement="bottom"
                                                            className="btn btn-sm btn-danger whiteIcon"
                                                            onClick={() => deleteReviews(review._id)}
                                                        >
                                                            <FontAwesomeIcon icon={faTrashCan} className="text-danger" />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
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
                <button
                    className="btn whiteIcon btn-dark d-flex align-items-center justify-content-center m-auto"
                    onClick={() => navigate(-1)}
                >
                    <FontAwesomeIcon icon={faLeftLong} className="me-2" />
                    <span className="text-light roboto">Go back</span>
                </button>
            </div>
            <ConfirmationModal
                isVisible={isConfirmModalVisible}
                onClose={closeConfirmModal}
                message={'Review'}
                onConfirm={deleteReviewById}
                categoryId={confirmationId}
            />
            <ReviewModal
                isVisible={isReviewVisible}
                onClose={closeModal}
                reviewData={selectedReview}
            />
        </>
    );
};

export default ProductDetails;
