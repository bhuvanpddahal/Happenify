import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';

import Options from '../Utils/Options';
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
    const optionsRef = useRef<HTMLDivElement>(null);
    const [isDeleting, setIsDeleting] = useState(false);
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
    const handleOutsideClick = (e: any) => {
        if (optionsRef.current && !optionsRef.current.contains(e.target)) {
            setShowOptions(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const { isMiniLoading } = useSelector((state: State) => state.event);

    if (isDeleting && isMiniLoading) return (
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
                    <Options
                        userId={userId}
                        holder={organizer}
                        optionsRef={optionsRef}
                        showOptions={showOptions}
                        toggleShowOptions={toggleShowOptions}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                        handleBlockPost={handleBlockPost}
                        handleViewOrganizer={handleViewOrganizer}
                    />
                </div>
            </div>
        </li>
    )
};

export default Event;