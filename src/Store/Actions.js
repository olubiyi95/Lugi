import * as types from './ActionTypes'
import { dataBase } from '../Firebase/Config'
import firebase from 'firebase/compat/app';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase/Config'
import { toast } from 'react-toastify';
import { useState, useEffect, createContext } from 'react';




const sigup = (user) => ({
    type: types.SIGN_UP,
    payload: user
})
const logIn = (user) => ({
    type: types.LOGIN,
    payload: user
})

const logOut = (user) => ({
    type: types.LOGOUT,
    payload: user
})

const addEmployee = (employee) => ({
    type: types.ADD_EMPLOYEE,
    payload: employee,
})

const getEmployees = (employees) => ({
    type: types.GET_EMPLOYEES,
    payload: employees,
})

const deleteEmployee = (id) => ({
    type: types.DELETE_EMPLOYEE,
    id: id,
})

const getEmployee = (employee) => ({
    type: types.GET_EMPLOYEE,
    payload: employee
})

const updateEmployee = () => ({
    type: types.UPDATE_EMPLOYEE,
})




export const signUpUser = ({ email, password, userName }, callback) => {

    return async function (dispatch) {
        try {
           const cred =  await createUserWithEmailAndPassword(auth, email, password)
                .then(cred => {
                    const credData = { email: cred.user.email, password: password, userName: userName };
                    dataBase.collection("Admin Record").doc(cred.user.uid).set(credData);
                    return cred
                })
                .then(cred => {
                    dispatch(sigup(cred.user));
                    callback(cred.user);
                })
        }
        catch (error) {
            toast.error(error.message);
            console.log(error.message);
        }
    }
}
export const LogInUser = ({ email, password }, callback = () => {}) => {

    return async function (dispatch) {
        try {
            const user = await signInWithEmailAndPassword(auth, email, password)
                .then(user => {
                    return user
                })
                .then(cred => {
                    dispatch(logIn(cred.user));
                    let credUid =cred.user.uid
                    let credSerial = JSON.stringify(credUid)
                    localStorage.setItem("mykey",credSerial);
                    console.log(localStorage,  "DYNAMIC")
                    callback(cred.user);
                })
        }
        catch (error) {
            toast.error(error.message);
            callback({error: true, ...error});
        }
    }
}



export const LogOutUser = async() => {
        try {
            const user = await signOut(auth)
        } catch (error) {
            toast.error(error.message);
        }
}

export const addEmployeeInitiate = ({ email, password, firstName, lastName, confirmPassword, role, phoneNumber, userName }) => {
    return async function (dispatch) {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
                .then(employee => {
                    const employeeData = {
                        firstName: firstName, lastName: lastName, email: employee.user.email, password: password,
                        confirmPassword: confirmPassword, userName: userName, role: role, phoneNumber: phoneNumber
                    }
                    dataBase.collection("Employee Record").doc(employee.user.uid).set(employeeData);
                    dispatch(addEmployee(employee));
                })
        }
        catch (error) {
            toast.error(error.message);
            console.log(error.message);
        }
    }
}


export const getEmployeesInitiate = (callbackFunc) => {
    return function (dispatch) {
        try {
            dataBase.collection("Employee Record").onSnapshot((querySnapshot) => {
                const employees = [];
                let i = 0;
                querySnapshot.forEach((doc) => {
                    employees.push({ ...doc.data(), id: doc.id, key: i })
                    i++;
                });
                dispatch(getEmployees(employees));
                callbackFunc();
            })   
        } catch (error) {
            toast.error("Unable to loadd data, please try again later");
            callbackFunc({error: true, ...error});
        }
    }
}


export const deleteEmployeeInitiate = (id) => {
    return function (dispatch) {
        dataBase.collection("Employee Record").doc(id).delete()
        dispatch(deleteEmployee(id));
    }
}


export const updateEmployeeInitiate = (id, employee) => {
    return function (dispatch) {
        dataBase.collection("Employee Record").doc(id).update(employee);
        dispatch(updateEmployee())
    }
}




