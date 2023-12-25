import {
    trending,
    your_places,
    new_to_you,
    booked
} from '../constants/tab';
import {
    getTrendingPlaces,
    getUserPlaces,
    getMoreTrendingPlaces,
    getMoreUserPlaces,
    searchTrendingPlaces,
    searchUserPlaces,
    searchMoreTrendingPlaces,
    searchMoreUserPlaces
} from '../actions/place';

export const getPosts = (
    dispatch: any,
    activeTab: string,
    limit: number
) => {
    if(activeTab === trending) {
        dispatch(getTrendingPlaces(1, limit));
    } else if(activeTab === your_places) {
        dispatch(getUserPlaces(1, limit));
    } else if(activeTab === new_to_you) {
        dispatch(getTrendingPlaces(1, limit));
    } else if(activeTab === booked) {
        dispatch(getUserPlaces(1, limit));
    }
};

export const getMorePosts = (
    dispatch: any,
    activeTab: string,
    page: number,
    limit: number
) => {
    if(activeTab === trending) {
        dispatch(getMoreTrendingPlaces(page, limit));
    } else if(activeTab === your_places) {
        dispatch(getMoreUserPlaces(page, limit));
    } else if(activeTab === new_to_you) {
        dispatch(getMoreTrendingPlaces(page, limit));
    } else if(activeTab === booked) {
        dispatch(getMoreUserPlaces(page, limit));
    }
};

export const searchPosts = (
    dispatch: any,
    activeTab: string,
    searchType: string,
    searchValue: string,
    limit: number
) => {
    document.title = 'Search Places - Happenify';
    if(activeTab === trending) {
        dispatch(searchTrendingPlaces(searchType, searchValue, limit));
    } else if(activeTab === your_places) {
        dispatch(searchUserPlaces(searchType, searchValue, limit));
    } else if(activeTab === new_to_you) {
        dispatch(searchTrendingPlaces(searchType, searchValue, limit));
    } else if(activeTab === booked) {
        dispatch(searchUserPlaces(searchType, searchValue, limit));
    }
};

export const getMoreSearchedPosts = (
    dispatch: any,
    activeTab: string,
    searchType: string,
    searchValue: string,
    page: number,
    limit: number
) => {
    if(activeTab === trending) {
        dispatch(searchMoreTrendingPlaces(searchType, searchValue, page, limit));
    } else if(activeTab === your_places) {
        dispatch(searchMoreUserPlaces(searchType, searchValue, page, limit));
    } else if(activeTab === new_to_you) {
        dispatch(searchMoreTrendingPlaces(searchType, searchValue, page, limit));
    } else if(activeTab === booked) {
        dispatch(searchMoreUserPlaces(searchType, searchValue, page, limit));
    }
};