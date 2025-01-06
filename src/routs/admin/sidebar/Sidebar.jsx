import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBoxesStacked,
    faDolly,
    faTruckRampBox,
    faUsers,
    faList,
} from '@fortawesome/free-solid-svg-icons';
import { useLocation, Link } from 'react-router-dom';
import '../sidebar/sidebar.css';

const Sidebar = () => {
    const [isSliderOn, setSlider] = useState(false);
    const location = useLocation();

    const sliderToggler = () => {
        setSlider(!isSliderOn);
    };

    const menuItems = [
        { path: '/dashboard', label: 'DashBoard', icon: faBoxesStacked },
        { path: '/allProducts', label: 'All Products', icon: faDolly },
        { path: '/orderLiist', label: 'Order List', icon: faTruckRampBox },
        { path: '/allUsers', label: 'All Users', icon: faUsers },
        { path: '/categoryList', label: 'Category List', icon: faList },
    ];

    const getLinkClass = (path) => (location.pathname === path ? 'btnDashboardVisited' : 'btnDashboard');

    return (
        <>
            <aside className={`sidebarDeashboard border-top ${isSliderOn ? 'smallWidth' : ''}`}>
                <div className="dashboardTopper w-100 border-bottom d-flex align-items-center">
                    <label className="closeDash">
                        <input type="checkbox" className="dashChecker" />
                        <svg viewBox="0 0 32 32" onClick={sliderToggler}>
                            <path
                                className="line line-top-bottom"
                                d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                            ></path>
                            <path className="line" d="M7 16 27 16"></path>
                        </svg>
                    </label>
                </div>
                <div className="dasboard-list p-1 border-bottom">
                    <ul className="list-unstyled d-flex flex-column">
                        {menuItems.map((item) => (
                            <li className="py-1" key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`btn d-flex align-items-center m-auto text-decoration-none fs-5 ${getLinkClass(
                                        item.path
                                    )}`}
                                >
                                    <FontAwesomeIcon icon={item.icon} className="me-3" />
                                    <span className="dashdMenu fw-bold">{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="py-2 px-3 categoryBox"></div>
            </aside>
        </>
    );
};

export default Sidebar;
