import React, { useState, useEffect, useCallback } from 'react';
import ReactQuill from 'react-quill';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../../components/loader/loader';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faLeftLong } from '@fortawesome/free-solid-svg-icons';
import 'react-quill/dist/quill.snow.css';
import '../newProduct/newProduct.css';
import { getCategories, addProduct, getProduct, updateProduct } from '../../../services/api';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const NewProduct = () => {
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
        const token = Cookies.get('adminToken');
        if (!token) return navigate("/adminLogin");

        const fetchData = async () => {
            try {
                const [categoriesResponse, productResponse] = await Promise.all([getCategories(), id ? getProduct(id) : Promise.resolve(null)]);
                setCategories(categoriesResponse.data.categories);
                if (id && productResponse) {
                    setFormData({
                        ...formData,
                        productName: productResponse.data.name,
                        productDescription: productResponse.data.description,
                        productStock: productResponse.data.inStock,
                        productPrice: productResponse.data.price,
                        discountPrice: productResponse.data.discountPrice,
                        productFor: productResponse.data.productFor,
                        productFeatures: productResponse.data.productFeatures,
                        categories: productResponse.data.category._id,
                        images: productResponse.data.imageUrl,
                    });
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
                toast.error('Error fetching data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, navigate]);

    useEffect(() => {
        return () => {
            formData.images.forEach((image) => {
                if (image instanceof Blob) URL.revokeObjectURL(image);
            });
        };
    }, [formData.images]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();

        // Append the form data to the FormData instance correctly
        Object.entries(formData).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                form.append(key, JSON.stringify(value));
            } else {
                form.append(key, value);
            }
        });

        // Handle images separately, appending each image file to the FormData instance
        formData.images.forEach((image) => {
            if (image instanceof Blob) {
                form.append("images", image);
            } else {
                form.append("existingImages", image); // Handle existing images accordingly
            }
        });

        try {
            console.log('form is:', form)
            setLoading(true);
            if (id) {
                // Edit product if there's an id
                await updateProduct(id, form);  // Use the 'form' object here instead of 'formData'
                toast.success("Product updated successfully!");
            } else {
                // Add new product if no id
                await addProduct(form);  // Use the 'form' object here instead of 'formData'
                toast.success("Product added successfully!");
            }
            setFormData({
                productName: '', productDescription: '', productStock: '',
                productPrice: '', discountPrice: '', productFor: '', productFeatures: [], categories: '', images: []
            });
            navigate("/allProducts");
        } catch (error) {
            console.error("Error submitting product:", error);
            console.error(error.response?.data?.error);
            toast.error(error.response?.data?.error || 'Error submitting product');
            setLoading(false);
        }
    };


    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleDescriptionChange = (content) => {
        setFormData(prev => ({ ...prev, productDescription: content }));
    };

    const handleImageUpdate = (newImages) => {
        setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
    };

    const handleFeatureAdd = () => {
        if (newFeature.trim()) {
            setFormData(prev => ({ ...prev, productFeatures: [...prev.productFeatures, newFeature] }));
            setNewFeature('');
        }
    };

    const handleFeatureDelete = (index) => {
        setFormData(prev => ({ ...prev, productFeatures: prev.productFeatures.filter((_, idx) => idx !== index) }));
    };

    const handleImageDelete = (index) => {
        setFormData(prev => ({ ...prev, images: prev.images.filter((_, idx) => idx !== index) }));
    };

    const handleFileSelect = (e) => {
        try {
            const files = Array.from(e.target.files);
            const validImages = files.filter(file => file.type.startsWith('image/'));
            if (validImages.length) handleImageUpdate(validImages);
        } catch (error) {
            console.error("Image selection error:", error);
            toast.error("Failed to upload images.");
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        const validImages = files.filter(file => file.type.startsWith('image/'));
        if (validImages.length) handleImageUpdate(validImages);
    };

    return (
        <section className="addednewProduct position-relative">
            <div className="container">
                <h1 className="text-center roboto sectHead text-capitalize text-dark pt-4 pb-3">
                    {id ? 'Edit Product' : 'Add New Product'}
                </h1>
                {loading ? (
                    <div className="my-5 py-5"><Loader itemName={'Uploading product'} /></div>
                ) : (
                    <form className="rounded border newProduct p-3 mb-3" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-12 col-lg-6">
                                <div className="fw-bolder text-dark fs-5 mb-3">Information</div>
                                <div className="mb-3">
                                    <label htmlFor="nameOfProduct" className="form-label">Product Name</label>
                                    <input className="form-control" id="nameOfProduct" placeholder="Type New Product Name" value={formData.productName} onChange={handleChange} name="productName" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="productDescription" className="form-label">Product Description</label>
                                    <ReactQuill className="bg-white border rounded" value={formData.productDescription} onChange={handleDescriptionChange} modules={{ toolbar: [['bold', 'italic', 'underline']] }} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="productNumbs" className="form-label">Product in Stock</label>
                                    <input className="form-control" type="number" id="productNumbs" placeholder="Enter number of stock" value={formData.productStock} onChange={handleChange} name="productStock" required />
                                </div>
                                <div className="fw-bolder text-dark fs-5 mb-3">Image</div>
                                <div className="upload-container">
                                    <div id="drop-area" className="drop-area text-center" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
                                        <label htmlFor="file-input" className="upload-btn btn mb-3 btn-outline-primary">Click to Upload</label>
                                        <p>Drag & Drop your picture here or</p>
                                        <input type="file" id="file-input" className="file-input" accept="image/*" multiple onChange={handleFileSelect} />
                                    </div>
                                    <div id="image-preview" className="image-preview m-auto">
                                        {formData.images.map((image, idx) => (
                                            <div key={idx} className="image-preview-item position-relative">
                                                <img src={image instanceof Blob ? URL.createObjectURL(image) : image} alt={`Uploaded preview ${idx}`} className="img-thumbnail" />
                                                <button type="button" className="btn btn-sm btn-danger position-absolute bottom-0 start-50 translate-middle-x" onClick={() => handleImageDelete(idx)}>
                                                    <FontAwesomeIcon icon={faTrashCan} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-lg-6">
                                <div className="fw-bolder text-dark fs-5 mb-3">Price</div>
                                <div className="mb-3">
                                    <label htmlFor="priceOfProduct" className="form-label">Product Price</label>
                                    <input className="form-control" type="number" id="priceOfProduct" placeholder="Enter price" value={formData.productPrice} onChange={handleChange} name="productPrice" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="discountPriceOfProduct" className="form-label">Discount Price</label>
                                    <input id="discountPriceOfProduct" className="form-control" type="number" placeholder="Enter discounted price" value={formData.discountPrice} onChange={handleChange} name="discountPrice" />
                                </div>
                                <div className="fw-bolder text-dark fs-5 mb-3">Product For</div>
                                <div className="mb-3">
                                    <label htmlFor="productFor" className="form-label">Product For</label>
                                    <select id="productFor" value={formData.productFor} onChange={handleChange} name="productFor" className="form-control" required>
                                        <option value="" disabled>Open this select menu</option>
                                        <option value="men">Men</option>
                                        <option value="women">Women</option>
                                        <option value="boy">Boy</option>
                                        <option value="girl">Girl</option>
                                        <option value="unisex">Unisex</option>
                                    </select>
                                </div>

                                <div className="fw-bolder text-dark fs-5 mb-3">Add Features for this Product</div>
                                <div className="d-flex align-items-center flex-column-reverse flex-lg-row">
                                    <button type="button" className="addFeatures btn btn-dark my-2" onClick={handleFeatureAdd}>Add Product Features</button>
                                    <input type="text" className="form-control featuresInp" placeholder="Enter key point here" value={newFeature} onChange={(e) => setNewFeature(e.target.value)} />
                                </div>
                                <ul id="listBox" className="list-unstyled keyPointList">
                                    {formData.productFeatures.map((feature, idx) => (
                                        <li key={idx} className="d-flex justify-content-between align-items-center">
                                            <span className="text-dark">{feature}</span>
                                            <button type="button" className="btn btn-sm border border-dark" onClick={() => handleFeatureDelete(idx)}>
                                                <FontAwesomeIcon icon={faTrashCan} />
                                            </button>
                                        </li>
                                    ))}
                                </ul>

                                <div className="fw-bolder text-dark fs-5 mb-3">Categories</div>
                                <select className="form-select mb-4" name="categories" value={formData.categories} onChange={handleChange} required>
                                    <option value="" disabled>Open this select menu</option>
                                    {categories.map((category) => (
                                        <option key={category._id} value={category._id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-dark my-2" type="submit">
                                {id ? 'Update Product' : 'Save Product Details'}
                            </button>
                        </div>
                    </form>
                )}
                <div className="text-center mb-3">
                    <button className="btn goBackBtn btn-dark d-flex align-items-center justify-content-center" onClick={() => window.history.back()}>
                        <FontAwesomeIcon icon={faLeftLong} className="me-2" />
                        <span className="text-light fw-bold">Back</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default NewProduct;
