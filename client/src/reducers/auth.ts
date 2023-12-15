import { Action } from '../interfaces/auth';
import {
    START_LOADING,
    END_LOADING
} from '../constants/action';
import {
    AUTH,
    SIGNUP,
    LOGIN,
    LOGOUT
} from '../constants/auth';

const initialState = {
    isLoading: false,
    user: null,
    token: '',
    users: []
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
            localStorage.setItem('HappenifyToken', action?.data?.token || '');
            return { ...state, user: action?.data?.user, token: action?.data?.token };
        case LOGOUT:
            localStorage.removeItem('HappenifyToken');
            return initialState;
        default:
            return state;
    }
};

export default authReducer;