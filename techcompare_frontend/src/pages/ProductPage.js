import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import axios from 'axios';
import HoverRating from '../components/HoverRating';
import MultilineTextFields from '../components/MultilineTextFields'; 

export default function ProductPage() {
    const { id } = useParams(); // Get the `id` param from the URL
    // const [product, setProduct] = useState({ id: '', productName: '', imageLink: '', price: '' });
    const [product, setProduct] = React.useState([]);

    useEffect(() => {
        // fetch all products and console.log it 
        const fetchData = async () => {
            try {
                // console.log(id)
                const response = await axios.get('http://localhost:8080/techCompare/products/search', {params:{name: id}}); // Adjust the URL based on your server
                setProduct(response.data[0]);
                // console.log(response.data)
            } catch (error) {
                console.error('Error fetching data: ', error);
                // Handle errors here based on your application's needs
            }
        };
        console.log("fetchData")
        fetchData();
    }, [id]);

    // console.log("Cur:", product.priceHistory[0].price)

  return (
    <div>
            <Card>
                <CardContent>
                    {/* Product details displayed using Typography for consistency with MUI style */}
                    <Typography variant="h5">{product.productName}</Typography> {/* Displaying the product name */}
                    <Typography variant="body2">ID: {product.productStringId}</Typography>
                    <Typography variant="body2">Price: {product.currentPrice}</Typography>
                    <Typography variant="body2">Category: {product.category}</Typography>
                    <Typography variant="body2">Model: {product.model}</Typography>
                    {/* add an image */}
                    {product.imageLink && (
                        <CardMedia
                            component="img"
                            height="140"
                            image={product.imageLink}
                            alt="Product image"
                        />
                    )}
                </CardContent>
            </Card>
            
            <Card>
                <CardContent>
                    {/* Rating component */}
                    <Typography variant="subtitle1" style={{ marginTop: '20px' }}>
                        Your Rating:
                    </Typography>
                    <HoverRating />
                    {/* Review Input field */}
                    <Typography variant="subtitle1" style={{ marginTop: '20px' }}>
                        Your Review:
                    </Typography>
                    <MultilineTextFields />

                </CardContent>  
            </Card>

        </div>
    
  );
}
