import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

const Places: React.FC = () => {
    const { tab } = useQuery();
    const navigate = useNavigate();
    const dispatch: any = useDispatch();
    const [activeTab, setActiveTab] = useState(tab || trending);

    const getMorePosts = () => {
        // dispatch(getMorePlaces(page, limit));
    };

    const places: any = [1, 2, 3];
    const isLoading = false;
    const page = 3;
    const totalPages = 2;

    return (
        <div className='px-3 py-2'>
            <Tabs
                title='Places'
                para='Find and create places to share with others.'
                createLink='/places/create'
                activeTab={activeTab}
                setActiveTab={setActiveTab}
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