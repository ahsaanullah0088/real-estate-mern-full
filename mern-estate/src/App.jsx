import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import SignOut from './pages/SignOut'
import Profile from './pages/Profile'
import About from './pages/About'
import Header from './components/header'
import Footer from './components/Footer'



export default function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/sign-in' element={<Signin />} />
    <Route path='/sing-out' element={<SignOut />} />
    <Route path='/profile' element={<Profile />} />
    <Route path='/about' element={<About />} />
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}
