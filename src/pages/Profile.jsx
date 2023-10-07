import { getAuth, updateProfile } from 'firebase/auth';
import React, { useState } from 'react'
import {doc, updateDoc} from 'firebase/firestore'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { db } from '../firebase'

export default function Profile() {
  const navigate = useNavigate()
  const auth = getAuth()
  // create a hook for changing profile details
  const [changeProfile, setChangeProfile] = useState()
  const [isFormData, setIsFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const {name, email} = isFormData
  // create function for signing out from the profile
  function onLogOut(){
    auth.signOut()
    // create a method to navigate back to the Home page after signed out
    navigate('/')

  }
  // create a function to allow the input field to be edited 

  function onChange(e){
    setIsFormData((prevState) => ({
      ...prevState, [e.target.id]: e.target.value
    }))
   

  }
  // create function if the change is true then submit the form

  async function onSubmit() {
    try {
      // create a method to check if the name is changing or not
      if (auth.currentUser.displayName !== name) {
        // create a method to update the display name

        await updateProfile(auth.currentUser, {
          displayName: name,
        })
        // create a method to update the name in the firestore by crating a reference
        const docRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(docRef, { name });

        toast.success('Profile details updated')
      }
    } catch (error) {
      toast.error("Could not update your profile", error)
    }
  }
  return (
    <>
    <section className='flex items-center justify-center flex-col mx-auto max-w-6xl px-4'>
    <h1 className='text-3xl font-semibold text-center mt-5'> My Profile</h1>
    <div className="w-full md:w-[50%] mt-5">
      <form>
         <input onChange={onChange} disabled={!changeProfile} type="text" className={`mb-5 w-full px-4 py-2 text-lg text-gray-600 border border-gray-400 rounded transition ease-in-out ${changeProfile && 'bg-red-200 focus: bg-red-300'}`} value={name} id='name'  />
        <input  type="email"  className='mb-5 w-full px-4 py-2 text-lg text-gray-600 border border-gray-400 rounded transition ease-in-ou' value={email} id='email'/>
      
      <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
     
              <p className='flex items-center' >Do you want to change your name? <span  /* create func to change and update profile */ onClick={() => { changeProfile && onSubmit(); setChangeProfile((prevState) => !prevState) }} className='text-red-500 ml-1 hover:text-red-700 transition duration-200 ease-in-out cursor-pointer'>
                {/* Create a dynamic method=> if the change is true it should show Apply change otherwise Edit */} {changeProfile ? 'Apply change' : 'Edit'}
              </span></p>
        <p onClick={onLogOut} className='text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out cursor-pointer'>Sign out</p>
      </div>
      </form>
    </div>
    </section>
    </>
  )
}
