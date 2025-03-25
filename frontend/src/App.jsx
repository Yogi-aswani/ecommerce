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
            <Route path="/home" element={<Home/>} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
