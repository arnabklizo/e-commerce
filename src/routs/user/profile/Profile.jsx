import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { checkMe, updateUser, getReviewsByUser, deleteReview } from '../../../services/api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfirmationModal from '../../../modals/confirmationModal/ConfirmationModal';
import { faUserPen, faPlus, faPencil, faTrash, faLeftLong, faStar, faUnlockKeyhole, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ReviewModal from '../../../modals/reviewModal/ReviewModal';
import { toast } from 'react-toastify';
import './profile.css';
import { Icon } from '../../../constans/icon';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const Profile = () => {
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        addresses: [],
    });
    const [createDate, setCreatedDate] = useState('');
    const [deleteAddresses, setDeleteAddresses] = useState([]); // Array of address IDs to delete
    const [isBtnVisible, setBtnVisible] = useState(false); // Button visibility state
    const [profilePicture, setProfilePicture] = useState(null); // Default picture
    const [previewImage, setPreviewImage] = useState(null); // State for image preview
    const [isReviewVisible, setReviewVisible] = useState(false); // for edit review modal
    const [isConfirmModalVisible, setConfirmModalVisible] = useState(false); //for confirmation Modal
    const [confirmationId, setConfirmationId] = useState(''); //for confirmation Modal
    const [loading, setLoading] = useState(true);
    const [selectedReview, setSelectedReview] = useState(null);
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();


    //fetch data
    const fetchData = async () => {
        setLoading(true);
        try {
            const userResponse = await checkMe();
            timeStamps(userResponse.data.createdAt);
            setProfile(userResponse.data);
            if (userResponse.data.imageUrl) {
                setProfilePicture(userResponse.data.imageUrl);
            } else {
                setProfilePicture(Icon.user);
            }
            const reviewResponse = await getReviewsByUser(userResponse.data._id);
            setReviews(reviewResponse.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
            console.error("Error fetching reviews:", error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, [navigate]);

    // frofile submitProfile 
    const submitProfile = async () => {
        try {
            if (previewImage) {
                setProfilePicture(previewImage); // Update the displayed profile picture
                setPreviewImage(null); // Clear the preview
            }

            const updatedProfile = { ...profile };
            updatedProfile.addresses = profile.addresses.map((address) => ({
                id: address._id || null,
                ...address,
            }));

            const response = await updateUser(profile._id, updatedProfile, profilePicture, deleteAddresses);
            setBtnVisible(false); // Hide the button after successful save
            toast.success(response.data.message);
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error('Error updating profile');
        }
    };

    const timeStamps = (date) => {
        const dates = new Date(date);

        // Get the formatted date using toLocaleDateString
        const formattedDatePart = dates.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        });

        // Get the formatted time using toLocaleTimeString (24-hour format)
        const formattedTimePart = dates.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false, // 24-hour time format
        });

        // Combine the formatted date and time
        const result = `${formattedDatePart}, ${formattedTimePart}`;
        setCreatedDate(result);
    };

    const deleteAddress = (index, id) => {
        setDeleteAddresses((prev) => [...prev, id]);
        setProfile((prev) => {
            const updatedAddresses = prev.addresses.filter((_, i) => i !== index);
            return { ...prev, addresses: updatedAddresses };
        });
        setBtnVisible(true); // Show the save button after deletion
    };

    // input change handler
    const handleInputChange = (field, value) => {
        setProfile((prev) => ({ ...prev, [field]: value }));
        setBtnVisible(true); // Show the button as soon as input is modified
    };

    //addresss change handler
    const handleAddressChange = (index, field, value) => {
        const updatedAddresses = [...profile.addresses];
        updatedAddresses[index][field] = value;
        setProfile({ ...profile, addresses: updatedAddresses });
        setBtnVisible(true); // Show the button as soon as input is modified
    };

    // for new address
    const addAddress = () => {
        setProfile((prev) => ({
            ...prev,
            addresses: [
                ...prev.addresses,
                {
                    id: "",
                    addressLine1: "",
                    street: "",
                    city: "",
                    state: "",
                    country: "",
                    zip: "",
                },
            ],
        }));
        setBtnVisible(true); // Show the button for new addresses
    };


    //delete review
    const deleteReviewById = async (id) => {
        try {
            const response = await deleteReview(id);
            toast.success(response.data.message);
            fetchData();
            setConfirmModalVisible(false);
        } catch (error) {
            console.error("Error deleting review:", error.response?.data?.message || error.message);
        }
    }


    //back 

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

    // image change handler
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file)); // Create a local preview
            setProfilePicture(file); // Store the actual file for submission
            setBtnVisible(true); // Enable the save button
        }
    };

    const FormatDate = (date) =>
        new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

    const closeConfirmModal = () => { setConfirmModalVisible(false) }//for confirmation Modal

    const deleteReviews = (id) => { //for confirmation Modal
        setConfirmModalVisible(true);
        setConfirmationId(id); // Store the product ID to delete
    };

    const handleEditClick = (review) => {
        setSelectedReview(review);
        setReviewVisible(true);
    };

    const closeModal = () => {
        setSelectedReview(null);
        setReviewVisible(false);
        fetchData();
    };

    return (
        <>
            <section className="profileSection mb-4">
                <div className="container">
                    <h1 className="text-center py-3 roboto sectHead text-capitalize text-dark">
                        My Profile
                    </h1>
                    <div className="row">
                        <div className="col-12 col-lg-6 p-3">
                            <div className="detProfBox rounded border">
                                <form onSubmit={(e) => { e.preventDefault(); submitProfile(); }}>
                                    <div className="profileDetails d-flex align-items-center justify-content-start mb-4 p-2">
                                        {loading ? <div className='profilePic rounded-circle overflow-hidden'><Skeleton className='h-100 w-100' /></div> :
                                            <div className="rounded position-relative">
                                                <img
                                                    src={previewImage || profilePicture}
                                                    alt="Profile"
                                                    className="profilePic border userPicture"
                                                />
                                                <label
                                                    className="btn btnProfPicEdit position-absolute border-0 rounded cursor-pointer"
                                                    htmlFor="userProfilePicture"
                                                    title="Change Profile Picture"
                                                >
                                                    <FontAwesomeIcon icon={faUserPen} />
                                                </label>
                                                <input
                                                    type="file"
                                                    id="userProfilePicture"
                                                    className="d-none"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                />

                                            </div>}
                                        {loading ? <div className="w-50"><Skeleton count={2} /></div>
                                            : <div className="ms-3">
                                                <div className="profname roboto fw-bold text-dark fs-3">
                                                    {profile.firstName ? profile.firstName : `User`} {profile.lastName}
                                                </div>
                                                <div className="registeredDate fw-bold text-dark">
                                                    Registration Date : <span>{createDate}</span>
                                                </div>
                                            </div>}
                                    </div>
                                    {loading ? <h1 className="my-2"><Skeleton count={10} /></h1> :
                                        <div className="profContact my-3 p-3">
                                            <h1 className="fs-4 fw-bold text-dark">Contact Details</h1>
                                            <hr />
                                            <div className="nameProf">
                                                <div className="text-dark">First Name</div>
                                                <input
                                                    type="text"
                                                    className="form-control mb-3"
                                                    value={profile.firstName}
                                                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                                                    placeholder='Enter your first name'
                                                />
                                            </div>
                                            <div className="nameProf">
                                                <div className="text-dark">Last Name</div>
                                                <input
                                                    type="text"
                                                    className="form-control mb-3"
                                                    value={profile.lastName}
                                                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                                                    placeholder='Enter your last name'
                                                />
                                            </div>
                                            <div className="nameProf">
                                                <div className="text-dark">Phone Number</div>
                                                <input
                                                    type="number"
                                                    className="form-control mb-3"
                                                    value={profile.phone}
                                                    onChange={(e) => handleInputChange("phone", e.target.value)}
                                                    placeholder='Enter your phone number'
                                                />
                                            </div>
                                            <div className="nameProf">
                                                <div className="text-dark">Email</div>
                                                <input
                                                    type="email"
                                                    className="form-control mb-3"
                                                    value={profile.email}
                                                    disabled
                                                />
                                            </div>
                                            <hr />
                                            <div className="accordion" id="accAddress">
                                                {profile.addresses.map((address, index) => (
                                                    <div className="accordion-item" key={index}>
                                                        {
                                                            <h2 className="accordion-header">
                                                                <button
                                                                    className="accordion-button collapsed p-2"
                                                                    type="button"
                                                                    data-bs-toggle="collapse"
                                                                    data-bs-target={`#collapse${index}`}
                                                                    aria-expanded="false"
                                                                    aria-controls={`collapse${index}`}
                                                                >
                                                                    Address {index + 1}
                                                                </button>
                                                            </h2>
                                                        }
                                                        <div
                                                            id={`collapse${index}`}
                                                            className="accordion-collapse collapse"
                                                            data-bs-parent="#accAddress"
                                                        >
                                                            <div className="accordion-body">
                                                                <div className="addressField">
                                                                    {['addressLine1', 'street', 'city', 'state', 'country', 'zip'].map((field) => (
                                                                        <div key={field} className="input-group my-1">
                                                                            <span className="input-group-text">{field.replace(/([A-Z])/g, ' $1')}</span>
                                                                            <input
                                                                                type={field == 'zip' ? `number` : `text`}
                                                                                className="form-control"
                                                                                value={address[field] || ""}
                                                                                onChange={(e) => handleAddressChange(index, field, e.target.value)}
                                                                                placeholder={`Enter your ${field}`}
                                                                                required
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                {
                                                                    <div className="d-flex align-items-center">
                                                                        <label htmlFor={`deleteAddress${index}`} className='ms-auto'>Delete Address {index + 1}</label>
                                                                        <button
                                                                            id={`deleteAddress${index}`}
                                                                            type="button"
                                                                            className="btn"
                                                                            onClick={() => deleteAddress(index, address._id)}
                                                                            title="Delete Address"
                                                                        >
                                                                            <FontAwesomeIcon icon={faTrash} />
                                                                        </button>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <button type="button" onClick={addAddress} className="btn btn-dark whiteIcon my-2">
                                                <FontAwesomeIcon icon={faPlus} className='me-1' />
                                                Add Address
                                            </button>
                                            <hr />
                                            {isBtnVisible && (
                                                <div className="text-center mt-2">
                                                    <button className="btn btn-dark updateDetails">
                                                        Save
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    }
                                </form>
                                {loading ? <h1 className="my-3"><Skeleton /></h1> :
                                    <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center my-2">
                                        <button className="btn whiteIcon btn-dark d-flex align-items-center justify-content-center m-1"
                                            onClick={() => navigate(-1)}>
                                            <FontAwesomeIcon icon={faLeftLong} className='me-2' />
                                            <span className="text-light fw-bold">Go back</span>
                                        </button>
                                        <a href='/reset' className="btn btn-dark whiteIcon m-1">
                                            <FontAwesomeIcon icon={faUnlockKeyhole} className='me-2' />
                                            Change password
                                        </a>
                                    </div>}
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 p-3">
                            <div className="detProfBox  rounded border">
                                {loading ? <h1 className="my-3"><Skeleton count={10} /></h1> :
                                    <div className="profContact profRightBox my-3 p-3">
                                        <h1 className="fs-4 fw-bold text-dark">Orders</h1>
                                        <div className="orderListBox">
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
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="detProfBox rounded border">
                                <div className="profContact profRightBox my-3 p-3">
                                    <h1 className="fs-4 fw-bold text-dark">Reviews</h1>
                                    <div className="revBoxData">
                                        {loading ? <>
                                            <SkeletonTheme baseColor="#fff" >
                                                <div className="reviewBox my-2 border rounded p-3 position-relative" >
                                                    <div className="prdctName prdctClr fw-bold fs-4 w-25"> <Skeleton /></div>

                                                    <div>
                                                        <p className="reviewText text-dark"> <Skeleton count={3} /></p>
                                                        <div className="reviewTime">&mdash; <span> <Skeleton className='w-25' /></span></div>
                                                    </div>
                                                </div>
                                            </SkeletonTheme>
                                        </> : <>
                                            {reviews.length === 0 ? <div className="text-center bg-transparent">No reviews found</div>
                                                : <>
                                                    {reviews.map((review, index) => (
                                                        <div className="reviewBox my-2 border rounded p-3 position-relative" key={index}>
                                                            <Link className="revPrdctDet d-flex pb-2 text-decoration-none" to={`/product/${review.productId._id}`}>
                                                                <div className="prdctImg card border">
                                                                    <img src={review.productId.imageUrl[0]} alt="" className="w-100" />
                                                                </div>
                                                                <div className="d-flex flex-column ms-3">
                                                                    <div className="prdctName prdctClr fw-bold fs-4">{review.productId.name}</div>
                                                                    <div className="reviewStars mt-2">
                                                                        {[...Array(review.rating)].map((_, i) => (
                                                                            <FontAwesomeIcon icon={faStar} key={i} />
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                            <div>
                                                                <p className="reviewText text-dark">{review.review}</p>
                                                                <div className="reviewTime">&mdash; <span>{FormatDate(review.createdAt)}</span></div>
                                                            </div>
                                                            <button
                                                                className="editRegisteredBtn rounded border position-absolute bottom-0 end-0 text-dark p-2 m-1"
                                                                onClick={() => handleEditClick(review)}
                                                            >
                                                                <FontAwesomeIcon icon={faPencil} className="me-2" />
                                                                Edit This Review
                                                            </button>
                                                            <button className="btn btn-sm btn-danger whiteIcon position-absolute top-0 end-0" onClick={() => deleteReviews(review._id)}>
                                                                <FontAwesomeIcon icon={faTrashCan} className="text-danger" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </>}
                                        </>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ReviewModal
                    isVisible={isReviewVisible}
                    onClose={closeModal}
                    reviewData={selectedReview}
                />
                <ConfirmationModal
                    isVisible={isConfirmModalVisible}
                    onClose={closeConfirmModal}
                    message={'Review'}
                    onConfirm={deleteReviewById}
                    categoryId={confirmationId}
                />
            </section>
        </>
    );
};

export default Profile;
