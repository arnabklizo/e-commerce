import React, { useState } from 'react';
import '../reviewModal/reviewModal.css'
const ReviewModal = ({ isVisible, onClose, reviewData }) => {
    if (!reviewData) return null;

    const [text, setText] = useState(reviewData.comment);

    const changeText = (e) => {
        setText(e.target.value)
    }
    return (
        <>
            <div className={`modal fade ${isVisible ? 'show' : ''}`} id="setUpReviewsEdit" aria-hidden={!isVisible} aria-labelledby="setUpReviewsEditLabel" tabIndex="-1"
                style={{ display: isVisible ? "block" : "none" }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-dark" id="setUpReviewsEditLabel">Edit Review</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            {console.log(reviewData)}
                            <form>
                                <div className="form-floating mb-2">
                                    <textarea className="form-control revInp" placeholder="Leave a comment here" id="reviewBoxInp" value={text} onChange={changeText}></textarea>
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
