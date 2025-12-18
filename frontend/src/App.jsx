import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import LoginPage from './page/LoginPage'
import SignUpPage from './page/SignUpPage'
import HomePage from './page/HomePage'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react'

const App = () => {
  const {authUser, checkAuth, ischeckingAuth} = useAuthStore()

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  if(ischeckingAuth && !authUser){
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
    )
  }
  return (
    <div className='flex flex-col items-center justify-start'>
      <Toaster />
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