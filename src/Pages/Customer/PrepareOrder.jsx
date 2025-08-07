import React, { useEffect, useState } from 'react';
import {
    Paper,
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    Divider,
    Avatar,
    Stack,Button
} from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BASE_URL } from '../../Utils/Utils';
import { CheckCircleOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const cookingGif = "https://www.icegif.com/wp-content/uploads/2024/01/icegif-291.gif"

const PrepareOrder = () => {

    let [status, setStatus] = useState(false)
    let [reload, setreload] = useState(false)

    const { items, totalAmount } = useSelector((state) => state.cart);
    const navigate = useNavigate();

    const handleGoToRestaurant = () => {
        navigate('/CustomerDashbord');
    };

    console.log(items)

    useEffect(() => {
        const interval = setInterval(() => {
            getStatus(); // ✅ Call API every few seconds
        }, 5000); // Every 5 seconds (you can adjust)

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [])
    const getStatus = async () => {
        try {
            let id = localStorage.getItem("orderId");
            let dataStatus = await axios.get(`${BASE_URL}/order/getOrderstatus/${id}`, {
                headers: {
                    "Authorization": `Bearer ${Cookies.get("token")}`
                }
            });

            let orderStatus = dataStatus.data?.getdata?.[0]?.orderStatus;
            if (orderStatus) {
                setStatus(true); // ✅ Only set true when status is available
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            {status ? <Paper
                elevation={4}
                sx={{
                    p: 4,
                    maxWidth: 500,
                    mx: 'auto',
                    mt: 8,
                    textAlign: 'center',
                    borderRadius: 3,
                    backgroundColor: '#E8F5E9',
                }}
            >
                <CheckCircleOutline sx={{ fontSize: 60, color: 'green' }} />

                <Typography variant="h5" mt={2} fontWeight={600}>
                    Your Order Has Been Delivered!
                </Typography>

                <Typography variant="body1" color="text.secondary" mt={1}>
                    Thank you for ordering with us. We hope to serve you again soon 🙏
                </Typography>

                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, borderRadius: 2 }}
                    onClick={handleGoToRestaurant}
                >
                    Go to Restaurant List
                </Button>
            </Paper> :
                <Paper elevation={4} sx={{ p: 4, maxWidth: 700, mx: 'auto', mt: 4 }}>
                    {/* Heading */}
                    <Typography variant="h5" gutterBottom>
                        🧑‍🍳 Order is Being Prepared
                    </Typography>

                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        Estimated time: <strong>30 Minutes</strong>
                    </Typography>

                    {/* Cooking GIF */}
                    <Box
                        component="img"
                        src={cookingGif}
                        alt="Cooking"
                        sx={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: 2, my: 2 }}
                    />

                    {/* Cart Items */}
                    <Typography variant="h6" gutterBottom>
                        Items in Your Order
                    </Typography>

                    <List>
                        {items.map((item, index) => (
                            <React.Fragment key={index}>
                                <ListItem>
                                    <ListItemText
                                        primary={`${item.meunName} x${item.quantity}`}
                                        secondary={`Price: Rs ${item.price} | Subtotal: Rs ${item.quantity * item.price}`}
                                    />
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        ))}
                    </List>

                    {/* Total */}
                    <Stack direction="row" justifyContent="space-between" mt={2}>
                        <Typography variant="h6">Total:</Typography>
                        <Typography variant="h6" color="primary">Rs {totalAmount}</Typography>
                    </Stack>
                </Paper>

            }

        </>
    );
};

export default PrepareOrder;
