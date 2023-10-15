import React from 'react'
import  spinner  from '../assets/svg/spinner.svg'

export default function Spinner()  {
    return (
        <div className='spinner-container'>
         <div className='flex justify-center items-center m-auto fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-30 bg-white'>
            <img src={spinner} alt='spinner svg' />
        </div>
        </div>
    )
}
