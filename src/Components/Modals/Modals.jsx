import React, { useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    MenuItem,
    CircularProgress,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { BASE_URL } from '../../Utils/Utils';
import Cookies from 'js-cookie';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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

const Modals = ({ open, setOpen, isReload, setIsReload }) => {
    const [loder , setLoder] = useState(false)

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });


    const { handleSubmit, control } = useForm({
        defaultValues: {
            RestaurantName: "",
            RestaurantDetail: "",
            ContactNumber: "",
            Address: "",
            Email: "",
            category: "",
        }
    })

    const handleClose = () => setOpen(false)
    const [image, setImage] = useState("")


    console.log(image)

    const onSubmit = async (obj) => {
        try {
            let imageUrl;
            if (image) {
                console.log("image uploading....", image)
                
                const formData = new FormData()
                formData.append("image", image)
                setLoder(true)
                const imageRes = await axios.post(`${BASE_URL}/img/upload`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${Cookies.get("token")}`
                    }
                })
                console.log("imageRes", imageRes)
                imageUrl = imageRes.data.url
                console.log(imageUrl)
                setLoder(false)
            }

            const objToSend = {
                ...obj,
                imageUrl: imageUrl || null
            }



            let res = await axios.post(`${BASE_URL}/resturant/venderResturant`, objToSend, {
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

    console.log(image[0])
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h6" gutterBottom>
                    Create New Restaurant
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
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload files
                        <VisuallyHiddenInput
                            type="file"
                            onChange={(event) => setImage(event.target.files[0])}
                            multiple
                        />
                    </Button>

                    <Button variant="contained" type='submit'>
                        Createddddd
                    </Button>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                    <Button onClick={handleClose} sx={{ mr: 2 }}>
                        Cancel
                    </Button>

                </Box>

                {loder &&  <CircularProgress color="success" /> }

            </Box>
        </Modal>
    );
};

export default Modals;
