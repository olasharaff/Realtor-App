import { useEffect, useState } from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'

export function useAuthStatu() {
    // create a hook to check if the user is authenticated
    const [loggedIn, setLoggedIn] = useState(false)
    // create another hook to check the user Status
    const [checkingStatus, setCheckingStatus] = useState(true)
   
//    create useEffect function to ask the firebase if the user is authenticated or not
    useEffect(() =>{
        const auth = getAuth();
        console.log(auth);
        // create a firebase method (onAuthStateChanged) to check true or false
        onAuthStateChanged(auth, (user)=>{
            // If the user is authenticated then set the login to be true
            if (user){
                setLoggedIn(true)
            }
            setCheckingStatus(false)
        })


    }, [])
  return {loggedIn, checkingStatus}
}
