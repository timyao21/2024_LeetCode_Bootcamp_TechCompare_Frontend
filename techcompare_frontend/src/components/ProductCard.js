import * as React from 'react';
import { useState, useEffect, useContext} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { UserContext } from '../context/UserContext';

import image123 from '../testDataSet/image1.jpg'

const cardAreaStyle = {
    top: "0",
    height: "85%",
    paddingBottom: "15%",
}

const cardActionStyle = {
    position: "relative",
    bottom: "5%",
    paddingTop: "20%",
    height: "20%",
}

export default function Product({id, productName, imageLink, price, ram, storage}) {
    const navigate = useNavigate();
    const { user2, login, logout } = useContext(UserContext);

    // const addToWishList = () => {
    //     console.log(`Added ${productName} to wishlist`);
    //     navigate(`/wishlistpage/${id}`); 
    // };

    const handleBuy = () => {
        // navigate(`/buy/${id}`); 
        console.log(`Navigating to buy page for product ${id}`);
    };

    const addToWishList = async () => {
        try {
            // change to user email
            // const email = "user123@example.com";
            const email = user2.email;
            if (email == '') {
                alert("Sign in First!");
                console.log("Email is null, exiting function.");
                return;  // 当邮箱为空时，直接返回不再执行之后的代码
            }
            console.log("addtowishlist");
            console.log('Sending request with:', { email: email, productId: id });
            const response = await axios.post('http://localhost:8080/techCompare/user/addWishlist', null, {
            params: {
                email: email,
                productId: id
            }
        });
    
            console.log('Product added to wishlist:', response.data);
            navigate(`/wishlistpage/${id}`);  // 使用 email 作为 URL 参数或其他标识符
        } catch (error) {
            console.error('Error adding product to wishlist:', error);
        }
    };
    


    return (

        <Card sx={{ maxWidth: 345, height: 360 }}>
        <CardActionArea component={Link} to={`/product/${id}`} style = {cardAreaStyle}>
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
            <Button className="me-auto" size="small" variant="text" color="primary" onClick={addToWishList}>
                add WishList
            </Button>
            <Button className="ms-auto" size="small" variant="contained" color="primary" onClick={handleBuy}>
                Buy
            </Button>
        </CardActions>
        </Card>
    );
}