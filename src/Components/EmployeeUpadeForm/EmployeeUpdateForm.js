import React, { Component } from 'react';
import { Input } from 'antd';
import { useState, useEffect } from 'react';
import LaddaButton, { XL, SLIDE_UP } from "react-ladda";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextError from '../TextError/TextError';
import { toast} from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { updateEmployeeInitiate } from '../../Store/Actions';
import './style.css'


const EmployeeUpdateForm = (props) => {

    const {  onCompleteUpdate , item, refresh } = props
    const [laddaLoading, setLaddaLoading] = useState(false);
    const [laddaProgress, setLaddaProgress] = useState(0);
    const dispatch = useDispatch()
   


    const options = [
        {label: "Select User Type",  key:" "},
        {label: "User", key:"User"}
    ]
  

    const validationSchema = Yup.object({
        firstName: Yup.string()
            .required('Firstname is required'),
        lastName: Yup.string()
            .required('Lasttname is required'),
        userName: Yup.string()
            .required('Username is required'),
        email: Yup.string()
            .email('invalid email format')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .max(15, 'Password must not be more than 15 characters')
            .required('Password is required'),
        confirmPassword: Yup.string().when("password", {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref("password")],
                "Both password need to be the same"
            )
        }),
        phoneNumber: Yup.string()
            .min(11, 'Phone number must be at least 11 characters')
            .max(14, 'Phone number not be more than 14 characters')
            .required('Phone number is required'),
        role: Yup.string()
            .required('Role is required'),
        userType: Yup.string()
            .required('User type is required')
    })

    const formik = useFormik({
        initialValues: {
            firstName: item.firstName,
            lastName: item.lastName,
            userName: item.userName,
            password: item.password,
            confirmPassword: item.confirmPassword,
            email: item.email,
            role: item.role,
            phoneNumber: item.phoneNumber,
            userType:item.userType
        }, id: " ",
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            setLaddaLoading(true);
            setLaddaProgress(0.5);
            try {
                dispatch(updateEmployeeInitiate(item.id, values))
                toast.success("Employee Updated");
                onCompleteUpdate(refresh)
            } catch (error) {
                toast.error("Unable to update employee")
                onCompleteUpdate(refresh)
            }
           
            // console.log(values)
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


    return (
        <>
            <div className='employee-form my-5'>
                <h4>Update Employee Information</h4>
               
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div className="row">
                        <div className="col">
                            <div className="mb-3 ">
                                <label htmlFor="exampleInputEmail1" className="form-label">First Name</label>
                                <Input
                                    name='firstName'
                                    type='text'
                                    placeholder="Enter Firstname"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.firstName}
                                    className={`{${formik.errors.firstName && formik.touched.firstName}`}
                                />
                                {formik.touched.firstName && formik.errors.firstName ? (
                                    <TextError errMessage={formik.errors.firstName} />
                                ) : null}
                            </div>
                            <div className="mb-3 ">
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
                            <div className="mb-3 password">
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
                            <div className="mb-3 ">
                                <label htmlFor="exampleInputEmail1" className="form-label">Role</label>
                                <Input
                                    name='role'
                                    type='text'
                                    placeholder="Enter Role"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.role}
                                    className={`{${formik.errors.role && formik.touched.role}`}
                                />
                                {formik.touched.role && formik.errors.role ? (
                                    <TextError errMessage={formik.errors.role} />
                                ) : null}
                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-3 ">
                                <label htmlFor="exampleInputEmail1" className="form-label">Last Name</label>
                                <Input
                                    name='lastName'
                                    type='text'
                                    placeholder="Enter Lastname"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.lastName}
                                    className={`{${formik.errors.lastName && formik.touched.lastName}`}
                                />
                                {formik.touched.lastName && formik.errors.lastName ? (
                                    <TextError errMessage={formik.errors.lastName} />
                                ) : null}
                            </div>
                            <div className="mb-3 ">
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
                            <div className="mb-3 password">
                                <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                                <Input.Password
                                    name='confirmPassword'
                                    type='text'
                                    placeholder="Confirm password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.confirmPassword}
                                    className={`{${formik.errors.confirmPassword && formik.touched.confirmPassword}`}
                                />
                                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                    <TextError errMessage={formik.errors.confirmPassword} />
                                ) : null}
                            </div>
                            <div className="mb-3 ">
                                <label htmlFor="exampleInputEmail1" className="form-label">Phone Number</label>
                                <Input
                                    name='phoneNumber'
                                    type='text'
                                    placeholder="Enter Phone Number"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.phoneNumber}
                                    className={`{${formik.errors.phoneNumber && formik.touched.phoneNumber}`}
                                />
                                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                                    <TextError errMessage={formik.errors.phoneNumber} />
                                ) : null}
                            </div>
                        </div>
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
                           Update Employee Record
                        </LaddaButton>
                        </div>
                </form>
            </div>
        </>
    )
}

export default EmployeeUpdateForm

