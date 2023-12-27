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
import { State } from '../../interfaces/store';
import SkeletonLoaders from '../Utils/Loaders/SkeletonLoader/SkeletonLoaders';
import { title, para, createLink } from '../../constants/event';
import { Event as EventType } from '../../interfaces/event';
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
    to,
    EVENT
} from '../../constants/event';
import { RESET_PAGE } from '../../constants/action';
import { isSearching } from '../../functions/util';
import {
    getPosts,
    getMorePosts,
    searchPosts,
    getMoreSearchedPosts
} from '../../functions/event';

const Events: React.FC = () => {
    const { tab, name, location: searchedLocation } = useQuery();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch: any = useDispatch();
    const type = (searchedLocation && 'location') || 'name';
    const value = name || searchedLocation || '';
    const [activeTab, setActiveTab] = useState(tab || trending);
    const [searchType, setSearchType] = useState(type);
    const [searchValue, setSearchValue] = useState(value);

    const morePosts = () => {
        if(isSearching(location)) {
            getMoreSearchedPosts(dispatch, activeTab, searchType, searchValue, page, limit);
        } else {
            getMorePosts(dispatch, activeTab, page, limit);
        }
    };

    const changeActiveTab = (tab: string) => {
        if(activeTab === tab && !isSearching(location)) return;
        navigate(`/events?tab=${tab}`);
        setActiveTab(tab);
    };

    useEffect(() => {
        document.title = 'Events - Happenify';
        if(isSearching(location)) searchPosts(dispatch, activeTab, searchType, searchValue, limit);
        else if(!location.search.includes('tab')) navigate('/events?tab=trending');
        else getPosts(dispatch, activeTab, limit);

        return () => {
            dispatch({ type: RESET_PAGE, for: EVENT });
        };
    }, [location]);

    const { user } = useSelector((state: State) => state.auth);
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
                to={to}
                searchType={searchType}
                setSearchType={setSearchType}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />

            <div className='p-4 mt-4 bg-white shadow-box overflow-visible rounded-lg'>
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

                {isLoading && <SkeletonLoaders />}

                {events?.length ? (
                    <ul className='mt-5'>
                        <InfiniteScroll
                            dataLength={events.length}
                            next={morePosts}
                            hasMore={page <= totalPages}
                            loader={<SkeletonLoaders />}
                            scrollThreshold={'100px'}
                        >
                            {events.map((event: EventType, index: number) => (
                                <Event
                                    key={event._id}
                                    isLast={index === events.length - 1}
                                    userId={user?._id}
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
                                    dispatch={dispatch}
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