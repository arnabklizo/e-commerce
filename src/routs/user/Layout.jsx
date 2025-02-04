import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';


const Layout = ({ children, admin, check }) => {
    return (
        <>

            <Navbar admin={admin} check={check} />
            <>{children}</>
            <Footer admin={admin} />
        </>
    )
}

export default Layout
