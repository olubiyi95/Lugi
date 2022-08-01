import React from 'react'
import logo from '../../assets/logo.png'
import { Input } from 'antd';
import { useState } from 'react';
import LaddaButton, { XL, SLIDE_UP } from "react-ladda";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextError from '../TextError/TextError';
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify'
import { LogInUser } from '../../Store/Actions';
import { useDispatch } from 'react-redux';
import './style.css'








const LoginForm = () => {
  let navigate = useNavigate();
  const [error, setError] = useState("")
  const [laddaLoading, setLaddaLoading] = useState(false);
  const [laddaProgress, setLaddaProgress] = useState(0);
  const dispatch = useDispatch();
  const [userError, setUserError] = useState("")
 

  const validationSchema = Yup.object({
    // userName: Yup.string()
    // .min(6,'Username must be at least 6 characters')
    // .max(15,'Username must not be more than 12 characters')
    // .required('Username is required'),
    email: Yup.string()
      .email('invalid email format')
      .required('Email is required'),

    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .max(15, 'Password must not be more than 15 characters')
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
        let errorRes = res.code
        let errorMsg = errorRes
        let userID = res.id
        let userRole = res.userType
        let uUid = userID
        if (!uUid) {
          toast.error("Login Failed")
          setLaddaLoading(true);
          setSubmitting(false);
          // navigate('/login');
          setError(errorMsg)
        } else {
          // setSubmitting(false);
          // setLaddaLoading(true);
          // navigate('/dashboard');
          // toast.success("Login Successful")
        }
        if(uUid && userRole === "Administrator") {
          navigate('/dashboard');
          setSubmitting(false);
          setLaddaLoading(true);
          toast.success("Login Successful")
        }
        if(uUid && userRole === "User") {
          navigate('/Profile');
          setSubmitting(false);
          setLaddaLoading(true);
          toast.success("Login Successful")
        }
        if(uUid && !userRole){
          const newError = "User Not Found"
          setUserError(newError)
          toast.error("Login Failed")
          setLaddaLoading(true);
          setSubmitting(false);
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
    <>
      <div className='login-form '>
        <div className='login-card'>
          <div className='login-img'>
            <img src={logo} />
          </div>
          <h3 className='text-light text-center'>Login</h3>
          <p className='text-center '>Login to access our dashboard</p>
          {error && <div class="alert alert-danger" role="alert"> {error}</div>}
          {userError && <div class="alert alert-danger" role="alert"> {userError}</div>}
          <div className='credentials'>
            <form onSubmit={formik.handleSubmit} autoComplete="off">
              <p className='error-catch'></p>
              <div className="mb-3 login-input">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <Input
                  name='email'
                  type='text'
                  placeholder="Enter email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className={`{${formik.errors.email && formik.touched.email}`}
                />
                {formik.touched.email && formik.errors.email ? (
                  <TextError errMessage={formik.errors.email} />
                ) : null}
              </div>

              <div className="mb-3 login-input">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <Input.Password
                  name='password'
                  type='text'
                  placeholder="Enter password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className={`{${formik.errors.password && formik.touched.password}`}
                />
                {formik.touched.password && formik.errors.password ? (
                  <TextError errMessage={formik.errors.password} />
                ) : null}
              </div>

              <div className='login-btn'>
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
            <div className='signup-account my-2'>
              <p>Don't have an account? <Link to="/signup">Sign Up here</Link></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )

}

export default LoginForm;
