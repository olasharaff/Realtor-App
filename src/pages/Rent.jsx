import React from "react";
import Search from "../components/subcomponents/Search";
import rent from "../assets/svg/rent.webp";

export default function Rent() {
  return (
    <div>
      {/* SECTION 1 */}
      <div className="relative">
        <img
          src={rent}
          alt="sell"
          className="h-[500px] w-full bg-no-repeat bg-cover "
        />
        <div className="absolute z-40 top-28 left-[15%] flex justify-center flex-col max-w-3xl items-center mx-auto">
          <div className="text-center text-white flex flex-col justify-center items-center">
            <h1 className="font-bold text-6xl mb-5">
              Discover your perfect rental®.
            </h1>
          </div>
          <Search />
        </div>
      </div>
      {/* SECTION 2 */}
      <div className="max-w-7xl border border-gray-300 px-5 py-5 flex mx-7 rounded-md relative items-center my-7">
        <h1>
          {" "}
          <img
            src="https://static.media-assets.rdc.moveaws.com/ConsumerMedia/landlord-tools/assets/images/svg/common/avail-logo-small.svg"
            alt="icon"
            className="absolute top-5 left-2 text-3xl mr-3"
          />
          <span className="ml-4">Want to list your rental for free in minutes?</span>{" "}
          <span className="font-medium border-b border-black text-base hover:text-gray-400 hover:border-gray-400 cursor-pointer">
            Learn about landlord tools by Avail
          </span>{" "}
        </h1>
      </div>
    </div>
  );
}
