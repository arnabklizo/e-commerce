import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../../components/loader/loader';
import { Tooltip } from "bootstrap";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCirclePlus,
    faFilter,
    faMagnifyingGlass,
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
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { getAllProducts, delProduct, getCategories } from '../../../services/api';
import TimeNow from '../../../components/timer/TimeNow';
import '../allProducts/AllProducts.css';



const AllProducts = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [count, setCount] = useState(0);


    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortField, setSortField] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');
    const [selectedCategory, setSelectedCategory] = useState('all');

    //fetch categories 
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await getCategories();
            setCategories(response.data.categories);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        } finally {
            setLoading(false)
        }
    };

    // fetch products 
    const fetchProducts = async (page = 1, limit = 5, category = '') => {
        setLoading(true);
        try {
            const response = await getAllProducts(page, limit, sortField, sortOrder, category);
            setProducts(response.data.products);
            setCount(response.data.totalCount);
            setTotalPages(Math.ceil(response.data.totalCount / limit));
            setCurrentPage(page);
        } catch (error) {
            console.error('Failed to fetch products:', error);
            toast.error('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchProducts(currentPage, 5, selectedCategory);
        fetchCategories();
    }, [sortField, sortOrder, currentPage, selectedCategory]);


    //delete Product
    const deleteProduct = async (id) => {
        console.log(id)
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                setLoading(true);
                await delProduct(id);
                setProducts(products.filter((product) => product._id !== id));
                toast.success('Product deleted successfully !!');
                setLoading(false);
            } catch (error) {
                console.error('Failed to delete category:', error);
                console.log(error.message);
                toast.error('Error deleting category. Please try again.');
                setLoading(false);
            }
        }
    };

    // short 
    const handleSort = (field) => {
        const newSortOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(newSortOrder);
    };

    // Handle page changes
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage); // Update page, triggers fetch due to useEffect
    };

    // Handler for category selection change
    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);
        setCurrentPage(1); // Reset to the first page on category change
        fetchProducts(1, 5, category === ' ' ? '' : category); // Pass empty string for "All products"
    };


    // backend end here 
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('adminToken');
        if (!token) {
            navigate("/adminLogin");
        }
    }, [navigate]);


    // tooltip 
    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltips = Array.from(tooltipTriggerList).map(
            (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
        );

        return () => {
            tooltips.forEach((tooltip) => tooltip.dispose());
        };
    }, [products]);






    // short button 
    const SortButton = ({ field, ascIcon, descIcon, shortText }) => (
        <button
            className="sortButton border-0 bg-transparent mx-1"
            onClick={() => handleSort(field)}
            data-bs-toggle="tooltip"
            title={`Short ${shortText}`}
            data-bs-placement="bottom"
        >
            <FontAwesomeIcon icon={sortField === field && sortOrder === 'asc' ? ascIcon : descIcon} />
        </button>
    );



    const ProductInfo = ({ imageSrc, name, useFor }) => (
        <div className="d-flex align-items-center productInfo">
            <div className="prdctPrv border me-1">
                <img src={imageSrc} alt={`${name} preview`} className="w-100" />
            </div>
            <div>
                <span className="productName fw-bold">{name}</span>
                <div className="category fw-bold text-capitalize">{useFor}</div>
            </div>
        </div>
    );

    const ProductLists = () => (
        <table className="w-100">
            <thead>
                <tr>
                    <th>Product
                        <SortButton
                            field="name"
                            ascIcon={faArrowDownAZ}
                            descIcon={faArrowDownZA}
                            shortText={'alphabetically'}
                        />
                    </th>
                    <th>Inventory
                        <SortButton
                            field="inStock"
                            ascIcon={faArrowDownShortWide}
                            descIcon={faArrowDownWideShort}
                            shortText={'by number'}
                        />
                    </th>
                    <th>Price
                        <SortButton
                            field="price"
                            ascIcon={faArrowDownShortWide}
                            descIcon={faArrowDownWideShort}
                            shortText={'by number'}
                        />
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
                        {/* <td>{item.avgRate} ({item.vote} Votes)</td> */}
                        <td>5.0 (4.8 Votes)</td>
                        <td>
                            <div className="d-flex">
                                <Link
                                    to="#"
                                    className="editBtn tableBtn m-1"
                                    data-bs-title="Edit Product"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="bottom"
                                >
                                    <FontAwesomeIcon icon={faPencil} />
                                </Link>
                                <Link to={`/previewProduct/${product._id}`} className="prevwBtn tableBtn m-1" data-bs-title="Preview Product" data-bs-toggle="tooltip" data-bs-placement="bottom">
                                    <FontAwesomeIcon icon={faEye} />
                                </Link>
                                <button className="deltBtn tableBtn m-1" data-bs-title="Delete Product" data-bs-toggle="tooltip" data-bs-placement="bottom" onClick={() => deleteProduct(product._id)}>
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    // filter by category 
    const FilterCategory = () => (
        <div className="filterBox d-flex align-items-center w-25">
            <label htmlFor="filterCategory" className="me-2 fw-bold">
                <FontAwesomeIcon icon={faFilter} className="me-1" />
                Category:
            </label>
            <select
                id="filterCategory"
                className="form-select w-50"
                aria-label="Default select example"
                value={selectedCategory}
                onChange={handleCategoryChange}
            >
                <option value=" ">All products</option>
                {categories.map((category) => (
                    <option value={category.name} key={category.name}>
                        {category.name.toUpperCase()}
                    </option>
                ))}
            </select>
        </div>
    );


    const SearchBar = () => (
        <div className="filterBox d-flex align-items-center w-25 ms-sm-3">
            <form className="input-group" >
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

    // pagination 
    const FooterPagination = () => (
        <nav>
            <ul className="pagination mb-0">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link border border-dark" data-bs-title="Previous Page" data-bs-toggle="tooltip" data-bs-placement="bottom" onClick={() => fetchProducts(currentPage - 1)}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <li className="page-item" key={page}>
                        <button
                            className={`page-link ${page === currentPage ? 'pageSelected' : ''}`}
                            onClick={() => handlePageChange(page)}
                            data-bs-toggle="tooltip"
                            title={`Go to page ${page}`}
                            data-bs-placement="bottom"
                        >{page}</button>
                    </li>
                ))}

                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className='page-link border border-dark' data-bs-title="Next Page" data-bs-toggle="tooltip" data-bs-placement="bottom" onClick={() => fetchProducts(currentPage + 1)}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </li>
            </ul>
        </nav>
    );

    return (
        <div className="container dashBoardContainer">
            <h1 className="text-center py-3 roboto sectHead text-capitalize text-dark">all products</h1>
            <div className="d-flex justify-content-between align-items-center py-3">

                <TimeNow />

                <Link to="/addProduct" className="btn btn-dark addPrdct">
                    <FontAwesomeIcon icon={faCirclePlus} className="me-2" />
                    Add new product
                </Link>
            </div>
            <div className="silterSearch my-2 d-flex align-items-center justify-content-between">
                <FilterCategory />
                <SearchBar />
            </div>
            <div className="pannelDashed pannelDashedallPrdct allProductTable bg-light rounded border p-3">
                <h1 className="fs-3 py-3 roboto sectHead text-capitalize text-dark">
                    all products <span className="fw-bold">({count})</span>
                </h1>
                {loading ? (
                    <Loader itemName={'Loading product'} />
                ) : products.length === 0 ? (
                    <p className='text-center pt-3'>No products available.</p>
                ) : (
                    <ProductLists />
                )}

            </div>
            <div className="d-flex border rounded align-items-center justify-content-between p-2 px-3 mt-3 bg-light mb-2">
                <div className="productNumbers text-dark fw-bolder">
                    <span className="fw-bold">{count}</span> Products
                </div>
                <FooterPagination />
            </div>
        </div>
    );
};

export default AllProducts;
