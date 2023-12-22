import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { Place as PlaceProp } from '../../interfaces/place';

const Place: React.FC<PlaceProp> = ({
    _id,
    name,
    location,
    capacity,
    description,
    type,
    contact,
    images,
    facilities,
    ratings,
    owner,
    pricePerHour,
    termsAndConditions,
    socialMedia,
    createdAt
}: PlaceProp) => {
    return (
        <li className='md:h-260px flex flex-col md:flex-row gap-3 py-3 border-b border-solid border-grey'>
            <Link to={`/places/${_id?.toString()}`} className='md:w-1/2 h-full rounded-lg overflow-hidden border border-solid border-grey'>
                <img className='h-200px sm:h-240px md:h-full w-full object-contain cursor-pointer transition-transform duration-300 hover:scale-110' src={images[0]} alt="place" />
            </Link>
            <div className='md:w-1/2'>
                <h1 className='text-20px md:text-22px font-bold text-normal line-clamp-1'>{name}</h1>
                <p className='flex items-center gap-2 text-18px md:text-19px font-medium text-normal line-clamp-1'>
                    <i className="ri-map-pin-line text-22px text-secondarydark"></i> {location}
                </p>
                <p className='flex items-center gap-2 text-18px md:text-19px font-medium text-normal'>
                    <i className="ri-star-smile-line text-22px text-secondarydark"></i> {type}
                </p>
                <p className='line-clamp-3'>{description}</p>
                <Link to={`/events/12345/book-entry`} className='flex items-center justify-center gap-1 py-2 w-full bg-primary text-lightgrey mt-3 rounded-sm hover:bg-primarydark'>
                    <i className="ri-book-2-line"></i> Book this place
                </Link>
            </div>
        </li>
    )
};

export default Place;