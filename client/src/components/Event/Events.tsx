import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import Event from './Event';
import Tabs from '../Utils/Tabs';
import Loader from '../Utils/Loader';
import NotFound from '../Utils/NotFound';
import { State } from '../../interfaces/store';
import { getEvents, getUserEvents, getMoreEvents } from '../../actions/event';
import { Event as EventType } from '../../interfaces/event';
import useQuery from '../../hooks/useQuery';
// import useHistory, { History } from '../../hooks/useHistory';
import {
    trending,
    your_events,
    new_to_you,
    visited,
    Trending,
    Your_Events,
    New_to_you,
    Visited
} from '../../constants/tab';
import { RESET_PAGE } from '../../constants/event';

const Events: React.FC = () => {
    // let history: History = useHistory();
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
            <Tabs
                title='Events'
                para='Find and create events to share with others.'
                createLink='/events/create'
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                value1={trending}
                value2={your_events}
                value3={new_to_you}
                value4={visited}
                option1={Trending}
                option2={Your_Events}
                option3={New_to_you}
                option4={Visited}
            />

            {isLoading && <Loader />}

            {events?.length ? (
                <ul className='mt-5'>
                    <InfiniteScroll
                        dataLength={events.length}
                        next={getMorePosts}
                        hasMore={page <= totalPages}
                        loader={<Loader />}
                        scrollThreshold={'100px'}
                        style={{ overflow: 'visible' }}
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