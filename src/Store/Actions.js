import * as types from './ActionTypes'
import { dataBase } from '../Firebase/Config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,  } from 'firebase/auth';
import { auth } from '../Firebase/Config'
import { toast } from 'react-toastify';







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

const getDetail = (getUser) => ({
    type: types.GET_DETAILS,
    payload: getUser
})
const upDateProfileImage = (getUser) => ({
    type: types.GET_PROFILEPICTURE,
    payload: getUser
})

export const signUpUser = ({ email, password, userName, userType }, callback) => {

    return async function (dispatch) {
        try {
           const cred =  await createUserWithEmailAndPassword(auth, email, password)
                .then(cred => {
                  const credData = { email: cred.user.email, password: password, userName: userName, userType:userType };
                    dataBase.collection("Users").doc(cred.user.uid).set(credData);
                    return cred
                })
                .then(cred => {
                    dispatch(sigup(cred.user));
                    callback(cred.user);
                })
        }
        catch (error) {
            // toast.error(error.message);
            callback({error: true, ...error} )
        }
    }
}
export const LogInUser = ({ email, password }, callback = () => {}) => {

    return async function (dispatch) {
        try {
            const loggedInUser = await signInWithEmailAndPassword(auth, email, password)
                .then(cred => { return cred.user; });

            dispatch(logIn(loggedInUser));
            let loggedInUID = loggedInUser.uid
            localStorage.setItem("UID", loggedInUID);
            const userDataSnapShot = await dataBase.collection("Users").doc(loggedInUID).get();
            const userData = {...userDataSnapShot.data(),id:userDataSnapShot.id };
    
            dispatch(getDetail(userData));
            callback(userData);
        }
        catch (error) {
            // toast.error(error.message);
            callback({error: true, ...error});
        }
    }
}

export const LogInUserWithUid = (callback = () => {}) => {
    return  async function (dispatch) {
        try {
            const userId = localStorage.getItem("UID")
            if (userId) {
                const userDataSnapShot = await dataBase.collection("Users").doc(userId).get();
                const userData = {...userDataSnapShot.data(), id:userDataSnapShot.id};
                
                dispatch(getDetail(userData));
            }
            // console.log('login UID');
            return callback();
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
            localStorage.removeItem('UID');      
        } catch (error) {
            toast.error(error.message);
        }
}

export const addEmployeeInitiate = ({ email, password, firstName, lastName, confirmPassword, role, phoneNumber, userName, userType }) => {
    return async function (dispatch) {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
                .then(employee => {
                    const employeeData = {
                        firstName: firstName, lastName: lastName, email: employee.user.email, password: password,
                        confirmPassword: confirmPassword, userName: userName, role: role, phoneNumber: phoneNumber, userType:userType
                    }
                    dataBase.collection("Users").doc(employee.user.uid).set(employeeData);
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
            dataBase.collection("Users").onSnapshot((querySnapshot) => {
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
            toast.error("Unable to load data, please try again later");
            callbackFunc({error: true, ...error});
        }
    }
}


export const deleteEmployeeInitiate = (id) => {
    return function (dispatch) {
        try {
            dataBase.collection("Users").doc(id).delete()
            dispatch(deleteEmployee(id));
        } catch (error) {
            console.log(error);
        }
      
    }
}


export const updateEmployeeInitiate = (id, employee) => {
    return async function (dispatch) {
        try {
            dataBase.collection("Users").doc(id).update(employee);
            dispatch(updateEmployee())
        } catch (error) {
            console.log(error)
        }
    }
}

export const updateEmployeePaasword = (id ,newPassword) => {
    return async function (dispatch) {
        try {
        dataBase.collection("Users").doc(id).update({password:newPassword, confirmPassword:newPassword});
            dispatch(updateEmployee())
            // callback(updatedPassword)
        } catch (error) {
            console.log(error)
        }
    }
}



