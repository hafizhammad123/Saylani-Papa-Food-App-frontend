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

const EditMeun = ({ open, setOpen, isReload, setIsReload, selectedData }) => {




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


    const { handleSubmit, control, reset } = useForm({
        defaultValues: {
            selectRestaurant: "",
            meunName: "",
            meunDetail: "",
            price: "",
            category: "",
            image: "",
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

                const imageRes = await axios.post(`${BASE_URL}/img/upload`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${Cookies.get("token")}`
                    }
                })
                console.log("imageRes", imageRes)
                imageUrl = imageRes.data.url
                console.log(imageUrl)
            }

            const objToSend = {
                ...obj,
                imageUrl: imageUrl || null
            }
            console.log(objToSend)


            let res = await axios.put(`${BASE_URL}/meun/edit/${selectedData._id}`, objToSend, {
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
   console.log('data', selectedData)
    useEffect(() => {
      reset(selectedData)
    }, []);




    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h6" gutterBottom>
                    Create Meun
                </Typography>

                <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>

                    <Controller
                        name="meunName"
                        control={control}
                        render={({ field, formState: { errors } }) => <TextField
                            fullWidth
                            label="Meun Name"
                            name="name"
                            required
                            {...field}

                            margin="normal"
                        />
                        }
                    />


                    <Controller
                        name='meunDetail'
                        control={control}
                        render={({ field, formState: { errore } }) => <TextField
                            fullWidth
                            label="Meun  Details"
                            name="Meun  Details"
                            required
                            {...field}

                            margin="normal"
                        />
                        }
                    />


                    <Controller
                        name='price'
                        control={control}
                        render={({ field, formState: { errore } }) => <TextField
                            fullWidth
                            label="Price"
                            name="Pricer"
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
                    <Controller
                        name="image"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="file"
                                onChange={(e) => {
                                    field.onChange(e.target.files[0]);
                                    setImage(e.target.files[0]); // Optional: if you still want preview
                                }}
                            />
                        )}
                    />
                    <Button variant="contained" type='submit'>
                        Submit
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

export default EditMeun;
