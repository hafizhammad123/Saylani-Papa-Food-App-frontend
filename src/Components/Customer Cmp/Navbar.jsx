import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Badge, Grid, Container } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import HistoryIcon from '@mui/icons-material/History';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const navigate = useNavigate();

      const { items, totalAmount } = useSelector((state) => state.cart);
    const handleLogout = () => {
        // Add logout logic here
        console.log('User logged out');
        navigate('/login');
    };

    return (
        <Box>
            <AppBar  position="sticky" sx={{ backgroundColor: '#a0e500ff' }}> {/* Saylani Blue */}
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, cursor: 'pointer', fontWeight: "bold" }}
                        onClick={() => navigate('/')}
                    >
                        SAYLANI FOOD PAPA
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button
                            color="inherit"
                            startIcon={<RestaurantMenuIcon />}
                            onClick={() => navigate('/restaurants')}
                        >
                            All Restaurants
                        </Button>

                        <Button
                            color="inherit"
                            startIcon={<HistoryIcon />}
                            onClick={() => navigate('/order-history')}
                        >
                            Order History
                        </Button>

                        <IconButton color="inherit" onClick={() => navigate('/addtocart')}>
                            <Badge badgeContent={items.length} color="error"> {/* You can make this dynamic */}
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>

                        <IconButton color="inherit" onClick={handleLogout}>
                            <LogoutIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Header Image Section */}
            <Box sx={{ backgroundColor: '#ffffffff', py: 6 }}>
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            alignItems: 'center',
                            gap: 4,
                        }}
                    >
                        {/* Text Side */}
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h3" component="h1" gutterBottom>
                                Welcome to Saylani Food Service
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                Order your favorite meals from trusted vendors and enjoy fast delivery at your doorstep.
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => navigate('/restaurants')}
                            >
                                Browse Restaurants
                            </Button>
                        </Box>

                        {/* Image Side */}
                        <Box sx={{ flex: 1 }}>
                            <Box
                                component="img"
                                src="../../../pngwing.com.png"
                                alt="Food Delivery"
                                sx={{ width: '100%', borderRadius: 2 }}
                            />
                        </Box>
                    </Box>
                </Container>
            </Box>

        </Box>
    );
};

export default Navbar;
