import React, { useEffect, useState } from "react";
import Search from "../components/subcomponents/Search";
import rent from "../assets/svg/rent.webp";
import article from "../assets/svg/article2.jpg";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import ListingItem from "../components/ListingItem";
import SpecialListing from "../components/SpecialListing";
import { Link } from "react-router-dom";


export default function Rent() {
  // For fetching one rent listing
  const [singleRenting, setSingleRenting] = useState(null);
  useEffect(() => {
    async function fetchingRent() {
      try {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          orderBy("timeStamp", "desc"),
          where("type", "==", "rent"),
          limit(1)
        );
        const querySnap = await getDocs(q);
        const listing = [];
        querySnap.forEach((doc) => {
          return listing.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setSingleRenting(listing);
      } catch (error) {
        console.log("Error in fetching single listings");
      }
    }
    fetchingRent();
  }, []);

  // For fetching newest rent listing
  const [newestRenting, setNewestRenting] = useState(null);

  useEffect(() => {
    async function fetchingRent() {
      try {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          orderBy("timeStamp", "desc"),
          where("type", "==", "rent"),
          limit(4)
        );
        const querySnap = await getDocs(q);
        const listing = [];
        querySnap.forEach((doc) => {
          return listing.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setNewestRenting(listing);
      } catch (error) {
        console.log("Error in fetching newest rent listings");
      }
    }
    fetchingRent();
  }, []);

  // For fetching free parking rent listing
  const [parkingRentListings, setParkingRentListings] = useState(null);
  useEffect(() => {
    async function fetchingRent() {
      try {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          where("type", "==", "rent"),
          where("parking", "==", true),
          orderBy("timeStamp", "desc"),

          limit(4)
        );
        const querySnap = await getDocs(q);
        const listing = [];
        querySnap.forEach((doc) => {
          return listing.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setParkingRentListings(listing);
      } catch (error) {
        console.log("Error in fetching parking rent listings", error);
      }
    }
    fetchingRent();
  }, []);

  // For fetching free pool and furnished rent listing
  const [poolRentListings, setPoolRentListings] = useState(null);
  useEffect(() => {
    async function fetchingRent() {
      try {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          where("type", "==", "rent"),
          where("furnished", "==", true),
          orderBy("timeStamp", "desc"),

          limit(4)
        );
        const querySnap = await getDocs(q);
        const listing = [];
        querySnap.forEach((doc) => {
          return listing.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setPoolRentListings(listing);
      } catch (error) {
        console.log("Error in fetching parking rent listings", error);
      }
    }
    fetchingRent();
  }, []);

  // For fetching free pool and furnished rent listing
  const [specialRentListings, setSpecialRentListings] = useState(null);
  useEffect(() => {
    async function fetchingRent() {
      try {
        const listingRef = collection(db, "listings");
       const q = query(
         listingRef,
         where("type", "==", "rent"),
         where("furnished", "==", true),
         where("parking", "==", true),
         where("offer", "==", true),
         orderBy("timeStamp", "desc"),
         limit(4)
       );

        const querySnap = await getDocs(q);
        const listing = [];
        querySnap.forEach((doc) => {
          return listing.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setSpecialRentListings(listing);
        console.log('special ',listing);
      } catch (error) {
        console.log("Error in fetching special rent listings", error);
      }
    }
    fetchingRent();
  }, []);

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
      <div className="max-w-7xl border border-gray-100  px-5 py-5 flex mx-7 rounded-md relative items-center my-7 shadow-md hover:shadow-lg">
        <h1>
          {" "}
          <img
            src="https://static.media-assets.rdc.moveaws.com/ConsumerMedia/landlord-tools/assets/images/svg/common/avail-logo-small.svg"
            alt="icon"
            className="absolute top-5 left-2 text-3xl mr-3"
          />
          <span className="ml-4">
            Want to list your rental for free in minutes?
          </span>{" "}
          <span className="font-medium underline text-base hover:text-gray-400 hover:border-gray-400 cursor-pointer">
            Learn about landlord tools by Avail
          </span>{" "}
        </h1>
      </div>
      {/* SECTION 3 */}
      <div className="mb-6 max-w-7xl mx-5">
        <h1 className="ml-3 font-bold text-2xl mb-3">
          Recently viewed rentals
        </h1>
        <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {singleRenting &&
            singleRenting.map((listing) => (
              <ListingItem
                key={listing.id}
                listing={listing.data}
                id={listing.id}
              />
            ))}
        </ul>
      </div>

      {/* SECTION 4 */}
      <div className="mb-6 max-w-7xl mx-5">
        <h1 className="ml-3 font-bold text-2xl mb-3">Newest listings</h1>
        <Link to="/category/sale">
          <p className="ml-3 underline">View all the newest rent listings</p>
        </Link>
        <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {newestRenting &&
            newestRenting.map((listing) => (
              <ListingItem
                key={listing.id}
                listing={listing.data}
                id={listing.id}
              />
            ))}
        </ul>
      </div>

      {/* SECTION 5 */}
      <div className="max-w-7xl border border-gray-100 px-5 py-5 flex mx-7 rounded-md relative items-center my-7 shadow-md hover:shadow-lg">
        <h1>
          {" "}
          <img
            src="https://static.media-assets.rdc.moveaws.com/ConsumerMedia/apartments-near-me/assets/images/spot-apartment.png"
            alt="icon"
            className="absolute top-4 left-2 text-3xl mr-3 w-7"
          />
          <span className="ml-6">
            Looking for apartments for rent in your area?
          </span>{" "}
          <span className="font-medium underline text-base hover:text-gray-400 hover:border-gray-400 cursor-pointer">
            Find apartment near you
          </span>{" "}
        </h1>
      </div>

      {/* SECTION 6 */}
      <div className="mb-6 max-w-7xl mx-5">
        <h1 className="ml-3 font-bold text-4xl mb-6">Explore Special Rent</h1>
        <h1 className="ml-3 font-semibold text-2xl mb-3">
          Rentals with rents special
        </h1>
        <Link to="/category/sale">
          <p className="ml-3 underline">View all the rents special</p>
        </Link>
        <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {specialRentListings &&
            specialRentListings.map((listing) => (
              <SpecialListing
                key={listing.id}
                listing={listing.data}
                id={listing.id}
              />
            ))}
        </ul>
      </div>

      {/* SECTION 7 */}
      <div className="mb-6 max-w-7xl mx-5">
        <h1 className="ml-3 font-bold text-2xl mb-3">
          Rentals with free parking spots
        </h1>
        <Link to="/category/sale">
          <p className="ml-3 underline">View all the rent listings</p>
        </Link>
        <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {parkingRentListings &&
            parkingRentListings.map((listing) => (
              <ListingItem
                key={listing.id}
                listing={listing.data}
                id={listing.id}
              />
            ))}
        </ul>
      </div>

      {/* SECTION 8 */}
      <div className="mb-6 max-w-7xl mx-5">
        <h1 className="ml-3 font-bold text-2xl mb-3">Rentals with pools</h1>
        <Link to="/category/sale">
          <p className="ml-3 underline">View all the rent listings</p>
        </Link>
        <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {poolRentListings &&
            poolRentListings.map((listing) => (
              <ListingItem
                key={listing.id}
                listing={listing.data}
                id={listing.id}
              />
            ))}
        </ul>
      </div>
      {/* SECTION 9 */}
      <div className="relative mb-8 mt-6">
        <img
          src={article}
          alt="sell"
          className="h-[500px] w-full bg-no-repeat bg-cover "
        />
        <div className="absolute z-40 top-28 left-[34%] flex justify-center flex-col max-w-lg items-center mx-auto">
          <div className="text-center text-white flex flex-col justify-center items-center">
            <h1 className="font-bold text-2xl mb-5">
              Your First Apartment Checklist: Find and Move Into Your Dream
              Apartment
            </h1>
          </div>
          <div className="mt-4">
            <p>
              <Link
                to="https://www.realtor.com/advice/rent/your-first-apartment-checklist-find-and-move-into-your-dream-apartment/"
                target="_blank"
                className="border border-white bg-gray-800 px-6 py-2.5 rounded-3xl hover:underline text-white font-medium hover:bg-transparent"
              >
                Read Article
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
