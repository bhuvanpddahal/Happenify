import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import Loader from '../Utils/Loader';
import NotFound from '../Utils/NotFound';
import useQuery from '../../hooks/useQuery';
import Tabs from '../Utils/Tabs';
import {
    trending,
    your_places,
    new_to_you,
    booked,
    Trending,
    Your_Places,
    New_to_you,
    Booked
} from '../../constants/tab';
import Place from './Place';
import {
    PLACE
} from '../../constants/place';

const Places: React.FC = () => {
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

    const getMorePosts = () => {
        // dispatch(getMorePlaces(page, limit));
    };

    const changeActiveTab = (tab: string) => {
        if(activeTab === tab && !isSearching()) return;
        setActiveTab(tab);
        navigate(`/events?tab=${activeTab}`);
    };

    const places: any = [1, 2, 3];
    const isLoading = false;
    const page = 3;
    const totalPages = 2;

    return (
        <div className='px-3 py-2'>
            <Tabs
                page={PLACE}
                title='Places'
                para='Find and create places to share with others.'
                createLink='/places/create'
                searchType={searchType}
                setSearchType={setSearchType}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                activeTab={activeTab}
                changeActiveTab={changeActiveTab}
                value1={trending}
                value2={your_places}
                value3={new_to_you}
                value4={booked}
                option1={Trending}
                option2={Your_Places}
                option3={New_to_you}
                option4={Booked}
            />

            {isLoading && <Loader />}

            {places?.length ? (
                <ul className='mt-5'>
                    <InfiniteScroll
                        dataLength={places.length}
                        next={getMorePosts}
                        hasMore={page <= totalPages}
                        loader={<Loader />}
                        scrollThreshold={'100px'}
                        style={{ overflow: 'visible' }}
                    >
                        {places.map((place: any) => (
                            <Place
                                
                            />
                        ))}
                    </InfiniteScroll>
                </ul>
            ) : (
                <>
                    {!isLoading && <NotFound message='No places' />}
                </>
            )}
        </div>
    )
};

export default Places;