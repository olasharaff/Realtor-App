import React from "react";
// react moment to get a stringly date to month, or day
import Moment from "react-moment";
import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
import {FaTrash} from 'react-icons/fa'
import {MdEdit} from 'react-icons/md';


export default function ListingItem({ listing, id, onDelete, onEdit}) {

  return (
    <li className="relative bg-white flex flex-col justify-between items-center shadow-xl hover:shadow-lg rounded-md overflow-hidden transition-shadow duration-150 m-[10px] ">
      <Link className="contents" to={`/category/${listing.type}/${id}`}>
        <img
          className="h-[170px] w-full object-cover hover:scale-105 transition-scale duration-150 ease-in"
          src={listing.imgUrls[0]}
          loading="lazy"
          alt=""
        />
        <Moment
          className="absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-medium rounded-md px-2 py-1 shadow-lg"
          fromNow
        >
          {listing.timeStamp?.toDate()}
        </Moment>
        <div className="w-full p-[10px]">
          <div className="flex items-center space-x-1">
            <MdLocationOn className="h-4 w-4 text-green-600" />
            <p className="font-normal text-sm mb-[2px] text-gray-500 truncate">
              {listing.address}
            </p>
          </div>
          <p className="font-semibold m-0 text-xl truncate">{listing.name}</p>
          <p className="font-bold text-black mt-2 text-base">
            $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="flex items-center mt-[10px] space-x-3">
            <div className="flex items-center space-x-1">
              <p className="text-sm">
                {listing.bedrooms > 1 ? (
                  <span className="font-bold">
                    {listing.bedrooms}
                    <span className="font-light"> Beds</span>
                  </span>
                ) : (
                  <span className="font-bold">
                    1 <span className="font-light"> Bed</span>
                  </span>
                )}
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <p className="font-bold text-sm">
                {listing.bathrooms > 1 ? (
                  <span className="font-bold">
                    {listing.bathrooms}{" "}
                    <span className="font-light">Baths</span>
                  </span>
                ) : (
                  <span className="font-bold">
                    1 <span className="font-light"> Bath</span>
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </Link>
      {onDelete && (
        <FaTrash
          className="absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-500"
          onClick={() => onDelete(listing.id)}
        />
      )}
      {onEdit && (
        <MdEdit
          className="absolute bottom-2 right-10 h-4 cursor-pointer"
          onClick={() => onEdit(listing.id)}
        />
      )}
    </li>
  );
}
