import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Loader from '../Utils/Loaders/Loader';
import ProfileImg from '../../images/profile.png';
import { State } from '../../interfaces/store';
import { getPlaceById } from '../../actions/place';
import { REMOVE_SELECTED_PLACE } from '../../constants/place';
import NotFound from '../Utils/NotFound';

const PlaceDetails: React.FC = () => {
    const { id } = useParams();
    const dispatch: any = useDispatch();

    useEffect(() => {
        dispatch(getPlaceById(id || ''));

        return () => {
            dispatch({ type: REMOVE_SELECTED_PLACE });
        };
    }, []);

    const { isLoading, selectedPlace } = useSelector((state: State) => state.place);

    if (isLoading) return <Loader />
    if (!selectedPlace) return <NotFound message={'Place not found!'} />

    return (
        <div className='p-3 pb-6 lg:pb-3'>
            <div className='flex flex-col md:flex-row gap-5'>
                <div className='w-full'>
                    <div className='flex gap-3'>
                        <img className='w-full h-200px object-contain rounded-md shadow-image' src={selectedPlace?.images[0]} alt="event" />
                        <img className='w-full h-200px object-contain rounded-md shadow-image' src={selectedPlace?.images[1]} alt="event" />
                        <img className='w-full h-200px object-contain rounded-md shadow-image' src={selectedPlace?.images[2]} alt="event" />
                    </div>
                    <div className='mt-2 flex items-center justify-between'>
                        <div className='text-dark font-medium'>{selectedPlace?.type}</div>
                        <div>Share</div>
                    </div>
                    <h1 className='text-20px md:text-22px font-bold text-normal line-clamp-1'>{selectedPlace?.name}</h1>
                    <button className='underline text-secondarydark hover:text-darkgrey'>See more</button>
                    <div className='my-1 flex items-center gap-2'>
                        <div>
                            <i className="ri-user-star-line text-26px text-secondary"></i>
                        </div>
                        <div className='my-3 flex gap-2'>
                            <Link to={`/profile/123`}>
                                <img className='h-30px' src={ProfileImg} alt="profile" />
                            </Link>
                            <Link to={`/profile/123`}>
                                <img className='h-30px' src={ProfileImg} alt="profile" />
                            </Link>
                            <Link to={`/profile/123`}>
                                <img className='h-30px' src={ProfileImg} alt="profile" />
                            </Link>
                            <Link to={`/profile/123`}>
                                <img className='h-30px' src={ProfileImg} alt="profile" />
                            </Link>
                        </div>
                    </div>
                    <p className='line-clamp-5'>{selectedPlace?.description}</p>
                    <button className='underline text-secondarydark hover:text-darkgrey'>Read more</button>
                    <div className='my-4'>
                        <h2 className='text-17px font-medium text-dark'>Event Schedules</h2>
                        <ul>
                            <li className='flex items-center gap-3 mt-3'>
                                <div className='h-70px w-70px flex flex-col items-center justify-center border border-solid border-grey rounded-full'>
                                    <div>9:00</div>
                                    <div>AM</div>
                                </div>
                                <div>
                                    <h3 className='font-medium'>Opening Ceremony</h3>
                                    <p className='text-darkgrey'>By Abc Def - 9:00 AM . 10:30 AM</p>
                                </div>
                            </li>
                            <li className='flex items-center gap-3 mt-3'>
                                <div className='h-70px w-70px flex flex-col items-center justify-center border border-solid border-grey rounded-full'>
                                    <div>9:00</div>
                                    <div>AM</div>
                                </div>
                                <div>
                                    <h3 className='font-medium'>Lunch Break</h3>
                                    <p className='text-darkgrey'>By Abc Def - 9:00 AM . 10:30 AM</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='w-full'>
                    <div className='pb-3 border-b border-solid border-grey'>
                        <Link to={`/events/12345/book-entry`} className='inline-block py-2 px-5 bg-primary text-white rounded-sm hover:bg-primarydark'>
                            <i className="ri-book-2-line"></i> Book your entry pass
                        </Link>
                    </div>
                    <div className='py-3 border-b border-solid border-grey'>
                        <h2>RSVP</h2>
                        <div>Chart</div>
                    </div>
                    <div className='py-3 border-b border-solid border-grey'>
                        <h2>Ticket sales</h2>
                        <div>Chart</div>
                    </div>
                    <div className='py-3 border-b border-solid border-grey'>
                        <h2>Location</h2>
                        <div>Map</div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PlaceDetails;