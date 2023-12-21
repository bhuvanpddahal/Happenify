import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';

import { loginWithToken } from '../actions/auth';;

const Sidebar: React.FC = () => {
    const location = useLocation();
    const dispatch: any = useDispatch();

    const isActive = (tab: string) => {
        if(location.pathname.includes(tab)) return true;
        return false;
    };

    useEffect(() => {
        dispatch(loginWithToken());
    }, []);

    return (
        <div className='fixed bottom-0 left-0 lg:relative w-full lg:w-280px lg:h-full border-t lg:border-r border-solid border-grey md:text-15px lg:text-16px bg-white py-2 px-3 z-10 lg:z-0'>
            <ul className='flex justify-between lg:block md:pb-4 lg:pb-0'>
                <li className={`px-1 sm:px-3 sm:py-1 relative cursor-pointer rounded-md ${isActive('/events') ? 'lg:bg-blue-100 text-primary font-medium' : 'hover:bg-lightgrey'}`}>
                    <Link to="/events?tab=trending" className='flex flex-col lg:flex-row items-center lg:gap-2'>
                        <i className={`${isActive('/events') ? 'ri-calendar-event-fill' : 'ri-calendar-event-line'} text-22px md:text-20px`}></i>
                        <span className='hidden md:inline-block md:absolute lg:relative md:top-30px lg:top-0 md:left-0'>Events</span>
                    </Link>
                </li>
                <li className={`px-1 sm:px-3 sm:py-1 relative cursor-pointer rounded-md ${isActive('/places') ? 'lg:bg-blue-100 text-primary font-medium' : 'hover:bg-lightgrey'}`}>
                    <Link to="/places?tab=trending" className='flex flex-col lg:flex-row items-center lg:gap-2'>
                        <i className={`${isActive('/places') ? 'ri-landscape-fill' : 'ri-landscape-line'} text-22px md:text-20px`}></i>
                        <span className='hidden md:inline-block md:absolute lg:relative md:top-30px lg:top-0 md:left-1/2 lg:left-0 md:translate-x-n50p lg:translate-x-0'>Places</span>
                    </Link>
                </li>
                <li className={`px-1 sm:px-3 sm:py-1 relative cursor-pointer rounded-md ${isActive('/promotions') ? 'lg:bg-blue-100 text-primary font-medium' : 'hover:bg-lightgrey'}`}>
                    <Link to="/promotions" className='flex flex-col lg:flex-row items-center lg:gap-2'>
                        <i className={`${isActive('/promotions') ? 'ri-store-fill' : 'ri-store-line'} text-22px md:text-20px`}></i>
                        <span className='hidden md:inline-block md:absolute lg:relative md:top-30px lg:top-0 md:left-1/2 lg:left-0 md:translate-x-n50p lg:translate-x-0'>Promotions</span>
                    </Link>
                </li>
                <li className={`px-1 sm:px-3 sm:py-1 relative cursor-pointer rounded-md ${isActive('/calendar') ? 'lg:bg-blue-100 text-primary font-medium' : 'hover:bg-lightgrey'}`}>
                    <Link to="/calendar" className='flex flex-col lg:flex-row items-center lg:gap-2'>
                        <i className={`${isActive('/calendar') ? 'ri-calendar-fill' : 'ri-calendar-line'} text-22px md:text-20px`}></i>
                        <span className='hidden md:inline-block md:absolute lg:relative md:top-30px lg:top-0 md:left-1/2 lg:left-0 md:translate-x-n50p lg:translate-x-0'>Calendar</span>
                    </Link>
                </li>
                <li className={`px-1 sm:px-3 sm:py-1 relative cursor-pointer rounded-md ${isActive('/expenses') ? 'lg:bg-blue-100 text-primary font-medium' : 'hover:bg-lightgrey'}`}>
                    <Link to="/expenses" className='flex flex-col lg:flex-row items-center lg:gap-2'>
                        <i className={`${isActive('/expenses') ? 'ri-money-dollar-box-fill' : 'ri-money-dollar-box-line'} text-22px md:text-20px`}></i>
                        <span className='hidden md:inline-block md:absolute lg:relative md:top-30px lg:top-0 md:left-1/2 lg:left-0 md:translate-x-n50p lg:translate-x-0 whitespace-nowrap'>Budget and Expenses</span>
                    </Link>
                </li>
                <li className={`px-1 sm:px-3 sm:py-1 relative cursor-pointer rounded-md ${isActive('/analytics') ? 'lg:bg-blue-100 text-primary font-medium' : 'hover:bg-lightgrey'}`}>
                    <Link to="/analytics" className='flex flex-col lg:flex-row items-center lg:gap-2'>
                        <i className={`${isActive('/analytics') ? 'ri-line-chart-fill' : 'ri-line-chart-line'} text-22px md:text-20px`}></i>
                        <span className='hidden md:inline-block md:absolute lg:relative md:top-30px lg:top-0 md:right-0'>Analytics</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
};

export default Sidebar;