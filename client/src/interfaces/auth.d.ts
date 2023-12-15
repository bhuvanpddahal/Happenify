import { ObjectId } from 'mongodb';

interface Event {
    id: ObjectId;
    image: string;
    name: string;
}

interface User {
    _id: ObjectId;
    fullName: string;
    email: string;
    password: string;
    picture: string;
    events: Event[];
    joinedAt: string;
}

export interface FormDataProp {
    fullName: string;
    email: string;
    password: string;
    picture: string;
}

export interface Action {
    type: string;
    for?: string;
    data?: {
        user?: User;
        token?: string;
        users?: User[];
    }
}

export interface State {
    isLoading: boolean;
    user: User;
    token: string;
    users: User[];
}