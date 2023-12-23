import { Dispatch } from 'redux';

import * as api from '../api';
import { Action as EventAction } from '../interfaces/event';
import { Action as AlertAction } from '../interfaces/alert';
import {
    START_LOADING,
    END_LOADING
} from '../constants/action';
import {
    EVENT,
    CREATE_EVENT,
    GET_EVENTS,
    GET_MORE_EVENTS,
    GET_EVENT_BY_ID,
    GET_USER_EVENTS,
    GET_MORE_USER_EVENTS,
    SEARCH_EVENTS,
    GET_MORE_SEARCHED_EVENTS,
    creation_success,
} from '../constants/event';
import { success } from '../constants/alert';
import { FormDataProp } from '../interfaces/event';
import { showAlert } from './alert';
import handleError from '../functions/error';

export const createEvent = (formData: FormDataProp, navigate: any) => async (dispatch: Dispatch<EventAction | AlertAction>) => {
    try {
        dispatch({ type: START_LOADING, for: EVENT });
        const { data } = await api.createEvent(formData);
        dispatch({ type: CREATE_EVENT, data });
        dispatch({ type: END_LOADING, for: EVENT });
        showAlert(creation_success, success, dispatch);
        navigate('/events');
        
    } catch (error) {
        dispatch({ type: END_LOADING, for: EVENT });
        handleError(error, dispatch);
    }
};

export const getEvents = (page: number, limit: number) => async (dispatch: Dispatch<EventAction | AlertAction>) => {
    try {
        dispatch({ type: START_LOADING, for: EVENT });
        const { data } = await api.getEvents(page, limit);
        dispatch({ type: GET_EVENTS, data });
        dispatch({ type: END_LOADING, for: EVENT });

    } catch (error) {
        dispatch({ type: END_LOADING, for: EVENT });
        handleError(error, dispatch);
    }
};

export const getMoreEvents = (page: number, limit: number) => async (dispatch: Dispatch<EventAction | AlertAction>) => {
    try {
        const { data } = await api.getEvents(page, limit);
        dispatch({ type: GET_MORE_EVENTS, data });

    } catch (error) {
        handleError(error, dispatch);
    }
};

export const getUserEvents = (page: number, limit: number) => async (dispatch: Dispatch<EventAction | AlertAction>) => {
    try {
        dispatch({ type: START_LOADING, for: EVENT });
        const { data } = await api.getUserEvents(page, limit);
        dispatch({ type: GET_USER_EVENTS, data });
        dispatch({ type: END_LOADING, for: EVENT });

    } catch (error) {
        dispatch({ type: END_LOADING, for: EVENT });
        handleError(error, dispatch);
    }
};

export const getMoreUserEvents = (page: number, limit: number) => async (dispatch: Dispatch<EventAction | AlertAction>) => {
    try {
        const { data } = await api.getUserEvents(page, limit);
        dispatch({ type: GET_MORE_USER_EVENTS, data });

    } catch (error) {
        handleError(error, dispatch);
    }
};

export const getEventById = (id: string) => async (dispatch: Dispatch<EventAction | AlertAction>) => {
    try {
        dispatch({ type: START_LOADING, for: EVENT });
        const { data } = await api.getEventById(id);
        dispatch({ type: GET_EVENT_BY_ID, data });
        dispatch({ type: END_LOADING, for: EVENT });

    } catch (error) {
        dispatch({ type: END_LOADING, for: EVENT });
        handleError(error, dispatch);
    }
};

export const searchTrendingEvents = (searchType: string, value: string, limit: number) => async (dispatch: Dispatch<EventAction | AlertAction>) => {
    try {
        dispatch({ type: START_LOADING, for: EVENT });
        const { data } = await api.searchTrendingEvents(searchType, value, 1, limit);
        dispatch({ type: SEARCH_EVENTS, data });
        dispatch({ type: END_LOADING, for: EVENT });

    } catch (error) {
        dispatch({ type: END_LOADING, for: EVENT });
        handleError(error, dispatch);
    }
};

export const searchUserEvents = (searchType: string, value: string, limit: number) => async (dispatch: Dispatch<EventAction | AlertAction>) => {
    try {
        dispatch({ type: START_LOADING, for: EVENT });
        const { data } = await api.searchUserEvents(searchType, value, 1, limit);
        dispatch({ type: SEARCH_EVENTS, data });
        dispatch({ type: END_LOADING, for: EVENT });

    } catch (error) {
        dispatch({ type: END_LOADING, for: EVENT });
        handleError(error, dispatch);
    }
};

export const searchMoreTrendingEvents = (searchType: string, value: string, page: number, limit: number) => async (dispatch: Dispatch<EventAction | AlertAction>) => {
    try {
        const { data } = await api.searchTrendingEvents(searchType, value, page, limit);
        dispatch({ type: GET_MORE_SEARCHED_EVENTS, data });

    } catch (error) {
        handleError(error, dispatch);
    }
};

export const searchMoreUserEvents = (searchType: string, value: string, page: number, limit: number) => async (dispatch: Dispatch<EventAction | AlertAction>) => {
    try {
        const { data } = await api.searchUserEvents(searchType, value, page, limit);
        dispatch({ type: GET_MORE_SEARCHED_EVENTS, data });

    } catch (error) {
        handleError(error, dispatch);
    }
};