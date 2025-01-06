import React, { useState, useEffect } from "react";
import { Icon } from "../../constans/icon.js";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "bootstrap";
import { logoutAdmin } from "../../services/api.js";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faCartPlus,
    faHeart,
    faUser,
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import "../navbar/navbar.css";
import Cookies from "js-cookie"; // Import js-cookie for cookie handling

const NavbarModal = ({ admin, onCartToggle, onLoginToggle, isLoggedIn, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutAdmin();
            // Remove token from cookies if it's there
            Cookies.remove("adminToken");  // Make sure the token is removed from client-side cookies
            // console.log("Admin logged out successfully!");
            toast.success("Admin logged out successfully!");
            navigate("/adminLogin"); // Redirect to the login page
        } catch (error) {
            toast.error("Logout failed. Please try again.");
            console.error("Logout error:", error);
        }
    };



    const [isDropped, setDropped] = useState(false);

    const location = useLocation();

    const userNavItems = [
        { path: "/categories", label: "Categories" },
        { path: "/about", label: "About" },
        { path: "/contact", label: "Contact" },
    ];

    const getLinkClass = (path) =>
        location.pathname === path ? "nav-link text-uppercase active" : "nav-link text-uppercase";

    // Initialize Bootstrap tooltips
    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach((tooltipTriggerEl) => {
            new Tooltip(tooltipTriggerEl);
        });
    }, []);

    const dropdownTogggler = () => setDropped(!isDropped);

    return (
        <>
            {!admin ? (
                <nav className="navbar navbar-expand-lg py-3 me-0 sticky-top">
                    <div className="container-fluid">
                        <Link className="navbar-brand d-lg-none" to="/">
                            <img src={Icon.logo} alt="logo" />
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                            <ul className="navbar-nav w-40">
                                {userNavItems.map((item) => (
                                    <li className="nav-item" key={item.path}>
                                        <Link
                                            className={getLinkClass(item.path)}
                                            to={item.path}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <ul className="brand navbar-nav w-20 d-none d-lg-block">
                                <li className="nav-item m-auto text-center">
                                    <Link className="navbar-brand m-auto" to="/">
                                        <img src={Icon.logo} alt="coral" />
                                    </Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav w-40 justify-content-end">
                                <li className="nav-item">
                                    <form className="d-flex navSearchForm" role="search">
                                        <input className="navSearch" type="text" placeholder="Search product" />
                                        <button className="btn btnSearch" type="submit">
                                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                                        </button>
                                    </form>
                                </li>
                                <li className="nav-item" data-bs-toggle="tooltip" title="Cart" data-bs-placement="bottom">
                                    <button
                                        className="shoppingCart nav-link d-flex justify-content-center justify-content-lg-end mx-2"
                                        onClick={onCartToggle}
                                    >
                                        <div className="position-relative">
                                            <FontAwesomeIcon icon={faCartPlus} />
                                            <span className="position-absolute top-10 start-100 translate-middle badge bg-dark text-light rounded-pill">
                                                3
                                            </span>
                                        </div>
                                    </button>
                                </li>

                                {isLoggedIn ? (
                                    <>
                                        <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Wishlist">
                                            <Link className="btn btnAcc" to="/profile">
                                                <FontAwesomeIcon icon={faUser} />
                                            </Link>
                                        </li>
                                        <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Wishlist">
                                            <Link className="btn btnAcc" to="/wishlist">
                                                <FontAwesomeIcon icon={faHeart} />
                                            </Link>
                                        </li>
                                        <li
                                            className={`nav-item `}
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="bottom"
                                            title="Logout"
                                            onClick={onLogout}
                                        >
                                            <button className="btn btnAcc">
                                                <FontAwesomeIcon icon={faRightFromBracket} />
                                            </button>
                                        </li>
                                    </>
                                ) : (
                                    <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Account">
                                        <button className="btn btnAcc" onClick={onLoginToggle}>
                                            <FontAwesomeIcon icon={faUser} />
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
            ) : (
                <nav className="navbar navbar-expand-lg py-3 me-0 sticky-top">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">
                            <img src={Icon.logo} alt="logo" />
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <form className="d-flex navSearchForm" role="search">
                                        <input className="navSearch" type="text" placeholder="Search product" />
                                        <button className="btn btnSearch" type="submit">
                                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                                        </button>
                                    </form>
                                </li>
                                <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Profile">
                                    <Link className="btn btnAcc" to="/adminProfile">
                                        <FontAwesomeIcon icon={faUser} />
                                    </Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <button
                                        className="btn btn-secondary dropdown-toggle"
                                        onClick={dropdownTogggler}
                                        id="navbarDropdown"
                                        data-bs-toggle="dropdown"
                                        aria-expanded={isDropped ? "true" : "false"}
                                    >
                                        Admin Panel
                                    </button>
                                    <ul
                                        className={`dropdown-menu mt-1 ${isDropped ? "show" : ""}`}
                                        aria-labelledby="navbarDropdown"
                                    >
                                        <li className={`nav-item `} data-bs-toggle="tooltip" data-bs-placement="bottom" title="Logout"
                                            onClick={handleLogout}
                                        >
                                            <button className="btn btnAcc">
                                                Logout
                                                <FontAwesomeIcon icon={faRightFromBracket} className="ms-2" />
                                            </button>
                                        </li>

                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            )}

        </>
    );
};

export default NavbarModal;
