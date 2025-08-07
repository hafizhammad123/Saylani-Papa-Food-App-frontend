import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    Box,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/Slice/addToCart';

const MenuCard = (data) => {

    let dispatch = useDispatch()

    const sentAddToCard = () =>{
       dispatch(addToCart(data))
       console.log(data)
    }
    return (
        <Card
            sx={{
                maxWidth: 300,
                m: 'auto',
                borderRadius: 3,
                boxShadow: 3,
                transition: 'transform 0.3s',
                '&:hover': {
                    transform: 'scale(1.03)',
                },
            }}
        >
            <CardMedia
                component="img"
                height="180"
                image={data.data.imageUrl}
                alt={name}
                sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
            />
            <CardContent>
                <Typography variant="h6" component="div" fontWeight={600}>
                    {data.data.meunName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Price: Rs. {data.data.price}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={sentAddToCard} fullWidth variant="contained" color="primary">
                    add to cart
                </Button>
            </CardActions>
        </Card>
    );
};

export default MenuCard;
