import { Action, ManyData } from '../interfaces/place';
import {
    START_LOADING,
    END_LOADING
} from '../constants/action';
import {
    PLACE,
    CREATE_PLACE
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
        default:
            return state;
    }
};

export default placeReducer;