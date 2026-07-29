import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { showAlert } from '../common/commonFunctions'



const Register = () => {

  const[formData,setFormData] = useState({
    username:'',
    email:'',
    password:'',
    confirmPassword:''
  })

  const handleChange = async(e) =>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const navigate = useNavigate()

  const handleSubmit = async(e) =>{
    e.preventDefault();
    if(formData.password !== formData.confirmPassword){
      showAlert("error","Passwords do not match")
      return;
    }
    try{
      const response = await axios.post('http://127.0.0.1:8000/api/v1/register/',formData)
      if(response.status === 201){
        showAlert("success", "Registration Successful")
        navigate('/login')
      }
    }
    catch(error){
      showAlert("error", error?.response?.data?.detail || "An error occurred")
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#0f172a] overflow-hidden py-8 px-4">

      {/* Glowing blobs */}
      <div className="absolute w-72 h-72 bg-blue-600 opacity-20 rounded-full blur-3xl top-10 left-10" />
      <div className="absolute w-72 h-72 bg-purple-600 opacity-20 rounded-full blur-3xl bottom-10 right-10" />

      <div className="relative z-10 bg-[#1e293b] border border-[#334155] p-8 rounded-2xl shadow-2xl w-full max-w-md">

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-blue-600 p-3 rounded-full">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-white mb-1 text-center">Create Account</h1>
        <p className="text-slate-400 text-sm text-center mb-6">Join the Stock Prediction Portal</p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full bg-[#0f172a] border border-[#334155] text-slate-200 placeholder-slate-500 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-[#0f172a] border border-[#334155] text-slate-200 placeholder-slate-500 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.email}
              onChange={handleChange}
              name="email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full bg-[#0f172a] border border-[#334155] text-slate-200 placeholder-slate-500 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.password}
              name="password"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full bg-[#0f172a] border border-[#334155] text-slate-200 placeholder-slate-500 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition duration-200 mt-1 shadow-lg shadow-blue-900/40"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center text-slate-500 mt-5">
          Already have an account?{' '}
          <a href="/login" className="text-blue-400 hover:text-blue-300 hover:underline">Login</a>
        </p>
      </div>
    </div>
  )
}

export default Register
