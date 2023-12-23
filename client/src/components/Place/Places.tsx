import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import Place from './Place';
import Tabs from '../Utils/Tabs';
import Header from '../Utils/Header';
import NotFound from '../Utils/NotFound';
import Searchbar from '../Utils/Searchbar';
import useQuery from '../../hooks/useQuery';
import Loader from '../Utils/Loaders/Loader';
import { State } from '../../interfaces/store';
import SkeletonLoaders from '../Utils/Loaders/SkeletonLoader/SkeletonLoaders';
import { title, para, createLink } from '../../constants/place';
import {
    getPlaces,
    getUserPlaces
} from '../../actions/place';
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
import {
    PLACE
} from '../../constants/place';
import { RESET_PAGE } from '../../constants/action';
import { Place as PlaceType } from '../../interfaces/place';

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

    const searchPosts = () => {
        // dispatch(searchEvents(activeTab, searchType, searchValue, 1, limit));
    };

    const getPosts = () => {
        if(activeTab === trending) {
            dispatch(getPlaces(1, limit));
        } else if(activeTab === your_places) {
            dispatch(getUserPlaces(1, limit));
        } else if(activeTab === new_to_you) {
            dispatch(getPlaces(1, limit));
        } else if(activeTab === booked) {
            dispatch(getUserPlaces(1, limit));
        }
    };

    const changeActiveTab = (tab: string) => {
        if(activeTab === tab && !isSearching()) return;
        navigate(`/places?tab=${tab}`);
        setActiveTab(tab);
    };

    useEffect(() => {
        if(isSearching()) searchPosts();
        else if(!location.search.includes('tab')) navigate('/places?tab=trending');
        else getPosts();

        return () => {
            dispatch({ type: RESET_PAGE, for: PLACE });
        };
    }, [location]);

    const { places, isLoading, totalPages, page, limit } = useSelector((state: State) => state.place);

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

            <div className='p-4 mt-4 bg-white shadow-image rounded-lg'>
                <Tabs
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

                {isLoading && <SkeletonLoaders />}

                {places?.length ? (
                    <ul className='mt-5'>
                        <InfiniteScroll
                            dataLength={places.length}
                            next={getMorePosts}
                            hasMore={page <= totalPages}
                            loader={<SkeletonLoaders />}
                            scrollThreshold={'100px'}
                        >
                            {places.map((place: PlaceType, index: number) => (
                                <Place
                                    key={place._id}
                                    isLast={index === places.length - 1}
                                    _id={place._id}
                                    name={place.name}
                                    location={place.location}
                                    capacity={place.capacity}
                                    description={place.description}
                                    type={place.type}
                                    contact={place.contact}
                                    images={place.images}
                                    facilities={place.facilities}
                                    ratings={place.ratings}
                                    owner={place.owner}
                                    pricePerHour={place.pricePerHour}
                                    termsAndConditions={place.termsAndConditions}
                                    socialMedia={place.socialMedia}
                                    createdAt={place.createdAt}
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
        </div>
    )
};

export default Places;