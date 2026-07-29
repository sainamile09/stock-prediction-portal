import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Buttons'
import '../assets/css/header.css'
import { useAuth } from '../context/AuthContext'

const Header = () => {

  const {isLoggedIn,logout} = useAuth()

  return (
    <>
    <div className='flex justify-between items-center header p-4'>
    <Link to="/" className='text-white text-2xl font-bold'>Stock Prediction Portal</Link>
    <div className='flex items-center gap-2'>
    {isLoggedIn && <button onClick={logout} className='border border-red-400 text-red-400 px-4 py-1 rounded cursor-pointer'>Logout</button>}
    {!isLoggedIn && <Button buttonClassName='border border-blue-400 text-blue-400 px-4 py-1 rounded' buttonText='Login' url='/login'/>}
    {!isLoggedIn && <Button buttonClassName='border border-green-400 text-green-400 px-4 py-1 rounded' buttonText = 'Register' url='/register'/>}
    </div>
    </div> 
    </>
  )
}

export default Header
