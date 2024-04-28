import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import ProductWishCard from '../components/ProductWishCard';
import { UserContext } from '../context/UserContext';
const token = localStorage.getItem("authToken");
if (token!="signin"){
    axios.defaults.headers.common = {"signin": "sign"}
}
else{
    axios.defaults.headers.common = {"signout": "signout"}
}

function WishListPage() {
    // const { id } = useParams();
    const [wishlist, setWishlist] = useState([]);
    const [lastUpdated, setLastUpdated] = useState(Date.now());
    // const email = "user123@example.com";
    const { user2, login, logout } = useContext(UserContext);
    console.log("wishlistpageee");
    console.log(user2.email);
    const token = localStorage.getItem("authToken");
    const email = user2.email;
 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://techcompare.azurewebsites.net/techCompare/user/getWishlist?email=${encodeURIComponent(email)}`, {
                    headers: {
                        'Custom-Header': 'value', // 设置 Content-Type 头部
                        'auth': token // 设置 Authorization 头部
                    }
                  });
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
            await axios.post('http://techcompare.azurewebsites.net/techCompare/user/removeFromWishlist', null, {
                params: { email, productId }, 
                    headers: {
                      'Custom-Header': 'value', // 设置 Content-Type 头部
                      'auth': token // 设置 Authorization 头部
                    }         
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

