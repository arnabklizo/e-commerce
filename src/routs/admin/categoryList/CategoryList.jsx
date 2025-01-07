import React, { useState, useEffect } from 'react';
import { Tooltip } from 'bootstrap';
import { Link } from 'react-router-dom';
import { addCategory } from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import CategoryAdd from '../../../modals/categoryModal/CategoryAdd';
import UpdateCategory from '../../../modals/updateCategory/UpdateCategory';
import TimeNow from '../../../components/timer/TimeNow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass,
    faCirclePlus,
    faPencil,
    faTrashCan,
    faArrowDownZA,
    faArrowDownWideShort,
    faArrowDownShortWide,
    faArrowDownAZ,
    faArrowLeft,
    faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { getCategories } from '../../../services/api'
import '../categoryList/category.css';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';

// toast.configure();


const CategoryList = () => {
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const openEditModal = (category) => {
        setSelectedCategory(category);
        setEditModalVisible(true);
    };

    const closeEditModal = () => {
        setEditModalVisible(false);
        setSelectedCategory(null);
    };



    const handleSaveCategory = async (updatedCategory) => {
        try {
            // console.log('updatedCategory:', updatedCategory)
            const response = await axios.put(
                `http://localhost:5000/api/admin/categories/${updatedCategory._id}`,
                updatedCategory
            );

            // console.log('Category updated:', response.data);

            // Update categories in state
            setCategories((prevCategories) =>
                prevCategories.map((cat) =>
                    cat._id === updatedCategory._id ? response.data.category : cat
                )
            );

            // Close modal after success
            closeEditModal();
        } catch (error) {
            console.error('Error updating category:', error);
            alert('Failed to update category. Please try again.');
        }
    };

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isVisibleCat, setVisibleCat] = useState(false);
    const [count, setCount] = useState(0); // Add a state for category count
    const navigate = useNavigate();

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await getCategories();
            setCategories(response.data.categories);
            setCount(response.data.count)
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        } finally {
            setLoading(false);
        }
    };
    // Fetch categories from the backend
    useEffect(() => { fetchCategories(); }, []);

    // delete data
    const deleteCategory = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                // console.log('Sending DELETE request for category ID:', id);
                const response = await axios.delete(`http://localhost:5000/api/admin/categories/${id}`);
                // console.log('Delete response:', response.data);
                setCategories(categories.filter((category) => category._id !== id));
            } catch (error) {
                console.error('Failed to delete category:', error);

                console.log(error.message)
                alert('Error deleting category. Please try again.');
            }
        }
    };

    // Check admin authentication
    useEffect(() => {
        const token = Cookies.get('adminToken');
        if (!token) {
            navigate('/adminLogin');
        }
    }, [navigate]);

    // Initialize tooltips
    useEffect(() => {
        const tooltips = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(
            (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
        );
        return () => tooltips.forEach((tooltip) => tooltip.dispose());
    }, []);



    const toggleCategoryModal = () => { setVisibleCat((prev) => !prev); }

    const onCloseModal = () => {
        toggleCategoryModal();
        fetchCategories();
    }

    const SearchBar = () => (
        <form className="input-group">
            <input type="text" className="form-control" placeholder="Search category" />
            <button className="input-group-text">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </form>
    );

    const SortButton = ({ ascIcon, descIcon }) => (
        <button className="sortButton border-0 bg-transparent mx-1">
            <FontAwesomeIcon icon={ascIcon} className="asc d-none" />
            <FontAwesomeIcon icon={descIcon} className="desc" />
        </button>
    );

    const CategoryTable = () => (
        <table className=" w-100">
            <thead>
                <tr>
                    <th>
                        Category Name
                        <SortButton ascIcon={faArrowDownAZ} descIcon={faArrowDownZA} />
                    </th>
                    <th>
                        Items
                        <SortButton ascIcon={faArrowDownWideShort} descIcon={faArrowDownShortWide} />
                    </th>
                    <th className='text-center'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {categories.map((category) => (
                    <tr key={category._id}>

                        <td>
                            <div className="d-flex align-items-center">
                                <span className="catPicIc">
                                    <img src={category.imageUrl} alt=""
                                        className="catIconPics w-100 h-100" />
                                </span>
                                <span className="catNamess fw-bold ms-2">
                                    {category.name}
                                </span>
                            </div>
                        </td>
                        <td className=''>
                            <div className="d-flex align-items-center h-100">
                                <span className="productNumbs me-1">{category.itemCount}</span> Items
                            </div>
                        </td>
                        <td>
                            <div className="d-flex align-items-center justify-content-center h-100">
                                <button
                                    className="editRegisteredBtn rounded border text-dark p-2 m-1"
                                    data-bs-toggle="tooltip"
                                    title="Edit this category"
                                    onClick={() => openEditModal(category)}
                                >
                                    <FontAwesomeIcon icon={faPencil} /> Edit
                                </button>
                                <button
                                    className="editRegister rounded border text-dark p-2 m-1"
                                    data-bs-toggle="tooltip"
                                    title="Delete this category"
                                    onClick={() => deleteCategory(category._id)}
                                >
                                    <FontAwesomeIcon icon={faTrashCan} /> Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const FooterPagination = () => (
        <nav>
            <ul className="pagination mb-0">
                <li className="page-item">
                    <Link className="page-link" to="#">
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Link>
                </li>
                {[1, 2, 3, '...', 111].map((page, index) => (
                    <li key={index} className="page-item">
                        <Link className={`page-link ${page === 1 ? 'pageSelected' : ''}`} to="#">
                            {page}
                        </Link>
                    </li>
                ))}
                <li className="page-item">
                    <Link className="page-link" to="#">
                        <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                </li>
            </ul>
        </nav>
    );

    return (
        <div className="container dashBoardContainer">
            <h1 className="text-center py-3 roboto sectHead text-dark">All Categories</h1>
            <div className="row mb-3">
                <div className="col-12 col-xl-6">
                    <SearchBar />
                </div>
                <div className="col-12 col-xl-6 d-flex justify-content-end">
                    <TimeNow />
                </div>
            </div>

            <div className="pannelDashed pannelDashedOrdrList categoryListTable bg-light rounded border p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h1 className='fs-3 py-3 roboto sectHead text-capitalize text-dark'>Categories
                        <span className='fw-bold ms-1'>({count})</span>
                    </h1>
                    <button className="categoryAddBtn btn btn-dark align-items-center d-flex fs-5 fw-bold mb-3" onClick={toggleCategoryModal}>
                        <FontAwesomeIcon icon={faCirclePlus} className="me-2" /> Add Category
                    </button>
                </div>
                {loading ? (
                    <p>Loading categories...</p>
                ) : count === 0 ? (
                    <p className='text-center pt-3'>No categories available.</p>
                ) : (
                    <CategoryTable />
                )}
            </div>

            <FooterPagination />
            <CategoryAdd isVisible={isVisibleCat} onClose={onCloseModal} />
            <UpdateCategory
                isVisible={isEditModalVisible}
                category={selectedCategory}
                onClose={closeEditModal}
                onSave={handleSaveCategory}
            />

        </div>
    );
};

export default CategoryList;
