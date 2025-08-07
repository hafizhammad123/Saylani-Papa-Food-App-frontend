import React from 'react'
import { VenderLayout } from '../../../Components'
import { useSelector } from 'react-redux'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const Order = () => {

  let data = useSelector((state) => state.resturant.rest)
  console.log(data)
  return (
    <VenderLayout>
      <h1>Your Restaurant Order</h1>

      {data.map((restaurant) => {
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


              <Link to={`/orderDetail/${restaurant._id}`} state={{restName : restaurant.RestaurantName}} style={{ textDecoration: "none", color: "white" }}>
                <Button variant="contained" color="primary">
                  View Orders
                </Button>
              </Link>

            </Box>
          </Paper>
        )
      })}

    </VenderLayout>
  )
}

export default Order