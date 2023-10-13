import { getAuth, updateProfile } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {  toast,  } from "react-toastify";
import { db } from "../firebase";
import { FcHome } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";


export default function Profile() {
  const navigate = useNavigate();
  const auth = getAuth();
  // create a hook to fetch the data from the listings function and set loading
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)

  // create a hook for changing profile details
  const [changeProfile, setChangeProfile] = useState(false);
  const [isFormData, setIsFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = isFormData;
  // create function for signing out from the profile
  function onLogOut() {
    auth.signOut();
    // create a method to navigate back to the Home page after signed out
    navigate("/");
  }
  // create a function to allow the input field to be edited

  function onChange(e) {
    setIsFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  // create function if the change is true then submit the form

  async function onSubmit() {
    try {
      // create a method to check if the name is changing or not
      if (auth.currentUser.displayName !== name) {
        // create a method to update the display name

        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        // create a method to update the name in the firestore by crating a reference
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, { name });

        toast.success("Profile details updated");
      }
    } catch (error) {
      toast.error(`Could not update your profile ${error.message}`);
      
    }
  }

  // CREATE USEEFFECT HOOK METHOD IN FETCHING THE DATA (UPLOADED DATA FOR SELL OR RENT)
  useEffect(() => {
   
    // create async function to fetch userListing data from google firebase
    async function fetchUserListings() {
      // create a reference (its like a address)

     const listingRef = collection(db, "listings");
     /* create variable query to get the user that created listing in their profile using userRef(unique id) 
      and sort it by using firebase methods ORDER BY and make it descending (desc)
      */
     const q = query(
       listingRef,
       where("userRef", "==", auth.currentUser.uid),
     );
     // create a method to get the document using snapshot
     const querySnap = await getDocs(q);
     // create empty listings variable to loop through the querySnap using forEach method and add the date to the listings variable
     let listings = [];
     querySnap.forEach((doc) => {
       // push each document inside arrays, and get the id, data coming from doc id, doc data
       return listings.push({
         i: doc.id,
         data: doc.data(),
       });
     });
     setListings(listings);
     setLoading(false);
     toast.success('Listing successfully added')

    }

    // call async function
    fetchUserListings();
  
  }, [auth.currentUser.uid]);
 

  return (
    <>
      <section className="flex items-center justify-center flex-col mx-auto max-w-6xl px-4">
        <h1 className="text-3xl font-semibold text-center mt-5"> My Profile</h1>
        <div className="w-full md:w-[50%] mt-5">
          <form>
            <input
              onChange={onChange}
              disabled={!changeProfile}
              type="text"
              className={`mb-5 w-full px-4 py-2 text-lg text-gray-600 border border-gray-400 rounded transition ease-in-out ${
                changeProfile && "bg-red-200 focus:bg-red-300"
              }`}
              value={name}
              id="name"
            />
            <input
              onChange={onChange}
              type="email"
              className="mb-5 w-full px-4 py-2 text-lg text-gray-600 border border-gray-400 rounded transition ease-in-ou"
              value={email}
              id="email"
            />

            <div className="mb-6 flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="flex items-center">
                Do you want to change your name?{" "}
                <span
                  /* create func to change and update profile */ onClick={() => {
                    changeProfile && onSubmit();
                    setChangeProfile((prevState) => !prevState);
                  }}
                  className="text-red-500 ml-1 hover:text-red-700 transition duration-200 ease-in-out cursor-pointer"
                >
                  {/* Create a dynamic method=> if the change is true it should show Apply change otherwise Edit */}{" "}
                  {changeProfile ? "Apply change" : "Edit"}
                </span>
              </p>
              <p
                onClick={onLogOut}
                className="text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out cursor-pointer"
              >
                Sign out
              </p>
            </div>
          </form>
          <button
            type="submit"
            className="w-full px-2 py-3 rounded bg-blue-600 text-white font-medium uppercase shadow-md hover:bg-blue-700 transition duration-150 ease-out focus:bg-blue-800 focus:shadow-lg"
          >
            {" "}
            <Link
              to="/create-listing"
              className="flex justify-center items-center"
            >
              {" "}
              <FcHome className="mr-2 text-3xl rounded-full px-1 bg-red-200 border-2" />{" "}
              Sell or rent your home
            </Link>{" "}
          </button>
        </div>
      </section>
      <div className="max-w-6xl mt-6 px-4 mx-auto">
        {/* The loading is true, but 
        create a condition if the loading is false because when it true it fetch the data */}

        
          <>
            <h2 className="text-lg text-center font-medium">My Listing</h2>
            <ul>
            {listings && listings.map((listing) => (
    <ListingItem
        key={listing.id}
        id={listing.id}
        listing={listing.data}
    />
))}
            </ul>
          </>
      
      </div>
    </>
  );
}
