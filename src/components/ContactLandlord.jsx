import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";

export default function ContactLandlord({ userRef, isListing }) {
  const [isLandlord, setIsLandlord] = useState(null);
  const [isMessage, setIsMessage] = useState("");

  useEffect(() => {
    async function getLandlord() {
      const docRef = doc(db, "users", userRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setIsLandlord(docSnap.data());
      } else {
        toast.error("could not get landlord data");
      }
    }

    getLandlord();
  }, [userRef]);

  function onChange(e) {
    setIsMessage(e.target.value);
  }
  return (
    <>
      {isLandlord !== null && (
        <div>
          <p className="mb-1">
            Contact {isLandlord.name} for the {isListing.name.toLowerCase()}
          </p>
          <div className="mt-2 mb-3">
            <textarea
              name="message"
              id="message"
              rows={2}
              value={isMessage}
              onChange={onChange}
              className="w-full text-gray-700 rounded-md border-gray-700 text-lg focus:border-slate-700 transition duration-150 ease-in-out focus:bg-white"
            ></textarea>
          </div>
          <a
            href={`mailto:${isLandlord.email}?Subject=${isListing.name}&body=${isMessage}`}
          >
            <button
              type="button"
              className="w-full text-center bg-blue-600 hover:shadow-lg hover:bg-blue-700 focus:shadow-lg rounded-md py-3 focus:bg-blue-700 text-white text-sm font-semibold uppercase active:shadow-2xl active:bg-blue-800 transition duration-150 ease-in-out"
            >
              Send Message
            </button>
          </a>
        </div>
      )}
    </>
  );
}
