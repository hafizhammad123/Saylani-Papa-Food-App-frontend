import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { AdminDashbord, Dashbord, Login, Meun, MeunDetail, Order, Restaurant, Sigup } from './Pages'
import AllRestaurant from './Pages/AdminDashbord/allRestaurant/AllRestaurant'
import Customer from './Pages/Customer/Customer'
import MeunCustomer from './Pages/Customer/meun'
import AddToCartPage from './Pages/Customer/AddtoCartPage'
import PlaceOrderPage from './Pages/Customer/PlaceOrder'
import OrderDetail from './Pages/Vender/Order/OrderDetail'
import SigleOrderDetail from './Pages/Vender/Order/SigleOrderDetail'
import PrepareOrder from './Pages/Customer/PrepareOrder'

function App() {


  return (
    <>
      <Routes>
        {/* Auth Route */}
        <Route path="/" element={<Login />} />
        <Route path='/Signup' element={<Sigup />} />

        {/* Admin Route */}
        <Route path='/adminDashbord' element={<AdminDashbord />} />
        <Route path='/adAllRestaurant' element={<AllRestaurant />} />

        {/* Vender Route */}
        <Route path='/vender-dashbord' element={<Dashbord />} />
        <Route path='/vender-order' element={<Order />} />
        <Route path='/vender-menu' element={<Meun />} />
        <Route path='/vender-restaurant' element={<Restaurant />} />
        <Route path='/meunDetail/:id' element={<MeunDetail />} />
        <Route path='/orderDetail/:id' element={<OrderDetail />} />
        <Route path='/singleorderDetail/:id' element={<SigleOrderDetail />} />

        {/* Customer side */}
        <Route path='/CustomerDashbord' element={<Customer />} />
        <Route path='/meun/:id' element={<MeunCustomer />} />
        <Route path='/addtocart' element={<AddToCartPage />} />
        <Route path='/placeOrder' element={<PlaceOrderPage />} />
        <Route path='/prepareOrder' element={<PrepareOrder />} />
      </Routes>
    </>
  )
}

export default App
