import React from "react";
import { Selling } from "../../datas/DiscoverDate";
import { Link } from "react-router-dom";

export default function Sellings() {
  return (
    <>
      <div className="flex flex-wrap justify-center items-center m-auto space-x-2 px-2 ">
        {Selling.map((item, index) => (
          <div
            key={index}
            className="relative border border-gray-400 rounded-md hover:border-black hover:border-2 lg:w-[396px] py-2 px-4 h-[250px] cursor-pointer sm:w-[70%] sm:mb-6 "
          >
            <div className="flex justify-between flex-nowrap mb-2">
              <h1 className="w-[200px] text-xl font-bold">{item.title}</h1>
              <img src={item.icon} alt="icon" className="w-12" />
            </div>
            <h1 className="mb-2">{item.description}</h1>
            <Link to="">
              <span className="absolute bottom-5 text-black font-semibold border-b-2 border-gray-400  hover:border-black ">
                {item.link}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
