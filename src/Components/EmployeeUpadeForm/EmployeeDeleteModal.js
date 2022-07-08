import React, { Component } from 'react';
import './style.css'
import { toast} from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployeeInitiate } from '../../Store/Actions';


const EmployeeDeleteModal= ( props) => {


    const { item,  onCompleteDelete } = props
    const dispatch = useDispatch()
//    const { employees } = (state => state.data)

    const deleteRecord = (id) => {
        try {
            dispatch(deleteEmployeeInitiate(id));
            onCompleteDelete();
            toast.success("Employee deleted");
        } catch (error) {
            toast.error("Unable to delete employee")
        }
     
       }

    return(
        <>
        <div className='py-5'>
            <h4>Are you sure you want to delete this employee?</h4>
            <div className='delete-btns'>
                <button className='bg-danger bg-danger border-0 rounded text-light' onClick={()=> deleteRecord(item.id)}>Delete</button>
                <button className='bg-primary border-0 rounded text-light mx-2' onClick={onCompleteDelete}>Cancel</button>
            </div>
        </div>
        </>
    )
}

export default EmployeeDeleteModal




// dataBase.collection("Employee Record").doc(item.id).delete()
// .then(() => {
//     console.log("delete button clicked")
//     dispatch(deleteEmployee({id:item.id}))
//     onCompleteDelete()
//     toast.success("Employee deleted");
// }).catch((error) => {
//     toast.error("Unable to delete employee")
// })