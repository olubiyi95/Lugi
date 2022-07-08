import React from 'react'
import AppRoutes from './Routes/AppRoutes'
import {  ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



function App() {



  return (

    <div className="App">
      <ToastContainer />
      <AppRoutes />
    </div>
  );
}

export default App;
