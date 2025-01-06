import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { loginAdmin } from "../../../services/api";
import { background } from '../../../constans/background';
import { Icon } from '../../../constans/icon.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie
import './AdminLogin.css';

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        if (!email || !password) {
            toast.error("Both fields are required", { position: "top-center" });
            return;
        }

        setLoading(true);
        try {
            const adminCredentials = { email, password };
            const { data } = await loginAdmin(adminCredentials);

            // Save token in cookies (set expiration time for the cookie)
            Cookies.set("adminToken", data.token, { expires: 1 }); // expires in 1 day
            toast.success("Logged in successfully!");
            navigate("/dashboard");  // Redirect after login success
        } catch (error) {
            if (error.response) {
                // If there's a response error from the API
                toast.error(error.response.data?.message || "Login failed.");
                console.error("API Error:", error.response);
            } else {
                // If no response from the API
                toast.error("Server is unavailable or no response.");
                console.error("Error details:", error);
            }
        }
        finally {
            setLoading(false);
        }
    };


    // Toggle password visibility
    const togglePasswordVisibility = () => setShowPassword(prev => !prev);

    return (
        <section className="adminLoginSect py-5 d-flex justify-content-center align-items-center">
            <div className="container">
                <div className="bg-light rounded overflow-hidden border border-light-subtle">
                    <div className="row">
                        {/* Left side (image section) */}
                        <div className="col-12 col-lg-6 position-relative admnfrstDiv">
                            <div className="w-100 h-100 adminLoginImg"></div>
                            <img src={background.ellipse1} alt="" className="position-absolute start-0 bottom-0 ecl1" />
                            <img src={background.ellipse2} alt="" className="position-absolute ecl2" />
                        </div>

                        {/* Right side (form section) */}
                        <div className="col-12 col-lg-6">
                            <div className="text-center">
                                <img src={Icon.logo} alt="" className="logo pt-5" />
                            </div>
                            <h1 className="text-center roboto sectHead text-dark pt-3 pageHeader">
                                Login to your account
                            </h1>
                            <div className="text-center">See what is going on with your business</div>

                            {/* Login Form */}
                            <div className="m-5">
                                <form onSubmit={handleSubmit}>
                                    {/* Email Input */}
                                    <div className="form-floating mb-3">
                                        <input
                                            id="EmailAddr"
                                            className="form-control"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter admin email"
                                            required
                                        />
                                        <label htmlFor="EmailAddr">Email address</label>
                                    </div>

                                    {/* Password Input */}
                                    <div className="form-floating">
                                        <input
                                            id="loginPasswrd"
                                            className="form-control"
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter password"
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="btn showPassword"
                                            onClick={togglePasswordVisibility}
                                        >
                                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                        </button>
                                        <label htmlFor="loginPasswrd">Password</label>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="text-center">
                                        <button className="btn btn-dark my-4 px-4" disabled={loading}>
                                            {loading ? 'Logging in...' : 'Log in'}
                                        </button>
                                    </div>
                                </form>

                                {/* Forgot Password Button */}
                                <div className="text-center py-3">
                                    <button className="btn border-0"> Forgot Your Password ?</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdminLogin;
