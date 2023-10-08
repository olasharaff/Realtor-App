import React, { useState } from 'react'

export default function CreateListing() {
  // create a hook to define type of data
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: false,
    regularPrice: "0",
    discountedPrice: "0",
  })
  const { type, name, bedrooms, bathrooms, parking, furnished, address, description, offer, regularPrice, discountedPrice } = formData

// create a function for handling change events btw sell or Rent
  function onChangeSEllRent(){

  }

  return (
    <main className='max-w-md mx-auto px-4'>
    <h1 className='text-3xl font-bold text-center my-4'>Create a Listing</h1>
    <form>
      <p className='text-lg mt-3 font-medium'>Sell / Rent</p>
      <div className='flex'>
        <button onClick={onChangeSEllRent} type='button' id='type' value='sale' className={`mr-3 px-6 py-2 text-sm font-medium uppercase rounded w-full shadow-md hover:shadow-lg active:shadow-lg focus:shadow-lg transition duration-200 ease-in-out ${ type === 'rent' ? 'bg-white text-black' : 'bg-slate-600 text-white'}`}>Sell</button>
          <button onClick={onChangeSEllRent} type='button' id='type' value='sale' className={`ml-3 px-6 py-2 text-sm font-medium uppercase rounded w-full shadow-md hover:shadow-lg active:shadow-lg focus:shadow-lg transition duration-200 ease-in-out ${type === 'sale' ? 'bg-white text-black' : 'bg-slate-600 text-white'}`}>Rent</button>
      </div>
        <p className='text-lg font-medium mt-6'>Name</p>
        <input onChange={onChangeSEllRent} type='text' id='name' value={name} placeholder='Name' maxLength={32} minLength={10} required className='w-full rounded px-3 py-2 text-lg text-gray-700 bg-white border-gray-300 transition duration-150 ease-in-out focus:text-gray-700 focus:border-slate-600 mb-5'/>
     
      <div className='flex space-x-5 mb-6'>
        <div>
            <p className='text-lg font-medium'>Beds</p>
            <input onChange={onChangeSEllRent} type='number' id='bedrooms' value={bedrooms} min={1} max={50} required className='w-full px-4 py-2 text-lg text-gray-700 rounded transition duration-150 ease-in-out bg-white border-gray-300 focus:border-slate-600 focus:text-gray-700 '/>
        </div>
          <div>
            <p className='text-lg font-medium'>Baths</p>
            <input onChange={onChangeSEllRent} type='number' id='bathrooms' value={bathrooms} min={1} max={50} required className='w-full px-4 py-2 text-lg text-gray-700 rounded transition duration-150 ease-in-out bg-white border-gray-300 focus:border-slate-600 focus:text-gray-700 ' />
          </div>
          
      </div>
        <p className='text-lg mt-3 font-medium'>Parking Spot</p>
        <div className='flex mb-5'>
          <button onClick={onChangeSEllRent} type='button' id='parking' value={true} className={`mr-3 px-6 py-2 text-sm font-medium uppercase rounded w-full shadow-md hover:shadow-lg active:shadow-lg focus:shadow-lg transition duration-200 ease-in-out ${!parking ? 'bg-white text-black' : 'bg-slate-600 text-white'}`}>Yes</button>
          <button onClick={onChangeSEllRent} type='button' id='parking' value={false} className={`ml-3 px-6 py-2 text-sm font-medium uppercase rounded w-full shadow-md hover:shadow-lg active:shadow-lg focus:shadow-lg transition duration-200 ease-in-out ${parking ? 'bg-white text-black' : 'bg-slate-600 text-white'}`}>No</button>
        </div>
        <p className='text-lg mt-3 font-medium'>Furnished</p>
        <div className='flex'>
          <button onClick={onChangeSEllRent} type='button' id='furnished' value={true} className={`mr-3 px-6 py-2 text-sm font-medium uppercase rounded w-full shadow-md hover:shadow-lg active:shadow-lg focus:shadow-lg transition duration-200 ease-in-out ${!furnished ? 'bg-white text-black' : 'bg-slate-600 text-white'}`}>Yes</button>
          <button onClick={onChangeSEllRent} type='button' id='furnished' value={false} className={`ml-3 px-6 py-2 text-sm font-medium uppercase rounded w-full shadow-md hover:shadow-lg active:shadow-lg focus:shadow-lg transition duration-200 ease-in-out ${furnished ? 'bg-white text-black' : 'bg-slate-600 text-white'}`}>No</button>
        </div>
        <p className='text-lg font-medium mt-6'>Address</p>
        <textarea onChange={onChangeSEllRent} type='text' id='address' value={address} placeholder='Address'  required className='w-full rounded px-3 py-2 text-lg text-gray-700 bg-white border-gray-300 transition duration-150 ease-in-out focus:text-gray-700 focus:border-slate-600 mb-5' />
        <p className='text-lg font-medium'>Description</p>
        <textarea onChange={onChangeSEllRent} type='text' id='description' value={description} placeholder='Description' required className='w-full rounded px-3 py-2 text-lg text-gray-700 bg-white border-gray-300 transition duration-150 ease-in-out focus:text-gray-700 focus:border-slate-600 mb-5' />
        <p className='text-lg font-medium'>Offer</p>
        <div className='flex mb-6'>
          <button onClick={onChangeSEllRent} type='button' id='offer' value={true} className={`mr-3 px-6 py-2 text-sm font-medium uppercase rounded w-full shadow-md hover:shadow-lg active:shadow-lg focus:shadow-lg transition duration-200 ease-in-out ${!offer ? 'bg-white text-black' : 'bg-slate-600 text-white'}`}>Yes</button>
          <button onClick={onChangeSEllRent} type='button' id='offer' value={false} className={`ml-3 px-6 py-2 text-sm font-medium uppercase rounded w-full shadow-md hover:shadow-lg active:shadow-lg focus:shadow-lg transition duration-200 ease-in-out ${offer ? 'bg-white text-black' : 'bg-slate-600 text-white'}`}>No</button>
        </div>
        <div className='flex items-center mb-6'>
          <div>
            <p className='text-lg font-medium'>Regular price</p>
            <div className='flex w-full justify-center items-center space-x-6'>
              <input onChange={onChangeSEllRent} type='number' id='regularPrice' value={regularPrice} min={40} max={40000000} required className='w-full text-center text-lg px-4 py-2  text-gray-700 rounded transition duration-150 ease-in-out bg-white border-gray-300 focus:border-slate-600 focus:text-gray-700 ' />
            {/* create a condition if the rent is true, it shown dollar */}
              {type === 'rent' && (
                <div >
                  <p className='text-md text-gray-600 w-full whitespace-nowrap'>$ / Month</p>
                </div>
              )}
            </div>
           
          </div>
        </div>
        {/* create a condition if the offer is true shown discount price */}
        {offer && (
          <div className='flex items-center mb-6'>
            <div>
              <p className='text-lg font-medium'>Discounted price</p>
              <div className='flex w-full justify-center items-center space-x-6'>
                <input onChange={onChangeSEllRent} type='number' id='discountedPrice' value={discountedPrice} min={40} max={40000000} required={offer} className='w-full text-center text-lg px-4 py-2  text-gray-700 rounded transition duration-150 ease-in-out bg-white border-gray-300 focus:border-slate-600 focus:text-gray-700 ' />
                {/* create a condition if the rent is true, it shown dollar */}
                {type === 'rent' && (
                  <div >
                    <p className='text-md text-gray-600 w-full whitespace-nowrap'>$ / Month</p>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}
        <div className='mb-6'>

          <p className='text-lg font-medium'>Images</p>
          <p className='text-gray-600'>The first image will be the cover (max 6)</p>
          <input type='file' onChange={onChangeSEllRent} accept='.jpg,.png,.jpeg' id='images' multiple required className='w-full px-3 py-1.5 text-gray-700 bg-white border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600'/>
        </div>
        <button type='submit' className='w-full px-7 py-2 rounded bg-blue-600 text-white font-medium text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:bg-blue-700 active:shadow-lg active:bg-blue-800 transition duration ease-in-out'>Create Listing</button>
    </form>
    </main>
  )
}
