import { Dispatch } from 'redux';
import { AxiosError } from 'axios';

import { Action } from '../interfaces/alert';
import { showAlert } from '../actions/alert';
import { failure } from '../constants/alert';

function isAxiosError(error: any): error is AxiosError {
    return error.isAxiosError === true;
}

const handleError = (error: any, dispatch: Dispatch<Action>) => {
    if (isAxiosError(error)) {
        let errorMessage = "An error occurred";
        if (error?.response?.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
            if(typeof error.response.data.message === "string") errorMessage = error.response.data.message;
        }
        showAlert(errorMessage, failure, dispatch);
    }
};

export default handleError;