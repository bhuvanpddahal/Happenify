import { ObjectId } from 'mongodb';

export interface Event {
    _id: ObjectId;
    name: string;
    dateAndTime: string;
    location: string;
    description: string;
    ticketPrice: number;
    organizer: {
        id: ObjectId;
        picture: string;
        fullName: string;
    };
    type: string;
    image: string;
    socialMedia: {
        facebook: string;
        twitter: string;
    };
    contact: string;
    createdAt: string;
}

export interface EventOption {
    type: string;
    value: string;
}

export interface FormDataProp {
    name: string;
    dateAndTime: string;
    location: string;
    ticketPrice: string;
    type: string;
}

interface ManyData {
    events: Event[];
    page: number;
    totalPages: number;
}

export interface Action {
    type: string;
    for?: string;
    data?: Event | ManyData;
}

export interface State {
    isLoading: boolean;
    totalPages: number;
    page: number;
    limit: number;
    events: Event[];
    selectedEvent: Event;
}