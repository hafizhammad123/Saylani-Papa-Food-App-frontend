import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Customer Cmp/Navbar'
import MenuCard from '../../Components/Customer Cmp/MeunCard'
import Footer from '../../Components/Customer Cmp/Footer'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../Utils/Utils'
import Cookies from 'js-cookie'
import { Stack } from '@mui/material'

const MeunCustomer = () => {

    let { id } = useParams()
    let location = useLocation()

    const restName = location.state?.restName

    console.log(restName)

    useEffect(() => {
        meunGet()
    }, [])

    const [meunData, setMeunData] = useState([])

    const meunGet = async () => {
        try {
            let get = await axios.get(`${BASE_URL}/meun/get/${id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })
            console.log(get.data.restaurantMeun)
            setMeunData(get.data.restaurantMeun)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Navbar />
            <h1>{restName} Restaurant Meun</h1>
            <Stack flexDirection={"row"} justifyContent={"center"} gap={"20px"}>
                {meunData.map((item) => {
                    return (
                        <MenuCard data={item} />
                    )
                })}
            </Stack>

            <Footer />
        </>
    )
}

export default MeunCustomer