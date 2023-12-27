import { Dispatch } from 'redux';

import * as api from '../api';
import { Action as PlaceAction } from '../interfaces/place';
import { Action as AlertAction } from '../interfaces/alert';
import {
    START_LOADING,
    END_LOADING,
    START_MINI_LOADING,
    END_MINI_LOADING
} from '../constants/action';
import {
    PLACE,
    CREATE_PLACE,
    GET_PLACES,
    GET_USER_PLACES,
    GET_PLACE_BY_ID,
    SEARCH_PLACES,
    GET_MORE_SEARCHED_PLACES,
    DELETE_PLACE,
    creation_success,
    deletion_success
} from '../constants/place';
import { success } from '../constants/alert';
import { FormDataProp } from '../interfaces/place';
import { showAlert } from './alert';
import handleError from '../functions/error';

export const createPlace = (formData: FormDataProp, navigate: any) => async (dispatch: Dispatch<PlaceAction | AlertAction>) => {
    try {
        dispatch({ type: START_MINI_LOADING, for: PLACE });
        const { data } = await api.createPlace(formData);
        dispatch({ type: CREATE_PLACE, data });
        dispatch({ type: END_MINI_LOADING, for: PLACE });
        showAlert(creation_success, success, dispatch);
        navigate('/places');
        
    } catch (error) {
        dispatch({ type: END_MINI_LOADING, for: PLACE });
        handleError(error, dispatch);
    }
};

export const getTrendingPlaces = (page: number, limit: number) => async (dispatch: Dispatch<PlaceAction | AlertAction>) => {
    try {
        dispatch({ type: START_LOADING, for: PLACE });
        const { data } = await api.getTrendingPlaces(page, limit);
        dispatch({ type: GET_PLACES, data });
        dispatch({ type: END_LOADING, for: PLACE });

    } catch (error) {
        dispatch({ type: END_LOADING, for: PLACE });
        handleError(error, dispatch);
    }
};

export const getUserPlaces = (page: number, limit: number) => async (dispatch: Dispatch<PlaceAction | AlertAction>) => {
    try {
        dispatch({ type: START_LOADING, for: PLACE });
        const { data } = await api.getUserPlaces(page, limit);
        dispatch({ type: GET_USER_PLACES, data });
        dispatch({ type: END_LOADING, for: PLACE });

    } catch (error) {
        dispatch({ type: END_LOADING, for: PLACE });
        handleError(error, dispatch);
    }
};

export const getMoreTrendingPlaces = (page: number, limit: number) => async (dispatch: Dispatch<PlaceAction | AlertAction>) => {
    try {
        const { data } = await api.getTrendingPlaces(page, limit);
        dispatch({ type: GET_PLACES, data });

    } catch (error) {
        handleError(error, dispatch);
    }
};

export const getMoreUserPlaces = (page: number, limit: number) => async (dispatch: Dispatch<PlaceAction | AlertAction>) => {
    try {
        const { data } = await api.getUserPlaces(page, limit);
        dispatch({ type: GET_USER_PLACES, data });

    } catch (error) {
        handleError(error, dispatch);
    }
};

export const getPlaceById = (id: string) => async (dispatch: Dispatch<PlaceAction | AlertAction>) => {
    try {
        dispatch({ type: START_LOADING, for: PLACE });
        const { data } = await api.getPlaceById(id);
        dispatch({ type: GET_PLACE_BY_ID, data });
        dispatch({ type: END_LOADING, for: PLACE });

    } catch (error) {
        dispatch({ type: END_LOADING, for: PLACE });
        handleError(error, dispatch);
    }
};

export const searchTrendingPlaces = (searchType: string, value: string, limit: number) => async (dispatch: Dispatch<PlaceAction | AlertAction>) => {
    try {
        dispatch({ type: START_LOADING, for: PLACE });
        const { data } = await api.searchTrendingPlaces(searchType, value, 1, limit);
        dispatch({ type: SEARCH_PLACES, data });
        dispatch({ type: END_LOADING, for: PLACE });

    } catch (error) {
        dispatch({ type: END_LOADING, for: PLACE });
        handleError(error, dispatch);
    }
};

export const searchUserPlaces = (searchType: string, value: string, limit: number) => async (dispatch: Dispatch<PlaceAction | AlertAction>) => {
    try {
        dispatch({ type: START_LOADING, for: PLACE });
        const { data } = await api.searchUserPlaces(searchType, value, 1, limit);
        dispatch({ type: SEARCH_PLACES, data });
        dispatch({ type: END_LOADING, for: PLACE });

    } catch (error) {
        dispatch({ type: END_LOADING, for: PLACE });
        handleError(error, dispatch);
    }
};

export const searchMoreTrendingPlaces = (searchType: string, value: string, page: number, limit: number) => async (dispatch: Dispatch<PlaceAction | AlertAction>) => {
    try {
        const { data } = await api.searchTrendingPlaces(searchType, value, page, limit);
        dispatch({ type: GET_MORE_SEARCHED_PLACES, data });

    } catch (error) {
        handleError(error, dispatch);
    }
};

export const searchMoreUserPlaces = (searchType: string, value: string, page: number, limit: number) => async (dispatch: Dispatch<PlaceAction | AlertAction>) => {
    try {
        const { data } = await api.searchUserPlaces(searchType, value, page, limit);
        dispatch({ type: GET_MORE_SEARCHED_PLACES, data });

    } catch (error) {
        handleError(error, dispatch);
    }
};

export const updatePlace = (id: string, formData: FormDataProp, navigate: any) => async (dispatch: Dispatch<PlaceAction | AlertAction>) => {
    try {
        dispatch({ type: START_MINI_LOADING, for: PLACE });
        await api.updatePlace(id, formData);
        dispatch({ type: END_MINI_LOADING, for: PLACE });
        navigate(`/places/${id}`);

    } catch (error) {
        dispatch({ type: END_MINI_LOADING, for: PLACE });
        handleError(error, dispatch);
    }
};

export const deletePlace = (id: string) => async (dispatch: Dispatch<PlaceAction | AlertAction>) => {
    try {
        dispatch({ type: START_MINI_LOADING, for: PLACE });
        await api.deletePlace(id);
        dispatch({ type: DELETE_PLACE, data: id });
        dispatch({ type: END_MINI_LOADING, for: PLACE });
        showAlert(deletion_success, success, dispatch);

    } catch (error) {
        dispatch({ type: END_MINI_LOADING, for: PLACE });
        handleError(error, dispatch);
    }
};