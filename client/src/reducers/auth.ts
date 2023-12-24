import { Action, ManyData } from '../interfaces/auth';
import {
    START_LOADING,
    END_LOADING
} from '../constants/action';
import {
    AUTH,
    SIGNUP,
    LOGIN,
    LOGOUT,
    GET_USER_BY_ID,
    REMOVE_SELECTED_USER
} from '../constants/auth';

const initialState = {
    isLoading: false,
    user: null,
    token: '',
    users: [],
    selectedUser: null
};

const authReducer = (state = initialState, action: Action) => {
    switch(action.type) {
        case START_LOADING:
            if(action.for !== AUTH) return state;
            return { ...state, isLoading: true };
        case END_LOADING:
            if(action.for !== AUTH) return state;
            return { ...state, isLoading: false };
        case SIGNUP:
        case LOGIN:
            localStorage.setItem('HappenifyToken',  (action?.data as ManyData)?.token || '');
            return {
                ...state,
                user: (action?.data as ManyData)?.user,
                token: (action?.data as ManyData)?.token
            };
        case LOGOUT:
            localStorage.removeItem('HappenifyToken');
            return initialState;
        case GET_USER_BY_ID:
            return { ...state, selectedUser: action?.data };
        case REMOVE_SELECTED_USER:
            return { ...state, selectedUser: null };
        default:
            return state;
    }
};

export default authReducer;