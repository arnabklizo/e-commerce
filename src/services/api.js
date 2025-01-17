import axios from "axios";

// Create an axios instance with a base URL and credentials setting
const API = axios.create({
    baseURL: "http://localhost:5000/api", // Use an environment variable for the base URL
    // baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api", // Use an environment variable for the base URL
    withCredentials: true, // Makes cookies accessible
});

// Interceptor for handling API responses or errors globally
API.interceptors.response.use(
    (response) => response, // If the response is successful, return it
    (error) => {
        // Handle error responses
        if (error.response) {
            // The request was made and the server responded with an error
            console.error("API error:", error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("No response from server:", error.request);
        } else {
            // Something else happened
            console.error("Error occurred:", error.message);
        }
        return Promise.reject(error);
    }
);

// User Authentication
export const loginUser = (data) => API.post("/auth/login", data); // Login user
export const registerUser = (data) => API.post("/auth/register", data); // Register user
export const logoutUser = () => API.post("/auth/logout"); // Logout user

// Admin Authentication
export const loginAdmin = (data) => API.post("/admin/login", data); // Login admin (requires email and password)
export const logoutAdmin = () => API.post("/admin/logout"); // Logout admin 

// for category
export const addCategory = (data) => API.post("/admin/categories", data, { headers: { "Content-Type": "multipart/form-data" } });
export const getCategories = (page, limit, sortField, sortOrder, searchQuery) => API.get(`/admin/categories/`, {
    params: {
        page,
        limit,
        sortField,
        sortOrder,
        searchQuery,
    },
});
export const delCategory = (id) => API.delete(`/admin/categories/${id}`);
export const updateCategory = (data) => API.put(`/admin/categories/${data._id}`, data);

//for product
export const addProduct = (data) => API.post("/products/addProduct", data, { headers: { "Content-Type": "multipart/form-data" } });
export const getAllProducts = (page, limit, sortField, sortOrder, category, searchQuery) => API.get(`/products`, {
    params: {
        page,
        limit,
        sortField,
        sortOrder,
        category,
        searchQuery,
    },
});
export const delProduct = (id) => API.delete(`/products/${id}`);
export const getProduct = (id) => API.get(`/products/${id}`);
export const updateProduct = (id, formData) => API.put(`/products/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' }, });




// Optionally add token to headers for authenticated routes
export const setAuthToken = (token) => {
    if (token) {
        // Set token in request headers if available
        API.defaults.headers["Authorization"] = `Bearer ${token}`;
    } else {
        // Delete token from headers if no token
        delete API.defaults.headers["Authorization"];
    }
};
