import React from 'react';
import { Input } from 'antd';
import { useState, useEffect } from 'react';
import LaddaButton, { XL, SLIDE_UP } from "react-ladda";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextError from '../TextError/TextError';
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { LogInUserWithUid } from "../../Store/Actions"
import { auth } from '../../Firebase/Config'
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { updateEmployeePaasword } from '../../Store/Actions';




export const ResetCredentials = (props) => {
    const { getUser } = useSelector(state => state.data);
    const userId = getUser.id
    const { onCompleteUpdate2, refresh } = props;
    const [laddaLoading, setLaddaLoading] = useState(false);
    const [laddaProgress, setLaddaProgress] = useState(0);
    const dispatch = useDispatch();
    const user = auth.currentUser;
   
   


    useEffect(() => {   //WHENEVER ANY CHANGE IS MADE THIS WILL REFETCH THE DATA BEING SHOWN ON THE PAGE
        dispatch(LogInUserWithUid(() => {
        }))
      }, [refresh])


    const validationSchema = Yup.object({
        // email: Yup.string()
        //     .email('invalid email format')
        //     .required('Email is required'),
        // newEmail: Yup.string()
        //     .email('invalid email format')
        //     .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .max(15, 'Password must not be more than 15 characters')
            .required('Password is required'),
        newPassword: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .max(15, 'Password must not be more than 15 characters')
            .required('Password is required'),
    })

    const formik = useFormik({
        initialValues: {
            password: "",
            newPassword: ""
        },
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async(values, { resetForm }) => {
          
            setLaddaLoading(true);
            setLaddaProgress(0.5);
            resetForm({ values: "" })
            changeLoginCredentials(values)
            setLaddaProgress(1);
            setLaddaLoading(false)
        },
    });

    const buttonStyle = () => {
        if ((formik.isValid && formik.dirty) || formik.isSubmitting) {
            return "submit_button_active";
        } else {
            return "submit_button disabled";
        }
    };


    const reAuthenticateUser = async (password) => {
        try {
            var credential = EmailAuthProvider.credential(user.email, password);
            const result = await reauthenticateWithCredential(
                auth.currentUser,
                credential,
            ) 
            return result;
        } catch (error) {
            console.log(error, "---reAUTH ERROR");
            return false
        }
       
    }

    const changeLoginCredentials = async ({ password, newPassword }) => {

        try {
            const userData = getUser;
            if (password !== userData.password) {
                // throw new Error('Failed: Incorrect password provided');
                toast.error("Failed: Incorrect password provided")
            }
          const reAuth =   await reAuthenticateUser(password)
          console.log(reAuth, "AWAKE");
          if(reAuth){
            const credPasswordUpdated = await updatePassword(user, newPassword)
            dispatch(updateEmployeePaasword(userId, newPassword))
            onCompleteUpdate2(refresh)
             toast.success("Login Password Changed")
          } else {
            toast.error("Password Update Failed")
          }
        } catch (error) {
            console.log(error, "---CHANGE CRED ");
        }
    }



    return (
        <div>
            <div className=''>
                <h4>Update Login Credentials</h4>
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div className='container'>
                        <div className='row'>


                            <div className="col-lg-6">
                                <div className="mb-4 modal-reset-form">
                                    <label htmlFor="exampleInputPassword1" className="form-label"> Password</label>
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
                            </div>

                            <div className="col-lg-6">
                                <div className="mb-4 modal-reset-form">
                                    <label htmlFor="exampleInputPassword1" className="form-label">New Password</label>
                                    <Input.Password
                                        name='newPassword'
                                        type='text'
                                        placeholder="Enter New Password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.newPassword}
                                        className={`{${formik.errors.newPassword && formik.touched.newPassword}`}
                                    />
                                    {formik.touched.newPassword && formik.errors.newPassword ? (
                                        <TextError errMessage={formik.errors.newPassword} />
                                    ) : null}
                                </div>
                            </div>

                            <div className='modal-update-form-btn'>
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
                                    Update Login Credentials
                                </LaddaButton>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
