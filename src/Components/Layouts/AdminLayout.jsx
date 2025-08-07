import React from 'react';
import { Box, CssBaseline, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { Link } from 'react-router-dom';


const drawerWidth = 240;

const AdminLayout = ({ children }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Top AppBar */}
            <AppBar
                position="fixed"
                sx={{
                    width: `calc(100% - ${drawerWidth}px)`,
                    ml: `${drawerWidth}px`,
                    backgroundColor: '#95e500ff',
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Admin Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Sidebar / Drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: '#f5f5f5'
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {[{
                            pageName: "Dashbord",
                            pageURL: "/adminDashbord",
                            PageIcon: <DashboardIcon />
                        }, {
                            pageName: "All Restaurant",
                            pageURL: "/adAllRestaurant",
                            PageIcon: <MenuBookIcon />
                        }
                        ].map((list, index) => (
                            <ListItem button key={list}>
                                <ListItemIcon>
                                    {list.PageIcon}
                                </ListItemIcon>
                                <Link style={{textDecoration: "none", color: "black"}} to={list.pageURL}>
                                    <ListItemText primary={list.pageName} />
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: '#eaeff1',
                    p: 3,
                    minHeight: '100vh',
                }}
            >
                <Toolbar />
                {/* Children means whatever you pass inside this layout */}
                {children}
            </Box>
        </Box>
    );
};

export default AdminLayout;
