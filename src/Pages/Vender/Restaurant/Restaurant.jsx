import { useEffect, useState } from 'react'
import { Modals, VenderLayout, RestaurantCard, EditModal } from '../../../Components'
import { Button, Stack, Typography, Box } from '@mui/material'
import axios from 'axios'
import { BASE_URL } from '../../../Utils/Utils'
import Cookies from 'js-cookie'



const Restaurant = () => {

    const [restaurantModal, setRestaurantModal] = useState(false)
    const [editrestaurantModal, setEditRestaurantModal] = useState(false)
    const [resturantData, setResturantData] = useState([])
    const [selectedData, setSelectedData] = useState({})
    const [isReload, setIsReload] = useState(false)



    useEffect(() => {
        getData()
    }, [isReload])

    const getData = async () => {
        try {
            
            let result = await axios.get(`${BASE_URL}/resturant/venderResturant`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })
            console.log("get data", result.data.Data)
            console.log(result.data.message)
            setResturantData(result.data.Data)
            

        } catch (error) {
            console.log("ddd", error)
        }
    }

    return (
        <VenderLayout>
            <Stack flexDirection={"row"} justifyContent={"space-between"}>
                <Typography variant='h4'>Resturant</Typography>
                <Box onClick={() => setRestaurantModal(true)} component={Button} variant='outlined' >Create User</Box>
            </Stack>

            <Modals open={restaurantModal} setOpen={setRestaurantModal} isReload={isReload} setIsReload={setIsReload} />

            {editrestaurantModal && <EditModal open={editrestaurantModal} setOpen={setEditRestaurantModal} selectedData={selectedData} isReload={isReload} setIsReload={setIsReload} />}

            <Stack mt={"30px"} flexDirection={"row"} flexWrap={"wrap"}>
                {resturantData?.map((resturant) => {
                    return <RestaurantCard data={resturant} isReload={isReload} setIsReload={setIsReload} setSelectedData={setSelectedData} setEditRestaurantModal={setEditRestaurantModal} />
                })}
            </Stack>

        </VenderLayout>
    )
}

export default Restaurant