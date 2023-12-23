import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { Event as EventProp } from '../../interfaces/event';

const Event: React.FC<EventProp> = ({
    isLast,
    _id,
    name,
    dateAndTime,
    location,
    description,
    ticketPrice,
    organizer,
    type,
    image,
    socialMedia,
    contact,
    createdAt
}: EventProp) => {
    return (
        <li className={`md:h-260px flex flex-col md:flex-row gap-3 ${!isLast ? 'py-3 border-b border-solid border-grey' : 'pt-3'}`}>
            <Link to={`/events/${_id?.toString()}`} className='md:w-1/2 h-full rounded-lg overflow-hidden border border-solid border-grey'>
                <img className='h-200px sm:h-240px md:h-full w-full object-contain cursor-pointer transition-transform duration-300 hover:scale-110' src={image} alt="event" />
            </Link>
            <div className='md:w-1/2'>
                <h1 className='text-20px md:text-22px font-bold text-normal line-clamp-1'>{name}</h1>
                <p className='flex items-center gap-2 text-18px md:text-19px font-medium text-normal line-clamp-1'>
                    <i className="ri-map-pin-line text-22px text-secondarydark"></i> {location}
                </p>
                <p className='flex items-center gap-2 text-18px md:text-19px font-medium text-normal'>
                    <i className="ri-time-line text-22px text-secondarydark"></i> {moment(dateAndTime).format('lll')}
                </p>
                <p className='line-clamp-3'>{description}</p>
                <Link to={`/events/12345/book-entry`} className='flex items-center justify-center gap-1 py-2 w-full bg-primary text-lightgrey mt-3 rounded-sm hover:bg-primarydark'>
                    <i className="ri-book-2-line"></i> Book your entry pass
                </Link>
            </div>
        </li>
    )
};

export default Event;