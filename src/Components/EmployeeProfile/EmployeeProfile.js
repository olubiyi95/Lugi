import React from 'react'
import { useState, useEffect } from 'react'
import {  useSelector } from 'react-redux'
import { LogOutUser} from '../../Store/Actions'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {  onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../Firebase/Config'
import './style.css'

const EmployeeProfile = () => {    
const { user } = useSelector(state => state.data);
const [ currentUser, setCurrentUser ] = useState(null)
const navigate = useNavigate()

const handleLogOutUser = async () => {
    try {
        await LogOutUser
        toast.success("Logout Successful")
        navigate("/dashboard")
    } catch (error) {
        toast.error(error)
    }
}



  return (
    <div>
        <div className='profile-navbar'>
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container ">
                    <a className="navbar-brand" href="#">LUGI</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                         <div className="collapse navbar-collapse " id="navbarNav">
                             <ul className="navbar-nav ms-auto ">
                             <li className='user text-light px-5 pt-1'>{user && user.email}</li>
                             <button className='logout' type='submit' onClick={handleLogOutUser}>Logout</button>
                         </ul>   
                        </div>
                    </div>
                </nav>
            </div>
        </div>
  )
}

export default EmployeeProfile