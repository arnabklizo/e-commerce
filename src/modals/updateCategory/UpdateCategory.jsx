import React, { useState, useEffect } from 'react';
import { Tooltip } from 'bootstrap';
import axios from 'axios';

const UpdateCategory = ({ isVisible, onClose, category, onSave }) => {
    const [name, setName] = useState(category?.name || '');
    const [imageUrl, setImageUrl] = useState(category?.imageUrl || '');
    const [file, setFile] = useState(null); // Store file for upload
    const [loading, setLoading] = useState(false);

    // Populate modal fields when category changes
    useEffect(() => {
        if (category) {
            setName(category.name);
            setImageUrl(category.imageUrl);
        }
    }, [category]);

    // Handle file input and preview
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        // console.log('Selected file:', file);

        if (file) {
            setFile(file);
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
        e.preventDefault();
        setLoading(true);

        try {
            // let uploadedImageUrl = imageUrl;

            // If a new image file is selected, upload it to Cloudinary
            // if (file) {
            //     const formData = new FormData();
            //     formData.append('file', file);
            //     formData.append('upload_preset', 'ml_default'); // Update to your Cloudinary preset


            //     // Upload image to Cloudinary
            //     const response = await fetch('https://api.cloudinary.com/v1_1/ddjjlvsdi/image/upload/', {
            //         method: 'POST',
            //         body: formData,
            //     });

            //     if (!response.ok) {
            //         console.error('Failed to upload image. Status:', response.status, await response.text());
            //         throw new Error('Failed to upload image to Cloudinary');
            //     }

            //     const data = await response.json();
            //     // console.log("Cloudinary Response:", data);
            //     if (!data.secure_url) {
            //         console.error('Cloudinary response does not contain secure_url:', data)
            //         throw new Error('Image URL not returned by Cloudinary');
            //     }

            //     uploadedImageUrl = data.secure_url; // Use the new Cloudinary image URL
            // }

            // Pass the updated category details to the parent component
            onSave({ ...category, name, imageUrl: imageUrl });
            onClose();
        } catch (error) {
            console.error('Error updating category:', error);
            alert('Error updating category. Please try again.');
        } finally {
            setLoading(false);
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
