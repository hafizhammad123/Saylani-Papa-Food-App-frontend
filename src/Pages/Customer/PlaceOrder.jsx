import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Grid,
    Button,
    Card,
    CardContent,
    Divider,
} from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../../Utils/Utils';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const PlaceOrderPage = () => {

    const { items, totalAmount } = useSelector((state) => state.cart);
    let navigate = useNavigate()

    const [address, setAddress] = useState({
        fullName: '',
        phoneNumber: '',
        city: '',
        street: '',
        postalCode: '',
        WhichRestaurant: items[0].selectRestaurant

    });

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async () => {
        if (
            !address.fullName ||
            !address.phoneNumber ||
            !address.city ||
            !address.street
        ) {
            alert("Please fill all required fields.");
            return;
        }

        const orderData = {
            items,
            shippingAddress: address,
            totalAmount,
        };

        let sentData = await axios.post(`${BASE_URL}/order/createOrder`, orderData, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })


        console.log(sentData.data.createdData._id)
        localStorage.setItem("orderId", sentData.data.createdData._id)
        
        let sentDataOrderStatus = await axios.post(`${BASE_URL}/order/orderStatus`, {orderStatus : false, orderBy :sentData.data.createdData._id}, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })

        alert(sentDataOrderStatus.data.message)
        setAddress("")
        navigate("/prepareOrder")
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 5, p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Place Your Order
            </Typography>

            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Shipping Address
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Full Name"
                                name="fullName"
                                value={address.fullName}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                name="phoneNumber"
                                value={address.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="City"
                                name="city"
                                value={address.city}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Street Address"
                                name="street"
                                value={address.street}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Postal Code (Optional)"
                                name="postalCode"
                                value={address.postalCode}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Your Cart
                    </Typography>
                    {items?.length === 0 ? (
                        <Typography>No items in cart</Typography>
                    ) : (
                        items.map((item, index) => (
                            <Box key={index} sx={{ mb: 1 }}>

                                <Typography>
                                    {item.meunName} x {item.quantity} = Rs. {item.price * item.quantity}
                                </Typography>
                            </Box>
                        ))
                    )}
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6">Total: Rs. {totalAmount}</Typography>
                </CardContent>
            </Card>

            <Box mt={3}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePlaceOrder}
                    fullWidth
                    size="large"
                >
                    Place Order
                </Button>
            </Box>
        </Box>
    );
};

export default PlaceOrderPage;
