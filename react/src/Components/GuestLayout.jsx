import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'

export default function GuestLayout() {

  const {token} = useStateContext()

  if(token){
    return <Navigate to="/"/>
  }
  return (
    <div>
        <h2>Guest</h2>
        <Outlet/>
      
    </div>
  )
}
