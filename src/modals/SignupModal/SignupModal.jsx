import React, { useState } from 'react';
import { registerUser, loginUser } from "../../services/api";
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import Cookies from 'js-cookie';  // Importing js-cookie
import '../SignupModal/SignupModal.css';

const SignupModal = ({ isVisible, onClose, onLoginToggle, onLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate fields
        if (!email || !phoneNumber || !password) {
            toast.error("All fields are required", { position: "top-center" });
            return;
        }

        // Password length validation
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long", { position: "top-center" });
            return;
        }

        try {
            const { data } = await registerUser({ email, phone: phoneNumber, password });
            toast.success("Successfully registered! Please log in.");
            onClose();

            // Attempt auto-login after successful registration
            const loginResponse = await loginUser({ email, password });
            Cookies.set("token", loginResponse.data.token, { expires: 1 });
            onLoginSuccess();
            toast.success("Logged in successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed.");
        }
    };

    // Handle password visibility toggle
    const [showPassword, setShowPassword] = useState({ input1: false });
    const togglePasswordVisibility = (input) => {
        setShowPassword((prev) => ({
            ...prev,
            [input]: !prev[input],
        }));
    };

    const handleClick = () => {
        onClose();
        onLoginToggle();  // Switch to login modal
    };

    const HandleClose = (e) => {
        if (e.target.id === 'signUpBoxModal') {
            onClose();
        }
    };

    return (
        <div
            className={`modal fade ${isVisible ? "show" : ""}`}
            id="signUpBoxModal"
            aria-hidden={!isVisible}
            aria-labelledby="signUpBox"
            tabIndex="-1"
            style={{ display: isVisible ? "block" : "none" }}
            onClick={HandleClose}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title text-dark fs-5" id="signUpBox">Sign up</h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    name="emailAddress"
                                    id="emailAddress"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <label htmlFor="emailAddress">Email address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="tel"
                                    className="form-control"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    placeholder="Phone Number"
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    value={phoneNumber}
                                    required
                                />
                                <label htmlFor="phoneNumber">Phone Number</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type={showPassword.input1 ? "text" : "password"}
                                    className="form-control passwordLog"
                                    id="firstPassword"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <span className="btn showPassword d-flex" onClick={() => togglePasswordVisibility('input1')}>
                                    <FontAwesomeIcon icon={showPassword.input1 ? faEye : faEyeSlash} />
                                </span>
                                <label htmlFor="firstPassword">Enter Password</label>
                            </div>
                            <div className="text-center pt-2 mt-2">
                                <button className="btn btn-dark" type="submit">Sign up</button>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        Already have an account?
                        <button className="btn btnTogglerModal px-1" onClick={handleClick}>
                            Log in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupModal;
