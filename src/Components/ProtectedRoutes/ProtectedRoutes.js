import React, { Children } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

export const ProtectedRoutes = ({children}) => {
    let { user } = useSelector( state => state.data) ;
    if (!user) {
        return <Navigate to ="/dashboard" />
    }
  return children
}