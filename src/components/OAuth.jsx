import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-toastify'
import { db } from '../firebase'
import { useNavigate } from 'react-router-dom'



export default function OAuth() {
  const navigate = useNavigate();

  // create a function for Signing up with Google
  async function onGoogleClick() {


    // creating a method for signing up authenticated with Google
    try {

      const auth = getAuth() // create a new auth
      const provider = new GoogleAuthProvider(); // create provider method for google authentication
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      console.log(user)
      // create a method that check if user db already exists and then move the user data to firebase database

      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef) // check if the user data is available using user id
      // check if the user data is not available, it should set a doc for Name, Email and the Timestamp
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          timestamp: serverTimestamp()
        })
        navigate('/')
        toast.success('Congratulations, you have successfully registered')
      }

    } catch (error) {
      toast.error('Couldn\'t connect to Google:', error)
    }

  }
 
  return (
      <button type='button' onClick={onGoogleClick} className='flex items-center whitespace-nowrap w-full justify-center bg-red-600 font-medium text-sm uppercase text-white rounded-sm py-3 px-6 hover:bg-red-700 transition duration-200 ease-in-out hover:shadow-xl active:bg-blue-800'> <FcGoogle className='text-2xl mx-2 bg-white rounded-full' /> Continue with Google</button>
  )
}
