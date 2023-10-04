import { getAuth } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';

export default function Profile() {
  const navigate = useNavigate()
  const auth = getAuth()
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
  return (
    <>
    <section className='flex items-center justify-center flex-col mx-auto max-w-6xl px-4'>
    <h1 className='text-3xl font-semibold text-center mt-5'> My Profile</h1>
    <div className="w-full md:w-[50%] mt-5">
      <form>
        <input type="text"   className='mb-5 w-full px-4 py-2 text-lg text-gray-600 border border-gray-400 rounded transition ease-in-out' value={name} id='name' disabled />
        <input type="email"  className='mb-5 w-full px-4 py-2 text-lg text-gray-600 border border-gray-400 rounded transition ease-in-out' value={email} id='email' disabled />
      
      <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
        <p className='flex items-center' >Do you want to change your name? <span className='text-red-500 ml-1 hover:text-red-700 transition duration-200 ease-in-out cursor-pointer'>Edit</span></p>
        <p onClick={onLogOut} className='text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out cursor-pointer'>Sign out</p>
      </div>
      </form>
    </div>
    </section>
    </>
  )
}
