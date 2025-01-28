import React, { useState } from 'react'
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// import Navbar from './components/navbar/Navbar.jsx';

import Layout from './routs/user/Layout.jsx';
import Landing from './routs/user/landing/Landing.jsx';
import About from './routs/user/about/about.jsx';
import Terms from './routs/user/terms/Terms.jsx';
import Contact from './routs/user/contact/Contact.jsx';
import Categories from './routs/user/categories/Categories.jsx';
import ShowProducts from './routs/user/show-products/ShowProducts.jsx';
import Product from './routs/user/Product/ProductDetails.jsx';
import Wishlist from './routs/user/wishlist/Wishlist.jsx';
import Profile from './routs/user/profile/Profile.jsx';
import ViewOrtder from './routs/user/viewOrder/ViewOrtder.jsx';
import ResetPassword from './routs/user/resetPass/ResetPassword.jsx';

import AdminLayout from './routs/admin/adminLayout/AdminLayout.jsx';
import Dashboard from './routs/admin/dashboard/Dashboard.jsx'
import AllProducts from './routs/admin/allProducts/AllProducts.jsx';
import OrderList from './routs/admin/orderList/OrderList.jsx';
import AllUsers from './routs/admin/allUsers/AllUsers.jsx';
import CategoryList from './routs/admin/categoryList/CategoryList.jsx';
import AdminProfile from './routs/admin/profile/AdminProfile.jsx';
import NewProduct from './routs/admin/newProduct/NewProduct.jsx';
import PreviewProduct from './routs/admin/previewProduct/PreviewProduct.jsx';
import AdminLogin from './routs/admin/login/AdminLogin.jsx';
import UpdateProduct from './routs/admin/addProduct/UpdateProduct.jsx';
import { ToastContainer } from "react-toastify";


// import Alert from './components/Alert';
// import TextForms from './components/TextForms';
// import Foot from './components/Foot';

function App() {
  // const [islogin, setlogin] = useState(false);
  // const openLogin = () => setlogin(true);
  // const closeLogin = () => setlogin(false);


  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Landing />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />
          <Route
            path="/contact"
            element={
              <Layout>
                <Contact />
              </Layout>
            }
          />
          <Route
            path="/terms"
            element={
              <Layout>
                <Terms />
              </Layout>
            }
          />
          <Route
            path="/categories"
            element={
              <Layout>
                <Categories />
              </Layout>
            }
          />
          <Route
            path="/showroducts/:id"
            element={
              <Layout>
                <ShowProducts />
              </Layout>
            }
          />
          <Route
            path="/product/:id"
            element={
              <Layout>
                <Product />
              </Layout>
            }
          />
          <Route
            path="/wishlist"
            element={
              <Layout>
                <Wishlist />
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />
          <Route
            path="/order"
            element={
              <Layout>
                <ViewOrtder />
              </Layout>
            }
          />
          <Route
            path="/reset"
            element={
              <Layout>
                <ResetPassword />
              </Layout>
            }
          />


          {/* admin section  */}

          <Route
            path="/dashboard"
            element={
              <AdminLayout admin>
                <Dashboard />
              </AdminLayout>
            }
          />
          <Route
            path="/allProducts"
            element={
              <AdminLayout admin>
                <AllProducts />
              </AdminLayout>
            }
          />
          <Route
            path="/orderLiist"
            element={
              <AdminLayout admin>
                <OrderList />
              </AdminLayout>
            }
          />
          <Route
            path="/allUsers"
            element={
              <AdminLayout admin>
                <AllUsers />
              </AdminLayout>
            }
          />
          <Route
            path="/categoryList"
            element={
              <AdminLayout admin>
                <CategoryList />
              </AdminLayout>
            }
          />
          <Route
            path="/adminProfile"
            element={
              <Layout admin>
                <AdminProfile />
              </Layout>
            }
          />
          <Route
            path="/addProduct"
            element={
              <Layout admin>
                <NewProduct />
              </Layout>
            }
          />
          <Route
            path="/updateProduct/:id"
            element={
              <Layout admin>
                <UpdateProduct />
              </Layout>
            }
          />
          <Route
            path="/previewProduct/:id"
            element={
              <Layout admin>
                <PreviewProduct />
              </Layout>
            }
          />
          <Route
            path="/adminLogin"
            element={
              <Layout admin>
                <AdminLogin />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
