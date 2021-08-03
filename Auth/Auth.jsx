// react
import React, { useEffect, useState } from "react";
// firebase
import firebase from 'firebase';

// context
export const AuthContext = React.createContext();

/**
 * Auth Provider Component
 */
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoader, setauthLoader] = useState(false)
  const [pending, setPending] = useState(true);
  const [userData,setUserData] = useState({})
  useEffect(() => {
    setauthLoader(true)
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        setCurrentUser(user);
        setauthLoader(false)

        firebase.firestore().collection('users').where('uid','==',user.uid).get().then(snap=>{
          console.log(snap.size)
            if(snap.size){
              let user = {}
              snap.forEach(doc=>{
                if(doc.exists){
                  user = doc.data()
                }
              })
              setUserData(user)
            }
        })
      }else{
        setauthLoader(false)
      }
    });
  }, []);

  const changeStatusOfCurrentUser = () => {
    setCurrentUser(null)
  }
  

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        changeStatusOfCurrentUser,
        authLoader,
        userData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};