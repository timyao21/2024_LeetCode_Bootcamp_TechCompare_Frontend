import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Grid, Paper, Typography} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import Container from '@mui/material/Container';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';

import RateReview from '../components/RateReview';
import api from '../services/api';
import ProductImage from '../components/ProductImage';

// import product images
import laptopImage from '../images/laptop2.jpg';
import phoneImage from '../images/phone2.png';
import headphoneImage from '../images/headphone2.jpeg';
import padImage from '../images/pad2.jpg';


const token = localStorage.getItem("authToken");
if (token!="signin"){
    axios.defaults.headers.common = {"signin": "sign"}
}
else{
    axios.defaults.headers.common = {"signout": "signout"}
}



const categoryImages = {
    Laptop: laptopImage,
    Phone: phoneImage,
    Headphone: headphoneImage,
    Pad:padImage,
  };

// Labels for the ratings
const labels = {
    0: 'Unacceptable',
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Very Good',
    5: 'Excellent',
  };
  
function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function ProductPage() {
    const [nearbyStores, setNearbyStores] = React.useState([]);
    const { id } = useParams(); // Get the `id` param from the URL
    // const [product, setProduct] = useState({ id: '', productName: '', imageLink: '', price: '' });
    const [product, setProduct] = React.useState([]);
    const [review, setReview] = React.useState([]);
    const [averageRating, setAverageRating] = React.useState(0);
    const [priceHistory, setPriceHistory] = React.useState([]);
    const [specifications, setSpecifications] = React.useState([]);
    const token = localStorage.getItem("authToken");

    useEffect(() => {
        // fetch all products and console.log it 
        const fetchData = async () => {
            try {
                console.log(id);
                
                const url = `http://techcompare.azurewebsites.net/techCompare/products/${id}`;
                console.log(url);
                const response = await axios.get(url, {
                    headers: {
                      'Custom-Header': 'value', // 设置 Content-Type 头部
                      'auth': token // 设置 Authorization 头部
                    }}        );
                setProduct(response.data);
                setReview(response.data.review)
                if (response.data.review.length > 0) {
                    const totalRating = response.data.review.reduce((acc, curr) => {
                        return acc + curr.rating; 
                    }, 0);
                    const avgRating = totalRating / response.data.review.length;
                    setAverageRating(avgRating);
                } else {
                    setAverageRating(0);  // Handle case with no reviews
                }
                setPriceHistory(response.data.priceHistory)
                setSpecifications(response.data.specifications)
                console.log((response.data.review))
        
            } catch (error) {
                console.error('Error fetching data: ', error);
                // Handle errors here based on your application's needs
            }
        };
        console.log("fetchData")
        fetchData();
    }, [id]);


    useEffect(() => {
        const fetchNearbyStores = async () => {
            try {
                const storesUrl = `http://techcompare.azurewebsites.net/techCompare/store/getStoreByInventoryQuantity?productStringId=${id}`;
                const storesResponse = await axios.get(storesUrl,{
                    headers: {
                      'Custom-Header': 'value', // 设置 Content-Type 头部
                      'auth': token // 设置 Authorization 头部
                    }});
                setNearbyStores(storesResponse.data);
            } catch (error) {
                console.error('Error fetching nearby stores: ', error);
            }
        };
    
        if (id) {
            fetchNearbyStores();
        }
    }, [id]);
    

    const image = categoryImages[product.category] || phoneImage;  // Default to laptop if category is undefined


  return (
    <Container maxWidth="md" sx={{pt: 5}}>
        <Grid container spacing={8}>
            <Grid item xs={6}>
                <Card>
                    <ProductImage id={product.productStringId}/>
                </Card>
            </Grid>
            <Grid item xs={6} sx={{ pl: 4 }}>
                {/* <p>id: {product.productStringId}</p> */}

                <Typography variant="h3" component="h2" sx={{pb: 5}}>
                    {product.productName}
                </Typography>
                <Typography variant="h4" component="h2">
                    $ {product.currentPrice}
                </Typography>
                <Box sx={{pt: 3}}>
                    <Typography variant="h6" component="h2">
                        Specifications:
                    </Typography>
                    <Box sx={{pl:3, pt:1}}>
                        {Object.entries(specifications).map(([key, value]) => {
                            if (value) { // This will check if the value is not null and not an empty string
                                return (
                                    <Typography variant="body1" sx={{ m: 0.5 }} key={key}>
                                        {`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}
                                    </Typography>
                                );
                            }
                            return null; // If value is null, return null to render nothing for this entry
                        })}
                        <Divider sx={{m:2}}></Divider>
                        <Button variant = "contained" component={Link} to={`/product/compare/${product.productStringId}`}>
                            Compare similar products 
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
        {/* Review part */}
        <Divider sx={{m:4}}></Divider>
        <Typography variant="h4">
            Review:
        </Typography>
        
        <RateReview productId={product.productStringId} />
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <StarIcon sx={{ color: "#faaf00" }} /> {/* Display star icon next to the average */}
        <Typography variant="h6" sx={{ ml: 1 }}>
          Average Rating: {averageRating.toFixed(1)} / 5
        </Typography>
        </Box>

        <Stack spacing={2} sx={{mt:1, p:2}}>
            {review.map((item, index) => (
                <Paper elevation={2} sx={{p:2}}>
                    <Typography>User: {item.email}</Typography>
                    <Typography>{item.comment}</Typography>
                    <Typography sx={{ mt: 2 }}>Rating: {getLabelText(item.rating)}</Typography>
                </Paper>
                ))}
        </Stack>

        {/* Price History */}
        <Divider sx={{m:4}}></Divider>
        <Typography variant="h4">
            Price History:
        </Typography>
        {/* <Stack spacing={2} sx={{mt:1, p:2}}>
        {priceHistory.map((item, index) => (
                <Paper elevation={2} sx={{p:2}}>
                    <Typography>{item.time}</Typography>
                    <Typography>{item.price}</Typography>
                </Paper>
                ))}
        </Stack> */}
        <LineChart

    xAxis={[{ scaleType: 'point', data: priceHistory.map(obj => obj.time.substr(0, 10)) }]}
    series={[
        {
        data: priceHistory.map(obj => obj.price),
        },
    ]}
    width={500}
    height={500}
    />

{/* Store Availability */}
<Divider sx={{m:4}}></Divider>
<Typography variant="h4">
    Availability:
</Typography>

<Grid container spacing={2} sx={{ mt: 1 }}>
    {nearbyStores.length > 0 ? (
        nearbyStores.map((storeInventory, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ minWidth: 275, mb: 2 }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {storeInventory.store.name} {/* 显示门店名称 */}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {storeInventory.store.address} {/* 显示门店地址 */}
                        </Typography>

                        <Typography variant="body2">
                            Stock: {storeInventory.quantity} units {/* 显示库存数量 */}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        ))
    ) : (
        <Grid item xs={12}>
            <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ minWidth: 275, mb: 2 }}>
                    <CardContent>
                        <Typography textAlign="center" sx={{ mt: 2 }}>
                             No Stock In Nearby Stores.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )}
    </Grid>
</Container>

    
  );
}
