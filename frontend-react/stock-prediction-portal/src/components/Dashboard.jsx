import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const Dashboard = () => {

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
    <div>
      DDDDDDDDD
    </div>
  )
}

export default Dashboard
