import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
const Layout = ({ children, admin }) => {
    return (
        <>
            <Navbar admin={admin} />
            <>{children}</>
            <Footer admin={admin} />
        </>
    )
}

export default Layout
