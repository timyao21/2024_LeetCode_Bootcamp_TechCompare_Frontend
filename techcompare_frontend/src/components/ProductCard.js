import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

import image123 from '../testDataSet/image1.jpg'
  
export default function Product({id, productName, imageLink, price, ram, storage}) {

    return (
        <Card sx={{ maxWidth: 345 }}>
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
            <Button className="me-auto" size="small" variant="text" color="primary">
                add WishList
            </Button>
            <Button className="ms-auto" size="small" variant="contained" color="primary">
                Buy
            </Button>
        </CardActions>
        </Card>
    );
}