import React, { useEffect, useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    MenuItem,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { BASE_URL } from '../../Utils/Utils';
import Cookies from 'js-cookie';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
};

const categories = ['Fast Food', 'Desi', 'Chinese', 'Italian', 'BBQ'];

const EditModal = ({ open, setOpen, selectedData ,isReload , setIsReload }) => {


    const { handleSubmit, control, reset } = useForm({
        defaultValues: {
            RestaurantName: "",
            RestaurantDetail: "",
            ContactNumber: "",
            Address: "",
            Email: "",
            category: "",
        },
    })

    const handleClose = () => setOpen(false)
    console.log("me call ho raha hon..", selectedData._id)

    useEffect(() => {
        reset(selectedData)
    }, [])


    const onSubmit = async (obj) => {

        console.log(obj)
        let id = obj._id

       

        let updatedData = {
            RestaurantName: obj.RestaurantName,
            RestaurantDetail: obj.RestaurantDetail,
            ContactNumber: obj.ContactNumber,
            Address: obj.Address,
            Email: obj.Email,
            category: obj.category
        }

        console.log(updatedData)

        try {
            let res = await axios.put(`${BASE_URL}/resturant/venderResturant/${id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })

            console.log(res)

            alert(res.data.message)

            setIsReload(!isReload)
            setOpen(false)
        } catch (err) {
            console.log(err)
            alert(err.message)
        }
    };

    return (
        <Modal open={open}>
            <Box sx={style}>
                <Typography variant="h6" gutterBottom>
                    Edit Restaurant
                </Typography>

                <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>

                    <Controller
                        name="RestaurantName"
                        control={control}
                        render={({ field, formState: { errors } }) => <TextField
                            fullWidth
                            label="Restaurant Name"
                            name="name"
                            required
                            {...field}

                            margin="normal"
                        />
                        }
                    />


                    <Controller
                        name='RestaurantDetail'
                        control={control}
                        render={({ field, formState: { errore } }) => <TextField
                            fullWidth
                            label="Restaurant Details"
                            name="name"
                            required
                            {...field}

                            margin="normal"
                        />
                        }
                    />


                    <Controller
                        name='ContactNumber'
                        control={control}
                        render={({ field, formState: { errore } }) => <TextField
                            fullWidth
                            label="Contact Number"
                            name="Contact Number"
                            required
                            {...field}

                            margin="normal"
                        />
                        }
                    />

                    <Controller
                        name='Address'
                        control={control}
                        render={({ field, formState: { errore } }) => <TextField
                            fullWidth
                            label="Address"
                            name="Address"
                            required
                            {...field}

                            margin="normal"
                        />

                        }
                    />


                    <Controller
                        name='Email'
                        control={control}
                        render={({ field, formState: { errore } }) => <TextField
                            fullWidth
                            label="email"
                            name="email"
                            required
                            {...field}

                            margin="normal"
                        />


                        }
                    />



                    <Controller
                        name='category'
                        control={control}
                        render={({ field, formState: { errore } }) => <TextField
                            fullWidth
                            select
                            label="Category"
                            name="category"
                            required
                            {...field}

                            margin="normal"
                        >
                            {categories.map((cat) => (
                                <MenuItem key={cat} value={cat}>
                                    {cat}
                                </MenuItem>
                            ))}
                        </TextField>


                        }
                    />

                    <Button variant="contained" type='submit'>
                        Edit Restaurant
                    </Button>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                    <Button onClick={handleClose} sx={{ mr: 2 }}>
                        Cancel
                    </Button>

                </Box>
            </Box>
        </Modal>
    );
};

export default EditModal;
