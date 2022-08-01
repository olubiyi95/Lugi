import React from 'react'
import logo from '../../assets/logo.png'
import { Input } from 'antd';
import { useState } from 'react';
import LaddaButton, { XL, SLIDE_UP } from "react-ladda";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextError from '../TextError/TextError';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import { LogInUser, getDetails } from '../../Store/Actions';
import { useDispatch, useSelector } from 'react-redux';
import './style.css'

 const EmployeeLoginPage = () => {

  let navigate = useNavigate();
  
  const [laddaLoading, setLaddaLoading] = useState(false);
  const [laddaProgress, setLaddaProgress] = useState(0);
  const [ loginEmail, setLoginEmail ] = useState();
  const [ loginPassword, setLoginPassword ] = useState("")
  const dispatch = useDispatch();



const validationSchema =  Yup.object({
  email: Yup.string()
  .email('invalid email format')
  .required('Email is required'),
 
  password: Yup.string()
  .min(4,'Password must be at least 4 characters')
  .max(15,'Password must not be more than 15 characters')
  .required('Password is required')
})

const formik = useFormik({
  initialValues: {
    password: "",
    email: "",
  },
  validationSchema: validationSchema,
  onSubmit: async (values, { setSubmitting }) => {

    setSubmitting(true);
    setLaddaLoading(true);
    setLaddaProgress(0.5);
   
    dispatch(LogInUser(values, res => {
      // console.log({ res });
      let userID = res.uid
      let uUid = userID
      if (!uUid) {
        toast.error("Login Failed")
        setLaddaLoading(true);
      } else {
        setSubmitting(false);
        setLaddaLoading(true);
        navigate('/profile');
        toast.success("Login Successful")
        // getDetails()
      }
      setLaddaProgress(1);
      setLaddaLoading(false);
      setSubmitting(false);
    }));
    
  },
});


const buttonStyle = () => {
  if ((formik.isValid && formik.dirty) || formik.isSubmitting) {
    return "submit_button_active";
  } else {
    return "submit_button disabled";
  }
};



  return (
    <div>
       <div className='elogin-form '>
                <div className='elogin-card'>
                    <div className='elogin-img'>
                        <img src={ logo } />
                    </div>
                    <h3 className='text-dark text-center'>Login</h3>
                    <p className='text-center text-dark '>Login to access your profile</p>
                    
                    <div className='ecredentials'>
                    <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div className="mb-3 elogin-input">
                        <label htmlFor="exampleInputEmail1" className="form-label text-dark">Email address</label>
                        <Input
                        name='email'
                        type='text'
                        placeholder="Enter email"
                        onInput={(event) => { setLoginEmail(event.target.value)}}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        className={`{${formik.errors.email && formik.touched.email}`}
                        />
                         {formik.touched.email && formik.errors.email ? (
                            <TextError errMessage={formik.errors.email} />
                        ) : null}      
                    </div>

            <div className="mb-3 elogin-input">
                        <label htmlFor="exampleInputEmail1" className="form-label text-dark">Enter Password</label>
                        <Input.Password 
                        name='password'
                        type='text'
                        placeholder="Enter password"
                        onInput={(event) => { setLoginPassword(event.target.value)}}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        className={`{${formik.errors.password && formik.touched.password}`}
                        />
                         {formik.touched.password && formik.errors.password ? (
                            <TextError errMessage={formik.errors.password} />
                        ) : null}  
                    </div>

                    <div className='elogin-btn'>
                      <LaddaButton
                        className={`btn ${true ? buttonStyle() : "btn-primary"
                          }  transition-3d-hover`}
                        disabled={
                          !(formik.isValid && formik.dirty) || formik.isSubmitting
                        }
                        loading={laddaLoading}
                        progress={laddaProgress}
                        data-color="#fff"
                        data-size={XL}
                        data-style={SLIDE_UP}
                        data-spinner-size={30}
                        data-spinner-color="#fff"
                        data-spinner-lines={12}
                        type='submit'
                      >
                        Login
                      </LaddaButton>
                    </div>
                  </form>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default EmployeeLoginPage