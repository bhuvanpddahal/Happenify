import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import NotFound from '../Utils/NotFound';
import Loader from '../Utils/Loaders/Loader';
import ProfileImg from '../../images/profile.png';
import { State } from '../../interfaces/store';
import { getPlaceById } from '../../actions/place';
import { REMOVE_SELECTED_PLACE } from '../../constants/place';

const PlaceDetails: React.FC = () => {
    const { id } = useParams();
    const dispatch: any = useDispatch();

    useEffect(() => {
        document.title = 'Place Details - Happenify';
        dispatch(getPlaceById(id || ''));
        return () => {
            dispatch({ type: REMOVE_SELECTED_PLACE });
        };
    }, []);

    const { isLoading, selectedPlace } = useSelector((state: State) => state.place);

    if (isLoading) return <Loader />
    if (!selectedPlace) return <NotFound message='Place not found' />

    return (
        <div className='p-3 pb-6 lg:pb-3 bg-dim'>
            <Link to={`/places/${id}/rate`} className='fixed bottom-16 md:bottom-20 lg:bottom-6 right-6 py-1 px-3 rounded-50px text-15px bg-secondary shadow-box transition-bg duration-300 hover:bg-grey'>
                <i className="ri-emotion-line text-18px"></i> Rate this place
            </Link>
            <div className='flex flex-col gap-5 bg-white p-4 rounded-lg shadow-box'>
                <div className='w-full'>
                    <div className='flex gap-3 flex-col xs:flex-row'>
                        <Link to={selectedPlace?.images[0]} className='w-full h-130px sm:h-160px lg:h-200px' target='_blank'>
                            <img className='w-full h-full object-contain rounded-md border border-solid border-grey' src={selectedPlace?.images[0]} alt="event" />
                        </Link>
                        <Link to={selectedPlace?.images[1]} className='w-full h-130px sm:h-160px lg:h-200px' target='_blank'>
                            <img className='w-full h-full object-contain rounded-md border border-solid border-grey' src={selectedPlace?.images[1]} alt="event" />
                        </Link>
                        <Link to={selectedPlace?.images[2]} className='w-full h-130px sm:h-160px lg:h-200px' target='_blank'>
                            <img className='w-full h-full object-contain rounded-md border border-solid border-grey' src={selectedPlace?.images[2]} alt="event" />
                        </Link>
                    </div>
                    <div className='mt-2 flex items-center justify-between'>
                        <div className='text-normal font-medium'>
                            {[...Array(5)].map((_, index) => (
                                <i key={index} className={`ri-star-fill text-18px ${selectedPlace?.ratings.length >= index ? 'text-secondary' : 'text-grey'}`}></i>
                            ))}
                        </div>
                        <div className='text-dark text-15px'>{moment(selectedPlace?.createdAt).fromNow()}</div>
                    </div>
                    <h1 className='text-20px md:text-22px font-bold text-normal line-clamp-1'>{selectedPlace?.name}</h1>
                    <p className='text-dark text-15px mt-n5px pl-1'>{selectedPlace?.type?.name}</p>
                    <div className='my-1 flex items-center gap-2'>
                        <div>
                            <i className="ri-user-star-line text-26px text-secondarydark"></i>
                        </div>
                        <Link to={`/profile/${selectedPlace?.owner?.id.toString()}`} className='organizer'>
                            <img className='h-40px w-40px rounded-full object-cover shadow-box' src={selectedPlace?.owner?.picture || ProfileImg} alt="profile" />
                            <div className='organizer-name'>{selectedPlace?.owner?.fullName}</div>
                        </Link>
                    </div>
                    <p className='line-clamp-5'>{selectedPlace?.description}</p>
                </div>
                <div className='w-full'>
                    <div className='pb-3 border-b border-solid border-grey'>
                        <Link to={`/events/12345/book-entry`} className='inline-block py-2 px-5 bg-primary text-15px text-white rounded-sm hover:bg-primarydark'>
                            <i className="ri-book-2-line"></i> Book your entry pass
                        </Link>
                    </div>
                    <div className='py-3 flex justify-between border-b border-solid border-grey'>
                        <h2><i className="ri-team-line text-18px text-secondarydark"></i> Capacity</h2>
                        <div>{selectedPlace?.capacity}</div>
                    </div>
                    <div className='py-3 border-b border-solid border-grey'>
                        <div className='flex justify-between'>
                            <h2><i className="ri-facebook-box-line text-18px text-secondarydark"></i> Facebook</h2>
                            <div>{selectedPlace?.socialMedia?.facebook}</div>
                        </div>
                        <div className='flex justify-between'>
                            <h2><i className="ri-twitter-line text-18px text-secondarydark"></i> Twitter</h2>
                            <div>{selectedPlace?.socialMedia?.twitter}</div>
                        </div>
                        <div className='flex justify-between'>
                            <h2><i className="ri-mail-line text-18px text-secondarydark"></i> Contact email</h2>
                            <div>{selectedPlace?.contact}</div>
                        </div>
                    </div>
                    <div className='py-3 flex justify-between border-b border-solid border-grey'>
                        <h2><i className="ri-price-tag-3-line text-18px text-secondarydark"></i> Price/Hour</h2>
                        <div>${selectedPlace?.pricePerHour}</div>
                    </div>
                    <div className='py-3 border-b border-solid border-grey'>
                        <h2><i className="ri-cup-line text-18px text-secondarydark"></i> Facilities</h2>
                        <ul className='pl-2'>
                            {selectedPlace?.facilities.map((facility) => (
                                <li>• {facility}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='py-3 border-b border-solid border-grey'>
                        <h2><i className="ri-file-list-3-line text-18px text-secondarydark"></i> Terms and Conditions</h2>
                        <ul className='pl-2'>
                            {selectedPlace?.termsAndConditions.map((condition, index) => (
                                <li key={index}>• {condition}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PlaceDetails;