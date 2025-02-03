import React, { useState, useEffect } from 'react';
import './resetPassword.css'
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faLeftLong, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ResetPassword = () => {
    const navigate = useNavigate();




    const goBack = () => {
        navigate(-1);
    };

    const [showPassword, setShowPassword] = useState({ input1: false, input2: false, input3: false });
    const togglePasswordVisibility = (input) => {
        setShowPassword((prev) => ({
            ...prev,
            [input]: !prev[input],
        }));
    };



    return (
        <>
            <section className="resetPass">
                <div className="container d-flex align-items-center justify-content-center">
                    <div className="resetPassBox position-relative border rounded p-3">
                        <h1 className="text-center roboto sectHead text-capitalize text-dark px-sm-4">
                            Change Your Password
                        </h1>

                        <form action="" className="px-md-5 mb-4">
                            <div className="form-floating mb-3">
                                <input type={showPassword.input1 ? "text" : "Password"} className="form-control passwordLog" id="oldPass"
                                    placeholder="Enter New Password" />
                                <span className="btn showPassword d-flex" onClick={() => togglePasswordVisibility('input1')}>
                                    <FontAwesomeIcon icon={showPassword.input1 ? faEye : faEyeSlash} />
                                </span>
                                <label htmlFor="oldPass">Enter your old password</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type={showPassword.input2 ? "text" : "Password"} className="form-control passwordLog" id="newPass"
                                    placeholder="Enter New Password" />
                                <span className="btn showPassword d-flex" onClick={() => togglePasswordVisibility('input2')}>
                                    <FontAwesomeIcon icon={showPassword.input2 ? faEye : faEyeSlash} />
                                </span>
                                <label htmlFor="newPass">Enter New Password</label>
                            </div>
                            <div className="form-floating">
                                <input type={showPassword.input3 ? "text" : "Password"} className="form-control passwordLog" id="againPassword"
                                    placeholder="Confirm New Password" />
                                <span className="btn showPassword  d-flex" onClick={() => togglePasswordVisibility('input3')}>
                                    <FontAwesomeIcon icon={showPassword.input3 ? faEye : faEyeSlash} />
                                </span>
                                <label htmlFor="againPassword">Confirm New Password</label>
                            </div>
                            <div className="text-center pt-2 mt-2">
                                <button className="btn btn-dark fs-5 roboto" type="submit">Change Password</button>
                            </div>
                        </form>
                        <div className="text-center">
                            <button className="btn m-auto goBackBtn btn-dark d-flex align-items-center justify-content-center"
                                onClick={goBack}>
                                <FontAwesomeIcon icon={faLeftLong} className='me-2' />
                                <span className="text-light roboto">Go back</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ResetPassword
