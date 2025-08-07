import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Box,
    Typography,
    IconButton,
    Card,
    CardMedia,
    CardContent,
    Button,
    Stack
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { incer, dcer, removeItem } from '../../Redux/Slice/addToCart';
import { Link } from 'react-router-dom';

const AddToCartPage = () => {
    const { items, totalAmount } = useSelector((state) => state.cart);

    const dispatch = useDispatch();

    const addQuantity = (id) => {
        dispatch(incer(id));
    };

    const miusQuantity = (id) => {
        dispatch(dcer(id));
    };

    const removeAllItem = () => {
        dispatch(removeItem());
    };

    return (
        <>
            <Typography variant="h4" gutterBottom>🛒 Your Cart</Typography>
            <Box p={3}>
                <Button variant="outlined" color="error" onClick={removeAllItem}>
                    Remove All Items
                </Button>

                {items.length === 0 ? (
                    <Typography variant="h5" mt={2}>Your cart is empty</Typography>
                ) : (
                    <>
                        {items.map(item => (
                            <Card key={item._id} sx={{ display: 'flex', mb: 2, alignItems: 'center', p: 1 }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 120, height: 120, borderRadius: 2 }}
                                    image={item.imageUrl}
                                    alt={item.meunName}
                                />
                                <CardContent sx={{ flex: 1 }}>
                                    <Typography variant="h6">{item.meunName}</Typography>
                                    <Typography>Price: Rs. {item.price}</Typography>
                                    <Typography>Total: Rs. {item.price * item.quantity}</Typography>
                                </CardContent>

                                <Stack direction="row" spacing={1} alignItems="center">
                                    <IconButton onClick={() => miusQuantity(item._id)}>
                                        <Remove />
                                    </IconButton>
                                    <Typography>{item.quantity}</Typography>
                                    <IconButton onClick={() => addQuantity(item._id)}>
                                        <Add />
                                    </IconButton>

                                </Stack>
                            </Card>
                        ))}

                        <Box mt={3}>
                            <Typography variant="h5">Grand Total: Rs. {totalAmount}</Typography>
                            <Link style={{ textDecoration: "none", color: "white" }} to={"/placeOrder"}>
                                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                                    Proceed to Checkout
                                </Button>
                            </Link>
                        </Box>
                    </>
                )}
            </Box>
        </>
    );
};

export default AddToCartPage;
