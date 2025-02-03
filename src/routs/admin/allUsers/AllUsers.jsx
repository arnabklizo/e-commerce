import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from "bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass,
    faClipboardList,
    faTrashCan,
    faArrowDownZA,
    faArrowDownWideShort,
    faArrowDownShortWide,
    faArrowDownAZ,
    faArrowLeft,
    faArrowRight
} from '@fortawesome/free-solid-svg-icons';

import TimeNow from '../../../components/timer/TimeNow';

import '../allUsers/AllUsers.css';

const AllUsers = () => {


    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltips = Array.from(tooltipTriggerList).map(
            (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
        );
        return () => {
            tooltips.forEach((tooltip) => tooltip.dispose());
        };
    }, []);

    const SortButton = ({ ascIcon, descIcon }) => (
        <button className="sortButton border-0 bg-transparent mx-1">
            <span className="asc d-none">
                <FontAwesomeIcon icon={ascIcon} />
            </span>
            <span className="desc">
                <FontAwesomeIcon icon={descIcon} />
            </span>
        </button>
    );

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

    const usersList = [
        { name: 'Jayden Walker', id: '#123456789', date: 'May 5, 4:20 PM', email: 'jayden@walker.com', phone: '0123456987' },
        { name: 'Jayden Walker', id: '#123456789', date: 'May 5, 4:20 PM', email: 'jayden@walker.com', phone: '0123456987' },
        { name: 'Jayden Walker', id: '#123456789', date: 'May 5, 4:20 PM', email: 'jayden@walker.com', phone: '0123456987' },
        { name: 'Jayden Walker', id: '#123456789', date: 'May 5, 4:20 PM', email: 'jayden@walker.com', phone: '0123456987' },
        { name: 'Jayden Walker', id: '#123456789', date: 'May 5, 4:20 PM', email: 'jayden@walker.com', phone: '0123456987' },
        { name: 'Jayden Walker', id: '#123456789', date: 'May 5, 4:20 PM', email: 'jayden@walker.com', phone: '0123456987' },
        { name: 'Jayden Walker', id: '#123456789', date: 'May 5, 4:20 PM', email: 'jayden@walker.com', phone: '0123456987' },
        { name: 'Jayden Walker', id: '#123456789', date: 'May 5, 4:20 PM', email: 'jayden@walker.com', phone: '0123456987' },
    ]

    const UserTable = () => {
        return (
            <table className="w-100">
                <thead>
                    <tr>
                        <th>
                            Users Name
                            <SortButton ascIcon={faArrowDownAZ} descIcon={faArrowDownZA} />
                        </th>
                        <th>
                            Id
                        </th>
                        <th>
                            Registered
                            <SortButton ascIcon={faArrowDownWideShort} descIcon={faArrowDownShortWide} />
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            Phone No.
                        </th>
                        <th>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {usersList.map((user, index) => (
                        <tr key={index}>
                            <td>
                                <span className="prductName fw-bold">{user.name}</span>
                            </td>
                            <td>
                                {user.id}
                            </td>
                            <td>
                                <span className="register">
                                    {user.date}
                                </span>
                            </td>
                            <td>
                                <span className="registeredEmail">{user.email}</span>
                            </td>
                            <td>
                                <span className="registeredPhone">{user.phone}</span>
                            </td>

                            <td>
                                <div className="d-flex align-items-center">
                                    <button className="editRegister rounded border m-1" data-bs-toggle="tooltip"
                                        data-bs-placement="bottom" data-bs-title="Delete this user">
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </button>
                                    <button className="reviewDltBtn btn m-1" type="button" data-bs-toggle="tooltip"
                                        data-bs-placement="bottom" data-bs-title="Show Reviews">
                                        <FontAwesomeIcon icon={faClipboardList} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}

                </tbody>

            </table>
        )
    }

    const SearchBar = () => (
        <form className="input-group">
            <input type="text" className="form-control" placeholder="Search user" />
            <button className="input-group-text">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </form>
    )

    return (
        <>
            <div className="container dashBoardContainer">
                {/* <!-- page header  --> */}
                <h1 className="text-center py-3 roboto sectHead text-capitalize text-dark">
                    All customers
                </h1>

                {/* <!-- filter and search btn  --> */}
                <div className="row">
                    <div className="col-12 col-xl-6 mb-2">
                        <div className="silterSearch my-2 d-flex align-items-center">

                            <div className="filterBox d-flex align-items-center w-50">
                                <SearchBar />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-xl-6 mb-2">
                        <div className="timeNow  h-100 d-flex align-items-center justify-content-end pb-1">
                            <TimeNow />
                        </div>
                    </div>
                </div>



                {/* <!-- Product List  --> */}
                <div className="pannelDashed pannelDashedOrdrList bg-light rounded border p-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="fs-3 py-3 roboto sectHead text-capitalize text-dark">
                            All customers <span className="fw-bold">(28)</span>
                        </h1>
                        <div className="d-flex justify-content-end align-items-center">
                        </div>
                    </div>
                    <UserTable />

                </div>

                {/* <!-- pagination  --> */}
                <div className="d-flex border rounded align-items-center justify-content-between p-2 px-3 mt-3 bg-light mb-2">
                    <div className="productNumbers text-dark fw-bolder">
                        <span className="fw-bold">28</span> Customers
                    </div>
                    <div>
                        <FooterPagination />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllUsers

