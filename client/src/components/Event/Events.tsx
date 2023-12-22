import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import Event from './Event';
import Tabs from '../Utils/Tabs';
import Header from '../Utils/Header';
import NotFound from '../Utils/NotFound';
import Searchbar from '../Utils/Searchbar';
import useQuery from '../../hooks/useQuery';
import Loader from '../Utils/Loaders/Loader';
import { State } from '../../interfaces/store';
import SkeletonLoader from '../Utils/Loaders/SkeletonLoader';
import { title, para, createLink } from '../../constants/event';
import {
    getEvents,
    getUserEvents,
    getMoreEvents,
    getMoreUserEvents,
    searchEvents,
    getMoreSearchedEvents
} from '../../actions/event';
import { Event as EventType } from '../../interfaces/event';
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
import {
    EVENT
} from '../../constants/event';
import { RESET_PAGE } from '../../constants/action';

const Events: React.FC = () => {
    // let history: History = useHistory();
    const { tab, name, location: searchedLocation } = useQuery();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch: any = useDispatch();
    const type = (searchedLocation && 'location') || 'name';
    const value = name || searchedLocation || '';
    const [activeTab, setActiveTab] = useState(tab || trending);
    const [searchType, setSearchType] = useState(type);
    const [searchValue, setSearchValue] = useState(value);

    const isSearching = () => {
        if(location.search.includes('name') || location.search.includes('location')) return true;
        return false;
    };

    const getMoreSearchedPosts = () => {
        dispatch(getMoreSearchedEvents(activeTab, searchType, searchValue, page, limit));
    };
    
    const getMorePosts = () => {
        if(activeTab === trending) {
            dispatch(getMoreEvents(page, limit));
        } else if(activeTab === your_events) {
            dispatch(getMoreUserEvents(page, limit));
        } else if(activeTab === new_to_you) {
            dispatch(getMoreEvents(page, limit));
        } else if(activeTab === visited) {
            dispatch(getMoreUserEvents(page, limit));
        }
    };

    const searchPosts = () => {
        dispatch(searchEvents(activeTab, searchType, searchValue, 1, limit));
    };

    const getPosts = () => {
        if(activeTab === trending) {
            dispatch(getEvents(1, limit));
        } else if(activeTab === your_events) {
            dispatch(getUserEvents(1, limit));
        } else if(activeTab === new_to_you) {
            dispatch(getEvents(1, limit));
        } else if(activeTab === visited) {
            dispatch(getUserEvents(1, limit));
        }
    };

    const changeActiveTab = (tab: string) => {
        if(activeTab === tab && !isSearching()) return;
        navigate(`/events?tab=${tab}`);
        setActiveTab(tab);
    };

    useEffect(() => {
        if(isSearching()) searchPosts();
        else if(!location.search.includes('tab')) navigate('/events?tab=trending');
        else getPosts();

        return () => {
            dispatch({ type: RESET_PAGE, for: EVENT });
        };
    }, [location]);

    const { events, isLoading, totalPages, page, limit } = useSelector((state: State) => state.event);
    
    return (
        <div className='px-3 py-2 h-full bg-dim'>
            <Header
                title={title}
                para={para}
                createLink={createLink}
            />

            <Searchbar
                tab={activeTab}
                searchType={searchType}
                setSearchType={setSearchType}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />

            <div className='px-4 py-3 mt-4 bg-white shadow-image rounded-lg'>
                <Tabs
                    activeTab={activeTab}
                    changeActiveTab={changeActiveTab}
                    value1={trending}
                    value2={your_events}
                    value3={new_to_you}
                    value4={visited}
                    option1={Trending}
                    option2={Your_Events}
                    option3={New_to_you}
                    option4={Visited}
                />

                {isLoading && <SkeletonLoader />}

                {events?.length ? (
                    <ul className='mt-5'>
                        <InfiniteScroll
                            dataLength={events.length}
                            next={isSearching() ? getMoreSearchedPosts : getMorePosts}
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
        </div>
    )
};

export default Events;