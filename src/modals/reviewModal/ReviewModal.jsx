import React, { useState } from 'react';
import '../reviewModal/reviewModal.css';
import { updateReview } from '../../services/api';
import { toast } from 'react-toastify';

const ReviewModal = ({ isVisible, onClose, reviewData }) => {
    if (!reviewData) return null;

    const [text, setText] = useState(reviewData.review);

    const handleSave = async (e) => {
        e.preventDefault();
        const updatedReview = {
            ...reviewData,
            review: text,
            rating: document.querySelector('input[name="value-radio"]:checked').value,
        };
        const response = await updateReview(updatedReview._id, updatedReview);
        if (response.status === 200) {
            toast.success(response.data.message);
            onClose();
        } else {
            toast.error('Failed to update review');
        }
    };





    const handleModalClose = (e) => {
        if (e.target.id === 'setUpReviewsEdit') {
            onClose();
        }
    };


    return (
        <>
            <div
                className={`modal fade ${isVisible ? 'show' : ''}`}
                id="setUpReviewsEdit"
                aria-hidden={!isVisible}
                aria-labelledby="setUpReviewsEditLabel"
                tabIndex="-1"
                style={{ display: isVisible ? "block" : "none" }}
                onClick={handleModalClose}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-dark" id="setUpReviewsEditLabel">Edit Review</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <h5 className="text-secondary fw-semibold">{reviewData.productId.name}</h5>
                            <form onSubmit={handleSave}>
                                <div className="form-floating mb-2">
                                    <textarea
                                        className="form-control revInp"
                                        placeholder="Leave a comment here"
                                        id="reviewBoxInp"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                    >
                                    </textarea>
                                    <label htmlFor="reviewBoxInp">Comments</label>
                                </div>
                                <div className="ratingBox d-flex align-items-center fw-bold text-dark">
                                    <span className="rt">Rate Us :</span>
                                    <div className="ratingStars ms-2">
                                        {[5, 4, 3, 2, 1].map((value) => (
                                            <input
                                                key={value}
                                                value={value}
                                                name="value-radio"
                                                type="radio"
                                                className={`star s${value}`}
                                                defaultChecked={reviewData.rating == value}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <button className="btn btn-dark">Change Review</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReviewModal
