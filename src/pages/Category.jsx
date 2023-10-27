import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";
import { useParams } from "react-router";

export default function Category() {
    const params = useParams()
  const [isListings, setIsListings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // create hook for fetching more offers listing
  const [isFetchMore, setIsFetchMore] = useState(null);
  useEffect(() => {
    async function fetchOfferListings() {
      try {
        // get reference
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          orderBy("timeStamp", "desc"),
          where("type", "==", params.categoryName),
          limit(2)
        );
        // execute query
        const querySnap = await getDocs(q);
        // create method for fetching more results
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setIsFetchMore(lastVisible);
        const listings = [];

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setIsListings(listings);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchOfferListings();
  }, [params.categoryName]);

  async function onMoreListing() {
    try {
      // get reference
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        orderBy("timeStamp", "desc"),
        where("offer", "==", params.categoryName),
        startAfter(isFetchMore),
        limit(4)
      );
      // execute query
      const querySnap = await getDocs(q);
      // create method for fetching more results
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setIsFetchMore(lastVisible);
      const listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setIsListings((prevState) => [...prevState, ...listings]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  if (isLoading) {
    return <Spinner />;
  } else {
    <p>
      There are no current{" "}
      {params.categoryName === "rent" ? " Places for rent" : " Places for sale"}
    </p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-3">
      <h1 className="text-3xl font-medium text-center mt-6 mb-3">
        {params.categoryName === 'rent' ? 'Places for rent' : 'Places for sale'}
      </h1>

      <>
        <main>
          <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {isListings.map((listing) => (
              <ListingItem
                key={listing.id}
                id={listing.id}
                listing={listing.data}
              />
            ))}
          </ul>
        </main>
        {isFetchMore && (
          <div className="flex justify-center items-center">
            <button
              onClick={onMoreListing}
              className="text-gray-700 bg-white px-3 py-1.5 border border-gray-700 my-6"
            >
              More me
            </button>
          </div>
        )}
      </>
    </div>
  );
}
