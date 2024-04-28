import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import fetchData from '../pages/WishListPage.js'
// import product images
import ProductImage from '../components/ProductImage';

const token = localStorage.getItem("authToken");
if (token!="signin"){
    axios.defaults.headers.common = {"signin": "sign"}
}
else{
    axios.defaults.headers.common = {"signout": "signout"}
}
  
export default function ProductWishCard({id, productName, price, ram, storage, onRemove}) {
    const navigate = useNavigate();
    const [currentPrice, setCurrentPrice] = useState(price);
    const [previousPrice, setPreviousPrice] = useState(null);
    const token = localStorage.getItem("authToken");

    useEffect(() => {
        const fetchCurrentPrice = async () => {
            try {
                const url = `http://localhost:8080/techCompare/products/${id}/currentprice`;
                const response = await axios.get(url, {
                    headers: {
                        'auth': token,
                        'Custom-Header': 'value' // 这里添加其他需要的头部信息
                      }
                  });
                const newPrice = response.data;  // 确保这里是获取的具体价格字段
                console.log("price:",price);
                console.log("current price: ", currentPrice);
                console.log("previous price: ", previousPrice);
                console.log("new price: ", newPrice);
                if (currentPrice !== newPrice) {
                    setPreviousPrice(currentPrice); // 先设置旧价格
                    setCurrentPrice(newPrice);      // 然后更新新价格
                    const params = new URLSearchParams();
                    params.append('productId', id);
                    params.append('newPrice', newPrice);

                    const url_pricehis = `http://localhost:8080/techCompare/products/updatepricehist`;
                    axios.post(url_pricehis, params, {
                        headers: {
                          'Custom-Header': 'value', // 设置 Content-Type 头部
                          'auth': token // 设置 Authorization 头部
                        }
                      })
                    .then(response => {
                        console.log('Response:', response.data);
                    })
                    .catch(error => {
                        console.error('Error updating price history:', error);
                    });
                }
            } catch (error) {
                console.error('Error fetching current price:', error);
            }
        };
    
        const intervalId = setInterval(fetchCurrentPrice, 10000); // 每10秒检查一次价格变化
    
        return () => {
            clearInterval(intervalId); // 组件卸载时清除定时器
        };
    }, [id, currentPrice]); // 添加currentPrice作为依赖项

    useEffect(() => {
        console.log("Updated current price: ", currentPrice);
        console.log("Updated previous price: ", previousPrice);
    }, [currentPrice, previousPrice]);
    
    

    

    const RemoveWishList = async () => {
        try {
            // change to user email
            const email = "user123@example.com";
            console.log('Sending request with:', { email: email, productId: id });
            console.log(token);
            const response = await axios.post('http://localhost:8080/techCompare/user/removeFromWishlist', null, {
            params: {
                email: email,
                productId: id
            },
            headers: {
                'auth': token,
                'Custom-Header': 'value' // 这里添加其他需要的头部信息
              }    
        });
            
            console.log('Product removed from wishlist:', response.data);
            onRemove(id);
            // await fetchWishlist(); 
            navigate(`/wishlistpage`);  // 使用 email 作为 URL 参数或其他标识符
        } catch (error) {
            console.error('Error adding product to wishlist:', error);
        }
    };

    const getPriceColor = () => {
        if (previousPrice === null) return "text.secondary"; // 初始加载，无颜色变化
        if (currentPrice > previousPrice) {
            return "red"; // 价格上涨显示红色
        } else if (currentPrice < previousPrice) {
            return "green"; // 价格下跌显示绿色
        } else {
            return "text.secondary"; // 如果价格没有变化，继续显示原始颜色
        }
    };
    
    


    return (
        <Card sx={{ Width: 345, height:400 }}>
        <CardActionArea component={Link} to={`/product/${id}`}>
            <Box sx={{height:"150px"}}>
                <ProductImage id={id}/>
            </Box>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {productName}
                </Typography>
                {/* <Typography variant="body1" color="text.secondary">
                    ${price}
                </Typography> */}
                <Typography variant="body1" color="text.secondary" style={{ color: getPriceColor() }}>
                    ${currentPrice}
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
            <Button className="me-auto" size="small" variant="text" color="primary" onClick={RemoveWishList}>
                Remove product
            </Button>
        </CardActions>
        </Card>
    );
}



