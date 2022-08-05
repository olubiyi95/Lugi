import React, { useEffect, useState } from 'react';
import { dataBase, storage, timeStamp } from '../../Firebase/Config'
import { useSelector } from 'react-redux';


export const UseStorage = () => {
    const { getUser } = useSelector(state => state.data);
    const userId = getUser.id;
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);
    const [ isLoading, setIsloading ] = useState(false);
    const [upLoaded, setUploaded ] = useState(false);
   

    const uploadFile = file => {
        console.log({ file }, "====FILE");
        const storageRef = storage.ref(file.name);                                // THOS OS GOiNG TO FIRE EVERYTIME A FILE IS UPLOADED    . WE ARE CREATING A REFERENCE TO A FILE INSIDE THE DEFAULT FIREBASE STORAGE BUCKET 
        const collectionRef = dataBase.collection('Users');

        setUploaded(false)
        storageRef.put(file).on('state_changed', (snap) => {                         //THIS UPLOADS THE FILE TO THE STORRAGE REFERENCE ABOVE   . HTE SNAP EVENT IS A SNAPSHOT OF THE UPLOAD AT THAT MOMENT IN TIME
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;          //FORMULA FOR PERCENTAGE                                                      // TO FIGURE OUT THE PROGRESS OF THE UPLOAD WE ARE GOING TO USE THE PROPERTIES OF THE SNAPSHOT OBJECT
            setProgress(percentage);
            setIsloading(true)
        }, (err) => {                                                              //this will fire if there is an error with the upload
            setError(err);
        }, async () => {

            const url = await storageRef.getDownloadURL();
            const createdAt = timeStamp();                        //GETS THE DOWNLOAD URL FROM THE PROJECT STORAGE AND STORES IT IN THE URL VARIABLE                                       //TO GET THE TIMESTAMP OF WHEN THE DICUMENT WAS CREATED
            await collectionRef.doc(userId).update({ url, createdAt });
            setUrl(url);
            setUploaded(true)
            // setProgress(0)
            // DisableProgress()
        });
    }



    return (
        { progress, url, error, uploadFile, upLoaded, isLoading }
    )
}
