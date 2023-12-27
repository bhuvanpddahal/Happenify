import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';

import Options from '../Utils/Options';
import Loader from '../Utils/Loaders/Loader';
import ConfirmBox from '../Utils/ConfirmBox';
import { State } from '../../interfaces/store';
import { PlaceProp } from '../../interfaces/place';
import { deletePlace } from '../../actions/place';

const Place: React.FC<PlaceProp> = ({
    isLast,
    userId,
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
    createdAt,
    dispatch
}: PlaceProp) => {
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showConfrimBox, setShowConfirmBox] = useState(false);

    const toggleShowOptions = () => {
        setShowOptions((prevShowOptions) => !prevShowOptions);
    };
    const handleEditClick = () => {
        navigate(`/places/${_id?.toString()}/edit`);
    };
    const handleDeleteClick = () => {
        setShowConfirmBox(true);
    };
    const handleDeleteConfirm = () => {
        setShowConfirmBox(false);
        setIsDeleting(true);
        dispatch(deletePlace(_id?.toString()));
    };
    const handleBlockPost = () => {
        console.log('block clicked');
    };
    const handleViewOrganizer = () => {
        navigate(`/profile/${owner?.id.toString()}`);
    };
    const hideOptions = (e: any) => {
        // console.log('inside', e.target, optionsRef);
        // if(e.target === optionsRef) return;
        // setShowOptions(false);
    };

    useEffect(() => {
        // TODO - Hide options on document click
    }, [showOptions]);

    const { isMiniLoading } = useSelector((state: State) => state.place);

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
                    image={images[0]}
                    setShowConfirmBox={setShowConfirmBox}
                    handleDeleteConfirm={handleDeleteConfirm}
                />
            )}
            <Link to={`/places/${_id?.toString()}`} className='md:w-1/2 h-full rounded-lg overflow-hidden border border-solid border-grey'>
                <img className='h-200px sm:h-240px md:h-full w-full object-contain cursor-pointer transition-transform duration-300 hover:scale-110' src={images[0]} alt="place" />
            </Link>
            <div className='md:w-1/2'>
                <h1 className='text-20px md:text-22px font-bold text-normal line-clamp-1'>{name}</h1>
                <p className='flex items-center gap-2 text-18px md:text-19px font-medium text-normal line-clamp-1'>
                    <i className="ri-map-pin-line text-22px text-secondarydark"></i> {location}
                </p>
                <p className='flex items-center gap-2 text-18px md:text-19px font-medium text-normal'>
                    <i className="ri-star-smile-line text-22px text-secondarydark"></i> {type?.name}
                </p>
                <p className='line-clamp-3'>{description}</p>
                <div className='flex items-center justify-between mt-3'>
                    <Link to={`/places/12345/book`} className='flex items-center justify-center gap-1 py-1 px-3 bg-primary text-lightgrey rounded-sm hover:bg-primarydark'>
                        <i className="ri-book-2-line text-18px"></i> Book this place
                    </Link>
                    <Options
                        userId={userId}
                        holder={owner}
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

export default Place;