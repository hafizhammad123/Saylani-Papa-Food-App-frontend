import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { VenderLayout } from '../../../Components'
import MeunModal from '../../../Components/Modals/MeunModal'
import { BASE_URL } from '../../../Utils/Utils'
import { useDispatch } from 'react-redux'
import { restdata } from '../../../Redux/Slice/restaurantSlice'

const Meun = () => {

  const [modalOpen, setModalOpen] = useState(false)
  const [isReload, setIsReload] = useState(false)
  const [dropRestaurant, setDropRestaurant] = useState([])
  let dispatch = useDispatch()


  useEffect(() => {
    userRestaurant()
  }, [])

  const userRestaurant = async () => {
    try {
      let data = await axios.get(`${BASE_URL}/resturant/userRestaurant`, {
        headers: {
          "Authorization": `Bearer ${Cookies.get("token")}`
        }
      })

      setDropRestaurant(data.data.userRestaurant)
      dispatch(restdata(data.data.userRestaurant))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <VenderLayout>
      <Stack flexDirection={"row"} justifyContent={"space-between"}>
        <h1>Meun</h1>
        <Box onClick={() => setModalOpen(true)} component={Button} variant='outlined' >Create Meun</Box>
      </Stack>

      {modalOpen && <MeunModal open={modalOpen} setOpen={setModalOpen} isReload={isReload} setIsReload={setIsReload} data={dropRestaurant} />}

      {dropRestaurant.map((restaurant) => {
        return (
          <Paper m elevation={3} sx={{ p: 2, my: 2, mt: "40px" }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >

              <Typography variant="h6">
                {restaurant.RestaurantName}, Restaurant
              </Typography>


              <Link to={`/meunDetail/${restaurant._id}`} state={{ restName: restaurant.RestaurantName }} style={{ textDecoration: "none", color: "white" }}>
                <Button variant="contained" color="primary">
                  View Menu
                </Button>
              </Link>

            </Box>
          </Paper>
        )
      })}

      

    </VenderLayout>
  )
}

export default Meun