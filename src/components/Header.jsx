import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Navitems from '../datas/NavData'
import { Link } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import {GrClose} from "react-icons/gr"

export default function Header() {
  // responsive navigation
  const [isMenuOpen , setIsMenuOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)

  const toggleMenu = () =>{
    setIsMenuOpen(!isMenuOpen)
  }
  
  useEffect(() => {
    const handleScroll = () =>{
      if(window.scrollY > 0){
        setIsSticky(true)
      }
    }
    window.addEventListener('scroll', handleScroll)
    
  },[])
  
  const [activeContent, setActiveContent] = useState(0)

  const handleActiveNavBar = (index) =>{
    setActiveContent(index)
  }
  
  
    // create a hook for changing sign-in to profile when logged in 
    const [isPage, isSetPage] = useState('Sign In')
    const auth = getAuth()
    // useLocation ===> to get the location of pages
    const location = useLocation();
    // useNavigation ===> to  navigate through each pages 
    const navigate = useNavigate();
    
// create hook useEffect to track the changing of sign in  and profile behaviour
useEffect(()=>{
    // Track the change in the authentication  
onAuthStateChanged(auth, (user) =>{
    // if the user exists or authenticated then set the isSetPage(profile)
    if(user){
        isSetPage('Profile')
    } else{
        isSetPage('Sign In')
    }
})
}, [auth])

    function pathMatchesRoute(route) {
        return route === location.pathname;
    }

    return (
      <>
        <div
          className={`bg-white pt-1 border-b shadow-sm sticky z-50 top-0 px-4 ${
            isSticky ? "sticky top-0 left-0 right-0" : ""
          }`}
        >
        {/* Desktop Navbar */}
          <header className="flex justify-between items-center max-w-7xl mx-auto lg:px-4 px-10 ">
            <button
              className="lg:hidden text-2xl font-thin pr-9"
              onClick={toggleMenu}
            >
              <FaBars />
            </button>

            <div className="">
              <img
                src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
                alt="Nav-logo"
                className="h-8 cursor-pointer lg:w-full w-48"
                onClick={() => navigate("/")}
              />
            </div>

            <div>
              <ul className="lg:flex justify-center items-center gap-7 text-sm pt-4 hidden">
                {Navitems.map((items, index) => (
                  <li
                    key={index}
                    className={`font-medium pb-4 hover:border-b-2 hover:border-black ${
                      activeContent === index ? "border-b-2 border-black" : ""
                    } `}
                    onClick={() => handleActiveNavBar(index)}
                  >
                    <Link to={items.navigate}>{items.nav}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <ul className="lg:flex hidden gap-4">
                <li
                  className={`cursor-pointer py-3 text-sm font-medium text-black border-b-2 ${
                    pathMatchesRoute("/offer")
                      ? "text-gray-500 border-black cursor-pointer"
                      : "border-transparent"
                  }`}
                  onClick={() => navigate("/offer")}
                >
                  Offer
                </li>
                <button
                  type="button"
                  className={`cursor-pointer bg-black rounded-3xl py-1 px-5 text-sm font-medium text-white border-b-2 ${
                    (pathMatchesRoute("/sign-in") ||
                      pathMatchesRoute("/profile")) &&
                    "text-gray-500  cursor-pointer"
                  } :  border-transparent `}
                  onClick={() => navigate("/profile")}
                >
                  {isPage}{" "}
                </button>
              </ul>
            </div>

            {/* for small screen  navbar*/}
            <button className="lg:hidden text-3xl  py-2 pl-6" onClick={toggleMenu}>
              <CgProfile />
            </button>
          </header>
        </div>
        <div className="relative max-w-7xl rounded ">
          {isMenuOpen && (
            <div className="bg-[#ffffff] h-[100%] fixed z-50 top-0 w-[220px] shadow-2xl mr-4">
              <div className="flex justify-between whitespace-nowrap gap-6 mt-3 mb-2 px-6">
                <img
                  src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
                  alt="Nav-logo"
                  className="h-8 cursor-pointer w-36"
                  onClick={() => navigate("/")}
                />
                <button
                  className="lg:hidden text-2xl font-thin"
                  onClick={toggleMenu}
                >
                  <GrClose />
                </button>
              </div>
              <hr className="border-t-2 border-gray-500 mb-4"></hr>
              <ul>
                {Navitems.map((items, index) => (
                  <div key={index} className="mb-5">
                    <li
                      className={`px-6 text-sm font-medium  ${
                        activeContent === index ? " border-black" : ""
                      } `}
                      onClick={() => handleActiveNavBar(index)}
                    >
                      <Link to={items.navigate}>{items.nav}</Link>
                    </li>
                    <hr className="border-t border-gray-300 mt-4"></hr>
                  </div>
                ))}
              </ul>
            </div>
          )}
        </div>
      </>
    );
}
