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
import {  signUpUser, addAdminAsAUser } from '../../Store/Actions'
import { useSelector, connect } from 'react-redux';
import './style.css'






const SignupForm = () => {
   
    
    
    // const toggle = () => {
    //     setLoading(true)
    //     setProgress(0.5)
    // }
   
  const [laddaLoading, setLaddaLoading] = useState(false);
  const [laddaProgress, setLaddaProgress] = useState(0);
  const [ userName, setUserName ] = useState(null)
  const [ registerEmail, setRegisterEmail ] = useState(null)
  const [ registerPassword, setRegisterPassord ] = useState(null)
  const dispatch = useDispatch();
  let navigate = useNavigate();
  // const { user } = useSelector(state => state.data);  

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
    .required('Password is required')
})

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
      userName: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values,{setSubmitting}) => {
      setSubmitting(true);
      setLaddaLoading(true);
      setLaddaProgress(0.5);
      console.log(values)
      dispatch(signUpUser(values, res => {
        let userID = res.uid
        let uUid = userID
        if (!uUid) {
          toast.error("Signup Failed")
          setLaddaLoading(true);
        } else {
          setLaddaLoading(true);
          setSubmitting(false);
          navigate('/login');
          toast.success("Signup Successful")
        }
        setLaddaProgress(1);
        setLaddaLoading(false);
        setSubmitting(false);
      }))
     
      // setSubmitting(true) 
    },
  });

  // const signUp = () => {
  //   createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
  // }

  // const succesStyle = () => {
  //   if (formik.isValid && formik.dirty && formik.submitCount === 1) {
  //     console.log(formik)
  //     return "password_success_reset_message";
  //   } else {
  //     return "password_success_reset_message d-none";
  //   }
  // }
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
                    
                    <div className='credentials'>
                    <form onSubmit={formik.handleSubmit} autoComplete="off">
                      <div className="mb-3 signup-input">
                          <label htmlFor="exampleInputEmail1" class="form-label">Username</label>
                          <Input
                          name='userName'
                          type='text'
                          placeholder="Enter Username"
                          onInput={(event) => { setUserName(event.target.value)}}
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
                        <label htmlFor="exampleInputEmail1" class="form-label">Email address</label>
                        <Input
                        name='email'
                        type='text'
                        placeholder="Enter email"
                        onInput={(event) => { setRegisterEmail(event.target.value)}}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        className={`{${formik.errors.email && formik.touched.email}`}
                        />
                         {formik.touched.email && formik.errors.email ? (
                            <TextError errMessage={formik.errors.email} />
                        ) : null}      
                    </div>

            <div class="mb-3 signup-input">
                        <label htmlFor="exampleInputPassword1" class="form-label">Password</label>
                        <Input.Password 
                        name='password'
                        type='text'
                        placeholder="Enter password"
                        onInput={(event) => { setRegisterPassord(event.target.value)}}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        className={`{${formik.errors.password && formik.touched.password}`}
                        />
                         {formik.touched.password && formik.errors.password ? (
                            <TextError errMessage={formik.errors.password} />
                        ) : null}  
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
    

  // const mapDispatchToProps = (dispatch) => {
  //   return {
  //     signUp: (values)=> dispatch(signUpUser(values))
  //   }
  // }

    export default  SignupForm 


     