import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import fetchData from '../pages/WishListPage.js'

import image123 from '../testDataSet/image1.jpg'
  
export default function ProductWishCard({id, productName, price, ram, storage, onRemove}) {
    const navigate = useNavigate();
    

    const RemoveWishList = async () => {
        try {
            // change to user email
            const email = "user123@example.com";
            console.log('Sending request with:', { email: email, productId: id });
            const response = await axios.post('http://localhost:8080/techCompare/user/removeFromWishlist', null, {
            params: {
                email: email,
                productId: id
            }
        });
            
            console.log('Product removed from wishlist:', response.data);
            onRemove(id);
            // await fetchWishlist(); 
            navigate(`/wishlistpage/${id}`);  // 使用 email 作为 URL 参数或其他标识符
        } catch (error) {
            console.error('Error adding product to wishlist:', error);
        }
    };


    return (
        <Card sx={{ Width: 345, height:350 }}>
        <CardActionArea component={Link} to={`/product/${productName}`}>
            <CardMedia
            component="img"
            height="140"
            image = {image123}
            alt="Product"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {productName}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    ${price}
                </Typography>
                {ram && (
                    <Typography variant="body2" color="text.secondary">
                        RAM: {ram}
                    </Typography>
                )}
                {ram && (
                    <Typography variant="body2" color="text.secondary">
                        Storage: {storage}
                    </Typography>
                )}

            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button className="me-auto" size="small" variant="text" color="primary" onClick={RemoveWishList}>
                Remove product
            </Button>
        </CardActions>
        </Card>
    );
}



