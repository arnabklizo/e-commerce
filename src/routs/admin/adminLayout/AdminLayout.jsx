import React from 'react';
import Sidebar from '../sidebar/Sidebar'
import Navbar from '../../../components/navbar/Navbar';
import Footer from '../../../components/footer/Footer';

const AdminLayout = ({ children, admin }) => {
    return (
        <>
            <Navbar admin={admin} />

            <section className="dashboardSection d-flex">
                <Sidebar />

                <>{children}</>
            </section>
            <Footer admin={admin} />
        </>
    )
}

export default AdminLayout
