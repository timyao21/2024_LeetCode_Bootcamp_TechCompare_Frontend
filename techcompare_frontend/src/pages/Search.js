import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { Box, Grid, Typography } from '@mui/material';

import ProductCard from '../components/ProductCard.js';
const token = localStorage.getItem("authToken");
if (token!="signin"){
    axios.defaults.headers.common = {"signin": "sign"}
}
else{
    axios.defaults.headers.common = {"signout": "signout"}
}


export default function Search() {

    const [searchValue, setSearchValue] = React.useState('');
    const [products, setProducts] = React.useState([]);
    const token = localStorage.getItem("authToken");

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);  // Update state when input changes
    };

    const handleSearch = () => {
        fetchData()
        console.log(searchValue);  // Log the current input value to the console
    };

    const fetchData = async () => {
        try {
            // console.log(id)
            const response = await axios.get('http://techcompare.azurewebsites.net/techCompare/products/search', {params:{name: searchValue}},{headers: {
                'Custom-Header': 'value', // 设置 Content-Type 头部
                'auth': token // 设置 Authorization 头部
              }}); // Adjust the URL based on your server
            setProducts(response.data);
            console.log((response.data))
        } catch (error) {
            console.error('Error fetching data: ', error);
            // Handle errors here based on your application's needs
        }
    };


    return(
        <Container>
            <Box>
                <Typography variant="h3" sx={{m:3}}>
                    Explore Our Products
                </Typography>
            </Box>
            <Box
                sx={{
                    width: "100%",
                    maxWidth: '100%',
                    display: 'flex',          // Set display to flex to align items in a row
                    alignItems: 'center',     
                    m: 3
                }}
                >
                <TextField
                fullWidth
                value={searchValue}           // Set the value of the input field
                onChange={handleInputChange} // Set the method to handle changes
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                    ),
                }}
                label="Search by product name"
                id="Search"
                sx={{m:1}}
                />
                <Button variant="contained" onClick={handleSearch} endIcon={<SearchIcon />}>
                    Search
                </Button>
            </Box>   

            {/* Outer Grid Container */}
            <Grid container spacing={2}>
                {/* Second Item (Container for Nested Grid) */}
                <Grid item xs={12}>
                    {/* Nested Grid Container */}
                    <Grid container spacing={2}>
                        {products.map((product) => (
                            <Grid item xs={6} md={4}>
                                <ProductCard 
                                    id={product.productStringId}
                                    productName={product.productName}
                                    imageLink={product.imageLink}
                                    price={product.currentPrice}
                                    ram={product.specifications.ram}
                                    storage={product.specifications.storage}/>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>       
        </Container>

    );

}
