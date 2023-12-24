import { ObjectId } from 'mongodb';

export interface EventOrPlace {
    id: ObjectId;
    image: string;
    name: string;
}

interface Follow {
    id: ObjectId;
    fullName: string;
    picture: string;
}

interface ManyData {
    user?: User;
    token?: string;
    users?: User[];
}

interface User {
    _id: ObjectId;
    fullName: string;
    email: string;
    password: string;
    picture: string;
    following: Follow[];
    followers: Follow[];
    events: EventOrPlace[];
    places: EventOrPlace[];
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
    data?: User | ManyData;
}

export interface State {
    isLoading: boolean;
    user: User;
    token: string;
    users: User[];
    selectedUser: User;
}