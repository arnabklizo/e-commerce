import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'react-loading-skeleton/dist/skeleton.css';

import Loader from "./components/loader/Loader.jsx";
import Layout from "./routs/user/Layout.jsx";
import AdminLayout from "./routs/admin/adminLayout/AdminLayout.jsx";
import { ToastContainer } from "react-toastify";

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
import Cart from './routs/user/cart/Cart.jsx';

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

import NotFound from './components/notFound/NotFound.jsx';


import { isUser, isAdmin, checkMe } from "./services/api.js";

function App() {
  // const navigate = useNavigate()
  const [userId, setUserId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLogedIn, setIsAdminLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState()

  const checkAuth = useCallback(async () => {
    try {
      const [userResponse, adminResponse] = await Promise.all([isUser(), isAdmin()]);
      const isUserAuth = userResponse.data.isAuthenticated;
      const isAdminAuth = adminResponse.data.isAuthenticated;

      setIsLoggedIn(isUserAuth);
      setIsAdminLoggedIn(isAdminAuth);

      if (isUserAuth) {
        const response = await checkMe();
        setUserId(response.data._id);
        setProfileData(response.data);
      }
    } catch (err) {
      console.error("Authentication error:", err);
    } finally {
      setLoading(false);
    }
  }, [])
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const renderWithLayout = (Component, props = {}) => (
    <Layout check={checkAuth} >
      {loading ? <div className="py-5"><div className="my-5 py-5"><Loader itemName="Loading" admin={false} /></div></div> : <Component {...props} />}
    </Layout>
  );

  const protectedRoute = (Component, props = {}) => (
    loading ? renderWithLayout(Loader, { itemName: "Loading", admin: false }) :
      isLoggedIn ? renderWithLayout(Component, props) : <Navigate to="/" replace />
  );

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} />

      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={renderWithLayout(Landing)} />
          <Route path="/about" element={renderWithLayout(About)} />
          <Route path="/contact" element={renderWithLayout(Contact)} />
          <Route path="/terms" element={renderWithLayout(Terms)} />
          <Route path="/categories" element={renderWithLayout(Categories)} />
          <Route path="/showproducts/:id" element={renderWithLayout(ShowProducts)} />

          {/* Product Route with Conditional User Info */}
          <Route path="/product/:id" element={loading ? renderWithLayout(Loader, { itemName: "Loading", admin: false }) : renderWithLayout(Product, { userId })} />

          {/* Protected User Routes */}
          <Route path="/cart/:id" element={protectedRoute(Cart, { userId, profileData })} />
          <Route path="/profile" element={protectedRoute(Profile)} />
          <Route path="/wishlist" element={protectedRoute(Wishlist, { userId })} />
          <Route path="/reset" element={protectedRoute(ResetPassword, { userId })} />
          <Route path="/order" element={protectedRoute(ViewOrtder, { userId })} />

          {/* Admin Routes */}
          <Route path="/adminLogin" element={<Layout admin><AdminLogin /></Layout>} />
          {isAdminLogedIn && (
            <>
              <Route path="/dashboard" element={<AdminLayout admin><Dashboard /></AdminLayout>} />
              <Route path="/allProducts" element={<AdminLayout admin><AllProducts /></AdminLayout>} />
              <Route path="/orderList" element={<AdminLayout admin><OrderList /></AdminLayout>} />
              <Route path="/allUsers" element={<AdminLayout admin><AllUsers /></AdminLayout>} />
              <Route path="/categoryList" element={<AdminLayout admin><CategoryList /></AdminLayout>} />

              {/* layout changed */}
              <Route path="/updateProduct/:id" element={<Layout admin><UpdateProduct /></Layout>} />
              <Route path="/previewProduct/:id" element={<Layout admin><PreviewProduct /></Layout>} />
              <Route path="/adminProfile" element={<Layout admin><AdminProfile /></Layout>} />
              <Route path="/addProduct" element={<Layout admin><NewProduct /></Layout>} />
            </>
          )}

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
