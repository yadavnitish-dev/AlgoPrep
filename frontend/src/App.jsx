import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './page/LoginPage'
import SignUpPage from './page/SignUpPage'
import HomePage from './page/HomePage'

const App = () => {
  return (
    <div className='flex flex-col items-center justify-start'>
      <Routes>
        <Route 
        path='/login' 
        element={<LoginPage />}
        />
        <Route 
        path='/signup' 
        element={<SignUpPage />}
        />
        <Route 
        path='/' 
        element={<HomePage />}
        />
      </Routes>
    </div>
  )
}

export default App