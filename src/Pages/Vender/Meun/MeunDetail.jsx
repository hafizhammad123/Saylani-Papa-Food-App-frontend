import React, { useEffect, useState } from 'react'
import { VenderLayout } from '../../../Components'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../../Utils/Utils'
import Cookies from 'js-cookie'
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    IconButton,
    CardActions,
    Box,
    Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditMeun from '../../../Components/Modals/EditMeun'

const MeunDetail = () => {
    const [meunData, setMeunData] = useState([])
    const [open, setOpen] = useState(false)
    const [selectedData, setSelectedData] = useState({})
    const [isReload, setIsReload] = useState(false)
    const { id } = useParams()
    let location = useLocation()

    let meunRestName = location.state?.restName
    console.log(meunRestName)

    useEffect(() => {
        getMeun()
    }, [isReload])

    const getMeun = async () => {
        try {
            let data = await axios.get(`${BASE_URL}/meun/get/${id}`, {
                headers: {
                    "Authorization": `Bearer ${Cookies.get("token")}`
                }
            })
            console.log(data.data.restaurantMeun)
            setMeunData(data.data.restaurantMeun)

        } catch (error) {
            console.log(error)
        }
    }

    const deletData = async (id) => {
        try {
            let delResponse = await axios.delete(`${BASE_URL}/meun/del/${id}`, {
                headers: {
                    "Authorization": `Bearer ${Cookies.get("token")}`
                }
            })
            console.log(delResponse.data.message)
            console.log(id)
            getMeun()

        } catch (error) {
            console.log(error)
        }
    }

    const updatedData = (data) => {
        setOpen(true)
        setSelectedData(data)
        console.log(data)
    }
    return (
        <VenderLayout>
            <h1 style={{ marginBottom: "20px" }}>{`Your ${meunRestName} Restaurant meun`}</h1>

            <Stack flexDirection={"row"} justifyContent={"center"} gap={'20px'}>
                {meunData?.map((items) => {
                    return (
                        <>
                            <Card sx={{ maxWidth: 345, borderRadius: 3, boxShadow: 3 }}>
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={items.imageUrl}
                                    alt="internet problam"
                                />
                                <CardContent>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography gutterBottom variant="h6" component="div">
                                            {items.meunName}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary">
                                            Rs {items.price}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary">
                                        {items.meunDetail}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing sx={{ justifyContent: 'flex-end' }}>
                                    <IconButton onClick={() => updatedData(items)} color="primary" >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => deletData(items._id)} color="error" >
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>

                           {open && <EditMeun isReload={isReload} setIsReload={setIsReload} open={open}  setOpen={setOpen}  selectedData={selectedData} />}

                        </>
                    )
                })}
            </Stack>
        </VenderLayout>
    )
}

export default MeunDetail