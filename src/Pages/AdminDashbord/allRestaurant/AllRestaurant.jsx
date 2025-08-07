import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../Components/Layouts/AdminLayout'
import axios from 'axios'
import { BASE_URL } from '../../../Utils/Utils'
import Cookies from 'js-cookie'
import { Avatar, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography, TableBody, Tooltip } from '@mui/material'
import ApprovalIcon from '@mui/icons-material/Approval';
import DeleteIcon from '@mui/icons-material/Delete';

const headers = [
  "Restaurant Name",
  "Category",
  "Email",
  "Approved",
  "Deleted",
  "Created At",
  // "Contact",
  // "Address",
  // "Open",
  "Image",
  "Actions"
];

const AllRestaurant = () => {

  const [allRestaurant, setAllRestaurant] = useState([])

  useEffect(() => {
    getAllResturant()
  }, [])

  const getAllResturant = async () => {
    try {
      let getData = await axios.get(`${BASE_URL}/resturant/getAllRestaurant`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`
        }
      })

      setAllRestaurant(getData.data.restaurant)

    } catch (error) {
      console.log(error)
    }
  }

  const approveRestaurant = async (data) => {
    try {
      let restaurantId = data._id

      let statusObj = {
        isApproved: !data.isApproved
      }

      let callApi = await axios.patch(`${BASE_URL}/resturant/approvedResturant/${restaurantId}`, statusObj, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`
        }
      })
      console.log(callApi.data)
      getAllResturant()

      console.log(statusObj.isApproved)
    } catch (error) {
      console.log(error.message)
    }



  }

  return (
    <AdminLayout>
      <h1>All Restaurant..</h1>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Typography variant="h6" sx={{ p: 2 }}>
          Restaurants
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header} sx={{ fontWeight: "bold" }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {allRestaurant.map((restaurant) => (
              <TableRow key={restaurant._id}>
                <TableCell>{restaurant.RestaurantName}</TableCell>
                <TableCell>{restaurant.category}</TableCell>
                <TableCell>{restaurant.email}</TableCell>
                {/* <TableCell>{restaurant.contactNumber}</TableCell> */}
                {/* <TableCell>{restaurant.address}</TableCell> */}
                <TableCell>{restaurant.isApproved ? "Yes" : "No"}</TableCell>
                {/* <TableCell>{restaurant.isOpen ? "Yes" : "No"}</TableCell> */}
                <TableCell>{restaurant.isDeleted ? "Yes" : "No"}</TableCell>
                <TableCell>{new Date(restaurant.createAt).toLocaleString()}</TableCell>
                <TableCell>
                  {restaurant.imageUrl ? (
                    <Avatar
                      alt={restaurant.restaurantName}
                      src={restaurant.imageUrl}
                      sx={{ width: 40, height: 40 }}
                    />
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell>
                  <Tooltip title="Approve" >
                    <ApprovalIcon onClick={() => approveRestaurant(restaurant)} />
                  </Tooltip>

                  <Tooltip title="Delete" >
                    <DeleteIcon />
                  </Tooltip>

                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </AdminLayout>
  )
}

export default AllRestaurant