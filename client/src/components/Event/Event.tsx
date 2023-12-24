import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';

import { EventProp } from '../../interfaces/event';

const Event: React.FC<EventProp> = ({
    isLast,
    userId,
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
    const navigate = useNavigate();
    const [showOptions, setShowOptions] = useState(false);

    const toggleShowOptions = () => {
        setShowOptions((prevShowOptions) => !prevShowOptions);
    };

    const handleEdit = () => {
        console.log('edit clicked');
        
    };

    const handleDelete = () => {
        console.log('delete clicked');
    };
    const handleBlockPost = () => {
        console.log('block clicked');
    };
    const handleViewOrganizer = () => {
        navigate(`/profile/${organizer?.id.toString()}`);
        console.log('view clicked');
    };

    useEffect(() => {
        
    }, [showOptions]);

    return (
        <li className={`md:h-260px flex flex-col md:flex-row md:items-center gap-3 ${!isLast ? 'py-3 border-b border-solid border-grey' : 'pt-3'}`}>
            <Link to={`/events/${_id?.toString()}`} className='md:w-1/2 h-full rounded-lg overflow-hidden border border-solid border-grey'>
                <img className='h-200px sm:h-240px md:h-full w-full object-contain cursor-pointer transition-transform duration-300 hover:scale-110' src={image} alt="event" />
            </Link>
            <div className='md:w-1/2 md:pb-1'>
                <h1 className='text-20px md:text-22px font-bold text-normal line-clamp-1'>{name}</h1>
                <p className='flex items-center gap-2 text-18px md:text-19px font-medium text-normal line-clamp-1'>
                    <i className="ri-map-pin-line text-22px text-secondarydark"></i> {location}
                </p>
                <p className='flex items-center gap-2 text-18px md:text-19px font-medium text-normal'>
                    <i className="ri-time-line text-22px text-secondarydark"></i> {moment(dateAndTime).format('lll')}
                </p>
                <p className='line-clamp-3'>{description}</p>
                <div className='flex items-center justify-between mt-3'>
                    <Link to={`/events/12345/book-entry`} className='flex items-center justify-center gap-1 py-1 px-3 bg-primary text-lightgrey rounded-sm hover:bg-primarydark'>
                        <i className="ri-book-2-line text-18px"></i> Book your entry pass
                    </Link>
                    <div onClick={toggleShowOptions} className='h-30px w-30px relative flex items-center justify-center rounded-full cursor-pointer transition-bg duration-300 hover:bg-grey'>
                        <i className="ri-more-2-line text-18px"></i>
                        <ul className={`absolute bottom-0 right-0 py-1 w-160px bg-white rounded-lg text-15px border border-solid border-grey z-10 transition-transform duration-200 origin-bottom-right ${showOptions ? 'scale-100 pointer-events-auto' : 'scale-0 pointer-events-none'}`}>
                            {userId === organizer?.id ? (
                                <>
                                    <li onClick={handleEdit} className='py-1 px-3 flex items-center gap-1 hover:bg-grey'>
                                        <i className="ri-delete-bin-6-fill text-16px text-normal"></i> Edit
                                    </li>
                                    <li onClick={handleDelete} className='py-1 px-3 flex items-center gap-1 hover:bg-grey'>
                                        <i className="ri-pencil-fill text-16px text-normal"></i> Delete
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li onClick={handleBlockPost} className='py-1 px-3 flex items-center gap-1 hover:bg-grey'>
                                        <i className="ri-spam-2-fill text-18px text-normal"></i> Block this post
                                    </li>
                                    <li onClick={handleViewOrganizer} className='py-1 px-3 flex items-center gap-1 hover:bg-grey'>
                                        <i className="ri-eye-fill text-18px text-normal"></i> View organizer
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </li>
    )
};

export default Event;