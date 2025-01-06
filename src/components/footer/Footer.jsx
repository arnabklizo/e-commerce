import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUp } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faXTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import '../footer/footer.css';
import logo from '../../assets/icon/logo.png';


const Footer = ({ admin }) => {



    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <footer className="border-top">
                {!admin &&
                    <div className="container py-5">
                        <div className="row">
                            <div className="col-12 col-lg-3">
                                <a className="navbar-brand footerNavBrand mx-auto mx-lg-0 d-block" href="index.html">
                                    <img src={logo} alt="coral" className="w-100" />
                                </a>
                                <p className="py-4 text-center text-lg-start">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                    labore et dolore magna aliqua
                                </p>
                                <div className="socialFooter mb-5 mb-lg-0 d-flex align-items-center justify-content-lg-start justify-content-center">
                                    <a href="#" className="socialFooterLink text-decoration-none me-lg-3 me-0 px-2 px-lg-0">
                                        <FontAwesomeIcon icon={faFacebookF} />
                                    </a>
                                    <a href="#" className="socialFooterLink text-decoration-none me-lg-3 me-0 px-2 px-lg-0">
                                        <FontAwesomeIcon icon={faXTwitter} />
                                    </a>
                                    <a href="#" className="socialFooterLink text-decoration-none me-lg-3 me-0 px-2 px-lg-0">
                                        <FontAwesomeIcon icon={faLinkedin} />
                                    </a>
                                    <a href="#" className="socialFooterLink text-decoration-none me-lg-3 me-0 px-2 px-lg-0">
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </a>
                                </div>
                            </div>
                            <div className="col-12 col-lg-3">
                                <div className="footerHead roboto fw-bold ps-0 ps-lg-4 pb-3 pb-lg-4 text-center text-lg-start">
                                    CATALOG
                                </div>
                                <ul className="list-unstyled ps-0 ps-lg-4 mb-5 mb-lg-0">
                                    <li className="nav-item mb-2">
                                        <a href="show-products.html" className="nav-link text-capitalize active">
                                            Necklaces
                                        </a>
                                    </li>
                                    <li className="nav-item mb-2">
                                        <a href="show-products.html" className="nav-link text-capitalize active">
                                            Hoodies
                                        </a>
                                    </li>
                                    <li className="nav-item mb-2">
                                        <a href="show-products.html" className="nav-link text-capitalize active">
                                            Jewelry Box
                                        </a>
                                    </li>
                                    <li className="nav-item mb-2">
                                        <a href="show-products.html" className="nav-link text-capitalize active">
                                            T-shirt
                                        </a>
                                    </li>
                                    <li className="nav-item mb-2">
                                        <a href="show-products.html" className="nav-link text-capitalize active">
                                            Jacket
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-12 col-lg-3">
                                <div className="footerHead roboto fw-bold ps-0 ps-lg-4 pb-3 pb-lg-4 text-center text-lg-start">
                                    ABOUT US
                                </div>
                                <ul className="list-unstyled ps-0 ps-lg-4 mb-5 mb-lg-0">
                                    <li className="nav-item mb-2">
                                        <a href="/about" className="nav-link text-capitalize active">
                                            About Us
                                        </a>
                                    </li>
                                    <li className="nav-item mb-2">
                                        <a href="/terms" className="nav-link text-capitalize active">
                                            Terms & Conditions
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-12 col-lg-3">
                                <div className="footerHead roboto fw-bold ps-0 ps-lg-4 pb-3 pb-lg-4 text-center text-lg-start">
                                    CUSTOMER SERVICES
                                </div>
                                <ul className="list-unstyled ps-0 ps-lg-4 mb-5 mb-lg-0">
                                    <li className="nav-item mb-2">
                                        <a href="/contact" className="nav-link text-capitalize active">
                                            Contact Us
                                        </a>
                                    </li>
                                    <li className="nav-item mb-2">
                                        <a href="profile.html" className="nav-link text-capitalize active">
                                            Track Your Order
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                }
                <div className="footerLast d-flex align-items-center justify-content-center">
                    <div className="m-auto text-light">
                        &copy; <span className="currentYear text-light">2024</span> - CORAL
                    </div>
                </div>
                {isVisible && (
                    <div className="backToTop" onClick={scrollToTop}>
                        <FontAwesomeIcon icon={faCircleUp} />
                    </div>
                )}
            </footer>
        </>
    );
};

export default Footer;