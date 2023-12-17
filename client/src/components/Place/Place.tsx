import React from 'react';
import { Link } from 'react-router-dom';

const Place: React.FC = () => {
    return (
        <li className='md:h-260px flex flex-col md:flex-row gap-3 py-3 border-b border-solid border-grey'>
            <Link to={`/places/1234`} className='md:w-1/2 h-full rounded-lg overflow-hidden shadow-image'>
                <img className='h-200px sm:h-240px md:h-full w-full object-contain cursor-pointer transition-transform duration-300 hover:scale-110' src={''} alt="place" />
            </Link>
            <div className='md:w-1/2'>
                <h1 className='text-20px md:text-22px font-bold text-normal line-clamp-1'>Gorakha Department</h1>
                <p className='flex items-center gap-2 text-18px md:text-19px font-medium text-normal line-clamp-1'>
                    <i className="ri-map-pin-line text-22px text-secondarydark"></i> Damak-2, Jhapa, Nepal
                </p>
                <p className='flex items-center gap-2 text-18px md:text-19px font-medium text-normal'>
                    <i className="ri-time-line text-22px text-secondarydark"></i> Jan 10, 2024
                </p>
                <p className='line-clamp-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt est ipsa excepturi voluptas ab eveniet velit dolores exercitationem illum quos. Officiis, voluptatem deleniti.</p>
                <Link to={`/events/12345/book-entry`} className='inline-block py-2 w-full bg-primary text-center text-lightgrey mt-3 rounded-sm hover:bg-primarydark'>
                    <i className="ri-book-2-line"></i> Book your entry pass
                </Link>
            </div>
        </li>
    )
};

export default Place;