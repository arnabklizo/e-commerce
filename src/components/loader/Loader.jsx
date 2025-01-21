import React from 'react';
import { Icon } from '../../constans/icon';
import './loader.css'

const Loader = ({ itemName, admin = true }) => {
    return (
        <>
            <div className="h-100 py-5">
                <div className='d-flex align-items-center justify-content-center flex-column h-100'>
                    <div className='loaderImgBox mx-auto'>
                        <img src={admin ? Icon.loaderOne : Icon.loader} alt="" className='w-100 h-100' />
                    </div>
                    <p className='mt-2'> {itemName}...</p>
                </div>
            </div>
        </>
    )
}

export default Loader
