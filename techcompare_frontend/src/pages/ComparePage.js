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

// import product images
import ProductImage from '../components/ProductImage';

import laptopImage from '../images/laptop.jpg';
import phoneImage from '../images/phone.png';
import headphoneImage from '../images/headphone.png';
import padImage from '../images/pad.png';

const categoryImages = {
    Laptop: laptopImage,
    Phone: phoneImage,
    Headphone: headphoneImage,
    Pad:padImage,
  };

export default function ComparePage() {
    const { id1, id2 } = useParams();

    const [product1, setProduct1] = useState([]);
    const [specifications1, setSpecifications1] = useState([]);
    const [product2, setProduct2] = useState([]);
    const [specifications2, setSpecifications2] = useState([]);

    useEffect(() => {
        // fetch all products and console.log it 
        const fetchData = async (id, setProduct, setSpecifications) => {
            try {
                const url = `http://localhost:8080/techCompare/products/${id}`;
                console.log(url);
                const response = await axios.get(url);
                setProduct(response.data);
                setSpecifications(response.data.specifications)
                console.log((response.data.review))
            } catch (error) {
                console.error('Error fetching data: ', id, error);
                // Handle errors here based on your application's needs
            }
        };
        console.log("fetchData")
        fetchData(id1, setProduct1, setSpecifications1);
        fetchData(id2, setProduct2, setSpecifications2);
    }, [id1, id2]);


    return (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4}>
            {[product1, product2].map((product, index) => {
              const specifications = index === 0 ? specifications1 : specifications2;
              const image = categoryImages[product.category] || phoneImage;
              
              return (
                <Grid item xs={12} md={6} key={index}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'left',
                      justifyContent: 'left',
                      p: 5
                    }}
                  >
                    <Box
                      sx={{
                        height: '300px', 
                        width: '100%', 
                        display: 'flex',
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        overflow: 'hidden'
                      }}
                    >
                      <ProductImage id={product.productStringId}/>                      
                    </Box>

                    <Typography variant="h3" component="h2" sx={{ pb: 5 }}>
                      {product.productName}
                    </Typography>
                    <Typography variant="h4" component="h2" sx={{ pb: 5 }}>
                      ${product.currentPrice}
                    </Typography>
                    <Typography variant="h6" component="h2" sx={{ pt: 2 }}>
                      Specifications:
                    </Typography>
                    <Box sx={{ pl: 3, pt: 1 }}>
                      {Object.entries(specifications).map(([key, value]) => (
                        value ? <Typography variant="body1" sx={{ m: 0.5 }} key={key}>
                                  {`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}
                                </Typography>
                              : null
                      ))}
                    </Box>
                  </Box>
                </Grid>
              );
            })}
            <Divider orientation="vertical" flexItem sx={{ height: 'auto' }} />
          </Grid>
        </Box>
      );
}
    
    // return (
    //     <Box sx={{ flexGrow: 1 }}>
    //       <Grid container spacing={4}> {/* Increased spacing for better visual separation */}
    //         <Grid item xs={12} md={6}>
    //           <Box
    //             sx={{
    //               display: 'flex',
    //               flexDirection: 'column',
    //               alignItems: 'center',
    //               justifyContent: 'center',
    //               p: 5 // Increased padding
    //             }}
    //           >
    //             <img src={image1} alt={product.productName} style={{ maxWidth: '100%', maxHeight: '300px' }} />
    //             <Typography variant="h3" component="h2" sx={{ pb: 5 }}>
    //               {product.productName}
    //             </Typography>
    //             <Typography variant="h4" component="h2" sx={{ pb: 5 }}>
    //               ${product.currentPrice}
    //             </Typography>
    //             <Typography variant="h6" component="h2" sx={{ pt: 2 }}>
    //               Specifications:
    //             </Typography>
    //             <Box sx={{ pl: 3, pt: 1 }}>
    //               {Object.entries(specifications).map(([key, value]) => {
    //                 if (value) {
    //                   return (
    //                     <Typography variant="body1" sx={{ m: 0.5 }} key={key}>
    //                       {`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}
    //                     </Typography>
    //                   );
    //                 }
    //                 return null; // If value is null, return null to render nothing for this entry
    //               })}
    //             </Box>
    //           </Box>
    //         </Grid>
    //         <Divider orientation="vertical" flexItem />
    //         <Grid item xs={12} md={5}>
    //           {/* This side can be used for other content or remain empty based on your needs */}
    //         </Grid>
    //       </Grid>
    //     </Box>
    //   );
    // }
    

