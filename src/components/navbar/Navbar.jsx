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
import { isUser, isAdmin, checkMe } from "../../services/api";

const Navbar = ({ admin, check }) => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdminLogedIn, setAdminLogedIn] = useState(false);
    const [isCartVisible, setCartVisible] = useState(false);
    const [isLoginModalVisible, setLoginModalVisible] = useState(false);
    const [isSignModalVisible, setSignModalVisible] = useState(false);
    const [isForgotVisible, setForgot] = useState(false);

    useEffect(() => { checkAuth() }, [navigate]);

    // Unified check for user and admin authentication
    const checkAuth = async () => {
        try {
            const [userResponse, adminResponse] = await Promise.all([isUser(), isAdmin()]);
            setIsLoggedIn(userResponse.data.isAuthenticated);
            if (userResponse.data.isAuthenticated) {
                const response = await checkMe();
                setUserId(response.data._id);
            }
            check();
            setAdminLogedIn(adminResponse.data.isAuthenticated);
        } catch (err) {
            setIsLoggedIn(false);
            setAdminLogedIn(false);
            console.error('Authentication error:', err);
        }
    };

    useEffect(() => {
        document.body.style.overflow = isLoginModalVisible || isSignModalVisible || isForgotVisible ? 'hidden' : 'auto';
        return () => { document.body.style.overflow = 'auto'; };
    }, [isLoginModalVisible, isSignModalVisible, isForgotVisible]);

    const toggleCart = () => { setCartVisible(prev => !prev); }
    const toggleLoginModal = () => { setLoginModalVisible(prev => !prev); checkAuth(); };
    const toggleSignupModal = () => setSignModalVisible(prev => !prev);
    const toggloForgotModal = () => setForgot(prev => !prev);


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
            <Cartmodal isVisible={isCartVisible} onClose={() => setCartVisible(false)} userId={userId} />
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
