import { ObjectId } from 'mongodb';

import { Holder, SocialMedia } from './util';

interface Type {
    value: string;
    name: string;
}

interface Booker {
    id: ObjectId;
    fullName: string;
    picture: string;
    phoneNum: string;
    numOfTickets: string;
}

interface Bookings {
    bookers: Booker[];
    total: number;
}

export interface Event {
    _id: ObjectId;
    name: string;
    dateAndTime: string;
    location: string;
    description: string;
    ticketPrice: string;
    capacity: string;
    organizer: Holder;
    type: Type;
    image: string;
    bookings: Bookings;
    socialMedia: SocialMedia;
    contact: string;
    createdAt: string;
}

export interface EventProp extends Event {
    isLast: boolean;
    userId: ObjectId;
    dispatch: any;
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

export interface BookData {
    phoneNum: string;
    numOfTickets: string;
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
    isMiniLoading: boolean;
    totalPages: number;
    page: number;
    limit: number;
    events: Event[];
    selectedEvent: Event;
}