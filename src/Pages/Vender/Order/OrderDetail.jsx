import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Typography,
    Button,
} from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../../Utils/Utils';
import Cookies from 'js-cookie';

const OrderDetail = () => {
    let [orderData, setOrderData] = useState([])
    let { id } = useParams()
    let navigate = useNavigate()

    useEffect(() => {
        getOrder()
    }, [])

    const getOrder = async () => {


        try {
            let data = await axios.get(`${BASE_URL}/order/getOrder/${id}`, {
                headers: {
                    "Authorization": `Bearer ${Cookies.get("token")}`
                }
            })

            console.log(data.data.finddata)
            setOrderData(data.data.finddata)
        } catch (error) {
            console.log(error)
        }
    }
    // 🟡 Static dummy data
    let location = useLocation()
    let RestName = location.state.restName

    // 🔵 Color based on status


    return (
        <Paper elevation={3} sx={{ p: 2, mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                All Orders , {RestName} Restaurant
            </Typography>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Order ID</strong></TableCell>
                            <TableCell><strong>Customer</strong></TableCell>
                            <TableCell><strong>Address</strong></TableCell>
                            <TableCell><strong>Items</strong></TableCell>
                            <TableCell><strong>Amount</strong></TableCell>
                            <TableCell><strong>Date</strong></TableCell>
                            <TableCell><strong>Action</strong></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {orderData.map((order) => (
                            <>
                                {console.log(order)}
                                <TableRow key={order._id}>
                                    <TableCell>{order._id}</TableCell>
                                    <TableCell>{order.shippingAddress.fullName}</TableCell>
                                    <TableCell>{order.shippingAddress.street}</TableCell>
                                    <TableCell>{order.items.map((item) => item.quantity)}</TableCell>
                                    <TableCell>Rs {order.totalAmount}</TableCell>
                                    <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => navigate(`/singleorderDetail/${order._id}`)} variant='contained'>View Order</Button>
                                    </TableCell>
                                </TableRow>
                            </>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default OrderDetail;
