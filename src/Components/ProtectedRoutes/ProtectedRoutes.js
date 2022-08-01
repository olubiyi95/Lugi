import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { isEmpty } from 'lodash';


export const ProtectedRoutes = ({ children}) => {

  const { getUser } = useSelector(state => state.data);
 
      if(!getUser || isEmpty(getUser)) {
      return  <Navigate to='/login'/>
      }
      return children;
};