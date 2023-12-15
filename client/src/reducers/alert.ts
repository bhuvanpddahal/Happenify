import { Action } from '../interfaces/alert';
import {
    SHOW_ALERT,
    HIDE_ALERT
} from '../constants/alert';

const initialState = {
    message: '',
    type: '',
    show: false
};

const alertReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case SHOW_ALERT:
            return { message: action?.message, type: action?.alertType, show: true };
        case HIDE_ALERT:
            return initialState;
        default:
            return state;
    }
};

export default alertReducer;