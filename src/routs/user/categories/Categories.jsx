import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import './categories.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { getCategories } from '../../../services/api';
import { toast } from "react-toastify";
import Loader from '../../../components/loader/Loader';
import { Tooltip } from "bootstrap";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await getCategories();
                setCategories(response.data.categories);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
                toast.error("Failed to load categories. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl));
    }, [navigate]);


    return (
        <section className="categoriesSection">
            <div className="container">
                <h1 className="text-center roboto sectHead text-capitalize text-dark my-2">
                    All Categories
                </h1>
                {loading ? (
                    <Loader itemName="Loading categories" admin={false} />
                ) : (
                    <div className="categoriesBox my-3 p-2">
                        <div className="categoryDiv d-flex flex-wrap justify-content-center">
                            {categories.map((category) => (
                                <Link
                                    to={`/showproducts/${category._id}`}
                                    className="categories text-decoration-none m-2"
                                    key={category._id}
                                >
                                    <div className="card">
                                        <img
                                            src={category.imageUrl || '/default-image.png'}
                                            className="card-img-top"
                                            alt={category.name || 'Category'}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{category.name || 'Unnamed Category'}</h5>
                                            <p className="card-text">
                                                {category.itemCount || 0} Items
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                <div className="text-center my-3">
                    <button
                        className="btn whiteIcon btn-dark d-flex align-items-center justify-content-center m-auto"
                        onClick={() => navigate(-1)}
                    >
                        <FontAwesomeIcon icon={faLeftLong} className="me-2" />
                        <span className="text-light roboto">Go back</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Categories;
