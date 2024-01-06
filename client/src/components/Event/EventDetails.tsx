import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import NotFound from '../Utils/NotFound';
import Loader from '../Loader/Loader';
import ProfileImg from '../../images/profile.png';
import { State } from '../../interfaces/store';
import { getEventById } from '../../actions/event';
import { REMOVE_SELECTED_EVENT } from '../../constants/event';

const EventDetails: React.FC = () => {
    const { id } = useParams();
    const dispatch: any = useDispatch();

    useEffect(() => {
        document.title = 'Event Details - Happenify';
        dispatch(getEventById(id || ''));
        return () => {
            dispatch({ type: REMOVE_SELECTED_EVENT });
        };
    }, []);

    const { isLoading, selectedEvent } = useSelector((state: State) => state.event);

    if (isLoading) return <Loader />
    if (!selectedEvent) return <NotFound message='Event not found' />

    return (
        <div className='p-3 pb-6 lg:pb-3 bg-dim'>
            <div className='flex flex-col md:flex-row gap-5 p-4 bg-white rounded-lg shadow-box'>
                <div className='w-full'>
                    <Link to={selectedEvent?.image} className='w-full' target='_blank'>
                        <img className='w-full h-300px object-contain rounded-md border border-solid border-grey' src={selectedEvent?.image} alt="event" />
                    </Link>
                    <div className='mt-2 flex items-center justify-between'>
                        <div className='text-dark font-medium'>{moment(selectedEvent?.dateAndTime).format('lll')}</div>
                        <div className='text-dark text-15px'>{moment(selectedEvent?.createdAt).fromNow()}</div>
                    </div>
                    <h1 className='text-20px md:text-22px font-bold text-normal line-clamp-1'>{selectedEvent?.name}</h1>
                    <p className='text-dark text-15px mt-n5px pl-1'>{selectedEvent?.type?.name}</p>
                    <div className='my-1 flex items-center gap-2'>
                        <div>
                            <i className="ri-user-star-line text-26px text-secondarydark"></i>
                        </div>
                        <Link to={`/profile/${selectedEvent?.organizer?.id.toString()}`} className='organizer'>
                            <img className='h-40px w-40px rounded-full object-cover shadow-box' src={selectedEvent?.organizer?.picture || ProfileImg} alt="profile" />
                            <div className='organizer-name'>{selectedEvent?.organizer?.fullName}</div>
                        </Link>
                    </div>
                    <p className='line-clamp-5'>{selectedEvent?.description}</p>
                </div>
                <div className='w-full'>
                    <div className='pb-3 border-b border-solid border-grey'>
                        <Link to={`/events/${selectedEvent?._id.toString()}/book-entry`} className='inline-block py-2 px-5 bg-primary text-15px text-white rounded-sm hover:bg-primarydark'>
                            <i className="ri-book-2-line"></i> Book your entry pass
                        </Link>
                    </div>
                    <div className='py-3 border-b border-solid border-grey'>
                        <div className='flex justify-between'>
                            <h2><i className="ri-ticket-2-line text-18px text-secondarydark"></i> Ticket price</h2>
                            <div>${selectedEvent?.ticketPrice}</div>
                        </div>
                        <div className='flex justify-between'>
                            <h2><i className="ri-team-line text-18px text-secondarydark"></i> Capacity</h2>
                            <div>{selectedEvent?.capacity}</div>
                        </div>
                        <div className='flex justify-between'>
                            <h2><i className="ri-book-3-line text-18px text-secondarydark"></i> Booked</h2>
                            <div>{selectedEvent?.bookings?.total}</div>
                        </div>
                        <div className='flex justify-between'>
                            <h2><i className="ri-book-open-line text-18px text-secondarydark"></i> Remaining</h2>
                            <div>{Number(selectedEvent?.capacity) - selectedEvent?.bookings?.total}</div>
                        </div>
                    </div>
                    <div className='py-3 border-b border-solid border-grey'>
                        <div className='flex justify-between'>
                            <h2><i className="ri-facebook-box-line text-18px text-secondarydark"></i> Facebook</h2>
                            <div>{selectedEvent?.socialMedia?.facebook}</div>
                        </div>
                        <div className='flex justify-between'>
                            <h2><i className="ri-twitter-line text-18px text-secondarydark"></i> Twitter</h2>
                            <div>{selectedEvent?.socialMedia?.twitter}</div>
                        </div>
                        <div className='flex justify-between'>
                            <h2><i className="ri-mail-line text-18px text-secondarydark"></i> Contact email</h2>
                            <div>{selectedEvent?.contact}</div>
                        </div>
                    </div>
                    <div className='py-3 flex justify-between border-b border-solid border-grey'>
                        <h2><i className="ri-map-pin-2-line text-18px text-secondarydark"></i> Location</h2>
                        <div>{selectedEvent?.location}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventDetails;