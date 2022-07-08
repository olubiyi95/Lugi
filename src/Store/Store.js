import { applyMiddleware, createStore } from "redux";
import  thunk  from 'redux-thunk';
import logger from 'redux-logger';
import RootReducer from "./RootReducer";

// import rootSaga from './Sagas'



const middleware = [thunk]



if ( process.env.NODE_ENV === "development" ) {
    middleware.push(logger)
}


 const store = createStore ( RootReducer,applyMiddleware( ...middleware))

 store.subscribe(() => {
     console.log("STATE UPDATED");
     console.log(store.getState());
 })


export default store