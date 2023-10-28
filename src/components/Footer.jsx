import React from 'react'
import * as Fa from 'react-icons/fa'
import logo1 from '../assets/svg/logo1.svg'
import logo2 from "../assets/svg/logo2.svg";
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-900">
        <div className="max-w-6xl mx-auto px-2 py-7 ">
          <div className="flex justify-between items-center mb-6 mt-6 flex-nowrap">
            <div className="flex space-x-4 items-center justify-center">
              <span className="bg-white py-3 px-3.5 rounded-full shadow-md cursor-pointer hover:bg-black hover:text-white transition duration-200 ease-in-out hover:shadow-lg sm:px-1.5 sm:py-1.5">
                <Fa.FaFacebook />
              </span>
              <span className="bg-white py-3 px-3.5 rounded-full shadow-md cursor-pointer hover:bg-black hover:text-white transition duration-200 ease-in-out hover:shadow-lg sm:px-1.5 sm:py-1.5">
                <Fa.FaTwitter />
              </span>
              <span className="bg-white py-3 px-3.5 rounded-full shadow-md cursor-pointer hover:bg-black hover:text-white transition duration-200 ease-in-out hover:shadow-lg sm:px-1.5 sm:py-1.5">
                <Fa.FaLinkedinIn />
              </span>
              <span className="bg-white py-3 px-3.5 rounded-full shadow-md cursor-pointer hover:bg-black hover:text-white transition duration-200 ease-in-out hover:shadow-lg sm:px-1.5 sm:py-1.5">
                <Fa.FaInstagram />
              </span>
              <span className="bg-white py-3 px-3.5 rounded-full shadow-md cursor-pointer hover:bg-black hover:text-white transition duration-200 ease-in-out hover:shadow-lg sm:px-1.5 sm:py-1.5">
                <Fa.FaPinterest />
              </span>
              <span className="bg-white py-3 px-3.5 rounded-full shadow-md cursor-pointer hover:bg-black hover:text-white transition duration-200 ease-in-out hover:shadow-lg sm:px-1.5 sm:py-1.5">
                <Fa.FaYoutube />
              </span>
            </div>
            <div className="flex items-center space-x-4 justify-end">
              <img src={logo1} alt="FooterLogo" className="w-[120px]" />
              <img src={logo2} alt="FooterLogo" className="w-[150px]" />
            </div>
          </div>
          <div className="flex space-x-5 flex-wrap sm:text-center">
            <Link to="">
              <p className="text-white font-medium text-lg hover:border-b hover:border-white">
                About
              </p>
            </Link>
            <Link to="">
              <p className="text-white font-medium text-lg hover:border-b hover:border-white">
                Careers
              </p>
            </Link>
            <Link to="">
              <p className="text-white font-medium text-lg hover:border-b hover:border-white">
                Accessibility
              </p>
            </Link>

            <Link to="">
              <p className="text-white font-medium text-lg hover:border-b hover:border-white">
                Feedback
              </p>
            </Link>
            <Link to="">
              <p className="text-white font-medium text-lg hover:border-b hover:border-white">
                Media room
              </p>
            </Link>
            <Link to="">
              <p className="text-white font-medium text-lg hover:border-b hover:border-white">
                Ad Choices
              </p>
            </Link>
            <Link to="">
              <p className="text-white font-medium text-lg hover:border-b hover:border-white">
                Advertise with us
              </p>
            </Link>

            <Link to="">
              <p className="text-white font-medium text-lg hover:border-b hover:border-white">
                Agent support
              </p>
            </Link>
            <Link to="">
              <p className="text-white font-medium text-lg hover:border-b hover:border-white">
                Privacy
              </p>
            </Link>
            <Link to="">
              <p className="text-white font-medium text-lg hover:border-b hover:border-white">
                Terms
              </p>
            </Link>
          </div>
          <div className="flex space-x-6 mt-7 flex-wrap sm:text-center  sm:gap-2">
            <Link to="">
              <p className="text-white font-medium text-lg hover:border-b hover:border-white">
                Home Made
              </p>
            </Link>
            <Link to="">
              <p className="text-white font-medium text-lg hover:border-b hover:border-white">
                Tech Blog
              </p>
            </Link>
            <Link to="">
              <p className="text-white font-medium text-lg hover:border-b hover:border-white">
                Agent Blog
              </p>
            </Link>
            <Link to="">
              <p className="text-white font-medium text-lg hover:border-b hover:border-white">
                Sitemap
              </p>
            </Link>
            <Link to="">
              <p className="text-yellow-600 font-medium text-base hover:border-b-2 hover:border-yellow-600">
                Do Not Sell or Share My Personal Information
              </p>
            </Link>
          </div>
          <div className="mt-12 mb-7">
            <h1 className="text-white font-bold text-xl mb-6">Get the App</h1>
            <div className="flex space-x-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Download_on_the_App_Store_RGB_blk.svg/440px-Download_on_the_App_Store_RGB_blk.svg.png"
                alt="apple"
                className="w-[150px] rounded-xl cursor-pointer"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/240px-Google_Play_Store_badge_EN.svg.png"
                alt="Android"
                className="w-[150px] cursor-pointer"
              />
            </div>
          </div>
          
            <span className="text-gray-500 text-center mt-8 mx-auto flex justify-center text-sm">
              © 1995-2023 Abdulrahman Sharaf Realtor Clone
            </span>
         
        </div>
      </footer>
    </>
  );
}
