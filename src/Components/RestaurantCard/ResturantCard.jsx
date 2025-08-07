import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    Stack,
    Button,
    Divider
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';
import { BASE_URL } from '../../Utils/Utils';
import Cookies from 'js-cookie';
import EditModal from '../Modals/EditModals';



const RestaurantCard = ({ data, isReload, setIsReload, setSelectedData, setEditRestaurantModal }) => {


    const {
        RestaurantName,
        category,
        ContactNumber,
        Email,
        Address,
        RestaurantDetail,
        isApproved,
        isDeleted,
        isOpen,
        createAt,
        createBy,
        _id
    } = data;



    const deleteRest = async (id) => {
        try {

            let result = await axios.delete(`${BASE_URL}/resturant/venderResturant/${id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })
            console.log(result)
            setIsReload(!isReload)

        } catch (error) {
            console.log("error", error)
            alert("something went wrong...")
        }
    }


    const updated = async () => {
        setEditRestaurantModal(true)
        setSelectedData(data)
    }

    const updateStatus = async (id) => {
        try {
            let status = {
                isOpen: !isOpen
            };

            console.log(status.isOpen)
            let result = await axios.patch(`${BASE_URL}/resturant/venderResturant/${id}`, status, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            });

            console.log(result);
            alert(result.data.message)
            setIsReload(!isReload); // ✅ ye zaroori hai taake latest data reload ho
        } catch (error) {
            console.log(error.message);
        }
    };

    return (



        <Card sx={{ maxWidth: 400, borderRadius: 4, boxShadow: 3, m: 2 }}>
            <Stack flexDirection={"row"} justifyContent={"center"}>
                <CardContent>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        {RestaurantName}
                    </Typography>

                    <Chip label={category} color="primary" variant="outlined" sx={{ mb: 1 }} />

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {RestaurantDetail}
                    </Typography>

                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                        <PhoneIcon fontSize="small" />
                        <Typography variant="body2">{ContactNumber}</Typography>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                        <EmailIcon fontSize="small" />
                        <Typography variant="body2">{Email}</Typography>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                        <LocationOnIcon fontSize="small" />
                        <Typography variant="body2">{Address}</Typography>
                    </Stack>

                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                        <Chip label={isApproved ? 'Approved' : 'Pending'} color={isApproved ? 'success' : 'warning'} />
                        <Chip onClick={() => updateStatus(_id)} label={isOpen ? 'Open' : 'Closed'} color={isOpen ? 'success' : 'error'} />
                        {isDeleted && <Chip label="Deleted" color="error" />}
                    </Stack>

                    <Divider sx={{ my: 1 }} />

                    <Typography variant="caption" color="text.secondary">
                        Created by: {createBy}
                    </Typography>
                    <br />
                    <Typography variant="caption" color="text.secondary">
                        Created on: {new Date(createAt).toLocaleDateString()}
                    </Typography>



                    {/* ✅ Action Buttons */}
                    <Stack direction="row" justifyContent="flex-end" spacing={1} mt={2}>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"

                            onClick={() => updated()}
                        >
                            Update
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => deleteRest(data._id)}
                        >
                            Delete
                        </Button>
                    </Stack>

                </CardContent>
            </Stack >
        </Card>

    );
};

export default RestaurantCard;
