import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ConfirmationModal from '../../../modals/confirmationModal/ConfirmationModal';
import {
    faCirclePlus,
    faFilter,
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
import { Tooltip } from "bootstrap";
import { toast } from 'react-toastify';
import Loader from '../../../components/loader/Loader';
import TimeNow from '../../../components/timer/TimeNow';
import { getAllProducts, delProduct, getCategories } from '../../../services/api';
import 'react-toastify/dist/ReactToastify.css';
import '../allProducts/AllProducts.css';

const AllProducts = () => {
    const [productId, setProductId] = useState('')
    const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortField, setSortField] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');
    const [selectedCategory, setSelectedCategory] = useState('');



    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltips = Array.from(tooltipTriggerList).map(el => new Tooltip(el));
        return () => tooltips.forEach(tooltip => tooltip.dispose());
    }, [products]);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await getCategories();
            setCategories(response.data.categories);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchProducts = async (page = 1, limit = 5, category = '') => {
        setLoading(true);
        try {
            const { data } = await getAllProducts(page, limit, sortField, sortOrder, category, searchQuery);
            setProducts(data.products);
            setCount(data.totalCount);
            setTotalPages(Math.ceil(data.totalCount / limit));
            setCurrentPage(page);
        } catch (error) {
            toast.error('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(currentPage, 5, selectedCategory);
        fetchCategories();
    }, [sortField, sortOrder, currentPage, selectedCategory, searchQuery]);

    const deleteCategory = (id) => {
        setConfirmModalVisible(true);
        setProductId(id); // Store the category ID to delete
    };

    const handleConfirmDelete = async (productId) => {
        setConfirmModalVisible(false);
        setLoading(true);
        try {
            const { data } = await delProduct(productId);
            setProducts(prev => prev.filter(product => product._id !== productId));
            toast.success(data.message);
            fetchProducts(1, 5, selectedCategory);
        } catch (error) {
            toast.error('Error deleting category. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to the first page on a new search
    };

    const handleSort = (field) => {
        setSortField(field);
        setSortOrder(prev => (sortField === field && prev === 'asc' ? 'desc' : 'asc'));
    };

    const handlePageChange = (newPage) => setCurrentPage(newPage);

    const handleCategoryChange = (event) => {
        const category = event.target.value.trim(); // Ensure no accidental whitespace
        setSelectedCategory(category);
        setCurrentPage(1); // Reset to the first page
    };

    const closeConfirmModal = () => { setConfirmModalVisible(false) }

    const SortButton = ({ field, ascIcon, descIcon, shortText }) => (
        <button
            className="sortButton border-0 bg-transparent mx-1"
            onClick={() => handleSort(field)}
            data-bs-toggle="tooltip"
            title={`Sort ${shortText}`}
            data-bs-placement="bottom"
        >
            <FontAwesomeIcon icon={sortField === field && sortOrder === 'asc' ? ascIcon : descIcon} />
        </button>
    );

    const ProductInfo = ({ imageSrc, name, useFor }) => (
        <div className="d-flex align-items-center prdctTble1s">
            <div className="prdctPrv border me-1">
                <img src={imageSrc} alt={`${name} preview`} className="w-100" />
            </div>
            <div>
                <span className="prductName fw-bold">{name}</span>
                <div className="categoryTable fw-bold text-capitalize">{useFor}</div>
            </div>
        </div>
    );

    const ProductLists = () => (
        <table className="w-100">
            <thead>
                <tr>
                    <th>Product
                        <SortButton field="name" ascIcon={faArrowDownAZ} descIcon={faArrowDownZA} shortText="alphabetically" />
                    </th>
                    <th>Inventory
                        <SortButton field="inStock" ascIcon={faArrowDownShortWide} descIcon={faArrowDownWideShort} shortText="by stock" />
                    </th>
                    <th>Price
                        <SortButton field="price" ascIcon={faArrowDownShortWide} descIcon={faArrowDownWideShort} shortText="by price" />
                    </th>
                    <th>Rating</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product._id}>
                        <td><ProductInfo imageSrc={product.imageUrl[0]} name={product.name} useFor={product.category.name} /></td>
                        <td>{product.inStock} in stock</td>
                        <td>&#8377;<span className="ammountTable">{product.price}</span></td>
                        <td>5.0 (4.8 Votes)</td>
                        <td>
                            <div className="d-flex">
                                <Link to={`/updateProduct/${product._id}`} className="editBtn tableBtn m-1" data-bs-title="Edit Product" data-bs-toggle="tooltip">
                                    <FontAwesomeIcon icon={faPencil} />
                                </Link>
                                <Link to={`/previewProduct/${product._id}`} className="prevwBtn tableBtn m-1" data-bs-title="Preview Product" data-bs-toggle="tooltip">
                                    <FontAwesomeIcon icon={faEye} />
                                </Link>
                                <button className="deltBtn tableBtn m-1" data-bs-title="Delete Product" data-bs-toggle="tooltip" onClick={() => deleteCategory(product._id)}>
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const FilterCategory = () => (
        <div className="filterBox d-flex align-items-center w-25">
            <label htmlFor="filterCategory" className="me-2 fw-bold">
                <FontAwesomeIcon icon={faFilter} className="me-1" /> Category:
            </label>
            <select
                id="filterCategory"
                className="form-select w-50"
                value={selectedCategory}
                onChange={handleCategoryChange}
            >
                <option value="">All products</option>
                {categories.map(category => (
                    <option key={category.name} value={category.name}>{category.name.toUpperCase()}</option>
                ))}
            </select>
        </div>
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
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <li key={page} className="page-item">
                        <button
                            className={`page-link ${page === currentPage ? 'pageSelected' : ''}`}
                            onClick={() => handlePageChange(page)}
                            data-bs-toggle="tooltip"
                            title={`Page ${page}`}
                            data-bs-placement="bottom"
                        >{page}</button>
                    </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                        className="page-link border border-dark"
                        onClick={() => handlePageChange(currentPage + 1)}
                        data-bs-toggle="tooltip"
                        title="Next Page"
                        data-bs-placement="bottom"
                    >
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </li>
            </ul>
        </nav>
    );

    return (
        <div className="container dashBoardContainer">
            <h1 className="text-center py-3 roboto sectHead text-capitalize text-dark">All Products</h1>
            <div className="d-flex justify-content-between align-items-center py-3">
                <TimeNow />
                <Link to="/addProduct" className="btn btn-dark addPrdct">
                    <FontAwesomeIcon icon={faCirclePlus} className="me-2" /> Add new product
                </Link>
            </div>
            <div className="silterSearch my-2 d-flex align-items-center justify-content-between">
                <FilterCategory />
                <div className="filterBox d-flex align-items-center w-25 ms-sm-3">
                    <form className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search product"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />

                    </form>
                </div>
            </div>
            <div className="pannelDashed pannelDashedallPrdct allProductTable bg-light rounded border p-3">
                <h1 className="fs-3 py-3 roboto sectHead text-capitalize text-dark">
                    All Products <span className="fw-bold">({count})</span>
                </h1>
                {loading ? (
                    <Loader itemName="Loading product" />
                ) : products.length === 0 ? (
                    <p className="text-center pt-3">No products available.</p>
                ) : (
                    <>
                        <ProductLists />
                    </>
                )}
            </div>
            <div className="d-flex border rounded align-items-center justify-content-between p-2 px-3 mt-3 bg-light mb-2">
                <div className="productNumbers text-dark fw-bolder">
                    {/* All Products <span className="fw-bold">({count})</span> */}
                </div>
                <FooterPagination />
            </div>
            <ConfirmationModal
                isVisible={isConfirmModalVisible}
                onClose={closeConfirmModal}
                message={'Product'}
                onConfirm={handleConfirmDelete}
                categoryId={productId}
            />
        </div>
    );
};

export default AllProducts;
