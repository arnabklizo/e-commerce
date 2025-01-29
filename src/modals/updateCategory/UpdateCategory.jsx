import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { updateCategory } from '../../services/api';


const UpdateCategory = ({ isVisible, onClose, category, onSave }) => {
    const [name, setName] = useState(category?.name || '');
    const [imageUrl, setImageUrl] = useState(category?.imageUrl || '');
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null); // Store file for upload
    const [loading, setLoading] = useState(false);

    // Populate modal fields when category changes
    useEffect(() => {
        if (category) {
            setName(category.name);
            setImageUrl(category.imageUrl);
            setImage(category.imageUrl);
        }
    }, [category]);

    // Handle file input and preview
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            setImage(e.target.files[0]);
            const reader = new FileReader();
            reader.onload = () => {
                setImageUrl(reader.result); // Preview image
            };
            reader.readAsDataURL(file);
        } else {
            console.error('No file selected');
        }
    };


    // Save category details

    const handleSave = async (e) => {
        // e.preventDefault();
        // setLoading(true);
        // try {
        //     onSave({ ...category, name, image });
        //     onClose();
        // } catch (error) {
        //     console.error('Error updating category:', error);
        //     alert('Error updating category. Please try again.');
        // } finally {
        //     setLoading(false);
        // }

        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("name", name);
        if (image) {
            formData.append("image", image);
        }

        try {
            const res = await updateCategory(category._id, formData);
            toast.success(res.data.message);
        } catch (error) {
            console.error("Error updating category:", error.response?.data);
        } finally {
            setLoading(false);
            onSave();
            onClose();
        }
    };




    const handleModalClose = (e) => {
        if (e.target.id === 'updateCategory') {
            onClose();
        }
    };

    return (
        <div
            className={`modal fade ${isVisible ? 'show' : ''}`}
            id="updateCategory"
            aria-hidden={!isVisible}
            aria-labelledby="updateCategoryLabel"
            tabIndex="-1"
            style={{ display: isVisible ? 'block' : 'none' }}
            onClick={handleModalClose}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 text-dark" id="updateCategoryLabel">
                            Update Category
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={onClose}
                            title="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSave}>
                            <div className="form-floating mb-3">
                                <input
                                    className="form-control"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Category Name"
                                    required
                                />
                                <label>Category Name</label>
                            </div>
                            <div className="upload-container">
                                <div className="dropping-area text-center">
                                    <label htmlFor="file-input" className="upload-btn btn mb-3 btn-outline-primary">
                                        Click to upload
                                    </label>
                                    <p>Drag & Drop your picture here or</p>
                                    <input
                                        id="file-input"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="d-none"
                                    />
                                </div>
                                {imageUrl && (
                                    <div className="image-preview m-auto mt-2">
                                        <img src={imageUrl} className="img-fluid rounded" alt="Preview" />
                                    </div>
                                )}
                            </div>
                            <hr />
                            <div className="text-center pt-2 mt-2">
                                <button className="btn btn-dark" type="submit" disabled={loading}>
                                    {loading ? 'Updating Category...' : 'Update Category'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateCategory;
