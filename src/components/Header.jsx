import React from 'react';
import { useLocation, useNavigate } from 'react-router';

export default function Header() {
    // useLocation ===> to get the location of pages
    const location = useLocation();
    // useNavigation ===> to  navigate through each pages 
    const navigate = useNavigate();
    console.log(location.pathname);

    function pathMatchesRoute(route) {
        return route === location.pathname;
    }

    return (
        <div className='bg-white pt-1 border-b shadow-sm sticky z-50 top-0'>
            <header className='flex justify-between max-w-6xl mx-auto px-4'>
                <div>
                    <img
                        src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
                        alt="Nav-logo"
                        className='h-8 cursor-pointer' onClick={(() => navigate('/'))}
                    />
                </div>
                <div>
                    <ul className='flex space-x-10 '>
                        <li
                            className={` cursor-pointer py-3 text-sm font-semibold text-gray-500 border-b-4 ${pathMatchesRoute('/') ? 'text-black border-b-red-600 cursor-pointer' : 'border-transparent'
                                }`} onClick={(() => navigate('/'))}
                        >
                            Home
                        </li>
                        <li
                            className={`cursor-pointer py-3 text-sm font-semibold text-gray-500 border-b-4 ${pathMatchesRoute('/offer') ? 'text-black border-b-red-500 cursor-pointer' : 'border-transparent'
                                }`} onClick={(() => navigate('/offer'))}
                        >
                            Offer
                        </li>
                        <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-500 border-b-4 ${pathMatchesRoute('/sign-in') ? 'text-black border-b-red-500 cursor-pointer' : 'border-transparent'
                            }`} onClick={(() => navigate('/sign-in'))}>Sign In </li>
                    </ul>
                </div>
            </header>
        </div>
    );
}
