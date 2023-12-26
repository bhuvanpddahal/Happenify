import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';

import Loader from '../Utils/Loaders/Loader';
import ConfirmBox from '../Utils/ConfirmBox';
import { EventProp } from '../../interfaces/event';
import { deleteEvent } from '../../actions/event';
import { State } from '../../interfaces/store';

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
    createdAt,
    dispatch
}: EventProp) => {
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);
    const optionsRef = useRef<HTMLIFrameElement>(null);
    const [showOptions, setShowOptions] = useState(false);
    const [showConfrimBox, setShowConfirmBox] = useState(false);

    const toggleShowOptions = () => {
        setShowOptions((prevShowOptions) => !prevShowOptions);
    };
    const handleEditClick = () => {
        navigate(`/events/${_id?.toString()}/edit`);
    };
    const handleDeleteClick = () => {
        setShowConfirmBox(true);
    };
    const handleDeleteConfirm = () => {
        setShowConfirmBox(false);
        setIsDeleting(true);
        dispatch(deleteEvent(_id?.toString()));
    };
    const handleBlockPost = () => {
        console.log('block clicked');
    };
    const handleViewOrganizer = () => {
        navigate(`/profile/${organizer?.id.toString()}`);
    };
    const hideOptions = (e: any) => {
        // console.log('inside', e.target, optionsRef);
        if(e.target === optionsRef) return;
        setShowOptions(false);
    };

    useEffect(() => {
        // TODO - Hide options on document click
    }, [showOptions]);

    const { isMiniLoading } = useSelector((state: State) => state.event);

    if(isDeleting && isMiniLoading) return (
        <>
            <Loader />
            {!isLast && (<div className='border-b border-solid border-grey'></div>)}
        </>
    )

    return (
        <li className={`md:h-260px flex flex-col md:flex-row md:items-center gap-3 ${!isLast ? 'py-3 border-b border-solid border-grey' : 'pt-3'}`}>
            {showConfrimBox && (
                <ConfirmBox
                    image={image}
                    setShowConfirmBox={setShowConfirmBox}
                    handleDeleteConfirm={handleDeleteConfirm}
                />
            )}
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
                    <div onClick={toggleShowOptions} className='h-30px w-30px relative flex items-center justify-center rounded-full cursor-pointer transition-bg duration-300 hover:bg-lightgrey'>
                        <i ref={optionsRef} className="ri-more-2-line text-18px"></i>
                        <ul className={`absolute bottom-1 right-1 py-1 w-160px bg-white rounded-lg text-15px shadow-image overflow-hidden z-10 transition-transform duration-200 origin-bottom-right ${showOptions ? 'scale-100 pointer-events-auto' : 'scale-0 pointer-events-none'}`}>
                            {userId === organizer?.id ? (
                                <>
                                    <li onClick={handleEditClick} className='py-1 px-3 flex items-center gap-1 hover:bg-lightgrey'>
                                        <i className="ri-pencil-fill text-16px text-normal"></i> Edit
                                    </li>
                                    <li onClick={handleDeleteClick} className='py-1 px-3 flex items-center gap-1 hover:bg-lightgrey'>
                                        <i className="ri-delete-bin-6-fill text-16px text-normal"></i> Delete
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li onClick={handleBlockPost} className='py-1 px-3 flex items-center gap-1 hover:bg-lightgrey'>
                                        <i className="ri-spam-2-fill text-18px text-normal"></i> Block this post
                                    </li>
                                    <li onClick={handleViewOrganizer} className='py-1 px-3 flex items-center gap-1 hover:bg-lightgrey'>
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