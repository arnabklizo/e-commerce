import React from 'react'
import '../forgotModal/forgotModal.css'

const ForgotModal = ({ isVisible, onClose }) => {


    const HandleClose = (e) => {
        if (e.target.id == 'fgtPass') {
            onClose()
        }
    }
    return (
        <>
            <div
                className={`modal fade ${isVisible ? 'show' : ''}`}
                id="fgtPass" aria-hidden={!isVisible}
                aria-labelledby="accountBoxLabel"
                tabIndex="-1"
                style={{ display: isVisible ? "block" : "none" }}
                onClick={HandleClose}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content frgt1">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-dark" id="accountBoxLabel">Forgot Password ?</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body position-relative">
                            <form action="">
                                <div className="form-floating mb-3">
                                    <input type="email" name="frgtLoginEmail" className="form-control" id="frgtLoginEmail"
                                        placeholder="name@example.com" />
                                    <label htmlFor="frgtLoginEmail">Email address</label>
                                </div>

                                <div className="text-center pt-2 mt-2">
                                    <button className="btn btn-dark sndEmail" type="submit">Request Reset-link</button>
                                </div>
                            </form>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default ForgotModal
