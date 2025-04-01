import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserSignup from './Components/auth/Usersignup';
import Suppliresignup from './Components/auth/Suppliresignup';
import Login from './Components/auth/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ResetPassword from './Components/auth/ResetPassword';
import ForgotPassword from './Components/auth/ForgotPassword';
import Header from './Components/supplire/header';
import SideBar from './Components/supplire/SideBar';
import Product from './Components/supplire/Product';
import Home from './Components/user/Home';  
import Main from './Components/user/Main';
import ProductView from './Components/user/ProductView';
import Cart from './Components/user/Cart';
import Wishlist from './Components/user/Wishlist';
import Address from './Components/user/address';
import YourOrder from './Components/user/YourOrder';


function App() {
  const [count, setCount] = useState(0)

  return (  
    <>
    {/* <Header/>
    <Product/> */}
       
      <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<UserSignup/>} />
            <Route path="/supplire" element={<Suppliresignup/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/reset" element={<ResetPassword/>} />
            <Route path="/forgot" element={<ForgotPassword/>} />
            <Route path="/header" element={<Header/>} />
            <Route path="/product" element={<Product/>} />
            <Route path="/home" element={<Main/>} />
            {/* <Route path="/main" element={<Main/>} /> */}
            <Route path="/productView/:id" element={<ProductView/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/wishlist" element={<Wishlist/>} />
            <Route path="/address" element={<Address/>} />
            <Route path="/yourOrders" element={<YourOrder/>} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
