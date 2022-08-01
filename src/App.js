import React, { useContext, useState } from 'react'
import AppRoutes from './Routes/AppRoutes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { LogInUserWithUid } from '../src/Store/Actions'
import { Spin } from 'antd';




function App() {
  const dispatch = useDispatch()
  const[isLoading, setIsLoading ] = useState(true);
  const [workSpin, setWorkSpin] = useState(true)

  useEffect(() => {
    dispatch(LogInUserWithUid( () => {
      setIsLoading(false);
      setWorkSpin(false)
    }))
  }, []);

  return (

    <div className="App">
      <ToastContainer />
      <Spin size="large" spinning={workSpin} style={{ height: '1000px' }}>
        {isLoading ? "" : <AppRoutes />}
      </Spin>
    </div>

  );
}

export default App;
