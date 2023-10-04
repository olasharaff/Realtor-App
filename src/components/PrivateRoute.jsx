import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatu } from '../hooks/useAuthStatu'

export default function PrivateRoute() {
    const {loggedIn, checkingStatus} = useAuthStatu()
    if(checkingStatus){
     return   <h1>Loading ..</h1>;
    }
  return loggedIn ? <Outlet/> : <Navigate to='/sign-in' />
}
