import React from 'react'
import MyHomes from '../datas/MyHomeData'
import Search from '../components/subcomponents/Search';
import myhome from '../assets/svg/myhome.webp'

export default function MyHome() {
  return (
    <>
      {/* SECTION 1 */}
      <div className="relative">
        <img
          src={myhome}
          alt="sell"
          className="h-[500px] w-full bg-no-repeat bg-cover "
        />
        <div className="absolute z-40 top-28 left-[17%] flex justify-center flex-col max-w-4xl items-center mx-auto">
          <div className="text-center text-white flex flex-col justify-center items-center">
            <h1 className="font-bold text-6xl mb-5">˝
              Track the RealValueTM of your home with multiple estimates
            </h1>
          </div>
          <Search />
        </div>
      </div>
      <div className="max-w-7xl px-3 mb- mt-5 ">
        <h1 className="font-bold text-3xl mb-6 mt-6 ">
          <span className="text-red-500">Real</span>ValueTM
        </h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 text-center gap-5">
          {MyHomes.map((items, index) => (
            <div key={index}>
              <img src={items.img} alt={items.alt} className="w-full" />
              <h1 className="font-bold">{items.title}</h1>
              <p>{items.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
