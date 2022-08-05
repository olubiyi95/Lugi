import React, { useEffect } from 'react'
import { useState } from 'react'
import {  useSelector } from 'react-redux'
import { LogOutUser} from '../../Store/Actions'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {ProfilePictureUpload} from '../ProfilePicture/ProfilePictureUpload';
import {EmployeeProfileUpdateForm} from '../EmployeeProfile/EmployeeProfileUpdateForm'
import { ResetCredentials } from './ResetCredentials'
import { Modal } from 'antd';
import { useDispatch } from 'react-redux'
import { LogInUserWithUid } from '../../Store/Actions'


import './style.css'

const EmployeeProfile = () => {    
    const { getUser } = useSelector(state => state.data);
    const loggedUserName =   getUser.userName;
    const loggedUserEmail =   getUser.email;
    const loggedUserRole =   getUser.role;
    const loggedUserPhone =   getUser.phoneNumber;
    const loggedUserFirstName =   getUser.firstName;
    const loggedUserLastName =   getUser.lastName;
    const loggedUserAddress = getUser.address;
    const loggedMaritakStatus = getUser.maritalStatus
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [ refresh, setRefresh ] = useState(0)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    

    const onCompleteUpdate = () => {   //WHENEVER ANY CHANGE IS MADE THIS WILL REFETCH THE DATA BEING SHOWN ON THE PAGE
        setTimeout(()=> {
            setIsModalVisible(false)
        })
        setRefresh(refresh+1)
      }
      const onCompleteUpdate2 = () => {   //WHENEVER ANY CHANGE IS MADE THIS WILL REFETCH THE DATA BEING SHOWN ON THE PAGE
        setTimeout(()=> {
            setIsModalVisible2(false)
        })
        setRefresh(refresh+1)
      }

      

      useEffect(() => {   //WHENEVER ANY CHANGE IS MADE THIS WILL REFETCH THE DATA BEING SHOWN ON THE PAGE
        dispatch(LogInUserWithUid(() => {
            // setWorkSpin(false)
        }))
      }, [refresh])

    //   useEffect(()=>{
       
    //   },[getUser])

        const showModal = () => {
        setIsModalVisible(true);
        };
        const showModal2 = () => {
            setIsModalVisible2(true);
            };
    
        const handleOk = () => {
        setIsModalVisible(false);
        };
    
        const handleCancel = () => {
        setIsModalVisible(false);
        };


        const handleOk2 = () => {
            setIsModalVisible2(false);
            };
        
            const handleCancel2 = () => {
            setIsModalVisible2(false);
            };
    
        const handleLogOutUser = async () => {
            try {
                await LogOutUser()
                toast.success("Logout Successful")
                navigate("/Login")
            } catch (error) {
                toast.error(error)
            }
        }

  return (
    <div>
        
        
         <div className='profile-update-page'>
        <div className='profile-navbar'>
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container ">
                    <a className="navbar-brand" href="#">LUGI</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                         <div className="collapse navbar-collapse " id="navbarNav">
                             <ul className="navbar-nav ms-auto ">
                             <li className='user text-light px-5 pt-1' >{loggedUserName}</li>
                             <button className='logout' type='submit' onClick={handleLogOutUser}>Logout</button>
                         </ul>   
                        </div>
                    </div>
                </nav>
            </div>
            <div className='container mt-3'>
                <div className='header'>
                    <div>
                        <h3>Profile</h3>
                        <h5>Dashboard / Profile</h5>
                    </div>
                    <div className=''>
                    <button className='update' type='submit' onClick={showModal}>Updare Profile</button>
                    <button className='updatecred' type='submit' onClick={showModal2}>Change Credentials</button>
                    </div>
                </div>
            
            <div className='update-modal'>
                <Modal visible={isModalVisible} 
                    onOk={handleOk} 
                    onCancel={handleCancel} 
                    className="update-modal"
                    style={{ top: 140 }}
                    width={800}>
                   <EmployeeProfileUpdateForm onCompleteUpdate={onCompleteUpdate}  />
                </Modal>
            </div>
            <div className='update-modal'>
                <Modal visible={isModalVisible2} 
                    onOk={handleOk2} 
                    onCancel={handleCancel2} 
                    className="update-modal"
                    style={{ top: 140 }}
                    width={800}>
                   <ResetCredentials onCompleteUpdate2={onCompleteUpdate2} refresh={refresh} />
                </Modal>
            </div>
                

                
            </div>
            <div className='mt-3'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <ProfilePictureUpload  />
                        </div>
                        <div className="col-lg-6">
                            <p><span className='items'>Firstname: </span> {loggedUserFirstName}</p>
                            <p><span className='items'>Lastname:  </span>   {loggedUserLastName}</p>
                            <p><span className='items'>Username:  </span>   {loggedUserName}</p>
                            <p><span className='items'>Email:   </span>     {loggedUserEmail} </p>
                            <p><span className='items'>Role:      </span>   {loggedUserRole}</p>
                            <p><span className='items'>Phone Number: </span>{loggedUserPhone}</p>
                            <p><span className='items'>Address: </span>{loggedUserAddress}</p>
                            <p><span className='items'>Marital Status: </span>{loggedMaritakStatus}</p>
                        </div>
                    </div>
                </div>
            </div>
    </div>
       
    </div>
   
  )
}

export default EmployeeProfile