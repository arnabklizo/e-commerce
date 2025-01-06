import { logoutUser, logoutAdmin } from "../../services/api";
import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import NavbarModal from '../../modals/navbar/NavbarModal';
import Cartmodal from '../../modals/cartModal/Cartmodal';
import LoginModal from '../../modals/LoginModal/LoginModal';
import SignupModal from '../../modals/SignupModal/SignupModal';
import ForgotModal from '../../modals/forgotModal/ForgotModal';
import { Tooltip } from 'bootstrap';
import { useNavigate } from "react-router-dom";

const Navbar = ({ admin }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const token = Cookies.get("token");
        // console.log("Token from Cookies:", token); // Debugging statement
        setIsLoggedIn(!!token);
    }, []);

    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltips = Array.from(tooltipTriggerList).map(
            (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
        );
        return () => {
            tooltips.forEach((tooltip) => tooltip.dispose());
        };
    }, []);

    // Toggle cart visibility
    const [isCartVisible, setCartVisible] = useState(false);
    const toggleCart = () => {
        setCartVisible(!isCartVisible);
    };

    // Modals visibility state
    const [isLoginModalVisible, setLoginModalVisible] = useState(false);
    const toggleLoginModal = () => {
        setLoginModalVisible(!isLoginModalVisible);
    };

    const [isSignModalVisible, setSignModalVisible] = useState(false);
    const toggleSignupModal = () => {
        setSignModalVisible(!isSignModalVisible)
    }

    const [isForgotVisible, setForgot] = useState(false);
    const toggloForgotModal = () => {
        setForgot(!isForgotVisible)
    }

    // Disable body scroll when modals are visible
    useEffect(() => {
        if (isLoginModalVisible || isSignModalVisible || isForgotVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isLoginModalVisible || isSignModalVisible || isForgotVisible]);

    // Handle logout by removing token and updating the state
    const handleLogout = async () => {
        await logoutUser();  // Call API to log out
        Cookies.remove("token");
        setIsLoggedIn(false);
        toast.success("Successfully logged out!", { position: "top-center" });
        // console.log('logout');
        window.location.href = '/';  // Redirect to login page
    };




    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    return (
        <>
            <NavbarModal
                admin={admin}
                onCartToggle={toggleCart}
                onLoginToggle={toggleLoginModal}
                isLoggedIn={isLoggedIn}  // Pass logged-in state to NavbarModal
                onLogout={handleLogout}  // Pass logout handler to NavbarModal
            />
            <Cartmodal isVisible={isCartVisible} onClose={() => setCartVisible(false)} />
            <LoginModal
                onLoginSuccess={handleLoginSuccess}
                isVisible={isLoginModalVisible}
                onClose={toggleLoginModal}
                onSignToggle={toggleSignupModal}
                onForgotToggle={toggloForgotModal}
            />
            <SignupModal
                isVisible={isSignModalVisible}
                onClose={toggleSignupModal}
                onLoginToggle={toggleLoginModal}
                onLoginSuccess={handleLoginSuccess}

            />
            <ForgotModal isVisible={isForgotVisible} onClose={toggloForgotModal} />
            <ToastContainer
                position="top-center" // Position to top-center
                autoClose={3000} // Close after 3 seconds
                hideProgressBar={false} // Show progress bar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
};

export default Navbar;
