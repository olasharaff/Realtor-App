import React, { useState } from 'react'
import Buyings from './subcomponents/Buyings';
import Sellings from './subcomponents/Sellings';
import Rentings from './subcomponents/Rentings';


export default function Discover() {
  const [activeContent, setActiveContent] =useState('buying')

  const handleButtonClick = (content)=>{
    setActiveContent(content)
  }

  return (
    <div className="max-w-7xl mt-16 mb-6 m-auto ">
      <p className="px-10 mb-5 font-bold text-2xl">
        Discover how we can help you
      </p>
      <div>
        <div className="flex flex-nowrap px-10 space-x-6 mb-6 items-center">
          <button
            className={`${
              activeContent === "buying"
                ? "bg-black text-white"
                : "border border-black "
            } lg:px-6 lg:py-3 lg:rounded-3xl px-4 py-2 lg:text-base text-xs rounded-2xl transition duration-150 ease-in-out shadow-lg hover:shadow-xl`}
            onClick={() => handleButtonClick("buying")}
          >
            Buying
          </button>
          <button
            className={`${
              activeContent === "renting"
                ? "bg-black text-white"
                : "border border-black "
            } lg:px-6 lg:py-3 lg:rounded-3xl px-4 py-2 lg:text-base text-xs rounded-2xl transition duration-200 ease-in-out shadow-lg hover:shadow-xl`}
            onClick={() => handleButtonClick("renting")}
          >
            Renting
          </button>
          <button
            className={`${
              activeContent === "selling"
                ? "bg-black text-white"
                : "border border-black "
            } lg:px-6 lg:py-3 lg:rounded-3xl px-4 py-2 lg:text-base text-xs rounded-2xl transition duration-150 ease-in-out shadow-lg hover:shadow-xl `}
            onClick={() => handleButtonClick("selling")}
          >
            Selling
          </button>
        </div>
        {activeContent === "buying" && <Buyings />}
        {activeContent === "selling" && <Sellings />}
        {activeContent === "renting" && <Rentings />}
      </div>
    </div>
  );
}
