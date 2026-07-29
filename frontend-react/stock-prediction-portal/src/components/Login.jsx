import { useState } from 'react'
import axios from 'axios'
import { showAlert } from '../common/commonFunctions'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {

  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData,setFormData] = useState({
    username:'',
    password:''
  })

  const handleChange = async(e) =>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleLogin = async(e) =>{
    e.preventDefault()
    try{
      const response = await axios.post('http://127.0.0.1:8000/api/v1/token/',formData)
    if(response.status === 201 || response.status === 200){
      showAlert("success", "Login Successful")
      login(response.data.access, response.data.refresh)
      navigate('/')
    }
    }
    catch(error){
      showAlert("error", error?.response?.data?.detail || "An error occurred")
    }
    }
  

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#0f172a] overflow-hidden py-8 px-4">

      {/* Glowing blobs */}
      <div className="absolute w-72 h-72 bg-blue-600 opacity-20 rounded-full blur-3xl top-10 right-10" />
      <div className="absolute w-72 h-72 bg-purple-600 opacity-20 rounded-full blur-3xl bottom-10 left-10" />

      <div className="relative z-10 bg-[#1e293b] border border-[#334155] p-8 rounded-2xl shadow-2xl w-full max-w-md">

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-blue-600 p-3 rounded-full">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-white mb-1 text-center">Welcome Back</h1>
        <p className="text-slate-400 text-sm text-center mb-6">Login to Stock Prediction Portal</p>

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-[#0f172a] border border-[#334155] text-slate-200 placeholder-slate-500 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-[#0f172a] border border-[#334155] text-slate-200 placeholder-slate-500 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex justify-end">
            <a href="#" className="text-xs text-blue-400 hover:text-blue-300 hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition duration-200 shadow-lg shadow-blue-900/40"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-slate-500 mt-5">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-400 hover:text-blue-300 hover:underline">Register</a>
        </p>
      </div>
    </div>
  )
}

export default Login
