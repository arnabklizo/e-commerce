import React, { useState, useEffect, useCallback } from 'react';
import ReactQuill from 'react-quill';
import { Tooltip } from 'bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../../components/loader/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faLeftLong } from '@fortawesome/free-solid-svg-icons';
import 'react-quill/dist/quill.snow.css';
import '../newProduct/newProduct.css';
import { getCategories, getProduct, updateProduct } from '../../../services/api';
import { toast } from 'react-toastify';

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

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
        const fetchData = async () => {
            try {
                const [categoriesResponse, productResponse] = await Promise.all([
                    getCategories(),
                    getProduct(id),
                ]);
                setCategories(categoriesResponse.data.categories);
                setFormData((prev) => ({
                    ...prev,
                    productName: productResponse.data.name,
                    productDescription: productResponse.data.description,
                    productStock: productResponse.data.inStock,
                    productPrice: productResponse.data.price,
                    discountPrice: productResponse.data.discountPrice,
                    productFor: productResponse.data.productFor,
                    productFeatures: productResponse.data.productFeatures,
                    categories: productResponse.data.category._id,
                    images: productResponse.data.imageUrl,
                }));
            } catch (error) {
                toast.error('Error fetching data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, navigate]);

    useEffect(() => {
        const tooltips = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
            .map((el) => new Tooltip(el));
        return () => tooltips.forEach((tooltip) => tooltip.dispose());
    }, [categories]);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();

        // Append all fields to FormData
        Object.entries(formData).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                if (key === 'images') {
                    // Append each file separately
                    value.forEach((file) => form.append('images', file));

                } else {
                    // For other arrays, stringify the values
                    form.append(key, JSON.stringify(value));
                }
            } else {
                form.append(key, value);
            }
        });

        try {
            setLoading(true);
            const { data } = await updateProduct(id, form); // Pass FormData to API
            toast.success(data.message);
            navigate('/allProducts');
        } catch (error) {
            console.error('Error updating product:', error.response?.data || error.message);
            toast.error(error.response?.data?.error || 'Error updating product');
        } finally {
            setLoading(false);
        }
    };


    const handleFeatureChange = () => {
        if (newFeature.trim()) {
            setFormData((prev) => ({
                ...prev,
                productFeatures: [...prev.productFeatures, newFeature],
            }));
            setNewFeature('');
        }
    };

    const handleDelete = (key, index) => {
        setFormData((prev) => ({
            ...prev,
            [key]: prev[key].filter((_, idx) => idx !== index),
        }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files).filter((file) => file.type.startsWith('image/'));
        setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
    };

    return (
        <section className="addednewProduct position-relative">
            <div className="container">
                <h1 className="text-center roboto sectHead text-capitalize text-dark pt-4 pb-3">Edit Product</h1>
                {loading ? (
                    <div className="my-5 py-5">
                        <Loader itemName="Uploading product" />
                    </div>
                ) : (
                    <form className="rounded border newProduct p-3 mb-3" onSubmit={handleSubmit}>
                        {/* Information Section */}
                        <div className="row">
                            <div className="col-12 col-lg-6">
                                <div className="fw-bolder text-dark fs-5 mb-3">Information</div>
                                <div className="mb-3">
                                    <label htmlFor="nameOfProduct" className="form-label">Product Name</label>
                                    <input className="form-control" id="nameOfProduct" placeholder="Type New Product Name" value={formData.productName} onChange={handleInputChange} name="productName" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="productDescription" className="form-label">Product Description</label>
                                    <ReactQuill
                                        className="bg-white border rounded"
                                        value={formData.productDescription}
                                        modules={{ toolbar: [['bold', 'italic', 'underline']] }}
                                        onChange={(content) => setFormData((prev) => ({ ...prev, productDescription: content }))}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="productNumbs" className="form-label">Product in Stock</label>
                                    <input className="form-control" type="number" id="productNumbs" placeholder="Enter number of stock" value={formData.productStock} onChange={handleInputChange} name="productStock" required />
                                </div>
                                {/* Image Upload Section */}
                                <div className="upload-container">
                                    <label className="form-label">Upload Images</label>
                                    <div id="drop-area" className="drop-area text-center">
                                        <label htmlFor="file-input" className="upload-btn btn mb-3 btn-outline-primary">Click to Upload</label>
                                        <p>It should include at least two pictures</p>
                                        <input type="file" id="file-input" className="file-input" accept="image/*" multiple onChange={handleImageUpload} />
                                    </div>
                                    <div id="image-preview" className="image-preview m-auto">
                                        {formData.images.map((image, idx) => (
                                            <div key={idx} className="image-preview-item position-relative">
                                                <img src={image instanceof Blob ? URL.createObjectURL(image) : image} alt={`Preview ${idx}`} className="img-thumbnail" />
                                                {formData.images.length > 2 &&
                                                    <button type="button"
                                                        className="btn btn-sm btn-danger position-absolute bottom-0 start-50 translate-middle-x"
                                                        onClick={() => handleDelete('images', idx)}
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="bottom"
                                                        data-bs-title="Remove"
                                                    >
                                                        <FontAwesomeIcon icon={faTrashCan} />
                                                    </button>
                                                }
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Pricing & Features */}
                            <div className="col-12 col-lg-6">
                                {/* Pricing Section */}
                                <div className="fw-bolder text-dark fs-5 mb-3">Price</div>
                                <div className="mb-3">
                                    <label htmlFor="priceOfProduct" className="form-label">Product Price</label>
                                    <input className="form-control" type="number" id="priceOfProduct" placeholder="Enter price" value={formData.productPrice} onChange={handleInputChange} name="productPrice" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="discountPriceOfProduct" className="form-label">Discount Price</label>
                                    <input className="form-control" type="number" id="discountPriceOfProduct" placeholder="Enter discounted price" value={formData.discountPrice} onChange={handleInputChange} name="discountPrice" />
                                </div>
                                {/* product for  */}
                                <div className="fw-bolder text-dark fs-5 mb-3">Product For</div>
                                <div className="mb-3">
                                    <label htmlFor="productFor" className="form-label">Product For</label>
                                    <select id="productFor" value={formData.productFor} onChange={handleInputChange} name="productFor" className="form-control" required>
                                        <option value="" disabled>Open this select menu</option>
                                        <option value="men">Men</option>
                                        <option value="women">Women</option>
                                        <option value="boy">Boy</option>
                                        <option value="girl">Girl</option>
                                        <option value="unisex">Unisex</option>
                                    </select>
                                </div>
                                {/* Features */}
                                <div className="fw-bolder text-dark fs-5 mb-3">Add Features</div>
                                <div className="d-flex align-items-center flex-column-reverse flex-lg-row">
                                    <button type="button" className="addFeatures btn btn-dark my-2" onClick={handleFeatureChange}>Add Product Features</button>
                                    <input type="text" className="form-control featuresInp" placeholder="Enter key point here" value={newFeature} onChange={(e) => setNewFeature(e.target.value)} />
                                </div>
                                <ul className="list-unstyled keyPointList">
                                    {formData.productFeatures.map((feature, idx) => (
                                        <li key={idx} className="d-flex justify-content-between align-items-center">
                                            <span>{feature}</span>
                                            <button
                                                type="button"
                                                className="btn btn-sm border border-dark"
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="bottom"
                                                data-bs-title="Remove"
                                                onClick={() => handleDelete('productFeatures', idx)}
                                            >
                                                <FontAwesomeIcon icon={faTrashCan} />
                                            </button>
                                        </li>
                                    ))}
                                </ul>

                                {/* Categories */}
                                <div className="fw-bolder text-dark fs-5 mb-3">Categories</div>
                                <select className="form-select mb-4" name="categories" value={formData.categories} onChange={handleInputChange} required>
                                    <option value="" disabled>Open this select menu</option>
                                    {categories.map((category) => (
                                        <option key={category._id} value={category._id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="text-center">
                            <button className="btn btn-dark my-2" type="submit">Update Product</button>
                        </div>
                    </form>
                )}
                <div className="text-center mb-3">
                    <button className="btn goBackBtn  btn-dark d-flex align-items-center justify-content-center" onClick={() => window.history.back()}>
                        <FontAwesomeIcon icon={faLeftLong} className="me-2" />
                        <span className='text-white'>Back</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default UpdateProduct;
