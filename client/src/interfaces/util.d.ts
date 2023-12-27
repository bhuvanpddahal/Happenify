import { ObjectId } from 'mongodb';

export interface Option {
    type: string;
    value: string;
}

export interface Holder {
    id: ObjectId;
    picture: string;
    fullName: string;
}

export interface OptionsProp {
    userId: ObjectId;
    holder: Holder;
    optionsRef: React.RefObject<HTMLDivElement>;
    showOptions: boolean;
    toggleShowOptions: () => void;
    handleEditClick: () => void;
    handleDeleteClick: () => void;
    handleBlockPost: () => void;
    handleViewOrganizer: () => void;
}