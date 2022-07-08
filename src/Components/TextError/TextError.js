import React from 'react'
import errorIcon from '../../assets/error_icon.svg'
import './style.css'



const TextError = (props) => {
    console.log(props)
  return (
    <div className='text-danger error'>
        <img src={errorIcon} alt="Error Icon" />
         <span className='errmessage'>{props.errMessage}</span>
    </div>
  )
}

export default TextError