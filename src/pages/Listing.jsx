import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
 
} from "swiper/modules";
import  SwiperCore from "swiper/core";


import "swiper/css/bundle";
// import 'swiper/css'

export default function Listing() {
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
    </main>
  );
}
