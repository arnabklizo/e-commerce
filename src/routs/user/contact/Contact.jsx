import React from 'react'
import './contact.css'

// image 
import { background } from '../../../constans/background';


const contact = () => {
    return (
        <>
            <section className="contactSection">
                <div className="container mb-3">

                    <h1 className="text-center roboto sectHead text-capitalize text-dark pt-5 pageHeader">
                        Contact Us
                    </h1>
                    <p className=" heroAbout50 fw-bold text-center m-auto mb-3">
                        Any question or remarks? Just write us a message!
                    </p>
                    <div className="rounded border p-2 bg-white">
                        <div className="row">
                            <div className="col-12 col-lg-4">
                                <div className="position-relative h-100">
                                    <div
                                        className="rounded contactBlack bg-black p-2 h-100 d-flex flex-column justify-content-between">
                                        <h4 className="text-white roboto fw-bold py-2 text-sm-center">
                                            Contact Information
                                        </h4>
                                        <div className="middleContactLeft d-flex flex-column justify-content-between p-2">
                                            <div className="contacted d-flex text-white align-items-center">
                                                {/* <i className="fa-solid fa-phone-volume me-2"></i> */}
                                                <a href="tell:+919876543210"
                                                    className="ContactNumbers text-decoration-none text-white">+91 9876 5432
                                                    10</a>
                                            </div>
                                            <div className="contacted d-flex text-white align-items-center">
                                                {/* <i className="fa-solid fa-envelope me-2"></i> */}
                                                <a href="tell:+919876543210"
                                                    className="ContactNumbers text-decoration-none text-white">+91 9876 5432
                                                    10</a>
                                            </div>
                                            <div className="contacted d-flex text-white">
                                                {/* <i className="fa-solid fa-location-dot me-2 pt-1"></i> */}
                                                <span className="ContactNumbers text-decoration-none text-white">
                                                    132 Dartmouth Street Boston, Massachusetts 02156 United States
                                                </span>
                                            </div>
                                        </div>
                                        <div className="socialContact d-flex">
                                            <a href="#" className="socialLinks">
                                                {/* <i className="fa-brands fa-facebook-f"></i> */}
                                            </a>
                                            <a href="#" className="socialLinks">
                                                {/* <i className="fa-brands fa-x-twitter"></i> */}
                                            </a>
                                            <a href="#" className="socialLinks">
                                                {/* <i className="fa-brands fa-linkedin-in"></i> */}
                                            </a>
                                            <a href="#" className="socialLinks">
                                                {/* <i className="fa-brands fa-instagram"></i> */}
                                            </a>
                                        </div>
                                    </div>
                                    <img src={background.ellipse1} alt="" className="position-absolute end-0 bottom-0 mxb" />
                                    <img src={background.ellipse2} alt="" className="msd position-absolute" />
                                </div >
                            </div>
                            <div className="col-12 col-lg-8 ">
                                <div className="contactForm position-relative">

                                    <form action="">
                                        <div className="row p-3">
                                            <div className="col-12 col-lg-6 d-flex flex-column mb-5 px-3">
                                                <label htmlFor="mb-3 contactNameFirst">First name</label>
                                                <input type="text" name="contactName" id="contactNameFirst" />
                                            </div>
                                            <div className="col-12 col-lg-6 d-flex flex-column mb-5 px-3">
                                                <label htmlFor="mb-3 contactNameLast">Last name</label>
                                                <input type="text" name="contactName" id="contactNameLast" />
                                            </div>
                                        </div>
                                        <div className="row p-3">
                                            <div className="col-12 col-lg-6 d-flex flex-column mb-5 px-3">
                                                <label htmlFor="mb-3 contactEmail">Email</label>
                                                <input type="text" name="contactEmail" id="contactEmail" />
                                            </div>
                                            <div className="col-12 col-lg-6 d-flex flex-column mb-5 px-3">
                                                <label htmlFor="mb-3 contactNamePhone">Phone Number</label>
                                                <input type="text" name="contactNamePhone" id="contactNamePhone" />
                                            </div>
                                        </div>
                                        <div className="row p-3">
                                            <div className="col-12 d-flex flex-column mb-5 px-3">
                                                <label htmlFor="contactMessage">Message</label>
                                                <textarea name="contactMessage" id="contactMessage" className="w-100"></textarea>
                                            </div>
                                        </div>
                                        <div className="text-end text-sm-center p-3">
                                            <button type="submit" className="btn btn-dark me-0 cntSubBtn roboto">Send
                                                Message</button>
                                        </div>
                                    </form>

                                    <img src={background.letter} alt=""
                                        className="position-absolute contLett" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="mapSection">
                <div className="container">
                    <div className="rounded border my-3 overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.876904507173!2d88.46020366834107!3d22.621071445052426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89f6bb76bdfdd%3A0x9514046617c90a72!2sKlizo%20Solutions%20%7C%20Web%2C%20Mobile%20and%20SaaS%20Development%20Company!5e0!3m2!1sen!2sin!4v1733746960203!5m2!1sen!2sin"
                            width="600" height="450" style={{ border: '0' }} loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </section>
        </>
    )
}

export default contact
