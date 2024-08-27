// Exam Submission
// EDIGA SRAVANI
// VU21CSEN0100092

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://20.244.56.144/test/companies';

// Service functions to handle API requests
const fetchAllProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Failed to retrieve products:', error);
    throw new Error('Unable to fetch products');
  }
};

const fetchProductById = async (productId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to retrieve product details:', error);
    throw new Error('Unable to fetch product');
  }
};

// Component to display all products
const ProductCatalog = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchAllProducts();
        setProductList(products);
      } catch (err) {
        console.error('Error loading products:', err);
      }
    };
    loadProducts();
  }, []);

  return (
    <div>
      <h1>Available Products</h1>
      {productList.map(item => (
        <div key={item.productId}>
          <h2>{item.productName}</h2>
          <p>Price: {item.price}</p>
          <p>Rating: {item.rating}</p>
          <p>Discount: {item.discount}</p>
          <p>Availability: {item.availability}</p>
        </div>
      ))}
    </div>
  );
};

// Component to display details of a single product
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productData = await fetchProductById(id);
        setProduct(productData);
      } catch (err) {
        console.error('Error loading product details:', err);
      }
    };
    loadProduct();
  }, [id]);

  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <div>
      <h1>{product.productName}</h1>
      <p>Price: {product.price}</p>
      <p>Rating: {product.rating}</p>
      <p>Discount: {product.discount}</p>
      <p>Availability: {product.availability}</p>
    </div>
  );
};

// Main App component to handle routing
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ProductCatalog />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
