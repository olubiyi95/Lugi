import React from 'react'
import logo from '../../assets/logo.png'
import { Input } from 'antd';
import { useState } from 'react';
import LaddaButton, { XL, SLIDE_UP } from "react-ladda";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextError from '../TextError/TextError';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux';
import {  signUpUser } from '../../Store/Actions'
import './style.css'






const SignupForm = () => {
   
  const [ error, setError ] = useState("");
  const [laddaLoading, setLaddaLoading] = useState(false);
  const [laddaProgress, setLaddaProgress] = useState(0);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const options = [
      {label: "Select User Type",  key:" "},
      {label: "Administrator", key:"Administrator"}
  ]

  
  const validationSchema =  Yup.object({
    userName: Yup.string()
    .min(6,'Username must be at least 6 characters')
    .max(15,'Username must not be more than 12 characters')
    .required('Username is required'),
    email: Yup.string()
    .email('invalid email format')
    .required('Email is required'),
    password: Yup.string()
    .min(6,'Password must be at least 6 characters')
    .max(15,'Password must not be more than 15 characters')
    .required('Password is required'),
    userType: Yup.string()
    .required('User type is required')
})

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
      userName: "",
      // userType: "Administrator"
      userType:""
    },
    validationSchema: validationSchema,
    onSubmit: async (values,{setSubmitting}) => {
      // alert(JSON.stringify(values));
      setSubmitting(true);
      setLaddaLoading(true);
      setLaddaProgress(0.5);
      console.log(values)
      dispatch(signUpUser(values, res => {
        let errorRes = res.code
        let errorMsg = errorRes
        let userID = res.uid
        let uUid = userID
        if (!uUid) {
          toast.error("Signup Failed")
          setLaddaLoading(false);
          setSubmitting(false);
          setError(errorMsg)
        } else {
          setLaddaLoading(true);
          setSubmitting(false);
          navigate('/login');
          toast.success("Signup Successful")
          setError(errorRes)
        }
        setLaddaProgress(1);
        setLaddaLoading(false);
        setSubmitting(false);
      }))
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
        <>
            <div className='signup-form '>
                <div className='signup-card'>
                    <div className='signup-img'>
                        <img src={ logo } />
                    </div>
                    <h3 className='text-light text-center'>Creat Account</h3>
                    <p className='text-center '>Create an account to access our dashboard</p>
                    {error && <div class="alert alert-danger" role="alert">
                  {error}
                  </div>}
                    <div className='credentials'>
                    <form onSubmit={formik.handleSubmit} autoComplete="off">
                      <div className="mb-3 signup-input">
                          <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                          <Input
                          name='userName'
                          type='text'
                          placeholder="Enter Username"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.userName}
                          className={`{${formik.errors.userName && formik.touched.userName}`}
                          />
                          {formik.touched.userName && formik.errors.userName ? (
                              <TextError errMessage={formik.errors.userName} />
                          ) : null}      
                      </div>

                    <div className="mb-3 signup-input">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <Input
                        name='email'
                        type='text'
                        placeholder="Enter Email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        className={`{${formik.errors.email && formik.touched.email}`}
                        />
                         {formik.touched.email && formik.errors.email ? (
                            <TextError errMessage={formik.errors.email} />
                        ) : null}      
                    </div>

                    <div className="mb-3 signup-input">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <Input.Password 
                        name='password'
                        type='text'
                        placeholder="Enter Password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        className={`{${formik.errors.password && formik.touched.password}`}
                        />
                         {formik.touched.password && formik.errors.password ? (
                            <TextError errMessage={formik.errors.password} />
                        ) : null}  
                    </div>
                   


                    <div>
                    <label htmlFor="exampleInputPassword1" className="form-label">Select User Type</label>
                        <div className='mb-3 signup-input'>
                            <select name='userType'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            className="select-input "
                            >
                             {options.map(option =>
                              <option key={option.key} value={option.value}>{option.label}</option>
                              )}
                            </select>
                            
                               {formik.touched.userType && formik.errors.userType ? (
                                <TextError errMessage={formik.errors.userType} />
                            ) : null}  
                        </div>
                    </div>
        
                      
                        <div className='signup-btn'>
                        <LaddaButton
                            className={`btn ${true ? buttonStyle() : "btn-primary"
                            }  transition-3d-hover`}
                            disabled={
                            !(formik.isValid && formik.dirty) || formik.isSubmitting
                            }
                            type='submit'
                            loading={laddaLoading}
                            progress={laddaProgress}
                            data-color="#fff"
                            data-size={XL}
                            data-style={SLIDE_UP}
                            data-spinner-size={30}
                            data-spinner-color="#ddd"
                            data-spinner-lines={12}
                        >
                            Create Account
                        </LaddaButton>
                        </div>
                    </form>
                    <div className='login-account my-2'>
                        <p>Already have an account? <Link to="/login">Login in here</Link></p>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
    
    }
    
    export default  SignupForm 


     