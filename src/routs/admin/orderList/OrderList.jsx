import React, { useEffect, useState } from 'react';
import { Tooltip } from "bootstrap";

import { useNavigate } from 'react-router-dom';
import { isAdmin } from '../../../services/api';

import TimeNow from '../../../components/timer/TimeNow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFilter,
    faMagnifyingGlass,
    faFileInvoice,
    faArrowDownZA,
    faArrowDownWideShort,
    faArrowDownShortWide,
    faArrowDownAZ,
    faArrowLeft,
    faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../orderList/orderList.css'

const OrderList = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const adminResponse = await isAdmin();
                if (!adminResponse.data.isAuthenticated) {
                    navigate("/dashboard");
                }
            } catch (err) {
                navigate("/adminLogin");
            }
        };

        checkAuth();
    }, [navigate]);


    const [isSelected, setSelected] = useState()
    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltips = Array.from(tooltipTriggerList).map(
            (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
        );
        return () => {
            tooltips.forEach((tooltip) => tooltip.dispose());
        };
    }, []);


    const SearchBar = () => (
        <div className="filterBox d-flex align-items-center w-50 ms-sm-3">
            <form className="input-group">
                <button className="input-group-text">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Product Name"
                />
            </form>
        </div>
    );

    const FilterCategory = () => (
        <div className="filterBox d-flex align-items-center w-50">
            <label htmlFor="filterCategory" className="me-2 fw-bold">
                <FontAwesomeIcon icon={faFilter} className="me-1" />
                Catagory :
            </label>
            <select
                id="filterCategory"
                className="form-select w-50"
                aria-label="Default select example"
                defaultValue='all'
                value={isSelected}
                onChange={(e) => setSelected(e.target.value)}
            >
                <option value="all">All orders</option>
                <option value="received">Order received</option>
                <option value="shiped">Order Shiped</option>
                <option value="ready">Order Ready</option>
                <option value="paid">Payment paid</option>
                <option value="pending">Payment pending</option>
                <option value="processing">Payment processing</option>
            </select>
        </div>
    );

    const SortButton = ({ ascIcon, descIcon }) => (
        <button className="sortButton border-0 text-dark bg-transparent mx-1">
            <span className="asc d-none">
                <FontAwesomeIcon icon={ascIcon} />
            </span>
            <span className="desc">
                <FontAwesomeIcon icon={descIcon} />
            </span>
        </button>
    );

    const orders = [
        { customer: 'Jayden Walker', id: '#123456789', date: 'May 5, 4:20 PM', price: 1599, orderStatus: 'paid', paymentStatus: 'received' },
        { customer: 'Francisco Henry', id: '#123456788', date: 'Apr 5, 2:20 PM', price: 4867, orderStatus: 'paid', paymentStatus: 'ready' },
        { customer: 'Jayden Walker', id: '#123456787', date: 'May 5, 4:20 PM', price: 1799, orderStatus: 'paid', paymentStatus: 'received' },
        { customer: 'Anupam Roy', id: '#123456786', date: 'Apr 5, 5:10 AM', price: 599, orderStatus: 'paid', paymentStatus: 'shipped' },
        { customer: 'Kumar Sanu', id: '#123456785', date: 'Apr 3, 4:20 PM', price: 5648, orderStatus: 'paid', paymentStatus: 'ready' },
        { customer: 'Shreya Ghoshal', id: '#123456784', date: 'Apr 1, 8:10 PM', price: 78562, orderStatus: 'pending', paymentStatus: 'ready' },
        { customer: 'Arijit Singh', id: '#123456783', date: 'Mar 25, 1:45 AM', price: 14599, orderStatus: 'paid', paymentStatus: 'ready' },
        { customer: 'Himesh Reshmiya', id: '#123456782', date: 'May 5, 4:20 PM', price: 71599, orderStatus: 'pending', paymentStatus: 'shipped' },
    ];

    const OrderList = () => {
        return (
            <table className="w-100">
                <thead>
                    <tr>
                        <th>
                            Customer
                            <SortButton ascIcon={faArrowDownAZ} descIcon={faArrowDownZA} />
                        </th>
                        <th>
                            Order Id
                        </th>
                        <th>
                            Date
                            <SortButton ascIcon={faArrowDownWideShort} descIcon={faArrowDownShortWide} />
                        </th>
                        <th>
                            Price
                            <SortButton ascIcon={faArrowDownWideShort} descIcon={faArrowDownShortWide} />
                        </th>
                        <th>
                            Payment Status
                        </th>
                        <th>
                            Order Status
                        </th>
                        <th>

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((orderedItem, index) => (
                        <tr key={index}>
                            <td>
                                <span className="prductName fw-bold">{orderedItem.customer}</span>
                            </td>
                            <td>
                                {orderedItem.id}
                            </td>
                            <td>
                                <span className="orderTime">
                                    {orderedItem.date}
                                </span>
                            </td>
                            <td>
                                &#8377;
                                <span className="ammountTable">{orderedItem.price}</span>
                            </td>
                            <td>
                                <span className={orderedItem.orderStatus}>{orderedItem.orderStatus}</span>
                            </td>
                            <td>
                                <span className={orderedItem.paymentStatus}>{orderedItem.paymentStatus}</span>
                            </td>
                            <td>
                                <Link to="/order" className="btn btn-dark whiteIcon" data-bs-toggle="tooltip"
                                    data-bs-placement="bottom" data-bs-title="View Order Details">
                                    <FontAwesomeIcon icon={faFileInvoice} />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }

    const FooterPagination = () => (
        <nav aria-label="Page navigation example">
            <ul className="pagination mb-0">
                <li className="page-item">
                    <Link className="page-link" to="#" data-bs-title="Previous Page" data-bs-toggle="tooltip" data-bs-placement="bottom">
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Link>
                </li>
                <li className="page-item"><Link className="page-link pageSelected" to="#">1</Link></li>
                <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                <li className="page-item"><Link className="page-link" disabled>...</Link></li>
                <li className="page-item"><Link className="page-link" to="#">111</Link></li>
                <li className="page-item">
                    <Link className="page-link" to="#" data-bs-title="Next Page" data-bs-toggle="tooltip" data-bs-placement="bottom">
                        <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                </li>
            </ul>
        </nav>
    );


    return (
        <>
            <div className="container dashBoardContainer">
                <h1 className="text-center py-3 roboto sectHead text-capitalize text-dark">
                    Ordered List
                </h1>
                <div className="row">
                    <div className="col-12 col-xl-6 mb-2">
                        <div className="silterSearch my-2 d-flex align-items-center">
                            <FilterCategory />
                            <SearchBar />
                        </div>
                    </div>
                    <div className="col-12 col-xl-6 mb-2">
                        <div className=" text-dark  h-100 d-flex align-items-center justify-content-end pb-1">
                            <TimeNow />
                        </div>
                    </div>
                </div>


                <div className="pannelDashed pannelDashedorderedItemList bg-light rounded border p-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="fs-3 py-3 roboto sectHead text-capitalize text-dark">
                            order-list <span className="fw-bold">(30)</span>
                        </h1>
                        <div className="d-flex justify-content-end align-items-center">

                        </div>
                    </div>
                    <OrderList />
                </div>
                <div className="d-flex border rounded align-items-center justify-content-between p-2 px-3 mt-3 bg-light mb-2">
                    <div className="productNumbers text-dark fw-bolder">
                        <span className="fw-bold">30</span> Orders
                    </div>
                    <div>
                        <FooterPagination />
                    </div>

                </div>
            </div>
        </>
    )
}

export default OrderList
