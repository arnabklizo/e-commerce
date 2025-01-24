import React, { useState, useEffect } from 'react';
import { Tooltip } from 'bootstrap';
import { useNavigate } from 'react-router-dom';
import { isAdmin } from '../../../services/api';
import TimeNow from '../../../components/timer/TimeNow';
import CategoryAdd from '../../../modals/categoryModal/CategoryAdd';
import UpdateCategory from '../../../modals/updateCategory/UpdateCategory';
import ConfirmationModal from '../../../modals/confirmationMOdal/ConfirmationModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
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
import { getCategories, delCategory, updateCategory } from '../../../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../categoryList/category.css';
import Loader from '../../../components/loader/loader';

const CategoryList = () => {
    const [categoryId, setCategoryId] = useState('')
    const [searchQuery, setSearchQuery] = useState('');
    const [isConfirmModalVisible, setConfirmModalVisible] = useState(false)
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isVisibleCat, setVisibleCat] = useState(false);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortField, setSortField] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');

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
        fetchCategories(currentPage);
    }, [sortField, sortOrder, currentPage, searchQuery]);

    useEffect(() => {
        const tooltips = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(
            (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
        );
        return () => tooltips.forEach((tooltip) => tooltip.dispose());
    }, [categories]);

    const fetchCategories = async (page = 1, limit = 5) => {
        setLoading(true);
        try {
            const response = await getCategories(page, limit, sortField, sortOrder, searchQuery);
            setCategories(response.data.categories);
            setCount(response.data.totalCount);
            setTotalPages(Math.ceil(response.data.totalCount / limit));
            setCurrentPage(page);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveCategory = async (updatedCategory) => {
        try {
            setLoading(true);
            const response = await updateCategory(updatedCategory);
            setCategories((prevCategories) =>
                prevCategories.map((cat) => (cat._id === updatedCategory._id ? response.data.category : cat))
            );
            toast.success('Category updated successfully!');
            closeEditModal();
        } catch (error) {
            console.error('Error updating category:', error);
            toast.error('Failed to update category. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const deleteCategory = (id) => {
        setConfirmModalVisible(true);
        setCategoryId(id); // Store the category ID to delete
    };

    const handleConfirmDelete = async (categoryId) => {
        setConfirmModalVisible(false);
        setLoading(true);
        try {
            await delCategory(categoryId);
            setCategories(categories.filter((category) => category._id !== categoryId));
            toast.success('Category deleted successfully!');
            fetchCategories(1);
        } catch (error) {
            console.error('Failed to delete category:', error);
            toast.error('Error deleting category. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSort = (field) => {
        setSortField(field);
        setSortOrder(sortField === field && sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to the first page on a new search
    };

    const handlePageChange = (newPage) => fetchCategories(newPage);

    const toggleCategoryModal = () => setVisibleCat((prev) => !prev);

    const closeEditModal = () => {
        setEditModalVisible(false);
        setSelectedCategory(null);
    };

    const closeConfirmModal = () => { setConfirmModalVisible(false) }
    const openEditModal = (category) => {
        setSelectedCategory(category);
        setEditModalVisible(true);
    };



    const CategoryTable = () => (
        <table className="w-100">
            <thead>
                <tr>
                    <th>
                        Category Name
                        <SortButton field="name" ascIcon={faArrowDownAZ} descIcon={faArrowDownZA} shortText="alphabetically" />
                    </th>
                    <th>
                        Items
                        <SortButton field="itemCount" ascIcon={faArrowDownShortWide} descIcon={faArrowDownWideShort} shortText="by number" />
                    </th>
                    <th className="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                {categories.map((category) => (
                    <tr key={category._id}>
                        <td>
                            <div className="d-flex align-items-center">
                                <span className="catPicIc">
                                    <img src={category.imageUrl} alt="" className="catIconPics w-100 h-100" />
                                </span>
                                <span className="catNamess fw-bold ms-2">{category.name}</span>
                            </div>
                        </td>
                        <td className="">
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
                                    data-bs-placement="bottom"
                                    onClick={() => openEditModal(category)}
                                >
                                    <FontAwesomeIcon icon={faPencil} /> Edit
                                </button>
                                <button
                                    className="editRegister rounded border text-dark p-2 m-1"
                                    data-bs-toggle="tooltip"
                                    title="Delete this category"
                                    data-bs-placement="bottom"
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

    const SortButton = ({ field, ascIcon, descIcon, shortText }) => (
        <button
            className="sortButton border-0 bg-transparent mx-1"
            onClick={() => handleSort(field)}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title={`Sort ${shortText}`}
        >
            <FontAwesomeIcon icon={sortField === field && sortOrder === 'asc' ? ascIcon : descIcon} />
        </button>
    );

    const FooterPagination = () => (
        <nav>
            <ul className="pagination mb-0">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                        className="page-link border border-dark"
                        onClick={() => handlePageChange(currentPage - 1)}
                        data-bs-toggle="tooltip"
                        title="Previous Page"
                        data-bs-placement="bottom"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <li className="page-item" key={page}>
                        <button
                            data-bs-toggle="tooltip"
                            title={`Page ${page}`}
                            data-bs-placement="bottom"
                            className={`page-link ${page === currentPage ? 'pageSelected' : ''}`}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                        className="page-link border border-dark"
                        data-bs-toggle="tooltip"
                        title="Next Page"
                        data-bs-placement="bottom"
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </li>
            </ul>
        </nav>
    );

    return (
        <div className="container dashBoardContainer">
            <h1 className="text-center py-3 roboto sectHead text-dark">All Categories</h1>
            <div className="row mb-3">
                <div className="col-12 col-xl-6">
                    <form className="input-group" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search category"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </form>
                </div>
                <div className="col-12 col-xl-6 d-flex justify-content-end">
                    <TimeNow />
                </div>
            </div>
            <div className="pannelDashed pannelDashedOrdrList categoryListTable bg-light rounded border p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h1 className="fs-3 py-3 roboto sectHead text-capitalize text-dark">
                        Categories <span className="fw-bold ms-1">({count})</span>
                    </h1>
                    <button className="categoryAddBtn btn btn-dark align-items-center d-flex fs-5 fw-bold mb-3" onClick={toggleCategoryModal}>
                        <FontAwesomeIcon icon={faCirclePlus} className="me-2" /> Add Category
                    </button>
                </div>
                {loading ? (
                    <Loader itemName="Loading categories" />
                ) : count === 0 ? (
                    <p className="text-center pt-3">No categories available.</p>
                ) : (
                    <CategoryTable />
                )}
            </div>
            <div className="d-flex border rounded align-items-center justify-content-between p-2 px-3 mt-3 bg-light mb-2">
                <div className="productNumbers text-dark fw-bolder">
                    <span className="fw-bold">{count}</span> Categories
                </div>
                <FooterPagination />
            </div>
            <CategoryAdd isVisible={isVisibleCat} onClose={() => { toggleCategoryModal(); fetchCategories(); }} />
            <UpdateCategory
                isVisible={isEditModalVisible}
                category={selectedCategory}
                onClose={closeEditModal}
                onSave={handleSaveCategory}
            />
            <ConfirmationModal
                isVisible={isConfirmModalVisible}
                onClose={closeConfirmModal}
                message={'category'}
                onConfirm={handleConfirmDelete}
                categoryId={categoryId}
            />
        </div>
    );
};

export default CategoryList;
