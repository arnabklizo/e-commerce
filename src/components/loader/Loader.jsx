import React from 'react';
import { Icon } from '../../constans/icon';

const Loader = ({ itemName }) => {
    return (
        <>
            <div className="h-100 py-5">
                <div className='d-flex align-items-center justify-content-center flex-column h-100'>
                    <img src={Icon.loaderOne} alt="" />
                    <p className='mt-2'> {itemName}...</p>
                </div>
            </div>
        </>
    )
}

export default Loader
