import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper/modules";
import SwiperCore from "swiper/core";
import "swiper/css/bundle";
import {
  FaShare,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
} from "react-icons/fa";
import {getAuth} from 'firebase/auth';
import ContactLandlord from "../components/ContactLandlord";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function Listing() {
  // create a hook method for the contact landlord button
  const [isContactLandlord, setIsContactLandlord] = useState(false)
  const auth = getAuth()
  const [shareLinkCopy, setShareLinkCopy] = useState(false);
  const [isListing, setIsListing] = useState(null);
  const [loading, setLoading] = useState(true);

  // use useParams to fetch the listingID
  const params = useParams();
  // create a method for swiper
  SwiperCore.use([Autoplay, Navigation, Pagination]);
  // create a useEffect function to fetch category of offer base on URL
  useEffect(() => {
    async function fetchListing() {
      // create a reference
      const docRef = doc(db, "listings", params.listingId);
      // method to get the data
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setIsListing(docSnap.data());
        setLoading(false);
      }
    }

    fetchListing();
  }, [params.listingId]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}
      >
        {isListing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full overflow-hidden h-[320px]">
              <img
                src={url}
                alt="index"
                className="w-full object-cover bg-no-repeat bg-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="fixed top-[13%] right-[3%] z-20 bg-white rounded-full w-12 h-12 flex justify-center items-center cursor-pointer">
        <FaShare
          className="text-lg text-slate-500"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setShareLinkCopy(true);
            setTimeout(() => {
              setShareLinkCopy(false);
            }, 2000);
          }}
        />
      </div>
      {shareLinkCopy && (
        <p className="fixed top-[22%] right-[2%] z-40 text-[14px] bg-white text-slate-500 px-1 py-1 rounded-md p-2 border-2 border-gray-400">
          Link copied
        </p>
      )}
      <div className="flex m-4 flex-col md:flex-row lg:mx-auto max-w-6xl justify-center p-4 rounded-lg border-3 shadow-lg bg-white lg:space-x-6">
        <div className=" w-full">
          <p className="text-2xl font-bold mb-3 text-blue-900">
            {isListing.name} - ${" "}
            {isListing.offer
              ? isListing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : isListing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            {isListing.type === "rent" ? "/ month" : ""}
          </p>
          <p className="flex items-center mt-6 mb-3 font-semibold">
            <FaMapMarkerAlt className="text-green-700 mr-1 " />{" "}
            {isListing.address}
          </p>
          <div className="flex justify-start items-center space-x-4 w-[75%]">
            <p className="bg-red-800 w-full max-w-[200px] rounded-md p-1 text-center text-white font-semibold shadow-md">
              {isListing.type === "rent" ? "Rent" : "Sale"}
            </p>
            {isListing.offer && (
              <p className="w-full max-w-[200px] bg-green-800 rounded-md p-1 text-white text-center font-semibold shadow-md">
                ${+isListing.regularPrice - +isListing.discountedPrice} discount
              </p>
            )}
          </div>
          <p className="my-3  ">
            <span className="font-semibold">Description</span>{" "}
            {isListing.description}
          </p>
          <ul className="flex items-center space-x-3 sm:space-x-8 font-semibold text-sm mb-6">
            <li className="flex whitespace-nowrap items-center">
              <FaBed className="mr-1 text-lg" />{" "}
              {+isListing.bedrooms > 1 ? `${isListing.bedrooms} Beds` : "1 Bed"}
            </li>
            <li className="flex whitespace-nowrap items-center">
              <FaBath className="mr-1 text-lg" />
              {isListing.bathrooms > 1
                ? `${isListing.bathrooms} Bath`
                : "1 Bath"}
            </li>
            <li className="flex whitespace-nowrap items-center">
              <FaParking className="mr-1 text-lg" />
              {isListing.parking ? "Parking spot" : "No parking"}
            </li>
            <li className="flex whitespace-nowrap items-center">
              <FaChair className="mr-1 text-lg" />
              {isListing.furnished ? "Furnished" : "Not Furnished"}
            </li>
          </ul>
          {/* create a condition that only visitor could contact the landlord and create another condition if the button is clicked it should be disappeared */}
          {isListing.userRef !== auth.currentUser?.uid &&
            !isContactLandlord && (
              <div className="mt-6 ">
                <button
                  onClick={() => setIsContactLandlord(true)}
                  className="px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full transition duration-200 ease-in-out"
                >
                  Contact Landlord
                </button>
              </div>
            )}
          {isContactLandlord && (
            <ContactLandlord
              userRef={isListing.userRef}
              isListing={isListing}
            />
          )}
        </div>
        <div className="w-full h-[200px] md:h-[400px] overflow-x-hidden z-10 mt-5 md:mt-0 md:ml-2 ">
          <MapContainer
            // center={[isListing.geolocation.lat, isListing.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
            style={{height: '100%', width: '100%'}}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              // position={[isListing.geolocation.lat, isListing.geolocation.lng]}
            >
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </main>
  );
}
