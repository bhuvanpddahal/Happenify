import { Dispatch } from 'redux';

import * as api from '../api';
import { Action as AuthAction } from '../interfaces/auth';
import { Action as AlertAction } from '../interfaces/alert';
import {
    START_LOADING,
    END_LOADING,
    START_MINI_LOADING,
    END_MINI_LOADING
} from '../constants/action';
import {
    AUTH,
    SIGNUP,
    LOGIN,
    GET_USER_BY_ID,
    FOLLOW_USER,
    UNFOLLOW_USER,
    signup_success,
    login_success,
    follow_success,
    unfollow_success
} from '../constants/auth';
import { success } from '../constants/alert';
import { FormDataProp } from '../interfaces/auth';
import { showAlert } from './alert';
import handleError from '../functions/error';

export const signup = (formData: FormDataProp, navigate: any) => async (dispatch: Dispatch<AuthAction | AlertAction>) => {
    try {
        dispatch({ type: START_LOADING, for: AUTH });
        const { data } = await api.signup(formData);
        dispatch({ type: SIGNUP, data });
        dispatch({ type: END_LOADING, for: AUTH });
        showAlert(signup_success, success, dispatch);
        navigate('/events');
        
    } catch (error) {
        dispatch({ type: END_LOADING, for: AUTH });
        handleError(error, dispatch);
    }
};

export const login = (formData: FormDataProp, navigate: any) => async (dispatch: Dispatch<AuthAction | AlertAction>) => {
    try {
        dispatch({ type: START_LOADING, for: AUTH });
        const { data } = await api.login(formData);
        dispatch({ type: LOGIN, data });
        dispatch({ type: END_LOADING, for: AUTH });
        showAlert(login_success, success, dispatch);
        navigate('/events');

    } catch (error) {
        dispatch({ type: END_LOADING, for: AUTH });
        handleError(error, dispatch);
    }
};

export const loginWithToken = () => async (dispatch: Dispatch<AuthAction | AlertAction>) => {
    try {
        dispatch({ type: START_LOADING, for: AUTH });
        const { data } = await api.loginWithToken();
        dispatch({ type: LOGIN, data });
        dispatch({ type: END_LOADING, for: AUTH });

    } catch (error) {
        dispatch({ type: END_LOADING, for: AUTH });
        handleError(error, dispatch);
    }
};

export const getUserById = (id: string) => async (dispatch: Dispatch<AuthAction | AlertAction>) => {
    try {
        dispatch({ type: START_LOADING, for: AUTH });
        const { data } = await api.getUserById(id);
        dispatch({ type: GET_USER_BY_ID, data });
        dispatch({ type: END_LOADING, for: AUTH });

    } catch (error) {
        dispatch({ type: END_LOADING, for: AUTH });
        handleError(error, dispatch);
    }
};

export const followUser = (id: string) => async (dispatch: Dispatch<AuthAction | AlertAction>) => {
    try {
        dispatch({ type: START_MINI_LOADING, for: AUTH });
        const { data } = await api.followUser(id);
        dispatch({ type: FOLLOW_USER, data });
        dispatch({ type: END_MINI_LOADING, for: AUTH });
        showAlert(follow_success, success, dispatch);

    } catch (error) {
        dispatch({ type: END_MINI_LOADING, for: AUTH });
        handleError(error, dispatch);
    }
};

export const unfollowUser = (id: string) => async (dispatch: Dispatch<AuthAction | AlertAction>) => {
    try {
        dispatch({ type: START_MINI_LOADING, for: AUTH });
        await api.unfollowUser(id);
        dispatch({ type: UNFOLLOW_USER, data: id });
        dispatch({ type: END_MINI_LOADING, for: AUTH });
        showAlert(unfollow_success, success, dispatch);

    } catch (error) {
        dispatch({ type: END_MINI_LOADING, for: AUTH });
        handleError(error, dispatch);
    }
};