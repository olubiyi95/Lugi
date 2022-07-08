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
import { useDispatch, useSelector } from 'react-redux';
import './style.css'







const LoginForm = () => {
  let navigate = useNavigate();
  const [laddaLoading, setLaddaLoading] = useState(false);
  const [laddaProgress, setLaddaProgress] = useState(0);
  const [loginEmail, setLoginEmail] = useState();
  const [loginPassword, setLoginPassword] = useState("")
  const dispatch = useDispatch();


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
        console.log({ res });
        let userID = res.uid
        let uUid = userID
        if (!uUid) {
          toast.error("Login Failed")
          setLaddaLoading(true);
        } else {
          setSubmitting(false);
          setLaddaLoading(true);
          navigate('/dashboard');
          toast.success("Login Successful")
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

          <div className='credentials'>
            <form onSubmit={formik.handleSubmit} autoComplete="off">
              <p className='error-catch'></p>
              <div className="mb-3 login-input">
                <label htmlFor="exampleInputEmail1" class="form-label">Email address</label>
                <Input
                  name='email'
                  type='text'
                  placeholder="Enter email"
                  onInput={(event) => { setLoginEmail(event.target.value) }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className={`{${formik.errors.email && formik.touched.email}`}
                />
                {formik.touched.email && formik.errors.email ? (
                  <TextError errMessage={formik.errors.email} />
                ) : null}
              </div>

              <div class="mb-3 login-input">
                <label htmlFor="exampleInputPassword1" class="form-label">Password</label>
                <Input.Password
                  name='password'
                  type='text'
                  placeholder="Enter password"
                  onInput={(event) => { setLoginPassword(event.target.value) }}
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



 // const login = async () => {
  //   try {
  //     const user =  await signInWithEmailAndPassword(
  //         auth,
  //         loginEmail, 
  //         loginPassword)
  //     console.log(user)
  // } catch (error) {
  //     console.log(error.message)
  // }
  // };
  // if (uid !== undefined) return <Link to ='/dashboard' />



   // const succesStyle = () => {
  //   if (formik.isValid && formik.dirty && formik.submitCount === 1) {
  //     console.log(formik)
  //     return "password_success_reset_message";
  //   } else {
  //     return "password_success_reset_message d-none";
  //   }
  // }

   // const {user} = userDataReturn;
  // console.log(user, 'USERDATATTTTTT')
  // const [uid, setUid] = useState(null);