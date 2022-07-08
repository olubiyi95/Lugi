import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

export const ProtectedRoutes2 = ({children}) => {
    let { user } = useSelector( state => state.data) ;
    if (!user) {
        return <Navigate to ="/login" />
    }
  return children
}


export default ProtectedRoutes2