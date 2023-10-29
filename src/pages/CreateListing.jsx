import React, { useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";
// import getStorage from firebase/storage
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
// import uuid for generating unique credentials or number & letter
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router";

export default function CreateListing() {
  const navigate = useNavigate();
  const auth = getAuth();
  // create a hook for geolocation of the address
  const [geoLocationEnabled] = useState(false);
  // create a hook for loading the page after submission of the form
  const [isLoading, setIsLoading] = useState(false);
  // create a hook to define type of data
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: false,
    regularPrice: "0",
    discountedPrice: "0",
    latitude: 0,
    longitude: 0,
    images: {},
  });
  // destruction the data so it can be use in the form
  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    description,
    offer,
    regularPrice,
    discountedPrice,
    latitude,
    longitude,
    images,
  } = formData;

  // create a function for handling change events btw sell or Rent
  function onChangeSEllRent(e) {
    // create a variable called boolean and to be null based on the value we checked if our input is true or false and change a function in form data
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    // for file upload
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
      //  if it is not image, then text/boolean/number
    }
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  }
  // create a function for submitting the form
  async function onSubmitSellRent(e) {
    e.preventDefault();
    setIsLoading(true);
    /* create a condition for discounted price to be less than regular
    adding + sign to convert a string to a number
    */
    if (+discountedPrice >= +regularPrice) {
      setIsLoading(false);
      toast.error("Discounted price need to be less than regular price");
      return;
    }
    // create a condition for image uploading to be less six file
    if (images.length > 6) {
      setIsLoading(false);
      toast.error("Maximum of 6 files");
      return;
    }
    // Create a method for getting GeoLocation
    // let geolocation = {};
    // let location;
    // create a condition if it's true then fetch the location api from console google cloud
    // if (geoLocationEnabled) {
    //   const response = await fetch(
    //     `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`
    //   );
    // const data = await response.json();
    // console.log(data);
    // geolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
    // geolocation.lng = data.results[0]?.geometry.location.lng ?? 0;

    // create a condition variable for the location to check if the location is correct
    //   location = data.status === "ZERO_RESULTS" && undefined;
    //   if (location === undefined || location.includes("undefined")) {
    //     setIsLoading(false);
    //     toast.error("Please provide current address");
    //     return;
    //   }
    // } else {
    //   geolocation.lat = latitude;
    //   geolocation.lng = longitude;
    // }
    /* Step 2 create function for uploading the image to storeImage using promise method 
    resolve====> successfully
    rejected====> if the file rejected
    */
    async function storeImage(image) {
      try {
        const downloadURL = new Promise((resolve, reject) => {
          /* create a variable for storage, filename, storage Reference
        using uuid packakge to generate a unique number for each image incase same image was uploaded twice
         */
          const storage = getStorage();
          const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
          const storageRef = ref(storage, filename);
          // using the image name from the function storeImage(image)
          const uploadTask = uploadBytesResumable(storageRef, image);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
                default:
                  console.log("Unexpected upload state:", snapshot.state);
                  break;
              }
            },
            (error) => {
              // Handle unsuccessful uploads
              console.error("Error uploading image:", error);
              reject(error);
            },
            () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                //  console.log("Download URL:", url);
                resolve(url);
              });
            }
          );
        });
        return downloadURL;
      } catch (error) {
        console.error("Error storing image:", error);
        throw error;
      }

      // create copy of the FormData to be sent to the server
    }
    /* Step 1 create a method to store the image/file uploaded in the storage
   using await promise.all() to look through all the image and put them/store inside storeImage
   */
    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      setIsLoading(false);
      toast.error("Images not uploaded");
      return [];
    });
    // console.log("Image URLs:", imgUrls);

    const copyFormData = {
      ...formData,
      imgUrls,
      timeStamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
      // geolocation,
    };
    delete copyFormData.images;
    !copyFormData.offer && delete copyFormData.discountedPrice;
    // delete latitude;
    // delete longitude;
    // create a method from firebase to sent the copy to fire database
    const docRef = await addDoc(collection(db, "listings"), copyFormData);
    setIsLoading(false);
    toast.success("Listing created successfully");
    navigate(`/category/${copyFormData.type}/${docRef.id}`);
  }

  // create a condition for loading the page
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <main className="max-w-md mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-4">Create a Listing</h1>
      <form onSubmit={onSubmitSellRent}>
        <p className="text-lg mt-3 font-medium">Sell / Rent</p>
        <div className="flex">
          <button
            onClick={onChangeSEllRent}
            type="button"
            id="type"
            value="sale"
            className={`mr-3 px-6 py-2 text-sm font-medium uppercase rounded w-full shadow-md hover:shadow-lg active:shadow-lg focus:shadow-lg transition duration-200 ease-in-out ${
              type === "rent"
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
          >
            Sell
          </button>
          <button
            onClick={onChangeSEllRent}
            type="button"
            id="type"
            value="rent"
            className={`ml-3 px-6 py-2 text-sm font-medium uppercase rounded w-full shadow-md hover:shadow-lg active:shadow-lg focus:shadow-lg transition duration-200 ease-in-out ${
              type === "sale"
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
          >
            Rent
          </button>
        </div>
        <p className="text-lg font-medium mt-6">Name</p>
        <input
          onChange={onChangeSEllRent}
          type="text"
          id="name"
          value={name}
          placeholder="Name"
          maxLength={32}
          minLength={10}
          required
          className="w-full rounded px-3 py-2 text-lg text-gray-700 bg-white border-gray-300 transition duration-150 ease-in-out focus:text-gray-700 focus:border-slate-600 mb-5"
        />

        <div className="flex space-x-5 mb-6">
          <div>
            <p className="text-lg font-medium">Beds</p>
            <input
              onChange={onChangeSEllRent}
              type="number"
              id="bedrooms"
              value={bedrooms}
              min={1}
              max={50}
              required
              className="w-full px-4 py-2 text-lg text-gray-700 rounded transition duration-150 ease-in-out bg-white border-gray-300 focus:border-slate-600 focus:text-gray-700 "
            />
          </div>
          <div>
            <p className="text-lg font-medium">Baths</p>
            <input
              onChange={onChangeSEllRent}
              type="number"
              id="bathrooms"
              value={bathrooms}
              min={1}
              max={50}
              required
              className="w-full px-4 py-2 text-lg text-gray-700 rounded transition duration-150 ease-in-out bg-white border-gray-300 focus:border-slate-600 focus:text-gray-700 "
            />
          </div>
        </div>
        <p className="text-lg mt-3 font-medium">Parking Spot</p>
        <div className="flex mb-5">
          <button
            onClick={onChangeSEllRent}
            type="button"
            id="parking"
            value={true}
            className={`mr-3 px-6 py-2 text-sm font-medium uppercase rounded w-full shadow-md hover:shadow-lg active:shadow-lg focus:shadow-lg transition duration-200 ease-in-out ${
              !parking ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            Yes
          </button>
          <button
            onClick={onChangeSEllRent}
            type="button"
            id="parking"
            value={false}
            className={`ml-3 px-6 py-2 text-sm font-medium uppercase rounded w-full shadow-md hover:shadow-lg active:shadow-lg focus:shadow-lg transition duration-200 ease-in-out ${
              parking ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            No
          </button>
        </div>
        <p className="text-lg mt-3 font-medium">Furnished</p>
        <div className="flex">
          <button
            onClick={onChangeSEllRent}
            type="button"
            id="furnished"
            value={true}
            className={`mr-3 px-6 py-2 text-sm font-medium uppercase rounded w-full shadow-md hover:shadow-lg active:shadow-lg focus:shadow-lg transition duration-200 ease-in-out ${
              !furnished ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            Yes
          </button>
          <button
            onClick={onChangeSEllRent}
            type="button"
            id="furnished"
            value={false}
            className={`ml-3 px-6 py-2 text-sm font-medium uppercase rounded w-full shadow-md hover:shadow-lg active:shadow-lg focus:shadow-lg transition duration-200 ease-in-out ${
              furnished ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            No
          </button>
        </div>
        <p className="text-lg font-medium mt-6">Address</p>
        <textarea
          onChange={onChangeSEllRent}
          type="text"
          id="address"
          value={address}
          placeholder="Address"
          required
          className="w-full rounded px-3 py-2 text-lg text-gray-700 bg-white border-gray-300 transition duration-150 ease-in-out focus:text-gray-700 focus:border-slate-600 mb-5"
        />
        {!geoLocationEnabled && (
          <div className="flex space-x-6 mb-6">
            <div>
              <p className="text-lg font-medium">Latitude</p>
              <input
                type="number"
                onChange={onChangeSEllRent}
                id="latitude"
                value={latitude}
                required
                min="-90"
                max="90"
                className="w-full text-center text-lg px-7 py-2  text-gray-700 rounded transition duration-150 ease-in-out bg-white border-gray-300 focus:border-slate-600 focus:text-gray-700"
              />
            </div>
            <div>
              <p className="text-lg font-medium">Longitude</p>
              <input
                type="number"
                onChange={onChangeSEllRent}
                id="longitude"
                value={longitude}
                required
                min="-180"
                max="180"
                className="w-full text-center text-lg px-7 py-2  text-gray-700 rounded transition duration-150 ease-in-out bg-white border-gray-300 focus:border-slate-600 focus:text-gray-700"
              />
            </div>
          </div>
        )}
        <p className="text-lg font-medium">Description</p>
        <textarea
          onChange={onChangeSEllRent}
          type="text"
          id="description"
          value={description}
          placeholder="Description"
          required
          className="w-full rounded px-3 py-2 text-lg text-gray-700 bg-white border-gray-300 transition duration-150 ease-in-out focus:text-gray-700 focus:border-slate-600 mb-5"
        />
        <p className="text-lg font-medium">Offer</p>
        <div className="flex mb-6">
          <button
            onClick={onChangeSEllRent}
            type="button"
            id="offer"
            value={true}
            className={`mr-3 px-6 py-2 text-sm font-medium uppercase rounded w-full shadow-md hover:shadow-lg active:shadow-lg focus:shadow-lg transition duration-200 ease-in-out ${
              !offer ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            Yes
          </button>
          <button
            onClick={onChangeSEllRent}
            type="button"
            id="offer"
            value={false}
            className={`ml-3 px-6 py-2 text-sm font-medium uppercase rounded w-full shadow-md hover:shadow-lg active:shadow-lg focus:shadow-lg transition duration-200 ease-in-out ${
              offer ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            No
          </button>
        </div>
        <div className="flex items-center mb-6">
          <div>
            <p className="text-lg font-medium">Regular price</p>
            <div className="flex w-full justify-center items-center space-x-6">
              <input
                onChange={onChangeSEllRent}
                type="number"
                id="regularPrice"
                value={regularPrice}
                min={40}
                max={40000000}
                required
                className="w-full text-center text-lg px-4 py-2  text-gray-700 rounded transition duration-150 ease-in-out bg-white border-gray-300 focus:border-slate-600 focus:text-gray-700 "
              />
              {/* create a condition if the rent is true, it shown dollar */}
              {type === "rent" && (
                <div>
                  <p className="text-md text-gray-600 w-full whitespace-nowrap">
                    $ / Month
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* create a condition if the offer is true shown discount price */}
        {offer && (
          <div className="flex items-center mb-6">
            <div>
              <p className="text-lg font-medium">Discounted price</p>
              <div className="flex w-full justify-center items-center space-x-6">
                <input
                  onChange={onChangeSEllRent}
                  type="number"
                  id="discountedPrice"
                  value={discountedPrice}
                  min={40}
                  max={40000000}
                  required={offer}
                  className="w-full text-center text-lg px-4 py-2  text-gray-700 rounded transition duration-150 ease-in-out bg-white border-gray-300 focus:border-slate-600 focus:text-gray-700 "
                />
                {/* create a condition if the rent is true, it shown dollar */}
                {type === "rent" && (
                  <div>
                    <p className="text-md text-gray-600 w-full whitespace-nowrap">
                      $ / Month
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="mb-6">
          <p className="text-lg font-medium">Images</p>
          <p className="text-gray-600">
            The first image will be the cover (max 6)
          </p>
          <input
            type="file"
            onChange={onChangeSEllRent}
            accept=".jpg,.png,.jpeg"
            id="images"
            multiple
            required
            className="w-full px-3 py-1.5 text-gray-700 bg-white border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600"
          />
        </div>
        <button
          type="submit"
          className="w-full px-7 py-2 rounded bg-blue-600 text-white font-medium text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:bg-blue-700 active:shadow-lg active:bg-blue-800 transition duration ease-in-out"
        >
          Create Listing
        </button>
      </form>
    </main>
  );
}
