import {
    trending,
    your_events,
    new_to_you,
    visited
} from '../constants/tab';
import {
    getTrendingEvents,
    getUserEvents,
    getMoreTrendingEvents,
    getMoreUserEvents,
    searchTrendingEvents,
    searchUserEvents,
    searchMoreTrendingEvents,
    searchMoreUserEvents
} from '../actions/event';

export const getPosts = (
    dispatch: any,
    activeTab: string,
    limit: number
) => {
    if(activeTab === trending) {
        dispatch(getTrendingEvents(1, limit));
    } else if(activeTab === your_events) {
        dispatch(getUserEvents(1, limit));
    } else if(activeTab === new_to_you) {
        dispatch(getTrendingEvents(1, limit));
    } else if(activeTab === visited) {
        dispatch(getUserEvents(1, limit));
    }
};

export const getMorePosts = (
    dispatch: any,
    activeTab: string,
    page: number,
    limit: number
) => {
    if(activeTab === trending) {
        dispatch(getMoreTrendingEvents(page, limit));
    } else if(activeTab === your_events) {
        dispatch(getMoreUserEvents(page, limit));
    } else if(activeTab === new_to_you) {
        dispatch(getMoreTrendingEvents(page, limit));
    } else if(activeTab === visited) {
        dispatch(getMoreUserEvents(page, limit));
    }
};

export const searchPosts = (
    dispatch: any,
    activeTab: string,
    searchType: string,
    searchValue: string,
    limit: number
) => {
    document.title = 'Search Events - Happenify';
    if(activeTab === trending) {
        dispatch(searchTrendingEvents(searchType, searchValue, limit));
    } else if(activeTab === your_events) {
        dispatch(searchUserEvents(searchType, searchValue, limit));
    } else if(activeTab === new_to_you) {
        dispatch(searchTrendingEvents(searchType, searchValue, limit));
    } else if(activeTab === visited) {
        dispatch(searchUserEvents(searchType, searchValue, limit));
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
        dispatch(searchMoreTrendingEvents(searchType, searchValue, page, limit));
    } else if(activeTab === your_events) {
        dispatch(searchMoreUserEvents(searchType, searchValue, page, limit));
    } else if(activeTab === new_to_you) {
        dispatch(searchMoreTrendingEvents(searchType, searchValue, page, limit));
    } else if(activeTab === visited) {
        dispatch(searchMoreUserEvents(searchType, searchValue, page, limit));
    }
};