import React from 'react';
import { useEffect, useState, createContext } from 'react';
import { auth } from '../../Firebase/Config';



export const UserContext = createContext(null)

export const AuthContext = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(null);


  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user)
      } else {
        console.log("THERE IS NO USER");
      }
    });
    return unSubscribe
  }, [])

  useEffect(() => {
    console.log(currentUser, "===NOW");
  }, [currentUser]);

  return <UserContext.Provider value={{ currentUser }}>{children}</UserContext.Provider>
}

