import { Dispatch } from 'redux';

import * as api from '../api';
import { Action as PlaceAction } from '../interfaces/place';
import { Action as AlertAction } from '../interfaces/alert';
import {
    START_LOADING,
    END_LOADING
} from '../constants/action';
import {
    PLACE,
    CREATE_PLACE,
    GET_PLACES,
    GET_USER_PLACES,
    GET_PLACE_BY_ID,
    creation_success
} from '../constants/place';
import { success } from '../constants/alert';
import { FormDataProp } from '../interfaces/place';
import { showAlert } from './alert';
import handleError from '../functions/error';

export const createPlace = (formData: FormDataProp, navigate: any) => async (dispatch: Dispatch<PlaceAction | AlertAction>) => {
    try {
        dispatch({ type: START_LOADING, for: PLACE });
        const { data } = await api.createPlace(formData);
        dispatch({ type: CREATE_PLACE, data });
        dispatch({ type: END_LOADING, for: PLACE });
        showAlert(creation_success, success, dispatch);
        navigate('/places');
        
    } catch (error) {
        dispatch({ type: END_LOADING, for: PLACE });
        handleError(error, dispatch);
    }
};

export const getPlaces = (page: number, limit: number) => async (dispatch: Dispatch<PlaceAction | AlertAction>) => {
    try {
        dispatch({ type: START_LOADING, for: PLACE });
        const { data } = await api.getPlaces(page, limit);
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