import { useState } from 'react'
import './App.css'
import Header from './common/Header'
import Footer from './common/Footer'
import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import ProtectedRoute from './common/ProtectedRoute'

const Dashboard = lazy(() => import('./components/Dashboard'))
const Login = lazy(() => import('./components/Login'))
const Register = lazy(() => import('./components/Register'))

function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1'>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App
