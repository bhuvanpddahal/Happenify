import { Dispatch } from 'redux';

import * as api from '../api';
import { Action as EventAction } from '../interfaces/event';
import { Action as AlertAction } from '../interfaces/alert';
import {
    START_LOADING,
    END_LOADING
} from '../constants/action';
import {
    PLACE,
    CREATE_PLACE,
    creation_success
} from '../constants/place';
import { success } from '../constants/alert';
import { FormDataProp } from '../interfaces/place';
import { showAlert } from './alert';
import handleError from '../functions/error';

export const createPlace = (formData: FormDataProp, navigate: any) => async (dispatch: any) => {
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