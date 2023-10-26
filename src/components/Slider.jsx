import React, { useEffect, useState } from 'react'
import {collection, getDocs, limit, orderBy, query} from 'firebase/firestore'
import { db } from "../firebase";
import Spinner from './Spinner';
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper/modules";
import SwiperCore from "swiper/core";
import "swiper/css/bundle";
import { useNavigate } from 'react-router';

export default function Slider() {
    const [isListing, setIsListing] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
 SwiperCore.use([Autoplay, Navigation, Pagination]);
    useEffect(() =>{
        async function getListing(){
            const listingRef = collection(db, 'listings');
            const q = query(listingRef, orderBy('timeStamp', 'desc'), limit(5));
            const querySnap = await getDocs(q)
            let listings = []
            querySnap.forEach((doc) =>{
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            setIsListing(listings)
            console.log(listings)
            setIsLoading(false)
        }
        getListing()
    }, [])

    if(isLoading){
        return <Spinner/>
    }
    if (isListing.length === 0){
       return <></>
    }

  return (
    isListing && (
      <>
        <Swiper
          slidesPerView={1}
          navigation
          pagination={{ type: "progressbar" }}
          effect="fade"
          modules={[EffectFade]}
          autoplay={{ delay: 3000 }}
        >
          {isListing.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div className="relative w-full overflow-hidden h-[320px]">
                <img
                  src={data.imgUrls[0]}
                  alt="index"
                  className="w-full object-cover bg-no-repeat bg-cover"
                />
              </div>
              <p className="text-[#f4f8f3] absolute left-1 top-3 font-medium max-w-[90%] bg-[#457b9d] px-3 py-2 rounded-br-3xl shadow-lg opacity-90">
                {data.name}
              </p>
              <p className="text-[#f4f8f3] absolute left-1 bottom-3 font-medium max-w-[90%] bg-[#e63946] px-3 py-2 rounded-tr-3xl shadow-lg opacity-100">
                ${data.discountedPrice  ?? data.regularPrice} {data.type === 'rent' && '/ months'}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
}
