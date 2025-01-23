import { logoutUser, logoutAdmin } from "../../services/api";
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import NavbarModal from '../../modals/navbar/NavbarModal';
import Cartmodal from '../../modals/cartModal/Cartmodal';
import LoginModal from '../../modals/LoginModal/LoginModal';
import SignupModal from '../../modals/SignupModal/SignupModal';
import ForgotModal from '../../modals/forgotModal/ForgotModal';
import { Tooltip } from 'bootstrap';
import { useNavigate } from "react-router-dom";

import { isUser, isAdmin } from "../../services/api";
const Navbar = ({ admin }) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false); //for user
    const [isAdminLogedIn, setAdminLogedIn] = useState(false); //for admin 

    //check user loged in
    const checkUserAuth = async () => {
        try {
            const response = await isUser();
            const { isAuthenticated } = await response.data;
            setIsLoggedIn(isAuthenticated);
        } catch (err) {
            setIsLoggedIn(false);
        }
    };

    //check admin logged in
    const checkAdminAuth = async () => {
        try {
            const response = await isAdmin();
            // console.log('response,', response)
            const { isAuthenticated } = await response.data;
            setAdminLogedIn(isAuthenticated);
        } catch (err) {
            setAdminLogedIn(false);
        }
    };

    //check user and admin logged in
    useEffect(() => {
        checkUserAuth();
        checkAdminAuth();
    }, [navigate]);

    //tooltip 
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

    // for login modal 
    const [isSignModalVisible, setSignModalVisible] = useState(false);
    const toggleSignupModal = () => {
        setSignModalVisible(!isSignModalVisible)
    }

    // for forgot password modal 
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
    const handleUserLogout = async () => {
        await logoutUser()
        toast.success("Logged out successfully");
        checkUserAuth();
        navigate("/");
    };

    // Handle admin logout
    const handleAdminLogout = async () => {
        try {
            const response = await logoutAdmin();
            checkAdminAuth();
            toast.success(response.message);
            navigate("/adminLogin");
        } catch (error) {
            toast.error("Logout failed. Please try again.");
            console.error("Logout error:", error);
        }
    };

    // Handle login success
    const handleLoginSuccess = () => (setIsLoggedIn(true));

    return (
        <>
            <NavbarModal
                admin={admin}
                onCartToggle={toggleCart}
                onLoginToggle={toggleLoginModal}
                isLoggedIn={isLoggedIn}  // Pass logged-in state to NavbarModal
                onUserLogout={handleUserLogout}  // Pass logout handler to NavbarModal
                isAdminLogedIn={isAdminLogedIn}
                onAdminLogout={handleAdminLogout}
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
