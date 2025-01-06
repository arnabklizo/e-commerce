import React, { useState, useEffect } from 'react';
import { Tooltip } from 'bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import CategoryAdd from '../../../modals/categoryModal/CategoryAdd';
import TimeNow from '../../../components/timer/TimeNow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass,
    faCirclePlus,
    faPencil,
    faTrashCan,
    faEye,
    faArrowDownZA,
    faArrowDownWideShort,
    faArrowDownShortWide,
    faArrowDownAZ,
    faArrowLeft,
    faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { product } from '../../../constans/product';
import { Link } from 'react-router-dom';
import '../categoryList/category.css';


const CategoryList = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('adminToken');
        // console.log(token)
        if (!token) {
            navigate("/adminLogin");
        }
    }, [navigate]);





    const [isVisibleCat, setVisibleCat] = useState(false);
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
        <form className="input-group">
            <input type="text" className="form-control" placeholder="Search product" />
            <button className="input-group-text">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </form>
    )

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

    const category = [
        { name: 'Men T-shirts', inStock: 38 },
        { name: 'Women T-shirts', inStock: 38 },
        { name: 'Wrist watch', inStock: 355 },
        { name: 'Glasses', inStock: 87 },
        { name: 'Hats', inStock: 56 },
    ];

    const CategoryTable = () => {
        return (
            <table className="w-100">
                <thead>
                    <tr>
                        <th>
                            Product Name
                            <SortButton ascIcon={faArrowDownAZ} descIcon={faArrowDownZA} />
                        </th>
                        <th>
                            Items
                            <SortButton ascIcon={faArrowDownWideShort} descIcon={faArrowDownShortWide} />
                        </th>

                        <th>

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {category.map((cat, index) => (
                        <tr key={index}>
                            <td>
                                <div className="d-flex align-items-center">
                                    <span className="catPicIc">
                                        <img src={product.jogger} alt="" className="catIconPics w-100 h-100" />
                                    </span>
                                    <span className="catNamess fw-bold ms-2">
                                        {cat.name}
                                    </span>
                                </div>
                            </td>
                            <td>
                                <span className="productNumbs">{cat.inStock}</span> Items
                            </td>
                            <td>
                                <div className="d-flex align-items-center justify-content-center">
                                    <button className="editRegisteredBtn rounded border text-dark p-2 m-1" type="button"
                                        data-bs-target="#editCategoryModal" data-bs-toggle="modal">
                                        <FontAwesomeIcon icon={faPencil} /> Edit This Category
                                    </button>


                                    <button className="editRegister rounded border text-dark p-2 m-1"
                                        data-bs-toggle="tooltip" data-bs-placement="bottom"
                                        data-bs-title="Delete this category">
                                        <FontAwesomeIcon icon={faTrashCan} /> Delete this category
                                    </button>
                                </div>
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
    const categoryToggler = () => (
        setVisibleCat(!isVisibleCat)
    )
    return (
        <>
            <div className="container dashBoardContainer">
                {/* <!-- page header  --> */}
                <h1 className="text-center py-3 roboto sectHead text-capitalize text-dark">
                    All catagories
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
                        <div className=" h-100 d-flex align-items-center justify-content-end pb-1">
                            <TimeNow />
                        </div>
                    </div>
                </div>



                {/* <!-- Product List  --> */}
                <div className="pannelDashed pannelDashedOrdrList categoryListTable bg-light rounded border p-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="fs-3 py-3 roboto sectHead text-capitalize text-dark">
                            All Category <span className="fw-bold">(28)</span>
                        </h1>
                        <div className="d-flex justify-content-end align-items-center">
                            <button className="categoryAddBtn btn btn-dark whiteIcon align-items-center d-flex fs-5 fw-bold mb-3"
                                type="button" onClick={categoryToggler}>
                                <FontAwesomeIcon icon={faCirclePlus} className='me-2' />
                                Add Category
                            </button>
                        </div>
                    </div>
                    <CategoryTable />
                </div>

                {/* <!-- pagination  --> */}
                <div className="d-flex border rounded align-items-center justify-content-between p-2 px-3 mt-3 bg-light mb-2">
                    <div className="productNumbers text-dark fw-bolder">
                        <span className="fw-bold">28</span> Categories
                    </div>
                    <div>
                        <FooterPagination />
                    </div>
                </div>
            </div>
            <CategoryAdd isVisible={isVisibleCat} onClose={categoryToggler} />
        </>
    )
}

export default CategoryList
