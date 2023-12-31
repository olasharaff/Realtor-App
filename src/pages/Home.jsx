import React, { Suspense, lazy, useEffect, useState } from 'react';
import Slider from '../components/Slider';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { orderBy } from 'lodash';
import { Link } from 'react-router-dom';

import Discover from '../components/Discover';
import Spinner from '../components/Spinner';
const ListingItem = lazy(() => import("../components/ListingItem"));


export default function Home() {
  // FOR GETTING THE LISTINGS FOR THE OFFER LISTINGS

  const [isOfferListing, setIsOfferListing] = useState(null);
  useEffect(() => {
    async function fetchOfferListings() {
      try {
        // get reference
        const listingRef = collection(db, "listings");
        // create query
        const q = query(
          listingRef,
          orderBy("timeStamp", "desc"),
          where("offer", "==", true),
          limit(4)
        );
        // execute query
        const querySnap = await getDocs(q);
        const listings = [];

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setIsOfferListing(listings);
      
      } catch (error) {
        console.log("there is something wrong with the request", error);
      }
    }
    fetchOfferListings();
  }, []);

  // FOR GETTING THE LISTINGS FOR THE RENT LISTINGS

  const [isRentListings, setIsRentListings] = useState(null);
  useEffect(() => {
    async function fetchRentListings() {
      try {
        // get reference
        const listingsRef = collection(db, "listings");
        // create the query
        const q = query(
          listingsRef,

          orderBy("timestamp", "desc"),
          where("type", "==", "rent"),
          limit(4)
        );
        // execute the query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setIsRentListings(listings);
       
      } catch (error) {
        console.log("renting error: " + error);
      }
    }
    fetchRentListings();
  }, []);

  // FOR GETTING THE LISTINGS FOR THE SALE LISTINGS

  const [isSaleListings, setIsSaleListings] = useState(null);
  useEffect(() => {
    async function fetchSaleListings() {
      try {
        // get reference
        const listingsRef = collection(db, "listings");
        // create the query
        const q = query(
          listingsRef,

          orderBy("timestamp", "desc"),
          where("type", "==", "sale"),
          limit(4)
        );
        // execute the query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setIsSaleListings(listings);
       
      } catch (error) {
        console.log("renting error: " + error);
      }
    }
    fetchSaleListings();
  }, []);

  return (
    <>
      <Slider />
      <div className="max-w-6xl mx-auto px-2 space-y-6">
        {/* create a condition to check if the isOfferListing exist and greater than 0 */}
        <Suspense fallback={<Spinner/>}>
          {isOfferListing && isOfferListing.length > 0 && (
            <div className="m-2 mb-6">
              <h1 className="px-3 text-2xl mt-6 font-bold">Recent Offers</h1>
              <Link to="/offer">
                <p className="px-3 text-sm text-gray-700 font-[450] hover:text-gray-800 transition duration-150 ease-in-out cursor-pointer">
                  Show more offer...
                </p>
              </Link>
              <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                {isOfferListing.map((listing) => (
                  <ListingItem
                    key={listing.id}
                    listing={listing.data}
                    id={listing.id}
                    className="cursor-pointer"
                  />
                ))}
              </ul>
            </div>
          )}
        </Suspense>
        {/* create a condition to check if the isRentListings exist and greater than 0 */}
        {isRentListings && isRentListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-bold">Places for rent</h2>
            <Link to="/category/rent">
              <p className="px-3 text-sm text-gray-600 font-[450] hover:text-gray-800 transition duration-150 ease-in-out cursor-pointer">
                Show more places for rent...
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
              {isRentListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
        {/* create a condition to check if the isSaleListings exist and greater than 0 */}
        {isSaleListings && isSaleListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-bold">Places for sale</h2>
            <Link to="/category/sale">
              <p className="px-3 text-sm font-[450] text-gray-600 hover:text-gray-800 transition duration-150 ease-in-out cursor-pointer">
                Show more places for sale...
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
              {isSaleListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
      <Discover />
    </>
  );
}
