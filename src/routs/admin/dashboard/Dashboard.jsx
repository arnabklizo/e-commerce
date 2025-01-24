import React, { useState, useEffect } from 'react';
import { Tooltip } from 'bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import {
    faBoxOpen,
    faCartShopping,
    faTruckFast,
    faUsers,
    faArrowDownAZ,
    faArrowDownZA,
    faArrowDownWideShort,
    faArrowDownShortWide,
    faCalendarDays,
    faArrowDownLong,
} from '@fortawesome/free-solid-svg-icons';

import { isAdmin } from '../../../services/api';
import TimeNow from '../../../components/timer/TimeNow';
import '../../admin/dashboard/dashboard.css'

const Dashboard = () => {


    const navigate = useNavigate();
    useEffect(() => {
        const checkAuth = async () => {
            const adminResponse = await isAdmin();
            if (!adminResponse.data.isAuthenticated) {
                navigate("/adminLogin");
            }
        };
        checkAuth();
    }, [navigate]);






    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltips = Array.from(tooltipTriggerList).map(
            (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
        );
        return () => {
            tooltips.forEach((tooltip) => tooltip.dispose());
        };
    }, []);

    const stats = [
        { label: 'Total Ordered', value: 17098, icon: faBoxOpen },
        { label: 'Ordered Today', value: 107, icon: faCartShopping },
        { label: 'In Transit', value: 357, icon: faTruckFast },
        { label: 'Total Users', value: 6945, icon: faUsers },
    ];


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

    const TransactionTable = () => {
        const transactions = [
            { name: 'Jagarnath S.', date: '24.08.2024', amount: 124.97, status: 'Paid' },
            { name: 'Pankaj Tripathi', date: '23.08.2028', amount: 4565.34, status: 'Pending' },
            { name: 'Akash Boss', date: '23.08.2024', amount: 465.25, status: 'Paid' },
            { name: 'Sarkar S.', date: '23.08.2028', amount: 415.25, status: 'Paid' },
            { name: 'Moon Sun', date: '23.08.2028', amount: 256.12, status: 'Paid' },
            { name: 'Jagarnath S.', date: '24.08.2024', amount: 124.97, status: 'Paid' },
            { name: 'Pankaj Tripathi', date: '23.08.2028', amount: 4565.34, status: 'Pending' },
            { name: 'Akash Boss', date: '23.08.2024', amount: 465.25, status: 'Paid' },
            { name: 'Sarkar S.', date: '23.08.2028', amount: 415.25, status: 'Paid' },
            { name: 'Moon Sun', date: '23.08.2028', amount: 256.12, status: 'Paid' },
        ];

        return (
            <table className="w-100">
                <thead>
                    <tr>
                        <th>
                            Name
                            <SortButton ascIcon={faArrowDownAZ} descIcon={faArrowDownZA} />
                        </th>
                        <th>
                            Date
                            <button className="shortButton border-0 bg-transparent mx-1">
                                <span className="asc d-none">
                                    <FontAwesomeIcon icon={faCalendarDays} />
                                    <FontAwesomeIcon icon={faArrowDownLong} />
                                </span>
                                <span className="desc">
                                    <FontAwesomeIcon icon={faCalendarDays} />
                                    <FontAwesomeIcon icon={faArrowDownLong} />
                                </span>
                            </button>
                        </th>
                        <th>
                            Ammount
                            <SortButton ascIcon={faArrowDownWideShort} descIcon={faArrowDownShortWide} />
                        </th>
                        <th>
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((txn, index) => (
                        <tr key={index}>
                            <td>{txn.name}</td>
                            <td>{txn.date}</td>
                            <td>&#8377;<span className="amountTable">{txn.amount.toFixed(2)}</span></td>
                            <td><span className={txn.status.toLowerCase()}>{txn.status}</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };


    const TopProductsTable = () => {
        const products = [
            { name: 'Adicolor Classics Joggers', price: 549, units: 123 },
            { name: 'Nike Sportswear Futura Luxe', price: 2199, units: 654 },
            { name: 'Geometric Print Scarf', price: 349, units: 54 },
            { name: 'Yellow Reserved Hoodie', price: 2599, units: 6541 },
            { name: 'Basic Dress Green', price: 2449.12, units: 654 },
        ];

        return (
            <table className="w-100">
                <thead>
                    <tr>
                        <th>
                            Name
                            <SortButton ascIcon={faArrowDownAZ} descIcon={faArrowDownZA} />
                        </th>
                        <th>
                            Price
                            <SortButton ascIcon={faArrowDownWideShort} descIcon={faArrowDownShortWide} />
                        </th>
                        <th>
                            Unit Sold
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{product.name}</td>
                            <td>&#8377;<span className="amountTable">{product.price.toFixed(2)}</span></td>
                            <td>{product.units}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };



    return (
        <>
            <div className="container dashBoardContainer">
                <h1 className="text-center py-3 roboto sectHead text-capitalize text-dark">
                    dashboard
                </h1>
                <div className="d-flex justify-content-between align-items-center py-3">
                    <TimeNow />
                </div>
                <div className="row">
                    {stats.map((stat, index) => (
                        <div className="col-12 col-xl-3 col-lg-6 my-1" key={index}>
                            <div className="border dashTopper rounded d-flex p-2 align-items-center justify-content-evenly">
                                <div className="itmHd">
                                    <h2 className="fw-bolder fs-4 text-dark">{stat.value}</h2>
                                    <span className="fw-bolder">{stat.label}</span>
                                </div>
                                <div className="logohd">
                                    <FontAwesomeIcon icon={stat.icon} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="row pt-3">
                    <div className="col-12 col-xl-6 my-1">
                        <div className="pannelDashed pannelDashedleft bg-light rounded border p-3">
                            <h1 className="fs-3 py-3 roboto sectHead text-capitalize text-dark">
                                Recent Transaction
                            </h1>
                            <div className="dashedTable">
                                <TransactionTable />
                            </div>

                        </div>
                    </div>

                    <div className="col-12 col-xl-6 my-1">
                        <div className="pannelDashed pannelDashedright bg-light rounded border p-3">
                            <h1 className="fs-3 py-3 roboto sectHead text-capitalize text-dark">
                                Top Products by Units Sold
                            </h1>
                            <div className="dashedTable">
                                <TopProductsTable />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Dashboard
