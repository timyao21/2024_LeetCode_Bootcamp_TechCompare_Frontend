import * as React from 'react';

//MUI
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

//components
import CategoryMenu from '../components/CategoryMenu.js';
import ProductCard from '../components/ProductCard.js';

// Import the JSON data
import productsData from '../testDataSet/products.json';


function Home() {
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
