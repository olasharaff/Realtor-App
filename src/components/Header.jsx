import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Navitems from '../datas/NavData'
import { Link } from 'react-router-dom';

export default function Header() {
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
      <div className="bg-white pt-1 border-b shadow-sm sticky z-40 top-0">
        <header className="flex justify-between items-center max-w-7xl mx-auto px-4">
          <div className="flex items-center jus">
            <img
              src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
              alt="Nav-logo"
              className="h-8 cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>
          <div>
            <ul className="flex justify-center items-center gap-7 text-sm pt-4">
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
            <ul className="flex gap-4">
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
        </header>
      </div>
    );
}
