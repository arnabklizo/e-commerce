import React, { useState, useEffect } from "react";
import { Icon } from "../../constans/icon.js";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faCartPlus,
    faHeart,
    faUser,
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import "../navbar/navbar.css";
import { getCart } from '../../services/api.js'


const NavbarModal = ({
    admin,
    onCartToggle,
    onLoginToggle,
    isLoggedIn,
    onUserLogout,
    onAdminLogout,
    isAdminLogedIn,
    userId
}) => {
    const navigate = useNavigate();
    const [isDropped, setDropped] = useState(false);
    const location = useLocation();
    const [cart, setCart] = useState('')
    const fetchCart = async () => {
        const { data } = await getCart(userId);
        setCart(data.cart);
    }
    useEffect(() => {
        if (userId !== '') { fetchCart(); }
    })
    // back
    const userNavItems = [
        { path: "/categories", label: "Categories" },
        { path: "/about", label: "About" },
        { path: "/contact", label: "Contact" },
    ];

    const getLinkClass = (path) =>
        location.pathname === path ? "nav-link text-uppercase active" : "nav-link text-uppercase";

    // Tooltip initialization
    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl));
    }, [navigate]);

    const toggleDropdown = () => setDropped(!isDropped);

    const renderNavItem = (path, label, isLink = true) => (
        <li className="nav-item" key={path}>
            {isLink ? (
                <Link className={getLinkClass(path)} to={path}>
                    {label}
                </Link>
            ) : (
                <button className="btn btnAcc" onClick={onLoginToggle}>
                    <FontAwesomeIcon icon={faUser} />
                </button>
            )}
        </li>
    );

    const renderAdminNav = () => (
        <>
            {isAdminLogedIn && (
                <>
                    <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Profile">
                        <Link className="btn btnAcc" to="/adminProfile">
                            <FontAwesomeIcon icon={faUser} />
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                        <button
                            className="btn btn-secondary dropdown-toggle"
                            onClick={toggleDropdown}
                            id="navbarDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded={isDropped ? "true" : "false"}
                        >
                            Admin Panel
                        </button>
                        <ul className={`dropdown-menu mt-1 ${isDropped ? "show" : ""}`} aria-labelledby="navbarDropdown">
                            <li
                                className="nav-item"
                                data-bs-toggle="tooltip"
                                data-bs-placement="bottom"
                                title="Logout"
                                onClick={onAdminLogout}
                            >
                                <button className="btn btnAcc">
                                    Logout
                                    <FontAwesomeIcon icon={faRightFromBracket} className="ms-2" />
                                </button>
                            </li>
                        </ul>
                    </li>
                </>
            )}
        </>
    );

    const renderUserNav = () => (
        <>

            <li className="nav-item">
                <form className="d-flex navSearchForm" role="search">
                    <input className="navSearch" type="text" placeholder="Search product" />
                    <button className="btn btnSearch" type="submit">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </form>
            </li>


            {isLoggedIn ? (
                <>
                    <li className="nav-item" data-bs-toggle="tooltip" title="Cart" data-bs-placement="bottom">
                        <button
                            className="shoppingCart nav-link d-flex justify-content-center justify-content-lg-end mx-2"
                            onClick={onCartToggle}
                            disabled={location.pathname === `/cart/${userId}` && 'true'}
                        >
                            <div className="position-relative">
                                <FontAwesomeIcon icon={faCartPlus} />
                                <span className="position-absolute top-10 start-100 translate-middle badge bg-dark text-light rounded-pill">
                                    {cart !== '' ? cart.items.length : ''}
                                </span>
                            </div>
                        </button>
                    </li>
                    <li className="nav-item" data-bs-toggle="tooltip" title="Profile" data-bs-placement="bottom" >
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
                        className="nav-item"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Logout"
                        onClick={onUserLogout}
                    >
                        <button className="btn btnAcc">
                            <FontAwesomeIcon icon={faRightFromBracket} />
                        </button>
                    </li>
                </>
            ) : (
                renderNavItem("/login", "Account", false)
            )}
        </>
    );

    return (
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
                        {!admin && (
                            userNavItems.map((item) => renderNavItem(item.path, item.label))
                        )}
                    </ul>
                    <ul className="brand navbar-nav w-20 d-none d-lg-block">
                        <li className="nav-item m-auto text-center">
                            <Link className="navbar-brand m-auto" to="/">
                                <img src={Icon.logo} alt="coral" />
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav w-40 justify-content-end">
                        {admin ? renderAdminNav() : renderUserNav()}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavbarModal;
