import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { loginUser } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGoogle, faApple } from "@fortawesome/free-brands-svg-icons";
import Cookies from "js-cookie";
import "../LoginModal/LoginModal.css";

const LoginModal = ({ isVisible, onClose, onSignToggle, onForgotToggle, onLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Handle form submission for login
    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            const { data } = await loginUser({ email, password });
            console.log('this is data', data)
            if (data?.token) {
                Cookies.set("token", data.token, { expires: 1 }); // Ensure the token is set correctly
                toast.success(`Login successful!  Welcome back`);
                onLoginSuccess();
                onClose();
            } else {
                toast.error("Token missing in server response.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed.");
        }




    };

    // Toggle password visibility
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    // Switch modals
    const handleSignUp = () => {
        onClose();
        onSignToggle();
    };

    const handleForgotPassword = () => {
        onClose();
        onForgotToggle();
    };

    // Close modal on background click
    const handleCloseModal = (e) => {
        if (e.target.id === "accountBox") {
            onClose();
        }
    };

    return (
        <div
            className={`modal fade ${isVisible ? "show" : ""}`}
            id="accountBox"
            aria-hidden={!isVisible}
            tabIndex="-1"
            style={{ display: isVisible ? "block" : "none" }}
            onClick={handleCloseModal}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 text-dark">Login</h1>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <label>Email address</label>
                            </div>
                            <div className="form-floating">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="btn showPassword"
                                    onClick={togglePasswordVisibility}
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                </button>
                                <label>Password</label>
                            </div>
                            <div className="text-center pt-2 mt-5">
                                <button className="btn btn-dark" type="submit">
                                    Log in
                                </button>
                            </div>
                        </form>
                        <div className="my-3 nav-item fgtps">
                            <button className="btn frgt0 nav-link text-start" onClick={handleForgotPassword}>
                                Forgot Your Password?
                            </button>
                        </div>
                        <div className="btn_box text-center pt-2">
                            <button className="btn socialBtn btn-outline-dark m-1">
                                <FontAwesomeIcon icon={faGoogle} />
                            </button>
                            <button className="btn socialBtn btn-outline-dark m-1">
                                <FontAwesomeIcon icon={faApple} />
                            </button>
                            <button className="btn socialBtn btn-outline-dark m-1">
                                <FontAwesomeIcon icon={faFacebookF} />
                            </button>
                        </div>
                    </div>
                    <div className="modal-footer">
                        Don't have an account?{" "}
                        <button className="btn btnTogglerModal px-1" onClick={handleSignUp}>
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
