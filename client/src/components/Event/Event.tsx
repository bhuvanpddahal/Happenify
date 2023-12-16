import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { Event as EventProp } from '../../interfaces/event';

const Event: React.FC<EventProp> = ({
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
        <li className='lg:h-270px flex flex-col lg:flex-row gap-3 py-3 border-b border-solid border-grey'>
            <Link to={`/events/${_id?.toString()}`} className='lg:w-1/2 h-full rounded-lg overflow-hidden shadow-image'>
                <img className='h-280px lg:h-full w-full object-contain cursor-pointer transition-transform duration-300 hover:scale-110' src={image} alt="event" />
            </Link>
            <div className='lg:w-1/2'>
                <h1 className='text-20px md:text-22px font-bold text-normal line-clamp-1'>{name}</h1>
                <p className='flex items-center gap-2 text-18px md:text-19px font-medium text-normal line-clamp-1'>
                    <i className="ri-map-pin-line text-22px lg:text-24px text-secondarydark"></i> {location}
                </p>
                <p className='flex items-center gap-2 text-18px md:text-19px font-medium text-normal'>
                    <i className="ri-time-line text-22px lg:text-24px text-secondarydark"></i> {moment(dateAndTime).format('lll')}
                </p>
                <p className='line-clamp-3'>{description}</p>
                <Link to={`/events/12345/book-entry`} className='inline-block py-2 w-full bg-primary text-center text-white md:text-17px lg:text-18px mt-3 rounded-sm hover:bg-primarydark'>
                    <i className="ri-book-2-line"></i> Book your entry pass
                </Link>
            </div>
        </li>
    )
};

export default Event;