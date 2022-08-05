import React, { useState } from 'react';
import { useEffect } from "react";
import { UseStorage } from './UseStorage';
import { motion } from 'framer-motion'
import './style.css'

export const ProgressBar = ({ progress, upLoaded}) => {
    

  return (
    <div>
        {!upLoaded && <motion.div className="progress-bar "
            initial={{ width: 0 }}
            animate={{ width: progress + '%' }}
            >
                
        </motion.div>}
    </div>
  )
}
