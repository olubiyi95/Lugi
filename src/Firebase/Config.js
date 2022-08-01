import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import { getAuth } from 'firebase/auth'



const firebaseConfig = {
    apiKey: "AIzaSyAlx-L_4CzFSvMWPsQvg9T5UjJqSu7D9_w",
    authDomain: "employeemanagementsystem-24197.firebaseapp.com",
    databaseURL: "https://employeemanagementsystem-24197-default-rtdb.firebaseio.com",
    projectId: "employeemanagementsystem-24197",
    storageBucket: "employeemanagementsystem-24197.appspot.com",
    messagingSenderId: "787516835082",
    appId: "1:787516835082:web:e3cf61d75f0fed8e9f26f3"
  };

  const app = firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();
  const dataBase =  firebase.firestore();
 const auth = getAuth(app);
 const timeStamp = firebase.firestore.FieldValue.serverTimestamp

 

 

 export { auth, dataBase, storage, timeStamp }