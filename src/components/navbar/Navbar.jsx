import { logoutUser, logoutAdmin } from "../../services/api";
import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import NavbarModal from '../../modals/navbar/NavbarModal';
import Cartmodal from '../../modals/cartModal/Cartmodal';
import LoginModal from '../../modals/LoginModal/LoginModal';
import SignupModal from '../../modals/SignupModal/SignupModal';
import ForgotModal from '../../modals/forgotModal/ForgotModal';
import { Tooltip } from 'bootstrap';
import { useNavigate } from "react-router-dom";
import { isUser, isAdmin, checkMe, getCart } from "../../services/api";

const Navbar = ({ admin }) => {
    const navigate = useNavigate();
    const [cart, setCart] = useState()
    const [userId, setUserId] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdminLogedIn, setAdminLogedIn] = useState(false);
    const [isCartVisible, setCartVisible] = useState(false);
    const [isLoginModalVisible, setLoginModalVisible] = useState(false);
    const [isSignModalVisible, setSignModalVisible] = useState(false);
    const [isForgotVisible, setForgot] = useState(false);

    // Unified check for user and admin authentication
    const checkAuth = async () => {
        try {
            const userResponse = await isUser();
            setIsLoggedIn(userResponse.data.isAuthenticated);
            if (userResponse.data.isAuthenticated) {
                const response = await checkMe();
                setUserId(response.data._id);
            }
            const adminResponse = await isAdmin();
            setAdminLogedIn(adminResponse.data.isAuthenticated);
        } catch (err) {
            setIsLoggedIn(false);
            setAdminLogedIn(false);
        }
    };

    // const userIdChecker = async () => {
    //     const response = await getCart(userId);
    //     setCart(response.data.cart)
    // }

    useEffect(() => { checkAuth(); }, [navigate]);
    // useEffect(() => {
    //     if (isLoggedIn == true) {
    //         userIdChecker()
    //     }
    // }, [userId])


    // Tooltip initialization
    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltips = Array.from(tooltipTriggerList).map(
            (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
        );
        return () => {
            tooltips.forEach((tooltip) => tooltip.dispose());
        };
    }, [navigate]);

    // Toggle cart visibility
    const toggleCart = () => setCartVisible(!isCartVisible);

    // Toggle modal visibility functions
    const toggleLoginModal = () => setLoginModalVisible(!isLoginModalVisible);
    const toggleSignupModal = () => setSignModalVisible(!isSignModalVisible);
    const toggloForgotModal = () => setForgot(!isForgotVisible);

    // Disable body scroll when modals are visible
    useEffect(() => {
        document.body.style.overflow = isLoginModalVisible || isSignModalVisible || isForgotVisible ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isLoginModalVisible, isSignModalVisible, isForgotVisible]);

    // Handle logout
    const handleLogout = async (logoutFunc, redirectUrl) => {
        try {
            const response = await logoutFunc();

            toast.success(response.data.message);
            checkAuth();
            navigate(redirectUrl);
        } catch (err) {
            toast.error("Logout failed. Please try again.");
            console.error("Logout error:", err);
        }
    };

    return (
        <>
            <NavbarModal
                userId={userId}
                admin={admin}
                onCartToggle={toggleCart}
                onLoginToggle={toggleLoginModal}
                isLoggedIn={isLoggedIn}
                onUserLogout={() => handleLogout(logoutUser, "/")}
                isAdminLogedIn={isAdminLogedIn}
                onAdminLogout={() => handleLogout(logoutAdmin, "/adminLogin")}
            />
            <Cartmodal isVisible={isCartVisible} onClose={() => setCartVisible(false)} />
            <LoginModal
                onLoginSuccess={() => setIsLoggedIn(true)}
                isVisible={isLoginModalVisible}
                onClose={toggleLoginModal}
                onSignToggle={toggleSignupModal}
                onForgotToggle={toggloForgotModal}
            />
            <SignupModal
                isVisible={isSignModalVisible}
                onClose={toggleSignupModal}
                onLoginToggle={toggleLoginModal}
                onLoginSuccess={() => setIsLoggedIn(true)}
            />
            <ForgotModal isVisible={isForgotVisible} onClose={toggloForgotModal} />

        </>
    );
};

export default Navbar;
