import { combineReducers } from "redux";
import employeeReducer from "./Reducer";
import { firebaseReducer } from "react-redux-firebase";

const RootReducer = combineReducers ({
    data: employeeReducer,
    firebase: firebaseReducer
})


export default RootReducer