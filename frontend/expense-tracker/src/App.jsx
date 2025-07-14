import React from 'react'
import './index.css'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Dashboard/Home'
import Income from './pages/Dashboard/Income'
import Expense from './pages/Dashboard/Expense';
import UserProvider from './context/userContext';
import {Toaster} from 'react-hot-toast'

const App = () => {
  return(
    <UserProvider>
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />}/>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/dashboard" element={<Home />} />
          <Route exact path="/income" element={<Income />} />
          <Route exact path='/expense' element={<Expense />} />
        </Routes>
      </BrowserRouter>
    </div>

    <Toaster 
      toastOptions={{
        className: "",
        style: {
          fontSize: '13px'
        },
      }} 
    />
    </UserProvider>
  )
}

export default App

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token")

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  )
}