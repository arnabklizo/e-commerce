import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faLeftLong } from '@fortawesome/free-solid-svg-icons';
import 'react-quill/dist/quill.snow.css';
import '../newProduct/newProduct.css';
import { getCategories } from '../../../services/api';
import { addProduct } from '../../../services/api';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

// Reusable InputField Component
const InputField = ({
    id,
    label,
    placeholder,
    value,
    onChange,
    name,
    as = 'input', // Default to input, can be 'select' or 'textarea'
    children,
    ...props
}) => {
    const Component = as;
    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{label}</label>
            <Component
                id={id}
                className="form-control"
                value={value}
                onChange={onChange}
                name={name}
                placeholder={placeholder}
                {...props}
            >
                {children}
            </Component>
        </div>
    );
};

const NewProduct = () => {
    const [formData, setFormData] = useState({
        productName: '',
        productDescription: '',
        productStock: '',
        productPrice: '',
        discountPrice: '',
        productFor: '',
        productFeatures: [],
        categories: '',
        images: [],
    });
    const [newFeature, setNewFeature] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
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

        fetchCategories();
    }, []);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('adminToken');
        // console.log(token)
        if (!token) {
            navigate("/adminLogin");
        }
    }, [navigate]);


    useEffect(() => {
        const token = Cookies.get('adminToken');
        if (!token) {
            navigate("/adminLogin");
        }
    }, [navigate]);

    useEffect(() => {
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

        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append("productName", formData.productName);
        form.append("productDescription", formData.productDescription);
        form.append("productStock", formData.productStock || 0);
        form.append("productPrice", formData.productPrice);
        form.append("discountPrice", formData.discountPrice || 0);
        form.append("productFor", formData.productFor);
        form.append("categories", formData.categories);
        form.append("productFeatures", JSON.stringify(formData.productFeatures));

        formData.images.forEach((image) => {
            form.append("images", image);
        });

        try {
            setLoading(true);
            const response = await addProduct(form);
            toast.success("Product added successfully!");
            setFormData({
                productName: '',
                productDescription: '',
                productStock: '',
                productPrice: '',
                discountPrice: '',
                productFor: '',
                productFeatures: [],
                categories: '',
                images: [],
            });
            navigate("/allProducts");
        } catch (error) {
            console.error("Error adding product:", error);
            toast.error(error.response.data.error);
            setLoading(true);
        }
    };

    const handleDescriptionChange = (content, delta, source, editor) => {
        setFormData((prev) => ({
            ...prev,
            productDescription: content,
        }));
    };


    // Generic handler for form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle drag over event
    const handleDragOver = (e) => {
        e.preventDefault(); // Prevent default behavior to allow drop
    };

    // Handle drop event
    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        const validImages = files.filter((file) => file.type.startsWith('image/')); // Filter only images

        if (validImages.length > 0) {
            setFormData((prev) => ({
                ...prev,
                images: [...prev.images, ...validImages], // Add images to the form data
            }));
        }
    };

    // Handle file selection via input
    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        const validImages = files.filter((file) => file.type.startsWith('image/'));

        if (validImages.length > 0) {
            setFormData((prev) => ({
                ...prev,
                images: [...prev.images, ...validImages], // Add images to the form data
            }));
        }
    };

    // Handle product feature add
    const handleFeatureAdd = () => {
        if (newFeature.trim() === '') {
            alert('Please enter a key feature to add.');
        } else {
            setFormData((prev) => ({
                ...prev,
                productFeatures: [...prev.productFeatures, newFeature], // Add feature to list
            }));
            setNewFeature(''); // Clear input field after adding feature
        }
    };

    // Remove product feature
    const handleFeatureDelete = (index) => {
        setFormData((prev) => ({
            ...prev,
            productFeatures: prev.productFeatures.filter((_, idx) => idx !== index),
        }));
    };

    // Remove image from the preview
    const handleImageDelete = (index) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, idx) => idx !== index),
        }));
    };

    return (
        <section className="addednewProduct position-relative">
            <div className="container">
                <h1 className="text-center roboto sectHead text-capitalize text-dark pt-4 pb-3">
                    Add New Product
                </h1>

                <form className="rounded border newProduct p-3 mb-3" onSubmit={handleSubmit}>
                    <div className="row">
                        {/* Left Column */}
                        <div className="col-12 col-lg-6">
                            <div className="fw-bolder text-dark fs-5 mb-3">Information</div>
                            <InputField
                                id="nameOfProduct"
                                label="Product Name"
                                placeholder="Type New Product Name"
                                value={formData.productName}
                                onChange={handleChange}
                                name="productName"
                                required
                            />
                            <div className="mb-3">
                                <label htmlFor="productDescription" className="form-label">Product Description</label>
                                <div id="editor-container" className='border rounded bg-white overflow-hidden'>
                                    <React.StrictMode>
                                        <ReactQuill
                                            value={formData.productDescription}
                                            onChange={handleDescriptionChange}
                                            modules={{ toolbar: [['bold', 'italic', 'underline']] }}
                                        />
                                    </React.StrictMode>

                                </div>
                            </div>
                            <InputField
                                id="productNumbs"
                                label="Product in Stock"
                                type="number"
                                placeholder="Enter number of stock"
                                value={formData.productStock}
                                onChange={handleChange}
                                name="productStock"
                                required
                            />
                            <div className="fw-bolder text-dark fs-5 mb-3">Image</div>
                            <div className="upload-container">
                                <div
                                    id="drop-area"
                                    className="drop-area text-center"
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                >
                                    <label htmlFor="file-input" className="upload-btn btn mb-3 btn-outline-primary">
                                        Click to Upload
                                    </label>
                                    <p>Drag & Drop your picture here or</p>
                                    <input
                                        type="file"
                                        id="file-input"
                                        className="file-input"
                                        accept="image/*"
                                        multiple
                                        onChange={handleFileSelect}
                                    />
                                </div>
                                <div id="image-preview" className="image-preview m-auto">
                                    {formData.images.map((image, idx) => (
                                        <div key={idx} className="image-preview-item position-relative">
                                            <img src={URL.createObjectURL(image)} alt={`Uploaded preview ${idx}`} className="img-thumbnail" />
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-danger position-absolute bottom-0 start-50 translate-middle-x"
                                                onClick={() => handleImageDelete(idx)}
                                            >
                                                <FontAwesomeIcon icon={faTrashCan} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="col-12 col-lg-6">
                            <div className="fw-bolder text-dark fs-5 mb-3">Price</div>
                            <InputField
                                id="priceOfProduct"
                                label="Product Price"
                                type="number"
                                placeholder="Enter price"
                                value={formData.productPrice}
                                onChange={handleChange}
                                name="productPrice"
                                required
                            />
                            <InputField
                                id="discountPriceOfProduct"
                                label="Discount Price"
                                type="number"
                                placeholder="Enter discounted price"
                                value={formData.discountPrice}
                                onChange={handleChange}
                                name="discountPrice"

                            />
                            <div className="fw-bolder text-dark fs-5 mb-3">Product For</div>
                            <InputField
                                as="select"
                                id="productFor"
                                label="Product For"
                                value={formData.productFor}
                                onChange={handleChange}
                                name="productFor"
                                required
                            >
                                <option value="" disabled>Open this select menu</option>
                                <option value="men">Men</option>
                                <option value="women">Women</option>
                                <option value="boy">Boy</option>
                                <option value="girl">Girl</option>
                                <option value="unisex">Unisex</option>
                            </InputField>

                            <div className="fw-bolder text-dark fs-5 mb-3">Add Features for this Product</div>
                            <div className="d-flex align-items-center flex-column-reverse flex-lg-row">
                                <button type="button" className="addFeatures btn btn-dark my-2" onClick={handleFeatureAdd}>
                                    Add Product Features
                                </button>
                                <input
                                    type="text"
                                    className="form-control featuresInp"
                                    id="itemInput"
                                    placeholder="Enter key point here"
                                    value={newFeature}
                                    onChange={(e) => setNewFeature(e.target.value)}
                                />
                            </div>
                            <ul id="listBox" className="list-unstyled keyPointList">
                                {formData.productFeatures.map((feature, idx) => (
                                    <li key={idx} className="d-flex justify-content-between align-items-center">
                                        <span className='text-dark'>{feature}</span>
                                        <button
                                            type="button"
                                            className="btn btn-sm border border-dark"
                                            onClick={() => handleFeatureDelete(idx)}
                                        >
                                            <FontAwesomeIcon icon={faTrashCan} />
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <div className="fw-bolder text-dark fs-5 mb-3">Categories</div>


                            <select
                                className='form-select mb-4'
                                name="categories"
                                value={formData.categories}
                                defaultValue=""
                                onChange={(e) =>
                                    setFormData({ ...formData, categories: e.target.value })
                                }
                                required
                            >
                                <option value="" disabled>Open this select menu</option>

                                {categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>


                        </div>
                    </div>

                    <div className="text-center">
                        <button className="btn btn-dark my-2" type="submit">
                            Save Product Details
                        </button>
                    </div>
                </form>

                <div className="text-center mb-3">
                    <button
                        className="btn goBackBtn btn-dark d-flex align-items-center justify-content-center"
                        onClick={() => window.history.back()}
                    >
                        <FontAwesomeIcon icon={faLeftLong} className='me-2' />
                        <span className="text-light fw-bold">Back</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default NewProduct;
