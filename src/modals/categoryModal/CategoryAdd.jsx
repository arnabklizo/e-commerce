import React, { useState, useEffect } from 'react';
import { Tooltip } from 'bootstrap';
import { addCategory } from '../../services/api';
import { toast } from "react-toastify";


const CategoryAdd = ({ isVisible, onClose, }) => {

    const [categoryName, setCategoryName] = useState("");
    const [categoryImage, setCategoryImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate if the file is an image
            if (file.type.startsWith("image/")) {
                setCategoryImage(file); // Update state

                // Create a FileReader to read the file
                const reader = new FileReader();
                reader.onload = () => {
                    // Update the preview area with the image
                    const previewElement = document.getElementById("cat-preview");
                    if (previewElement) {
                        previewElement.innerHTML = `<img src="${reader.result}" alt="Category Preview" class="img-fluid rounded"/>`;
                    }
                };
                reader.readAsDataURL(file);
            } else {
                toast.error("Invalid file type. Please upload an image.");
            }
        } else {
            // Clear the preview if no file is selected
            const previewElement = document.getElementById("cat-preview");
            if (previewElement) {
                previewElement.innerHTML = "";
            }
            setCategoryImage(null);
        }
    };

    //  Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!categoryName) {
            toast.error("Please provide category name!");
            return;
        }


        if (!categoryImage) {
            toast.error("Please provide category image!");
            return;
        }

        const formData = new FormData();
        formData.append("name", categoryName);
        formData.append("image", categoryImage);

        // console.log(categoryImage)
        try {
            setLoading(true);
            const response = await addCategory(formData)
            toast.success("Category uploaded successfully!");
            setCategoryName("");
            setCategoryImage(null);
            onClose();
            const previewElement = document.getElementById("cat-preview");
            previewElement.innerHTML = ``;

        } catch (error) {
            console.log(error)
            toast.error(
                error.response?.data?.message || "Failed to upload category."
            );
        } finally {
            setLoading(false);
        }
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


    const HandleClose = (e) => {
        if (e.target.id === 'addCategory') {
            onClose();
        }
    };

    // if (!isVisible) return null;
    return (
        <div
            className={`modal fade ${isVisible ? 'show' : ''}`}
            id="addCategory"
            aria-hidden={!isVisible}
            aria-labelledby="addCategoryLabel"
            tabIndex="-1"
            style={{ display: isVisible ? 'block' : 'none' }}
            onClick={HandleClose}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 text-dark" id="addCategoryLabel">Add New Category</h1>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={onClose}
                            data-bs-toggle="tooltip"
                            data-bs-placement="right"
                            data-bs-title="Close"
                            title="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>

                            <div className='form-floating mb-3'>
                                <input
                                    className='form-control'
                                    type="text"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    required
                                    id='catInp'
                                />
                                <label htmlFor='catInp'>Category Name</label>
                            </div>
                            <div className='upload-container'>
                                <div id="dropping-area" className="dropping-area text-center">
                                    <label htmlFor="cat-input" className="upload-btn btn mb-3 btn-outline-primary">Click to
                                        upload</label>
                                    <p>Drag & Drop your picture here or</p>
                                    <input
                                        id='cat-input'
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        required
                                        className='d-none'
                                    />
                                </div>
                                <div className='image-preview m-auto mt-2' id='cat-preview'></div>
                            </div>
                            <hr />
                            <div className='text-center pt-2 mt-2'>
                                <button
                                    className='btn btn-dark' type="submit" disabled={loading}>
                                    {loading ? "Creating Category..." : "Create Category"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryAdd;
