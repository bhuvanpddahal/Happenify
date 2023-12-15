import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import Event from './Event';
import Loader from '../Utils/Loader';
import NotFound from '../Utils/NotFound';
import { State } from '../../interfaces/store';
import { getEvents, getUserEvents, getMoreEvents } from '../../actions/event';
import { mapIcon, mapText } from '../../functions/event';
import { Event as EventType } from '../../interfaces/event';
import useQuery from '../../hooks/useQuery';
import useHistory, { History } from '../../hooks/useHistory';
import {
    trending,
    your_events,
    new_to_you,
    visited,
    Trending,
    Your_Events,
    New_to_you,
    Visited,
    RESET_PAGE
} from '../../constants/event';

const Events: React.FC = () => {
    let history: History = useHistory();
    const { tab } = useQuery();
    const navigate = useNavigate();
    const dispatch: any = useDispatch();
    const [activeTab, setActiveTab] = useState(tab || trending);

    const getMorePosts = () => {
        dispatch(getMoreEvents(page, limit));
    };

    useEffect(() => {
        navigate(`/events?tab=${activeTab}`);
        
        if(activeTab === trending) {
            dispatch(getEvents(1, limit));
        } else if(activeTab === your_events) {
            dispatch(getUserEvents(1, limit));
        } else if(activeTab === new_to_you) {
            dispatch(getEvents(1, limit));
        } else if(activeTab === visited) {
            dispatch(getUserEvents(1, limit));
        }

        return () => {
            dispatch({ type: RESET_PAGE });
        };
    }, [activeTab]);

    const { events, isLoading, totalPages, page, limit } = useSelector((state: State) => state.event);
    
    return (
        <div className='px-3 py-2'>
            <div className='flex justify-between gap-2 items-center mb-5'>
                <div>
                    <h1 className='text-20px text-dark font-semibold'>Events</h1>
                    <p className='text-14px sm:text-16px'>Find and create events to share with others.</p>
                </div>
                <Link to='/events/create' className='bg-primary px-3 py-1 sm:text-18px rounded-md flex items-center gap-2 text-lightgrey cursor-pointer hover:bg-primarydark'>
                    <i className="ri-add-circle-line text-20px md:text-22px"></i> Create
                </Link>
            </div>

            {/* For larger devices */}
            <div className='hidden sm:flex gap-5 md:gap-10 lg:text-18px'>
                <div onClick={() => setActiveTab(trending)} className={`w-150px py-1 border-b-4 border-solid flex items-center justify-center gap-1 cursor-pointer ${activeTab === trending ? 'border-secondary text-primarydark font-medium' : ''}`}>
                    <i className={`${activeTab === trending ? 'ri-fire-fill' : 'ri-fire-line'} text-22px`}></i> {Trending}
                </div>
                <div onClick={() => setActiveTab(your_events)} className={`w-150px py-1 border-b-4 border-solid flex items-center justify-center gap-1 cursor-pointer ${activeTab === your_events ? 'border-secondary text-primarydark font-medium' : ''}`}>
                    <i className={`${activeTab === your_events ? 'ri-shield-star-fill' : 'ri-shield-star-line'} text-22px`}></i> {Your_Events}
                </div>
                <div onClick={() => setActiveTab(new_to_you)} className={`w-150px py-1 border-b-4 border-solid flex items-center justify-center gap-1 cursor-pointer ${activeTab === new_to_you ? 'border-secondary text-primarydark font-medium' : ''}`}>
                    <i className={`${activeTab === new_to_you ? 'ri-eye-2-fill' : 'ri-eye-2-line'} text-22px`}></i> {New_to_you}
                </div>
                <div onClick={() => setActiveTab(visited)} className={`w-150px py-1 border-b-4 border-solid flex items-center justify-center gap-1 cursor-pointer ${activeTab === visited ? 'border-secondary text-primarydark font-medium' : ''}`}>
                    <i className={`${activeTab === visited ? 'ri-checkbox-fill' : 'ri-checkbox-line'} text-22px`}></i> {Visited}
                </div>
            </div>

            {/* For mobile devices */}
            <div className='sm:hidden flex items-center justify-between'>
                <div className={`w-150px py-1 border-b-4 border-solid flex items-center justify-center gap-1 border-secondary text-primarydark font-medium`}>
                    <i className={`${mapIcon(activeTab)} text-22px`}></i> {mapText(activeTab)}
                </div>
                <select onChange={(e) => setActiveTab(e.target.value)} value={activeTab} className='border border-solid border-grey px-3 py-2 cursor-pointer outline-none rounded-md'>
                    <option value={trending}>{Trending}</option>
                    <option value={your_events}>{Your_Events}</option>
                    <option value={new_to_you}>{New_to_you}</option>
                    <option value={visited}>{Visited}</option>
                </select>
            </div>

            {isLoading && <Loader />}

            {events?.length ? (
                <ul className='mt-5'>
                    <InfiniteScroll
                        dataLength={events.length}
                        next={getMorePosts}
                        hasMore={page <= totalPages}
                        loader={<Loader />}
                        scrollThreshold={'100px'}
                    >
                        {events.map((event: EventType) => (
                            <Event
                                key={event._id}
                                _id={event._id}
                                name={event.name}
                                dateAndTime={event.dateAndTime}
                                location={event.location}
                                description={event.description}
                                ticketPrice={event.ticketPrice}
                                organizer={event.organizer}
                                type={event.type}
                                image={event.image}
                                socialMedia={event.socialMedia}
                                contact={event.contact}
                                createdAt={event.createdAt}
                            />
                        ))}
                    </InfiniteScroll>
                </ul>
            ) : (
                <>
                    {!isLoading && <NotFound message='No events' />}
                </>
            )}
        </div>
    )
};

export default Events;