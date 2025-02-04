import React, { useState, useEffect } from 'react';
import { Tooltip } from 'bootstrap';
import { getCart, updateCart, removeFromCart } from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import './cart.css';
import Skeleton from 'react-loading-skeleton';
import ConfirmationModal from '../../../modals/confirmationModal/ConfirmationModal';


const Cart = ({ userId, profileData }) => {
    const navigate = useNavigate()
    const [selectedItems, setSelectedItems] = useState([]);
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [address, setAddress] = useState();
    const [isModalVisible, setModalVisible] = useState(false)
    const [removeModalVissible, setRemoveModalVissible] = useState(false);
    const [confirmationId, setConfirmationId] = useState(''); //for confirmation Modal

    const [deleteModalVissible, setDeleteModalVissible] = useState(false);
    // const [confirmationId, setConfirmationId] = useState(''); //for confirmation Modal


    useEffect(() => { if (userId) fetchCart(); }, [userId,])
    useEffect(() => {
        if (profileData.addresses.length > 0) {
            setAddress(profileData.addresses[0])
        }
    }, [])


    //fetch cart
    const fetchCart = async () => {
        try {
            setLoading(true);
            const { data } = await getCart(userId);
            setCart(data.cart)
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        } finally {
            setLoading(false);
        }
    }

    //update Cart
    const updateCarts = async (userId, productId, quantity) => {
        try {
            const response = await updateCart({
                userId,
                productId,
                quantity
            });
        } catch (error) {
            console.error('Error updating cart:', error);
        };
        fetchCart();
    }

    //remove from cart
    const removeItemFromCart = async (productId) => {
        try {
            const response = await removeFromCart({
                userId,
                productId
            });
            toast.success(response.data.message)
        } catch (error) {
            console.error('Error updating cart:', error);
        }
        fetchCart();
        toggleRemovelModal();
    }

    // remove selecteed Items 
    const removeSelectedItems = async () => {
        for (let productId of selectedItems) {
            await removeItemFromCart(productId);
        }
        setSelectedItems([]); // Clear selection after deletion
        toggleDeleteModal(false)
    };

    const handleQuantityChange = async (index, action) => {
        if (!cart) return;

        const updatedItems = [...cart.items];
        let newQuantity = updatedItems[index].quantity;

        if (action === "increment") {
            newQuantity += 1;
        } else {
            newQuantity = Math.max(1, newQuantity - 1);
        }

        updatedItems[index] = {
            ...updatedItems[index],
            quantity: newQuantity
        };
        setCart(prevCart => ({
            ...prevCart,
            items: updatedItems
        }));

        const productId = cart.items[index].productId._id;
        await updateCarts(userId, productId, newQuantity);
    };


    // back 
    // Tooltip initialization
    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipInstances = [...tooltipTriggerList].map((el) => new Tooltip(el));

        return () => {
            tooltipInstances.forEach((tooltip) => tooltip.dispose());
        };
    }, [navigate]);

    const handleSelectItem = (productId) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(productId)
                ? prevSelected.filter((id) => id !== productId)
                : [...prevSelected, productId]
        );
    };

    const addAddress = (index) => {
        if (profileData.addresses.length > 0) {
            setAddress(profileData.addresses[index])
        }
    }
    const toggleAddressModal = () => { setModalVisible(prev => !prev) }
    const toggleRemovelModal = () => { setRemoveModalVissible(false) }
    const toggleDeleteModal = () => { setDeleteModalVissible(false) }

    const removeCart = (id) => { //for confirmation Modal
        setRemoveModalVissible(true);
        setConfirmationId(id); // Store the product ID to delete
    };

    const deletCart = () => {
        setDeleteModalVissible(true)
        removeSelectedItems;
    }

    return (
        <section className="cartSection">
            <div className="container">
                <h1 className="text-center roboto sectHead text-capitalize text-dark pt-5 pageHeader my-2">
                    Checkout
                </h1>
                <div className="shoppingBag d-flex flex-column flex-lg-row justify-content-between rounded border p-3 pt-3">
                    <div>
                        <h1 className="roboto text-dark fs-3 py-2 border-bottom">Shopping Bag</h1>
                        <div className="text-dark">
                            <span className="fw-bold text-dark">{!loading ? cart.items.length : '0'}</span> Items in your bag
                        </div>
                    </div>
                    <div className="text-dark">
                        Expected Delivery : <span className="text-dark fw-bold">Monday, November 28, 2024</span>
                    </div>
                </div>
                <div className="tableOfCart my-3 rounded border p-3 position-relative">
                    <div>
                        <button
                            className={`delBtn fs-5 my-3 border-0 bg-transparent ${selectedItems.length > 1 ? 'visible' : 'invisible'}`}
                            onClick={() => deletCart()}>
                            <FontAwesomeIcon icon={faTrashCan} className='me-2' />
                            Delete Selected
                        </button>
                    </div>
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <div className="cartarea">
                                {loading ? <>
                                    <div
                                        className="productCartCard m-1 rounded border position-relative d-flex flex-column flex-sm-row overflow-hidden">
                                        <div className="cartDataImgPrdct p-0 m-0" ><Skeleton className='h-100' /></div>
                                        <div className="bodyOfCartCard p-2 w-50">
                                            <h1 className="roboto fs-4 text-dark"><Skeleton /></h1>
                                            <div className="py-2">
                                                <Skeleton count={2} />
                                            </div>
                                            <h1 className="roboto fs-4 text-dark"><Skeleton /></h1>
                                        </div>
                                    </div>
                                </> : <>
                                    {(!cart || cart.items.length === 0) ?
                                        <h2 className="text-center py-5">Your cart is empty</h2>
                                        : <>
                                            {cart.items.map((item, index) => (
                                                <div
                                                    className="productCartCard m-1 rounded border position-relative d-flex flex-column flex-sm-row overflow-hidden"
                                                    key={index}>
                                                    <img src={item.productId.imageUrl[0]} alt="" className="cartDataImgPrdct" />
                                                    <button type="button"
                                                        className="btn-close position-absolute top-0 end-0"
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="right"
                                                        data-bs-title="Remove"
                                                        onClick={() => removeCart(item.productId._id)}
                                                    ></button>
                                                    <label className="selectOrder position-absolute top-0 start-0">
                                                        <input name="dummy" type="checkbox" checked={selectedItems.includes(item.productId._id)}
                                                            onChange={() => handleSelectItem(item.productId._id)} />
                                                        <span
                                                            className="orderSpan"></span>
                                                    </label>
                                                    <div className="bodyOfCartCard p-2">
                                                        <h1 className="roboto fs-4 text-dark">{item.productId.name}</h1>
                                                        <div>Free Shipping</div>
                                                        <div className="py-1">
                                                            {item.productId.discountPrice > 0 ? (
                                                                <span>
                                                                    <span className="text-decoration-line-through hotcolor pe-1">
                                                                        &#8377;<span className="price fw-bold hotcolor">{item.productId.price} </span>/
                                                                    </span>
                                                                    <span className="priceDetails fs-4 fw-bold">&#8377; {item.productId.price - item.productId.discountPrice} /-</span>
                                                                </span>
                                                            ) : (
                                                                <span className="priceDetails fs-4 fw-bold">&#8377; {item.productId.price} /-</span>
                                                            )
                                                            }
                                                        </div>
                                                        <div className="py-2">
                                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-dark"
                                                                    onClick={() => handleQuantityChange(index, "decrement")}
                                                                >-</button>
                                                                <div
                                                                    className="productNumb d-flex align-items-center justify-content-center border border-dark">
                                                                    {item.quantity}
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-dark"
                                                                    onClick={() => handleQuantityChange(index, 'increment')}
                                                                >+</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    }
                                </>}

                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="osrderSumm border rounded bg-white p-2">
                                <h1 className="roboto fs-3 text-center text-dark">Order Summary</h1>
                                <div className="border-top p-2 ">

                                    <div className="d-flex justify-content-between fs-5">
                                        <span className="text-capitalize text-dark">Subtotal</span>
                                        <span className="priceOrderedCart text-dark fw-bold">
                                            {loading ? <Skeleton /> : <>
                                                &#8377; <span className="text-dark fw-bold"> {cart.totalPrice}</span>
                                            </>}
                                        </span>
                                    </div>

                                    <div className="d-flex justify-content-between fs-5">
                                        <span className="text-capitalize text-dark">Shipping</span>
                                        <span className="priceOrderedCart text-dark fw-bold">
                                            {loading ? <Skeleton /> : <>
                                                {(!cart || cart.items.length === 0) ? <>&#8377; 0</> : 'Free'}
                                            </>}
                                        </span>
                                    </div>

                                    <div className="d-flex justify-content-between fs-5">
                                        <span className="text-capitalize text-dark">Discount</span>
                                        <span className="priceOrderedCart text-dark fw-bold">
                                            {loading ? <Skeleton /> : <>
                                                &#8377; <span className="text-dark fw-bold">{cart.discount}</span>
                                            </>}
                                        </span>
                                    </div>

                                    <div className="d-flex mt-3 border-top py-1 border-dark justify-content-between fs-5">
                                        <span className="text-capitalize text-dark">Total</span>
                                        <span className="priceOrderedCart text-dark fw-bold">
                                            {loading ? <Skeleton /> : <>
                                                &#8377; <span className="text-dark fw-bold">{cart.totalPrice - cart.discount}</span>
                                            </>}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="addressBox border rounded bg-white p-2 my-2">
                                <h1 className="roboto fs-3 text-center text-dark">Shipping Address</h1>
                                <div className="border-top p-2">
                                    {loading ? <Skeleton count={3} /> : <>
                                        {profileData.addresses.length == 0 ? <>
                                            <div className="text-center py-3">Please Add address at your profile to place your order</div>
                                        </> : <>
                                            {profileData.addresses.length > 0 && (
                                                <div className="address" >
                                                    {address.addressLine1}, {address.street}, {address.state}, {address.city}, {address.country}, {address.zip}
                                                    <div className=" py-1">Phone No.: {profileData.phone}</div>
                                                </div>
                                            )}
                                        </>}
                                    </>}
                                </div>
                                <div className="text-center border-top">
                                    <button className={`btn-dark btn my-2 ${profileData.addresses.length < 2 ? 'd-none' : ''}`}
                                        onClick={toggleAddressModal}
                                    >
                                        Change Address</button>
                                </div>
                            </div>

                            <div className="my-2 py-2 text-center">
                                {loading ? <Skeleton /> :
                                    <button
                                        className="btn btn-dark"
                                        disabled={(!cart || cart.items.length === 0 || profileData.addresses.length < 1)}
                                    >
                                        Proceed to checkout
                                    </button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmationModal
                isVisible={removeModalVissible}
                onClose={toggleRemovelModal}
                categoryId={confirmationId}
                onConfirm={removeItemFromCart}
                message={'item from your cart'}
            />

            <ConfirmationModal
                isVisible={deleteModalVissible}
                onClose={toggleDeleteModal}
                onConfirm={removeSelectedItems}
                message={'items from your cart'}
            />
            {/* address modal  */}
            <div
                className={`modal fade ${isModalVisible ? "show" : ""}`}
                id="AddressModalBox"
                tabIndex="-1"
                aria-labelledby="addressModal"
                aria-hidden={!isModalVisible}
                style={{ display: isModalVisible ? "block" : "none" }}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-body-tertiary">
                            <h1 className="modal-title fs-5" id="addressModal">Your Address ({profileData.addresses.length})</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={toggleAddressModal}></button>
                        </div>
                        <div className="modal-body">
                            {profileData.addresses.length > 0 && profileData.addresses.map((address, index) => (
                                <div className="address border rounded my-3" key={index}>
                                    <div className="border-bottom bg-body-secondary position-relative">
                                        {/* Address {index + 1} */}
                                        <button className='btn p-2 border-0' onClick={() => addAddress(index)}>
                                            Select Address {index + 1}
                                        </button>
                                    </div>
                                    <div className="p-2">
                                        {address.addressLine1}, {address.street}, {address.state}, {address.city}, {address.country}, {address.zip}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="modal-footer bg-body-secondary">
                            You can add a new address at your profile page.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Cart
