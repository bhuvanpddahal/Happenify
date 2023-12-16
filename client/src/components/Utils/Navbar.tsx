import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { State } from '../../interfaces/store';
import MainLogo from '../../images/main-logo.png';
import FavLogo from '../../images/logo180.png';
import ProfileImg from '../../images/profile.png';

const Navbar: React.FC = () => {
    const { user } = useSelector((state: State) => state.auth);

    return (
        <nav className='flex items-center justify-between border-b border-solid border-grey bg-white px-3 py-2 sticky top-0 z-10'>
            <Link to='/'>
                <img className='h-40px lg:h-50px hidden sm:inline-block' src={MainLogo} alt="Happenify" />
                <img className='h-40px sm:hidden' src={FavLogo} alt="Happenify" />
            </Link>
            <div className='hidden md:inline-block'>Turning Dreams into Events, Seamlessly with Happenify!</div>
            <Link to='/auth' className='flex items-center rounded-full cursor-pointer shadow-normal hover:bg-lightgrey'>
                <div className='sm:text-17px py-2 border-r border-solid border-grey px-4 sm:px-5'>
                    {user ? user?.fullName : 'Log in'}
                </div>
                <div className='px-4 sm:px-5'>
                    {user ? (
                        <img className='h-30px w-30px rounded-full object-cover' src={user?.picture || ProfileImg} alt="profile" />
                    ) : (
                        <i className="ri-user-fill text-darkgrey text-20px sm:text-22px"></i>
                    )}
                </div>
            </Link>
        </nav>
    )
};

export default Navbar;