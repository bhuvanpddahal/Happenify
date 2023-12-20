import { State as AuthState } from './auth';
import { State as AlertState } from './alert';
import { State as EventState } from './event';
import { State as PlaceState } from './place';

export interface State {
    auth: AuthState;
    alert: AlertState;
    event: EventState;
    place: PlaceState;
}