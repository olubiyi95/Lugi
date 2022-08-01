import React, { useState } from 'react';
import { useEffect } from "react";
import { UseStorage } from './UseStorage';
import { motion } from 'framer-motion'
import './style.css'

export const ProgressBar = ({setFile, progress}) => {
    
    const { url } = UseStorage();
    console.log(progress, "===BAR");

    useEffect(() => {   // TO REMOVE THE PROGRESS BAR AFTER FILE IS UPLOADED WE HAVE TO SET IT TO NULL
        if( url && progress == 100 ){       //THIS IS A TRUTHY EXPRESSION
            setFile(null)
        }
    }, [ url, setFile])

    // useEffect(() => {
    //     console.log('12--');
    //     file && uploadFile(file);
    // }, [file]);

  return (
    <div>
        <motion.div className="progress-bar "
            initial={{ width: 0 }}
            animate={{ width: progress + '%' }}
            >
                
        </motion.div>
    </div>
  )
}
