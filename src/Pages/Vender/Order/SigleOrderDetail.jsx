import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Divider,
    List,
    ListItem,
    ListItemText,
    Stack,
    Chip,
    Button
} from '@mui/material';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { BASE_URL } from '../../../Utils/Utils';

const SigleOrderDetail = () => {


    let { id } = useParams()
    const [order, setOrder] = useState({})
    const [status, setStatus] = useState(false)

    useEffect(() => {
        getOrder()
    }, [])

    const getOrder = async () => {


        try {
            let data = await axios.get(`${BASE_URL}/order/getSigleOrder/${id}`, {
                headers: {
                    "Authorization": `Bearer ${Cookies.get("token")}`
                }
            })



            console.log(data.data.finddata._id)

            setOrder(data.data.finddata)

            let dataStatus = await axios.get(`${BASE_URL}/order/getOrderstatus/${data.data.finddata._id}`, {
                headers: {
                    "Authorization": `Bearer ${Cookies.get("token")}`
                }
            })
            console.log(dataStatus.data.getdata[0].orderStatus)
            setStatus(dataStatus.data.getdata[0])
        } catch (error) {
            console.log(error)
        }
    }

    const updateStatus =async (id) => {
        try {
            let obj ={
                orderStatus :!status.orderStatus
            }
             let updatedDataStatus = await axios.patch(`${BASE_URL}/order/updatedOrderstatus/${id}`,obj, {
                headers: {
                    "Authorization": `Bearer ${Cookies.get("token")}`
                }
            })
            console.log(updatedDataStatus.data)
            // setStatus(updatedDataStatus.data.getdata[0])
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Paper elevation={4} sx={{ p: 4, maxWidth: 700, mx: 'auto', mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Order Details
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Order Info */}
            <Box mb={2}>
                <Typography><strong>Order ID:</strong> {order._id}</Typography>
                <Typography><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</Typography>
                <Typography><strong>Status:</strong>
                    {status.orderStatus ? <Chip label="delivered" color="primary" size="small" sx={{ ml: 1 }} /> : <Chip label="Cooking" color="warning" size="small" sx={{ ml: 1 }} />}

                </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Address */}
            <Box mb={2}>
                <Typography variant="h6">Delivery Address</Typography>
                <Typography>{order.shippingAddress?.fullName}</Typography>
                <Typography>{order.shippingAddress?.street}, {order.address?.city}</Typography>
                <Typography>{order.shippingAddress?.phoneNumber}</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Items */}
            <Box>
                <Typography variant="h6" gutterBottom>Items Ordered</Typography>
                <List>
                    {order.items?.map((item, index) => (
                        <ListItem key={index} disableGutters>
                            <ListItemText
                                primary={`${item.meunName} x${item.quantity}`}
                                secondary={`Price: Rs ${item.price} | Total: Rs ${item.price * item.quantity}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Amount */}
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6">Total Amount:</Typography>
                <Typography variant="h6" color="primary">Rs {order.totalAmount}</Typography>
            </Stack>
            <Button onClick={() => updateStatus(status._id)} variant='contained'>Order Delivered</Button>
        </Paper>
    );
};

export default SigleOrderDetail;
