import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import CategoryAdd from '../../../modals/categoryModal/CategoryAdd';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faLeftLong, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import 'react-quill/dist/quill.snow.css';
import '../newProduct/newProduct.css';

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
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('adminToken');
        // console.log(token)
        if (!token) {
            navigate("/adminLogin");
        }
    }, [navigate]);



    const [isVisibleCat, setVisibleCat] = useState(false);
    const [editorHtml, setEditorHtml] = useState('');
    const [formData, setFormData] = useState({
        productName: '',
        productDescription: '',
        productStock: '',
        productPrice: '',
        discountPrice: '',
        productFor: '',
        productFeatures: [],
        categories: '',
        images: [], // For storing the uploaded images
    });
    const [newFeature, setNewFeature] = useState(''); // To store the current feature input

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


    const toggleVissibleCat = () => (
        setVisibleCat(!isVisibleCat)
    )
    return (
        <section className="addednewProduct position-relative">
            <div className="container">
                <h1 className="text-center roboto sectHead text-capitalize text-dark pt-4 pb-3">
                    Add New Product
                </h1>

                <form className="rounded border newProduct p-3 mb-3">
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
                            />
                            <div className="mb-3">
                                <label htmlFor="productDescription" className="form-label">Product Description</label>
                                <div id="editor-container" className='border rounded bg-white overflow-hidden'>
                                    <ReactQuill
                                        value={editorHtml}
                                        onChange={setEditorHtml}
                                        modules={{ toolbar: [['bold', 'italic', 'underline']] }}
                                    />
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
                                    onChange={(e) => setNewFeature(e.target.value)} // Update feature input
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
                            <InputField
                                as="select"
                                id="categories"
                                label="Categories"
                                value={formData.categories}
                                onChange={handleChange}
                                name="categories"
                            >
                                <option value="" disabled>Open this select menu</option>
                                <option value="dress">Dress</option>
                                <option value="bag">Bag</option>
                                <option value="glasses">Glasses</option>
                                <option value="shoe">Shoe</option>
                            </InputField>

                            <button
                                className="categoryAddBtn btn btn-dark d-flex align-items-center fs-5 fw-bold mb-3"
                                type="button"
                                onClick={toggleVissibleCat}
                            >
                                <FontAwesomeIcon icon={faCirclePlus} className='me-2' />
                                Add Category
                            </button>
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
            <CategoryAdd
                isVisible={isVisibleCat}
                onClose={toggleVissibleCat}
            />
        </section>
    );
};

export default NewProduct;
