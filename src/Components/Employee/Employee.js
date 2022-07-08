import React, { useState } from 'react';
import { Modal } from 'antd';
import  { lazy, Suspense } from 'react';
import EmployeeTable from '../EmployeeTable/EmployeeTable';
import './style.css'




const CreateEmployeeForm = lazy(() => {
    return Promise.all([
      import("../CreateEmployeeForm/CreateEmplyeeForm"),
      new Promise(resolve => setTimeout(resolve, 500))
    ])
    .then(([moduleExports]) => moduleExports);
  });


 const Employees = () => {
   
    const [ refresh, setRefresh ] = useState(0)
    const [modal1Visible, setModal1Visible] = useState(false);

       const onComplete = () => {
        setTimeout(()=> {
            setModal1Visible(false)
        }, 5000)
        setRefresh(refresh+1)
        // fetchData()
      }

    return (
        <>
        <div className='employee'>
            <h1>Employee</h1>
            <div className=' tabs'>
                <h4>Dashboard / Employee</h4>
                <div className='tab-panel'>
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active tabs-btn" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Home</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link tabs-btn" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">View</button>
                        </li>
                        <button className='tab-btn' onClick={() => setModal1Visible(true)} >Add Employee</button>
                    </ul>
                </div>
            </div>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">home</div>
                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex="0"><EmployeeTable refresh={refresh} /></div>
            </div>
            <div >
            <Suspense fallback={<div></div>}>
                <Modal
                        className='nomodal'
                        style={{ top: 140 }}
                        width={800}
                        visible={modal1Visible}
                        onOk={() => setModal1Visible(false)}
                        onCancel={() => setModal1Visible(false)}
                    >
                        < CreateEmployeeForm onComplete={onComplete}/>
                </Modal>
            </Suspense>   
            </div>
            </div>
      </>
    )
 
}

export default Employees




 // const { employees: data } = useSelector(state => state.data)
    // const state = useSelector((state)=> state.data)
    
   


    
    //   const fetchData = () => {
    //     dataBase.collection("Employee Record").get()
    //     .then(snapshot=>{
    //         // console.log(snapshot)
    //         let employees = []
    //         let i = 0;
    //         snapshot.forEach( doc =>{
    //             // console.log({doc: doc.data()});
    //             employees.push({...doc.data(), id: doc.id, key: i})
    //             i++;
    //         })
    //         setData(employees)
    //     })
    //     .catch((error)=> {
    //         alert(error.message)
    //       })
    //   }
    
    //    useEffect(()=>{
    //     fetchData()
    //    },[])

