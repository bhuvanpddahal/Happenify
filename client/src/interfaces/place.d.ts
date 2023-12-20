import { ObjectId } from 'mongodb';

interface Rating {
    star: number;
    review: string;
}

export interface Place {
    _id: ObjectId;
    name: string;
    location: string;
    capacity: number;
    description: string;
    type: string;
    contact: string;
    images: string[];
    facilities: string[];
    ratings: Rating[];
    owner: {
        id: ObjectId;
        picture: string;
        fullName: string;
    };
    pricePerHour: number;
    termsAndConditions: string[];
    socialMedia: {
        facebook: string;
        twitter: string;
    };
    createdAt: string;
}

export interface UploadImageProp {
    number: number;
    inputRef: any;
    image: string;
    setImage: any;
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
    type: string;
    contact: string;
    images: string[];
    facilities: string[];
    pricePerHour: string;
    termsAndConditions: string[];
    facebook: string;
    twitter: string;
}

interface ManyData {
    events: Event[];
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
    totalPages: number;
    page: number;
    limit: number;
    places: Place[];
    selectedPlace: Place;
}