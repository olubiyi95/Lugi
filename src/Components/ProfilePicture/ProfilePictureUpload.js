import React, { useState, useEffect, useRef } from 'react';
import { MdModeEdit  } from 'react-icons/md';
import { ProgressBar } from '../ProfilePicture/ProgressBar';
import { useSelector } from 'react-redux'
import './style.css'
import { UseStorage } from './UseStorage';
import { useDispatch } from 'react-redux';
import { LogInUserWithUid } from '../../Store/Actions'


export const ProfilePictureUpload = () => {
    
  
    const { getUser } = useSelector(state => state.data);
    const ProfileImage = getUser.url
    const [file, setFile] = useState();
    const filePickerRef = useRef();
    const dispatch = useDispatch();
    const [ refresh, setRefresh ] = useState(0) 
    const { progress, url, uploadFile, upLoaded } = UseStorage();
    
   

    useEffect(()=>{
        console.log("-----USERDATARES");
    }, [getUser])

    useEffect(()=>{
        console.log("REFRESHED");
        dispatch(LogInUserWithUid(()=>{
            // setWorkSpin(false)
        }))
    },[refresh])

      useEffect(()=>{
        console.log(url,"UPLOADED");
        if(url && upLoaded){
            setRefresh(refresh+1)
        }
        console.log(refresh,"===REST");
      },[url, upLoaded])

   

    useEffect(() => {
        if (!file) {
            return;
        }
        uploadFile(file);
    }, [file])

    const pickedHandler = (event) => {
        let pickedFile;
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];                      //THESE TWO FUNCTIONS HELP TO SELECT THE IMAGES
            console.log('setting file');
            setFile(pickedFile)
        }
    }
    const pickedImageHandler = () => {                  //THESE TWO FUNCTIONS HELP TO SELECT THE IMAGES
        filePickerRef.current.click();
    }

    return (
        <div className='profile-upload'>
             <div className=''>
                <input
                    ref={filePickerRef}
                    style={{ display: "none" }}
                    type="file"
                    accept='.jpeg, .jpg, .png'
                    onChange={pickedHandler}
                />

                <div className={`image-upload }`}>
                    <div className='image-upload-preview'>
                        {!ProfileImage && (
                            <div className='center'>
                                <button className='upload-button' type='button' onClick={pickedImageHandler}>+</button>
                            </div>
                        )}
                        
                             {ProfileImage && <img src={ProfileImage} alt="profile-image"></img>}
        
                    </div>
                </div>
                {file && <ProgressBar progress={progress} setFile={setFile} upLoaded={upLoaded} />}
                <div>
                    {ProfileImage && (
                        <div>
                            <button className='edit-button' type='button' onClick={pickedImageHandler}>
                                <MdModeEdit className="icon"></MdModeEdit>
                            </button>
                        </div>
                    )}
                </div>
            
            </div>
            
        </div>
    )
}

