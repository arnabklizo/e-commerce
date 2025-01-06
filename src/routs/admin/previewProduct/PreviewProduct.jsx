import React, { useState, useEffect } from 'react';
import { product } from '../../../constans/product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { faCircleDot, faLeftLong } from '@fortawesome/free-solid-svg-icons';
import '../previewProduct/previewProduct.css';

const data =
{
    category: 'Men',
    name: "Pink T-Shirt for Men",
    description: "Our T-Shirts are lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    price: 699,
    keyPoint: ['100% Cotton', '260gsm', 'Breathable Fabric']
}


const PreviewProduct = () => {


    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1);
    };



    useEffect(() => {
        const token = Cookies.get('adminToken');
        // console.log(token)
        if (!token) {
            navigate("/adminLogin");
        }
    }, [navigate]);

    return (
        <>
            <section className="SingleProduct prevProductSect">
                <div className="container">
                    <div className="row py-5">
                        <div className="col-12 col-lg-6">
                            <div className="productSingleImg m-auto">
                                <div className="overflow-hidden">
                                    <img src={product.itemCat} alt="" className="w-100" />
                                </div>
                                <div className="overflow-hidden">
                                    <img src={product.itemCat} alt="" className="w-100" />
                                </div>
                                <div className="overflow-hidden">
                                    <img src={product.itemCat} alt="" className="w-100" />
                                </div>
                                <div className="overflow-hidden">
                                    <img src={product.itemCat} alt="" className="w-100" />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="singleDetailsBox pt-2">
                                <div className="categoryNameBox text-uppercase">
                                    {data.category}
                                </div>


                                {/* <!-- product title  --> */}
                                <h1 className="productHead text-capitalize text-dark fw-bold roboto">
                                    {data.name}
                                </h1>

                                {/* <!-- product description  --> */}
                                <div className="text-dark mt-4 fw-bold">
                                    Description :
                                </div>
                                <div className="productDescription">
                                    {data.description}
                                </div>


                                {/* <!-- product price  --> */}
                                <div className="productPrice mt-3">
                                    <span className="priceDetails fs-4 fw-bold">&#8377; {data.price} /-</span>
                                    <span> &amp; Free Shipping.</span>
                                </div>


                                {/* <!-- key features of the product  --> */}
                                <div className="text-dark my-3 fw-bold">
                                    About the product
                                </div>
                                <ul className="list-unstyled">
                                    {data.keyPoint.map((point, index) => (
                                        <li key={index}>
                                            <span><FontAwesomeIcon icon={faCircleDot} className='me-2' /></span>
                                            <span>{point}</span>
                                        </li>
                                    ))}


                                </ul>

                                <hr />


                                {/* <!-- category of this product  --> */}
                                <div className="categoryBoxes">
                                    Category: <span className="text-dark text-capitalized fw-bold">T-shirt</span>
                                </div>

                                {/* <!-- go back  --> */}
                                <div className="text-center my-3">
                                    <button
                                        className="btn m-auto goBackBtn btn-dark d-flex align-items-center justify-content-center"
                                        onClick={goBack}>
                                        <FontAwesomeIcon icon={faLeftLong} className='me-2' />
                                        <span className="text-light fw-bold">Back</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PreviewProduct
