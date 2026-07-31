import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import axiosInstance from '../axiosInstance'
import { showAlert } from '../common/commonFunctions'

const Dashboard = () => {
    const[stockTicker,setStockTicker] = useState('')
    const[isLoading,setIsLoading] = useState(false)
    const[plotImg,setPlotImg] = useState(null)
    const[plot100MA,setPlot100MA] = useState(null)
    const[plot200MA,setPlot200MA] = useState(null)

    const fetchStockData = async(e) =>{
        e.preventDefault()
        setIsLoading(true)
        try{
            const response = await axiosInstance.post('/predict/',{
                ticker:stockTicker
            })
            const image_plotting = `${import.meta.env.VITE_BACKEND_ROOT_URL}${response.data.plot_img}`
            const image_100_MA_plot = `${import.meta.env.VITE_BACKEND_ROOT_URL}${response.data.plot_img_100MA}`
            const image_200_MA_plot = `${import.meta.env.VITE_BACKEND_ROOT_URL}${response.data.plot_img_200MA}`
            console.log(image_plotting,'image_plotting')
            setPlotImg(image_plotting)
            setPlot100MA(image_100_MA_plot)
            setPlot200MA(image_200_MA_plot)
            console.log(response.data)
        }
        catch(error){
            showAlert('error', error?.response?.data?.error || error?.response?.data?.ticker?.[0] || 'Something went wrong. Please try again.')
        }
        finally{
            setIsLoading(false)
        }
    }

    const protectedView = async () =>{
        try{
            const token = Cookies.get('access_token')
            const response = await axios.get('http://127.0.0.1:8000/api/v1/protected-view/',
                {
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            console.log(response.data)
        }
        catch(error){
            console.log("Error:",error.response.data)
        }
    }

    useEffect(()=>{
        protectedView()
    },[])

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">

    

        <form className="w-full max-w-xl px-4" onSubmit={fetchStockData}>
            <label className="block text-sm font-medium text-gray-700 mb-2">Enter Stock Ticker</label>
            <input
                type='text'
                placeholder='e.g. AAPL, TSLA, GOOGL'
                value={stockTicker}
                onChange={(e) => setStockTicker(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 text-base text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
                type='submit'
                className="w-1/4 mt-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg shadow-md transition duration-200"
            >
                Submit
            </button>
            
        </form>
         {isLoading ? (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                <div className="w-12 h-12 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
            </div>
        ): (
            plotImg && (
                <div className="mt-8">
                    <img src={plotImg} alt="Stock Prediction Plot" className="rounded-lg shadow-lg max-w-full h-auto"/>
                </div>
            ))}
            {plot100MA && <img src={plot100MA} alt="Stock Prediction Plot (100 MA)" className="mt-8 rounded-lg shadow-lg max-w-full h-auto"/>}
            {plot200MA && <img src={plot200MA} alt="Stock Prediction Plot (200 MA)" className="mt-8 rounded-lg shadow-lg max-w-full h-auto"/>}
    </div>
  )
}

export default Dashboard
