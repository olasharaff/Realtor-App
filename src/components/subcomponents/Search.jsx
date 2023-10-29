import React, { useState } from 'react'
import * as Fa from 'react-icons/fa'

export default function Search() {
    const [activeItem, setActiveItem] = useState(0);

    const handleActiveClick = (index) => {
      setActiveItem(index);
    };
    const items = [
      "Buy",
      "Rent",
      "Sell",
      "Pre-Approval",
      "Just Sold",
      "Home Value",
    ];
  return (
    <div>
      <div>
        <ul className="flex font-medium text-white mt-7 mb-7 gap-6">
          {items.map((item, index) => (
            <li
              key={index}
              className={`cursor-pointer hover:border-b-4 pb-2  ${
                activeItem === index ? "border-b-4 border-white" : ""
              } hover:border-white transition duration-200 ease-in-out`}
              onClick={() => handleActiveClick(index)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative">
        <input
          text=""
          placeholder=""
          className="w-[520px] text-gray-600 focus:border-none hover:border-none active:border-none rounded-3xl px-3 py-3 hover:bg-black hover:text-white"
        />
        <span className="bg-gray-600 py-3 px-3 flex justify-center items-center w-11 rounded-full absolute top-1 right-2 hover:bg-white hover:text-black">
          <Fa.FaSearch className="text-white hover:text-black" />
        </span>
      </div>
    </div>
  );
}
