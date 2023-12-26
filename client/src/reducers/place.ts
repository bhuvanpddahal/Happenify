import { Action, ManyData } from '../interfaces/place';
import {
    START_LOADING,
    END_LOADING,
    RESET_PAGE
} from '../constants/action';
import {
    PLACE,
    CREATE_PLACE,
    GET_PLACES,
    GET_USER_PLACES,
    GET_PLACE_BY_ID,
    REMOVE_SELECTED_PLACE,
    GET_MORE_SEARCHED_PLACES,
    SEARCH_PLACES
} from '../constants/place';

const initialState = {
    isLoading: false,
    page: 1,
    limit: 5,
    totalPages: 1,
    places: [],
    selectedPlace: null
};

const placeReducer = (state = initialState, action: Action) => {
    switch(action.type) {
        case START_LOADING:
            if(action.for !== PLACE) return state;
            return { ...state, isLoading: true };
        case END_LOADING:
            if(action.for !== PLACE) return state;
            return { ...state, isLoading: false };
        case CREATE_PLACE:
            return { ...state, places: [action?.data, ...state.places] };
        case GET_PLACES:
        case GET_USER_PLACES:
        case SEARCH_PLACES:
            return {
                ...state,
                places: (action?.data as ManyData)?.places,
                page: (action?.data as ManyData)?.page,
                totalPages: (action?.data as ManyData)?.totalPages
            };
        case GET_MORE_SEARCHED_PLACES:
            return {
                ...state,
                places: [...state.places, ...(action?.data as ManyData)?.places],
                page: (action?.data as ManyData)?.page,
                totalPages: (action?.data as ManyData)?.totalPages
            };
        case GET_PLACE_BY_ID:
            return { ...state, selectedPlace: action?.data };
        case REMOVE_SELECTED_PLACE:
            return { ...state, selectedPlace: null };
        case RESET_PAGE:
            if(action.for !== PLACE) return state;
            return { ...state, places: [], page: 1, totalPages: 1 };
        default:
            return state;
    }
};

export default placeReducer;