import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

// Import the JSON data
import productsData from '../testDataSet/products.json'; 

// Function to fetch product details by ID from the imported dataset
const fetchProductById = async (id) => {
  // Assuming your product IDs are stored as strings in the JSON file.
  // If they are numbers, you might need to parse the id parameter to a number
  const product = productsData.find(product => product.id.toString() === id);
  return product; // Returns undefined if no product matches
};

export default function ProductPage() {
    const { id } = useParams(); // Get the `id` param from the URL
    const [product, setProduct] = useState({ id: '', productName: '', imageLink: '', price: '' });

    useEffect(() => {
        // Fetch product details and update state
        fetchProductById(id).then(productDetails => {
        if (productDetails) {
            setProduct({
            id: productDetails.id,
            productName: productDetails.productName,
            imageLink: productDetails.imageLink,
            price: productDetails.price
            });
        }
        });
    }, [id]); // Re-run this effect if `id` changes

  return (
    <div>
        <p>id: {product.id}</p>
        <p>productName: {product.productName}</p>
        <p>imageLink: {product.imageLink}</p>
        <p>price: {product.price}</p> {/* Displaying the product name */}
    </div>
  );
}
