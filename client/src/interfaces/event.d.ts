import { ObjectId } from 'mongodb';

interface Type {
    value: string;
    name: string;
}

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
    type: Type;
    image: string;
    socialMedia: {
        facebook: string;
        twitter: string;
    };
    contact: string;
    createdAt: string;
}

export interface EventProp extends Event {
    isLast: boolean;
    userId: ObjectId;
}

export interface FormDataProp {
    name: string;
    dateAndTime: string;
    location: string;
    description: string;
    ticketPrice: string;
    type: Type;
    image: string;
    facebook: string;
    twitter: string;
    contact: string;
}

export interface ManyData {
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