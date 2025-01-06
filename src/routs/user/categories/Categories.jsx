import React from 'react'
import { useNavigate } from "react-router-dom";
import { Icon } from '../../../constans/icon';
import './categories.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const Categories = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };


    const categories = [
        { imageSrc: 'Icon.cat1', catName: "Men's T-Shirt", inStock: 38 },
        { imageSrc: 'Icon.cat1', catName: "Men's T-Shirt", inStock: 38 },
        { imageSrc: 'Icon.cat1', catName: "Men's T-Shirt", inStock: 38 },
        { imageSrc: 'Icon.cat1', catName: "Men's T-Shirt", inStock: 38 },
        { imageSrc: 'Icon.cat1', catName: "Men's T-Shirt", inStock: 38 },
        { imageSrc: 'Icon.cat1', catName: "Men's T-Shirt", inStock: 38 },
    ]
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
                            {categories.map(((cat, index) => (
                                <Link to="/showroducts" className="categories text-decoration-none m-2" key={index}>
                                    <div className="card" >
                                        <img src={Icon.cat1} className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">{cat.catName}</h5>
                                            <p className="card-text">{cat.inStock} Items</p>
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
