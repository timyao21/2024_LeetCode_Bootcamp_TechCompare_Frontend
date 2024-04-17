import * as React from 'react';

//MUI
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import axios from 'axios';

//components
import CategoryMenu from '../components/Filters.js';
import ProductCard from '../components/ProductCard.js';

// Import the JSON data
import productsData from '../testDataSet/products.json';


function Home() {
    // container for all products
    const [products, setProducts] = React.useState([]);
    
    React.useEffect(() => {
        // fetch all products and console.log it 
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/techCompare/products/getall'); // Adjust the URL based on your server
                setProducts(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching data: ', error);
                // Handle errors here based on your application's needs
            }
        };
        console.log("fetchData")
        fetchData();
    }, []);

    return(
        <div style={{padding:"8%"}}>
            {/* Outer Grid Container */}
            <Grid container spacing={2}>
                {/* Menu on the Left */}
                <Grid item xs={2}>
                    <CategoryMenu/>
                </Grid>
                {/* Second Item (Container for Nested Grid) */}
                <Grid item xs={10}>
                    {/* Nested Grid Container */}
                    <Grid container spacing={2}>
                        {productsData.map((product) => (
                            <Grid item xs={6} md={4}>
                                <ProductCard id={product.id} productName={product.productName} imageLink={product.imageLink} price={product.price}/>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Home;
