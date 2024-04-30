import React, { useState, useEffect } from 'react';

//MUI
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import axios from 'axios';

//components
import CategoryMenu from '../components/Filters.js';
import ProductCard from '../components/ProductCard.js';
const token = localStorage.getItem("authToken");
if (token!="signin"){
    axios.defaults.headers.common = {"signin": "sign"}
}
else{
    axios.defaults.headers.common = {"signout": "signout"}
}


function Home() {
    // container for all products
    const [products, setProducts] = React.useState([]);
    const [categories, setCategories] = useState('');
    const [brands, setBrands] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(999999999);

    const handleCategoriesChange = (newCategories) => {
        setCategories(newCategories);
        console.log("Updated Categories:", newCategories);
    };

    const handleBrandsChange = (newBrands) => {
        setBrands(newBrands);
        console.log("Updated Brands:", newBrands);
    };

    const handleMinPriceChange = (newMinPrice) => {
        // Set minPrice to 0 if the input is empty or null, otherwise parse it as a float
        setMinPrice(newMinPrice === '' || newMinPrice == null ? 0 : parseFloat(newMinPrice));
        console.log("Updated minPrice:", newMinPrice);
    };

    const handleMaxPriceChange = (newMaxPrice) => {
        setMaxPrice(newMaxPrice === '' || newMaxPrice == null ? 999999999 : parseFloat(newMaxPrice));
        console.log("Updated maxPrice:", newMaxPrice);
    };
    
    React.useEffect(() => {
        // fetch products and console.log it
        const fetchAllData = async () => {
            try {

                if (categories.length == 0 && brands.length == 0) {
                    const response = await axios.get('https://techcompare.azurewebsites.net/techCompare/products/getall',{headers: {
                        'Custom-Header': 'value', // 设置 Content-Type 头部
                        'auth': token // 设置 Authorization 头部
                      }}); // Adjust the URL based on your server
                    console.log("Fetch All Data")
                    setProducts(response.data);
                    console.log(response.data)
                }
                else{
                    console.log("Fetch data based on categories.")
                    if (categories.length == 0){

                    }
                    setProducts([]);
                }
                const urlFilter = `https://techcompare.azurewebsites.net/techCompare/products?category=${categories}&brand=${brands}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
                console.log("Fetch data based on categories.")
                const response = await axios.get(urlFilter,{
                    headers: {
                      'Custom-Header': 'value', // 设置 Content-Type 头部
                      'auth': token // 设置 Authorization 头部
                    }});
                setProducts(response.data);
                console.log(response.data)
            } catch (error) {
                // print out error, if unable to load data
                console.error('Error fetching data: ', error);
            }
        };
        fetchAllData();            
    }, [categories, brands, minPrice, maxPrice]);


    return(
        <div style={{padding:"8%"}} className = "bg-color1">
            {/* Outer Grid Container */}
            <Grid container spacing={2}>
                {/* Menu on the Left */}
                <Grid item xs={2}>
                    <CategoryMenu onCategoriesChange={handleCategoriesChange} onBrandsChange={handleBrandsChange} onMinPriceChange={handleMinPriceChange} onMaxPriceChange={handleMaxPriceChange}/>
                </Grid>
                {/* Second Item (Container for prouduct display) */}
                <Grid item xs={10}>
                    {/* Nested Grid Container */}
                    <Grid container spacing={2}>
                        {products.map((product) => (
                            <Grid item xs={6} md={4} key={product.productStringId}>
                                <ProductCard 
                                    id={product.productStringId}
                                    productName={product.productName}
                                    price={product.currentPrice}
                                    ram={product.specifications.ram}
                                    storage={product.specifications.storage}
                                    category = {product.category}/>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Home;
