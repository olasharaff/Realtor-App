import React, { useState } from "react";
import { SellerGuide, SellsCollection } from "../datas/SellData";
import { Link } from "react-router-dom";
import sell from "../assets/svg/sell1.webp";
import {MdKeyboardArrowDown} from 'react-icons/md'
import Search from "../components/subcomponents/Search";

export default function Sell() {
  const [activeItem, setActiveItem] = useState(0);

  const handleActiveClick = (index) => {
    setActiveItem(index);
  };
  
  const items2 = ["Connect with a lender", "Latest home quality rates"];
  return (
    <>
      <div>
        {/* SECTION 1 */}
        <div>
          <div className="relative">
            <img
              src={sell}
              alt="sell"
              className="h-[500px] w-full bg-no-repeat bg-cover "
            />
            <div className="absolute z-40 top-28 left-[10%] flex justify-center flex-col max-w-5xl items-center mx-auto">
              <div className="text-center text-white flex flex-col justify-center items-center">
                <h1 className="font-bold text-6xl mb-5">
                  When <span className="text-red-600">Agents </span>Compete,{" "}
                  <span className="text-red-600">You Win.</span>
                </h1>
                <h2 className="font-bold text-xl max-w-xl text-center mb-5">
                  RealChoiceTM Selling analyzes thousands of local agents and
                  finds the best to compete for you!
                </h2>
              </div>
                <Search/>
             
            </div>
          </div>
        </div>
      </div>
      {/* SECTION 2 */}
      <div className="flex flex-wrap justify-center items-center max-w-7xl my-11 gap-5">
        {SellsCollection.map((item, index) => (
          <div
            key={index}
            className="relative w-[390px] px-4 py-6 border border-gray-300 h-[480px] rounded-lg hover:border-gray-600"
          >
            <div className="flex justify-center items-center mb-4">
              <img src={item.icon} alt="sellIcon" />
            </div>
            <h1 className="font-bold text-base my-3">
              <span className="text-red-700">{item.color}</span>
              {item.title}
            </h1>
            <h1 className="font-bold text-xl mb-4">{item.header}</h1>
            <p className="font-light mb-6">{item.description}</p>
            <Link to={item.to}>
              <button
                className={`absolute bottom-5 left-5 w-[90%] px-3 py-4 rounded-3xl bg-gray-300 ${
                  activeItem === index ? "bg-black" : ""
                }  hover:bg-black hover:text-white`}
                onClick={() => handleActiveClick(index)}
              >
                {item.btn}
              </button>
            </Link>
          </div>
        ))}
      </div>
      {/* SECTION 3 */}

      <div className="max-w-7xl border border-gray-300 px-5 py-5 flex mx-7 rounded-md relative ">
        <h1>
          <span className="font-semibold text-base">
            Looking for a local agent?
          </span>{" "}
          <span>Browse reviews and ratings in our</span>{" "}
          <span className="font-medium border-b border-black text-lg hover:text-gray-400 hover:border-gray-400 cursor-pointer">
            Find a Realtor directory <MdKeyboardArrowDown className="absolute top-5 right-[41%] text-3xl" />{" "}
          </span>{" "}
        </h1>
      </div>
      {/* SECTION 4 */}

      <div className="flex max-w-7xl px-3 py-3 mx-6  gap-6 border mb-12 mt-6 border-gray-300 rounded-md ">
        <div>
          <img
            src="https://static.rdc.moveaws.com/images/finance/illustration/home-equity-or-refinance-house.svg"
            alt=""
          />
        </div>
        <div>
          <h1 className="font-bold text-2xl mb-3">
            Find out how much home equity you can use
          </h1>
          <p className="font-light text-sm mb-3">
            If you're looking to fund a home renovation project or a down
            payment on a new place, the equity in your home could help. Connect
            with a lender to see if you qualify.
          </p>
          <div className="flex mb-4 gap-3">
            {items2.map((item, index) => (
              <button
                key={index}
                className={`px-6 py-3 rounded-3xl ${
                  activeItem === index
                    ? "bg-gray-800  text-white  font-medium"
                    : "text-black font-normal text-sm "
                } hover:bg-gray-800 hover:text-white`}
                onClick={() => handleActiveClick(index)}
              >
                <span
                  className={`${
                    activeItem === index
                      ? "hover:border-b-2 hover:border-b-white"
                      : "border-b border-b-black"
                  }`}
                >
                  {item}
                </span>
              </button>
            ))}
          </div>
          <p className="text-lg font-light cursor-pointer transition duration-150 ease-in-out hover:text-xl hover:font-normal">
            Advertising disclosure
          </p>
        </div>
      </div>
      {/* SECTION 5 */}
      <div className="bg-gray-100 py-6">
        <div className="max-w-7xl px-7">
          <h1 className="my-3 text-2xl font-bold">Seller Guide</h1>
          <div className=" sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-4 gap-4 sm:gap-2 md:gap-9">
            {SellerGuide.map((items, index) => (
              <div
                key={index}
                className="shadow-xl bg-white px-6 py-6 rounded-lg w-64 text-lg mb-3"
              >
                <div className="flex justify-center my-4">
                  <img src={items.icon} alt="sellerGuide" />
                </div>
                <p className="">{items.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
