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
        if (file) {
            setFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setImageUrl(reader.result); // Preview image
            };
            reader.readAsDataURL(file);
        }
    };

    // Save category details
    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let uploadedImageUrl = imageUrl; // Keep the existing image URL initially.

            // Check if a new file has been selected
            if (file) {
                const formData = new FormData();
                formData.append('file', file);  // Attach the file to the formData
                formData.append('upload_preset', 'ml_default'); // Your Cloudinary upload preset
                // Debugging: Log the file and FormData
                console.log('File being uploaded:', file);
                console.log('FormData being sent:', formData);

                // Cloudinary image upload request
                const response = await fetch('https://api.cloudinary.com/v1_1/ddjjlvsdi/image/upload', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',  // Commonly used for CORS handling
                    },
                });

                // If the request fails
                if (!response.ok) {
                    throw new Error('Failed to upload image to Cloudinary');
                }

                // Parse the response and get the URL of the uploaded image
                const data = await response.json();

                // Debugging: Log the response from Cloudinary
                console.log('Cloudinary response:', data);


                // If there's an error with Cloudinary's response
                if (!data.secure_url) {
                    throw new Error('Image URL not returned by Cloudinary');
                }

                uploadedImageUrl = data.secure_url; // Set the image URL to the newly uploaded image's URL
            }

            // Pass updated data (including the image URL) to the parent component
            onSave({ ...category, name, imageUrl: uploadedImageUrl });
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
