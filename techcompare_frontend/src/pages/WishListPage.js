// import React from 'react';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import ProductCardWishList from '../components/ProductWishCard';
// import Grid from '@mui/material/Grid';
// import ProductWishCard from '../components/ProductWishCard';

// // 示例数据，实际应用中你可能需要从后端API获取
// // const wishlistItems = [
// //   { id: 1, name: "Product 1", description: "This is Product 1", price: "$299" },
// //   { id: 2, name: "Product 2", description: "This is Product 2", price: "$499" }
// // ];

// function WishListPage() {
//     const { id } = useParams();
//     const [wishlist, setWishlist] = React.useState([]);
//     const email = "user123@example.com";  // 假设您已经有了用户的电子邮件

//     React.useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8080/techCompare/user/getWishlist?email=${encodeURIComponent(email)}`);
//                 console.log('Fetched wishlist data:', response.data);
//                 setWishlist(response.data);
//             } catch (error) {
//                 console.error('Error fetching wishlist data:', error);
//             }
//         };
//         fetchData();
//     }, [email]);  // 依赖数组中包括 email，确保当 email 改变时重新获取数据
    
//     return(
//         <div style={{padding:"8%"}}>
//             {/* Outer Grid Container */}
//             <Grid container spacing={2}>
//                 {/* Menu on the Left */}
                
//                 {/* Second Item (Container for Nested Grid) */}
//                 <Grid item xs={10}>
//                     {/* Nested Grid Container */}
//                     <Grid container spacing={2}>
//                         {wishlist.map((product) => (
//                             <Grid item xs={6} md={4}>
//                                 <ProductWishCard
//                                     id={product.productStringId}
//                                     productName={product.productName}
//                                     imageLink={product.imageLink}
//                                     price={product.currentPrice}
//                                     ram={product.specifications.ram}
//                                     storage={product.specifications.storage}/>
//                             </Grid>
//                         ))}
//                     </Grid>
//                 </Grid>
//             </Grid>
//         </div>
//     );
  
// }

// export default WishListPage;

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import ProductWishCard from '../components/ProductWishCard';
import { UserContext } from '../context/UserContext';

function WishListPage() {
    const { id } = useParams();
    const [wishlist, setWishlist] = useState([]);
    const [lastUpdated, setLastUpdated] = useState(Date.now());
    // const email = "user123@example.com";
    const { user2, login, logout } = useContext(UserContext);
    const email = user2.email;
 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/techCompare/user/getWishlist?email=${encodeURIComponent(email)}`);
                console.log('Fetched wishlist data:', response.data);
                setWishlist(response.data);
            } catch (error) {
                console.error('Error fetching wishlist data:', error);
            }
        };
        fetchData();
    }, [email, lastUpdated]); // 依赖于 email 和 lastUpdated

    const handleRemoveFromWishlist = async (productId) => {
        try {
            await axios.post('http://localhost:8080/techCompare/user/removeFromWishlist', null, {
                params: { email, productId }
            });
            setLastUpdated(Date.now()); // Trigger re-fetching the wishlist
        } catch (error) {
            console.error('Error removing item from wishlist:', error);
        }
    };


    return (
        <div style={{ padding: "8%" }}>
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <Grid container spacing={2}>
                        {wishlist.map((product) => (
                            <Grid item xs={6} md={4} key={product.productStringId}>
                                <ProductWishCard
                                    id={product.productStringId}
                                    productName={product.productName}
                                    imageLink={product.imageLink}
                                    price={product.currentPrice}
                                    ram={product.specifications.ram}
                                    storage={product.specifications.storage}
                                    onRemove={() => handleRemoveFromWishlist(product.productStringId)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default WishListPage;

