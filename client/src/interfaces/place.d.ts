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