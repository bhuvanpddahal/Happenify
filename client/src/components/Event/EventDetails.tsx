import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Loader from '../Utils/Loader';
import ProfileImg from '../../images/profile.png';
import { State } from '../../interfaces/store';
import { getEventById } from '../../actions/event';
import { REMOVE_SELECTED_EVENT } from '../../constants/event';
import NotFound from '../Utils/NotFound';
// import useHistory from '../../hooks/useHistory';

const EventDetails: React.FC = () => {
    const { id } = useParams();
    // const history = useHistory();
    
    const dispatch: any = useDispatch();

    useEffect(() => {
        dispatch(getEventById(id || ''));

        return () => {
            dispatch({ type: REMOVE_SELECTED_EVENT });
        };
    }, []);

    const { isLoading, selectedEvent } = useSelector((state: State) => state.event);

    if (isLoading) return <Loader />
    if (!selectedEvent) return <NotFound message={'Event not found!'} />

    return (
        <div className='p-3 pb-6 lg:pb-3'>
            <div className='flex flex-col md:flex-row gap-5'>
                <div className='w-full'>
                    <img className='w-full h-300px object-contain rounded-md shadow-image' src={selectedEvent?.image} alt="event" />
                    <div className='mt-2 flex items-center justify-between'>
                        <div className='text-dark font-medium'>{moment(selectedEvent?.dateAndTime).format('lll')}</div>
                        <div>Share</div>
                    </div>
                    <h1 className='text-20px md:text-22px font-bold text-normal line-clamp-1'>{selectedEvent?.name}</h1>
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
                    <p className='line-clamp-5'>{selectedEvent?.description}</p>
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
}

export default EventDetails;