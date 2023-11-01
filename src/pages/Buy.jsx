import React, { useEffect, useState } from "react";
import buy from "../assets/svg/buy.webp";
import Search from "../components/subcomponents/Search";
import { Link } from "react-router-dom";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { orderBy } from "lodash";
import ListingItem from "../components/ListingItem";
import SpecialListing from "../components/SpecialListing";
import article from "../assets/svg/article.jpg";
import cube1 from "../assets/svg/cube1.jpg";
// import cube2 from "../assets/svg/cube2.avif";

export default function Buy() {
  // Sell Listing Home around $1,499,000
  const [expensiveSellListing, setExpensiveSellListing] = useState(null);
  useEffect(() => {
    async function fetchingSellListing() {
      try {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          orderBy("timeStamp", "desc"),
          where("type", "==", "sale"),
          where("regularPrice", ">", "4000"),
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
        setExpensiveSellListing(listing);
      } catch (error) {
        console.log("expensive sell ===>", error);
      }
    }
    fetchingSellListing();
  }, []);

  // for all newest buy listings
  const [newestBuyListing, setNewestBuyListing] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          orderBy("timeStamp", "desc"),
          where("type", "==", "sale"),
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
        setNewestBuyListing(listing);
      } catch (error) {
        console.log("newest Buy Listing Error: ", error);
      }
    }
    fetchListings();
  }, []);

  // for all secial buy listings
  const [specialBuyListings, setSpecialBuyListings] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,

          orderBy("timeStamp", "desc"),
          where("type", "==", "sale"),
          where("regularPrice", "<", "5000"),
          limit(4)
        );

        console.log("before getDoc");
        const querySnap = await getDocs(q);
        console.log("After getDoc");
        const listing = [];
        querySnap.forEach((doc) => {
          return listing.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setSpecialBuyListings(listing);
        console.log(listing);
      } catch (error) {}
    }
    fetchListings();
  }, []);

  return (
    <>
      {/* SECTION 1 */}
      <div className="relative">
        <img
          src={buy}
          alt="sell"
          className="h-[500px] w-full bg-no-repeat bg-cover "
        />
        <div className="absolute z-40 top-28 left-[20%] flex justify-center flex-col max-w-3xl items-center mx-auto">
          <div className="text-center text-white flex flex-col justify-center items-center">
            <h1 className="font-bold text-6xl mb-5">
              The #1 site real estate professionals trust*
            </h1>
          </div>
          <Search />
        </div>
      </div>

      {/* SECTION 2 */}
      <div className="max-w-7xl mx-auto px-6 mt-6 mb-6">
        <h1 className="font-bold text-2xl">Homes around $1,499,000 </h1>
        <p className="underline">
          <Link>View all in Kihei, HI</Link>
        </p>
        <div>
          <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {expensiveSellListing &&
              expensiveSellListing.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
          </ul>
        </div>
      </div>

      {/* SECTION 3 */}
      <div className="max-w-7xl mx-auto px-6 mt-6 mb-6">
        <h1 className="font-bold text-2xl">Newest listings </h1>
        <p className="underline">
          <Link>View all in Kihei, HI</Link>
        </p>
        <div>
          <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {newestBuyListing &&
              newestBuyListing.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
          </ul>
        </div>
      </div>

      {/* SECTION 4 */}
      <div className="relative mb-8 mt-6">
        <img
          src={article}
          alt="sell"
          className="h-[500px] w-full bg-no-repeat bg-cover "
        />
        <div className="absolute z-40 top-28 left-[25%] flex justify-center flex-col max-w-2xl items-center mx-auto">
          <div className="text-center text-white flex flex-col justify-center items-center">
            <h1 className="font-light text-2xl mb-8">Trends</h1>
            <h1 className="font-bold text-2xl mb-5">
              Welcome to Salem, MA: The Scariest Thing About ‘Witch City’ Might
              Be Its Real Estate
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

      {/* SECTION 5 */}
      <div className="max-w-7xl mx-auto px-6 mt-6 mb-6">
        <h1 className="font-bold text-2xl">Special Buy Listing</h1>
        <p className="underline">
          <Link>View all in Kihei, HI</Link>
        </p>
        <div>
          <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {specialBuyListings &&
              specialBuyListings.map((listing) => (
                <SpecialListing
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
          </ul>
        </div>
      </div>

      {/* SECTION 6 */}

      <div className="flex flex-col">
        <div className="flex ">
          <div className="w-[50%]">
            <img src={cube1} alt="" className="w-full" />
          </div>
          <div className="w-[50%] shadow-lg border-t border-slate-100 px-8 py-20">
            <h1>Need a home loan? Get pre-approved</h1>
            <h1>
              Find a lender who can offer competitive mortgage rates and help
              you with pre- approval.
            </h1>
            <span>
              <Link>Get pre-approved now</Link>
            </span>
            <p>Advertising disclosure</p>
          </div>
        </div>
        <div className="flex">
          <div className="w-[50%] shadow-lg border-b border-slate-100 px-8 py-20">
            <h1>Get Local Info Does</h1>
            <p>
              it have pet-friendly rentals? How are the schools? Get important
              local information on the area you're most interested in.
            </p>
          </div>
          <div className="w-[50%]">
            <img src={cube1} alt="index" className="w-full" />
          </div>
        </div>
      </div>
    </>
  );
}
