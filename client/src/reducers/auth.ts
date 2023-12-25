import { Action, ManyData } from '../interfaces/auth';
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
    LOGOUT,
    GET_USER_BY_ID,
    FOLLOW_USER,
    UNFOLLOW_USER,
    REMOVE_SELECTED_USER
} from '../constants/auth';
import { State, User } from '../interfaces/auth';


const initialState = {
    isLoading: false,
    isMiniLoading: false,
    user: null,
    token: '',
    users: [],
    selectedUser: null
};

const authReducer = (state: State = initialState, action: Action) => {
    switch(action.type) {
        case START_LOADING:
            if(action.for !== AUTH) return state;
            return { ...state, isLoading: true };
        case END_LOADING:
            if(action.for !== AUTH) return state;
            return { ...state, isLoading: false };
        case START_MINI_LOADING:
            if(action.for !== AUTH) return state;
            return { ...state, isMiniLoading: true };
        case END_MINI_LOADING:
            if(action.for !== AUTH) return state;
            return { ...state, isMiniLoading: false };
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
        case FOLLOW_USER:
            return {
                ...state,
                user: { ...state.user, following: [...(state.user as User).following, action?.data] }
            };
        case UNFOLLOW_USER:
            return {
                ...state,
                user: {
                    ...state.user,
                    following: state.user?.following.filter((followedUser) => followedUser.id.toString() !== action?.data)
                }
            };
        case REMOVE_SELECTED_USER:
            return { ...state, selectedUser: null };
        default:
            return state;
    }
};

export default authReducer;