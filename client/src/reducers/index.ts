/// <reference types="redux" />
import { combineReducers } from "redux";

import auth from './auth';
import alert from './alert';
import event from './event';

export default combineReducers({ auth, alert, event });