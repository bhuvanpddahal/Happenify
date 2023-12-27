import { ObjectId } from 'mongodb';

import { Holder } from './util';

interface Type {
    value: string;
    name: string;
}

interface Rating {
    star: number;
    review: string;
}

export interface Place {
    _id: ObjectId;
    name: string;
    location: string;
    capacity: string;
    description: string;
    type: Type;
    contact: string;
    images: string[];
    facilities: string[];
    ratings: Rating[];
    owner: Holder;
    pricePerHour: string;
    termsAndConditions: string[];
    socialMedia: {
        facebook: string;
        twitter: string;
    };
    createdAt: string;
}

export interface PlaceProp extends Place {
    isLast: boolean;
    userId: ObjectId;
    dispatch: any;
}

export interface UploadImageProp {
    number: number;
    inputRef: any;
    image: string;
    setImage: any;
    required: boolean;
}

export interface ConditionProp {
    index: number;
    condition: string;
    termsAndConditions: string[];
    setTermsAndConditions: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface Facility {
    id: string;
    name: string;
}

export interface FormDataProp {
    name: string;
    location: string;
    capacity: string;
    description: string;
    type: Type;
    contact: string;
    images: string[];
    facilities: string[];
    pricePerHour: string;
    termsAndConditions: string[];
    facebook: string;
    twitter: string;
}

interface ManyData {
    places: Place[];
    page: number;
    totalPages: number;
}

export interface Action {
    type: string;
    for?: string;
    data?: Place | ManyData;
}

export interface State {
    isLoading: boolean;
    isMiniLoading: boolean;
    totalPages: number;
    page: number;
    limit: number;
    places: Place[];
    selectedPlace: Place;
}