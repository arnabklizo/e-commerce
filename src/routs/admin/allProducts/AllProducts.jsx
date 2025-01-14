import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import { getAllProducts, delProduct } from '../../../services/api';
import TimeNow from '../../../components/timer/TimeNow';
import '../allProducts/AllProducts.css';

const AllProducts = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    // fetch products 
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await getAllProducts();
            setProducts(response.data.products);
        } catch (error) {
            console.error('Failed to fetch products:', error);
            toast.error('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };
    // Fetch products from the backend
    useEffect(() => { fetchProducts(); }, []);


    //delete Product
    const deleteProduct = async (id) => {
        console.log(id)
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                setLoading(true);
                await delProduct(id);
                setProducts(products.filter((product) => product._id !== id));
                toast.success('Product deleted !!');
                setLoading(false);
            } catch (error) {
                console.error('Failed to delete category:', error);
                console.log(error.message);
                toast.error('Error deleting category. Please try again.');
                setLoading(false);
            }
        }
    };

    // back 
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('adminToken');
        // console.log(token)
        if (!token) {
            navigate("/adminLogin");
        }
    }, [navigate]);



    const [selectedCategory, setSelectedCategory] = useState('all');
    // Handler for category selection change
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

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
                    <th>Product <SortButton ascIcon={faArrowDownAZ} descIcon={faArrowDownZA} /></th>
                    <th>Inventory <SortButton ascIcon={faArrowDownWideShort} descIcon={faArrowDownShortWide} /></th>
                    <th>Price <SortButton ascIcon={faArrowDownWideShort} descIcon={faArrowDownShortWide} /></th>
                    <th>Rating</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product._id}>
                        <td><ProductInfo imageSrc={product.imageUrl[0]} name={product.name} useFor={product.productFor} /></td>
                        <td>{product.inStock} in stock</td>
                        <td>&#8377;<span className="ammountTable">{product.price}</span></td>
                        {/* <td>{item.avgRate} ({item.vote} Votes)</td> */}
                        <td>5.0 (4.8 Votes)</td>
                        <td>
                            <div className="d-flex">
                                <Link to="#" className="editBtn tableBtn m-1" data-bs-title="Edit Product" data-bs-toggle="tooltip" data-bs-placement="bottom">
                                    <FontAwesomeIcon icon={faPencil} />
                                </Link>
                                <Link to="/previewProduct" className="prevwBtn tableBtn m-1" data-bs-title="Preview Product" data-bs-toggle="tooltip" data-bs-placement="bottom">
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
                <option value="all">All products</option>
                <option value="shirt">Shirt</option>
                <option value="bag">Bag</option>
                <option value="shoe">Shoe</option>
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
                    all products <span className="fw-bold">(558)</span>
                </h1>
                <ProductLists />
            </div>
            <div className="d-flex border rounded align-items-center justify-content-between p-2 px-3 mt-3 bg-light mb-2">
                <div className="productNumbers text-dark fw-bolder">
                    <span className="fw-bold">558</span> Products
                </div>
                <FooterPagination />
            </div>
        </div>
    );
};

export default AllProducts;
