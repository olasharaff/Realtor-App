import React from 'react'
import { FcGoogle } from 'react-icons/fc'

export default function OAuth() {
  return (
      <button type='submit' className='flex items-center whitespace-nowrap w-full justify-center bg-red-600 font-medium text-sm uppercase text-white rounded-sm py-3 px-6 hover:bg-red-700 transition duration-200 ease-in-out hover:shadow-xl active:bg-blue-800'> <FcGoogle className='text-2xl mx-2 bg-white rounded-full' /> Continue with Google</button>
  )
}
