import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import './categories.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { getCategories } from '../../../services/api';


const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await getCategories();
                setCategories(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);





    // front 
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };



    return (
        <>
            {/* <!-- main  --> */}
            <section className="categoriesSection">
                <div className="container">
                    <h1 className="text-center roboto sectHead text-capitalize text-dark my-2">
                        All Categories
                    </h1>



                    <div className="categoriesBox my-3 p-2">
                        <div className="categoryDiv d-flex flex-wrap justify-content-center">
                            {categories.map(((category) => (
                                <Link to="/showroducts" className="categories text-decoration-none m-2" key={category._id}>
                                    <div className="card" >
                                        <img src={category.imageUrl} className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">{category.name}</h5>
                                            <p className="card-text">{category.itemCount} Items</p>
                                        </div>
                                    </div>
                                </Link>
                            )))}
                        </div>
                    </div>

                    <div className="text-center my-3">
                        <button className="btn whiteIcon btn-dark d-flex align-items-center justify-content-center m-auto"
                            onClick={goBack}>
                            <FontAwesomeIcon icon={faLeftLong} className='me-2' />
                            <span className="text-light roboto">Go back</span>
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Categories
