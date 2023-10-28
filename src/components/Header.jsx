import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

export default function Header() {
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
        <header className="flex justify-between max-w-6xl mx-auto px-4">
          <div>
            <img
              src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
              alt="Nav-logo"
              className="h-8 cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>
          <div>
            <ul className="flex space-x-10 ">
              <li
                className={` cursor-pointer py-3 text-sm font-medium text-black border-b-2 ${
                  pathMatchesRoute("/")
                    ? "text-gray-500 border-b-black cursor-pointer"
                    : "border-transparent"
                }`}
                onClick={() => navigate("/")}
              >
                Home
              </li>
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
              <button type='button'
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
