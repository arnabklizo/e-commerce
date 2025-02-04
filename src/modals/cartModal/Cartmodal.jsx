import React, { useState, useEffect, useCallback } from "react";
import '../cartModal/cartModal.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { getCart, updateCart, removeFromCart } from "../../services/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';


const Cartmodal = ({ isVisible, onClose, userId }) => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        setLoading(true);
        try {
            const { data } = await getCart(userId);
            setCart(data.cart);
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }

    };

    //fetch data
    useEffect(() => {
        if (userId !== '') {
            fetchData();
        }
    }, [userId, isVisible]);

    // update cart
    const updateCarts = async (userId, productId, quantity) => {
        try {
            const response = await updateCart({
                userId,
                productId,
                quantity
            });
        } catch (error) {
            console.error('Error updating cart:', error);
        }
        fetchData();
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
        fetchData();
    }

    const handleQuantityChange = async (index, action) => {
        // Update the cart locally
        setCart(prevCart => {
            const updatedItems = [...prevCart.items];
            const item = updatedItems[index];
            if (action === 'increment') {
                item.quantity += 1;
            } else if (action === 'decrement' && item.quantity > 1) {
                item.quantity -= 1;
            }
            const productId = cart.items[index].productId._id;
            const quantity = cart.items[index].quantity;
            updateCarts(userId, productId, quantity);

            return { ...prevCart, items: updatedItems };
        });
    };

    // back 

    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);

    useEffect(() => {
        document.body.classList.toggle('overlayed', isVisible);
    }, [isVisible]);

    return (
        <div
            className={`offcanvas offcanvas-end ${isVisible ? "show" : ""}`}
            tabIndex="-1"
            id="shoppicartSlide"
            aria-labelledby="shoppicartSlideLabel"
        >
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="shoppicartSlideLabel">
                    Shopping Cart
                </h5>
                <button type="button" className="btn-close" onClick={handleClose}></button>
            </div>
            <div className="offcanvas-body">
                {/* Cart Items */}
                <div className="cartContext overflow-y-auto">
                    <ul className="list-unstyled">
                        {loading ? <>
                            {Array(4).fill(null).map((_, index) => (
                                <li className="cartList d-flex" >
                                    <div className="productCartImg p-0 overflow-hidden d-block  rounded">
                                        <Skeleton className="w-100 h-100" />
                                    </div>
                                    <div className="ps-3 productcartBoxs d-flex flex-column justify-content-between position-relative">
                                        <div className="productCategoryOnCart fw-bold pb-2">
                                            <Skeleton />
                                        </div>
                                        <div className="productNameOncart fw-bold text-dark pb-2">
                                            <Skeleton count={3} />
                                        </div>

                                    </div>
                                </li>
                            ))}
                        </> : <>
                            {cart.items.length == 0 ? <>
                                <div className="text-center">Your cart is empty..</div>
                            </> : <>
                                {cart.items.map((item, index) => (
                                    <li className="cartList d-flex" key={index}>
                                        <Link to={`/product/${item.productId._id}`} className="productCartImg overflow-hidden d-block border rounded" onClick={handleClose}>
                                            <img src={item.productId.imageUrl[0]} alt="" className="w-100" />
                                        </Link>
                                        <div className="ps-3 productcartBoxs d-flex flex-column justify-content-between position-relative">
                                            <div className="productCategoryOnCart fw-bold pb-2">
                                                {(item.productId.productFor).toUpperCase()}
                                            </div>
                                            <div className="productNameOncart fw-bold text-dark pb-2">
                                                {item.productId.name}
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <span className="priceBox text-dark">
                                                    &#8377;<span className="cartPrice text-dark">{item.quantity * (item.productId.price - item.productId.discountPrice)}</span>/-</span>
                                                <label htmlFor="qty d-flex">
                                                    <div className="btn-group me-2" role="group" aria-label="Second group">
                                                        <button type="button" className="btn btn-sm btn-dark" onClick={() => handleQuantityChange(index, 'decrement')}>-</button>
                                                        <div className="p-1 px-2 border border-dark">{item.quantity}</div>
                                                        <button type="button" className="btn btn-sm btn-dark" onClick={() => handleQuantityChange(index, 'increment')}>+</button>
                                                    </div>
                                                </label>
                                            </div>
                                            <button type="button" className="btn btn-sm cardDlt position-absolute fs-4 top-0 end-0" onClick={() => removeItemFromCart(item.productId._id)}>
                                                <FontAwesomeIcon icon={faTrashCan} />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </>}
                        </>}
                    </ul>
                </div>
                <div className="text-center mt-2">
                    {loading ? <Skeleton /> : <>
                        {cart.items.length > 0 &&
                            <Link className="btn rounded-0 btn-dark mx-auto" to={`/cart/${userId}`} onClick={onClose}>
                                Continue Shopping
                            </Link>
                        }
                    </>}
                </div>
            </div>
        </div>
    );
};

export default Cartmodal;
