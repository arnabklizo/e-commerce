import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import ReviewModal from '../../../modals/reviewModal/ReviewModal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen, faPencil, faLeftLong, faStar, faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";

import './profile.css'

const Profile = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            navigate("/");
        }
    }, [navigate]);





    const [isBtnHide, setBtnHide] = useState(true);
    const [selectedReview, setSelectedReview] = useState(null);

    const goBack = () => {
        navigate(-1);
    };


    const btnToggler = () => {
        setBtnHide(false)
    }

    const [editStates, setEditStates] = useState({
        nameFirst: true,
        nameLast: true,
        email: true,
        phone: true,
    });

    const toggleEdit = (field) => {
        setBtnHide(false)
        setEditStates((prevState) => ({
            ...prevState,
            [field]: !prevState[field], // Toggle the state for the specific field
        }));
    };

    const [editAddress, setAddress] = useState(true);
    const addressToggler = () => {
        setBtnHide(false)
        setAddress(!editAddress)
    }


    const reviews = [
        {
            id: 1,
            product: 'Pink T-Shirt for Men',
            image: 'assets/images/products/product.jpg',
            rating: 4,
            comment: 'Great product, very comfortable!',
            date: 'January 19, 2024',
        },
        {
            id: 2,
            product: 'Blue Jeans',
            image: 'assets/images/products/product.jpg',
            rating: 5,
            comment: 'Perfect fit and quality.',
            date: 'February 5, 2024',
        },
        {
            id: 3,
            product: 'Yellow Hoodie',
            image: 'assets/images/products/product.jpg',
            rating: 4,
            comment: 'Great Product, Perfect fit and quality.',
            date: 'February 5, 2024',
        },
        // Add more reviews here...
    ];

    const [isReviewVisible, setReviewVisible] = useState(false);



    const handleEditClick = (review) => {
        setSelectedReview(review);
        setReviewVisible(true);
    };
    const closeModal = () => {
        setSelectedReview(null);
        setReviewVisible(false);
    };




    useEffect(() => {
        if (isReviewVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isReviewVisible]);
    return (

        <>
            <section className="profileSection mb-4">
                <div className="container">
                    <h1 className="text-center py-3 roboto sectHead text-capitalize text-dark">
                        My Profile
                    </h1>

                    <div className="row">
                        <div className="col-12 col-lg-6  p-3">
                            <div className="detProfBox rounded border">
                                {/* <!-- form starts for profile edit  --> */}
                                <form action="">
                                    <div className="profileDetails d-flex align-items-center justify-content-start mb-4 p-2">
                                        <div className="rounded position-relative">
                                            <img src="assets/images/products/profp.png" alt=""
                                                className="profilePic border userPicture" />
                                            <label className="btn btnProfPicEdit position-absolute border-0 rounded cursor-pointer"
                                                htmlFor="userprofilePicture" onClick={btnToggler}>
                                                <FontAwesomeIcon icon={faUserPen} />
                                            </label>
                                            <input type="file" id="userprofilePicture" className="d-none" />
                                        </div>


                                        <div className="ms-3">
                                            <div className="profname roboto fw-bold text-dark fs-3">Zerom Dotsure
                                            </div>
                                            <div className="registeredDate fw-bold text-dark">Registered : <span>Aug 17,2024</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="profContact my-3 p-3">
                                        <h1 className="fs-4 fw-bold text-dark">Contact Details</h1>

                                        <hr />
                                        <div className="nameProf">
                                            <div className="text-dark">First Name</div>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text prolfileDataInfo btn border" id="profileName" onClick={() => toggleEdit('nameFirst')}>
                                                    <FontAwesomeIcon icon={faPencil} />
                                                </span>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter Full Name"
                                                    aria-describedby="profileName"
                                                    value="Zerom"
                                                    disabled={editStates.nameFirst} />
                                            </div>
                                        </div>
                                        <div className="nameProf">
                                            <div className="text-dark">Full Name</div>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text prolfileDataInfo btn border" id="profileName" onClick={() => toggleEdit('nameLast')}>
                                                    <FontAwesomeIcon icon={faPencil} />
                                                </span>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter Full Name"
                                                    aria-describedby="profileName"
                                                    value="Dotsure"
                                                    disabled={editStates.nameLast} />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="nameProf">
                                            <div className="text-dark">Phone Number</div>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text prolfileDataInfo btn border" id="profileNumber" onClick={() => toggleEdit('phone')}>
                                                    <FontAwesomeIcon icon={faPencil} />
                                                </span>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter Mobile Number"
                                                    aria-describedby="profileNumber"
                                                    value="012345678"
                                                    disabled={editStates.phone}
                                                />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="nameProf">
                                            <div className="text-dark">Email</div>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text prolfileDataInfo btn border" id="profileEmail" onClick={() => toggleEdit('email')}>
                                                    <FontAwesomeIcon icon={faPencil} />
                                                </span>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter Email Address"
                                                    aria-describedby="profileEmail"
                                                    value="zerom.otsure@email.com"
                                                    disabled={editStates.email}
                                                />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="nameProf addressFieldBox position-relative">
                                            <div className="mb-3 text-dark">Address</div>
                                            <span className="editAddress rounded bg-transparent position-absolute end-0 top-0 cursor-pointer" onClick={addressToggler}>
                                                <FontAwesomeIcon icon={faPencil} />
                                            </span>
                                            <div className="input-group my-1">
                                                <span className="input-group-text" id="addressLine1">Address Line 1</span>
                                                <input type="text" className="form-control addressFieldsInpSect"
                                                    placeholder="Enter Address" aria-describedby="addressLine1" value="Area 43"
                                                    disabled={editAddress} />
                                            </div>
                                            <div className="input-group flex-nowrap my-1">
                                                <span className="input-group-text" id="street">Street</span>
                                                <input type="text" className="form-control addressFieldsInpSect"
                                                    placeholder="street" aria-describedby="street" value="Klizo's street"
                                                    disabled={editAddress} />
                                            </div>
                                            <div className="input-group flex-nowrap my-1">
                                                <span className="input-group-text" id="cities">City</span>
                                                <input type="text" className="form-control addressFieldsInpSect"
                                                    placeholder="cities" aria-describedby="cities" value="Klizo's cities"
                                                    disabled={editAddress} />
                                            </div>
                                            <div className="input-group my-1">
                                                <label className="input-group-text" htmlFor="stateAddress">State</label>
                                                <select className="form-select addressFieldsInpSect" defaultValue='' id="stateAddress" disabled={editAddress}>
                                                    <option value=''>Choose...</option>
                                                    <option value="1">Andhra Pradesh</option>
                                                    <option value="2">Kerala</option>
                                                    <option value="3">Goa</option>
                                                </select>
                                            </div>
                                            <div className="input-group my-1">
                                                <label className="input-group-text" htmlFor="addressCountry">Country</label>
                                                <select className="form-select addressFieldsInpSect" defaultValue='' id="addressCountry" disabled={editAddress}>
                                                    <option value=''>Choose...</option>
                                                    <option value="1">India</option>
                                                    <option value="2">Dubai</option>
                                                    <option value="3">Nepal</option>
                                                </select>
                                            </div>
                                            <div className="input-group flex-nowrap my-1">
                                                <span className="input-group-text" id="zip">Zip</span>
                                                <input type="text" className="form-control addressFieldsInpSect" placeholder="zip"
                                                    aria-describedby="zip" value="Klizo's zip" disabled={editAddress} />
                                            </div>
                                        </div>

                                        <script>

                                        </script>
                                        <hr />
                                        <div className="text-center mt-2">
                                            <button className={`btn btn-dark updateDetails ${isBtnHide ? 'd-none' : ''}`}>
                                                Update Details
                                            </button>
                                        </div>
                                    </div>

                                </form>
                                <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center my-2">
                                    <button className="btn goBackBtn btn-dark d-flex align-items-center justify-content-center m-1"
                                        onClick={goBack}>
                                        <FontAwesomeIcon icon={faLeftLong} className='me-2' />
                                        <span className="text-light fw-bold">Go back</span>
                                    </button>
                                    <a href='/reset' className="btn btn-dark whiteIcon m-1">
                                        <FontAwesomeIcon icon={faUnlockKeyhole} className='me-2' />
                                        Change password
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 p-3">
                            <div className="detProfBox  rounded border">
                                <div className="profContact profRightBox my-3 p-3">

                                    {/* <!-- orders  --> */}
                                    <h1 className="fs-4 fw-bold text-dark">Orders</h1>

                                    {/* <!-- order list box is here  --> */}
                                    <div className="orderListBox">
                                        {/* <!-- product list loop  --> */}

                                        <div className="rounded border my-2 p-3 ">
                                            <div className="prdctName prdctClr fw-bold fs-4 mb-3">
                                                Pink T-Shirt for Men
                                            </div>
                                            <div className="col-12 hh-grayBox">
                                                <div className="row justify-content-between">
                                                    <div className="order-tracking completed">
                                                        <span className="is-complete"></span>
                                                        <p>Ordered<br /><span>November 20, 2024</span></p>
                                                    </div>
                                                    <div className="order-tracking completed">
                                                        <span className="is-complete"></span>
                                                        <p>Shipped<br /><span>November 25, 2024</span></p>
                                                    </div>
                                                    <div className="order-tracking ">
                                                        <span className="is-complete"></span>
                                                        <p>Delivered<br /><span>October 20, 2024</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="d-flex align-items-center justify-content-between fw-bold">
                                                <div className="qtyPrdct text-dark">Quantity : <span className="prdctClr">3</span></div>
                                                <a href="/order" className="btn btn-dark">View details</a>
                                            </div>

                                        </div>

                                        <div className="rounded border my-2 p-3 ">
                                            <div className="prdctName prdctClr fw-bold fs-4 mb-3">
                                                Pink T-Shirt for Men
                                            </div>
                                            <div className="col-12 hh-grayBox">
                                                <div className="row justify-content-between">
                                                    <div className="order-tracking completed">
                                                        <span className="is-complete"></span>
                                                        <p>Ordered<br /><span>August 20, 2024</span></p>
                                                    </div>
                                                    <div className="order-tracking completed">
                                                        <span className="is-complete"></span>
                                                        <p>Shipped<br /><span>August 26, 2024</span></p>
                                                    </div>
                                                    <div className="order-tracking completed">
                                                        <span className="is-complete"></span>
                                                        <p>Delivered<br /><span>September 08, 2024</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="d-flex align-items-center justify-content-between fw-bold">
                                                <div className="qtyPrdct text-dark">Quantity : <span className="prdctClr">3</span></div>
                                                <a href="/order" className="btn btn-dark">View details</a>
                                            </div>

                                        </div>

                                        <div className="rounded border my-2 p-3 ">
                                            <div className="prdctName prdctClr fw-bold fs-4 mb-3">
                                                Pink T-Shirt for Men
                                            </div>
                                            <div className="col-12 hh-grayBox">
                                                <div className="row justify-content-between">
                                                    <div className="order-tracking completed">
                                                        <span className="is-complete"></span>
                                                        <p>Ordered<br /><span>January 19, 2024</span></p>
                                                    </div>
                                                    <div className="order-tracking completed">
                                                        <span className="is-complete"></span>
                                                        <p>Shipped<br /><span>January 20, 2024</span></p>
                                                    </div>
                                                    <div className="order-tracking completed">
                                                        <span className="is-complete"></span>
                                                        <p>Delivered<br /><span>February 03, 2024</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="d-flex align-items-center justify-content-between  fw-bold">
                                                <div className="qtyPrdct text-dark">Quantity : <span className="prdctClr">3</span></div>
                                                <a href="/order" className="btn btn-dark">View details</a>
                                            </div>

                                        </div>



                                    </div>
                                    {/* <!-- end order list box  --> */}

                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="detProfBox rounded border">
                                <div className="profContact profRightBox my-3 p-3">
                                    <h1 className="fs-4 fw-bold text-dark">Reviews</h1>
                                    <div className="revBoxData">
                                        {reviews.map((review) => (
                                            <div className="reviewBox my-2 border rounded p-3 position-relative" key={review.id}>
                                                <a className="revPrdctDet d-flex pb-2 text-decoration-none" href="#">
                                                    <div className="prdctImg">
                                                        <img src={review.image} alt="" className="w-100" />
                                                    </div>
                                                    <div className="prdctName prdctClr fw-bold fs-4 mb-3 ms-3">{review.product}</div>
                                                </a>
                                                <div>
                                                    <div className="reviewStars mt-2">
                                                        {[...Array(review.rating)].map((_, i) => (
                                                            <FontAwesomeIcon icon={faStar} key={i} />
                                                        ))}
                                                    </div>
                                                    <p className="reviewText text-dark">{review.comment}</p>
                                                    <div className="reviewTime">&mdash; <span>{review.date}</span></div>
                                                </div>
                                                <button
                                                    className="editRegisteredBtn rounded border position-absolute bottom-0 end-0 text-dark p-2 m-1"
                                                    onClick={() => handleEditClick(review)}
                                                // onClick={toggleReview}
                                                >
                                                    <FontAwesomeIcon icon={faPencil} className="me-2" />
                                                    Edit This Review
                                                </button>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ReviewModal
                isVisible={isReviewVisible}
                onClose={closeModal}
                reviewData={selectedReview}
            />
        </>
    )
}

export default Profile
