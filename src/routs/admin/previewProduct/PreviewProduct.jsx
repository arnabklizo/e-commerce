import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { faCircleDot, faLeftLong } from '@fortawesome/free-solid-svg-icons';
import '../previewProduct/previewProduct.css';
import { toast } from 'react-toastify';
import { getProduct } from '../../../services/api';
import { useParams } from "react-router-dom";
import Loader from '../../../components/loader/Loader';
import parse from 'html-react-parser';


const PreviewProduct = () => {
    const [loading, setLoading] = useState(true);
    const [productItem, setProductItem] = useState('');
    const [count, setCount] = useState(0);

    const { id } = useParams();
    if (!id) {
        return goBack();
    }

    // fetch products 
    const fetchProduct = async () => {
        setLoading(true);
        try {
            const response = await getProduct(id);
            setProductItem(response.data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
            toast.error('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };
    // Fetch products from the backend
    useEffect(() => { fetchProduct(); }, []);

    // back 
    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1);
    };


    useEffect(() => {
        const token = Cookies.get('adminToken');
        if (!token) {
            navigate("/adminLogin");
        }
    }, [navigate]);

    return (
        <>
            <section className="SingleProduct prevProductSect">
                <div className="container">
                    <div className="row py-5">
                        {loading ? (
                            <>
                                <Loader itemName={'Loading product'} />
                                <div className="text-center my-3">
                                    <button
                                        className="btn m-auto goBackBtn btn-dark d-flex align-items-center justify-content-center"
                                        onClick={goBack}>
                                        <FontAwesomeIcon icon={faLeftLong} className='me-2' />
                                        <span className="text-light fw-bold">Back</span>
                                    </button>
                                </div></>
                        ) : (
                            <>
                                <div className="col-12 col-lg-6">
                                    <div className="productSingleImg m-auto">
                                        {productItem.imageUrl.map((image) => (
                                            <div className="overflow-hidden" key={image}>
                                                <img src={image} alt="" className="w-100" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6">
                                    <div className="singleDetailsBox pt-2">
                                        <div className="categoryNameBox text-uppercase">
                                            {productItem.productFor}
                                        </div>
                                        <h1 className="productHead text-capitalize text-dark fw-bold roboto">
                                            {productItem.name}
                                        </h1>
                                        <div className="text-dark mt-4 fw-bold">
                                            Description :
                                        </div>
                                        <div className="productDescription">
                                            {parse(productItem.description)}
                                        </div>


                                        {/* <!-- product price  --> */}
                                        <div className="productPrice mt-3">
                                            <span className="priceDetails fs-4 fw-bold">&#8377; {productItem.price} /-</span>
                                            <span> &amp; Free Shipping.</span>
                                        </div>


                                        {/* <!-- key features of the product  --> */}
                                        <div className="text-dark my-3 fw-bold">
                                            About the product
                                        </div>
                                        <ul className="list-unstyled">
                                            {productItem.productFeatures.map((point) => (
                                                <li key={point}>
                                                    <span><FontAwesomeIcon icon={faCircleDot} className='me-2' /></span>
                                                    <span>{point.trim('').toUpperCase()}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <hr />


                                        {/* <!-- category of this product  --> */}
                                        <div className="categoryBoxes">
                                            Category: <span className="text-dark text-capitalized fw-bold">{productItem.category.name}</span>
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
                            </>
                        )}
                    </div>
                </div>


            </section>
        </>
    )
}

export default PreviewProduct
