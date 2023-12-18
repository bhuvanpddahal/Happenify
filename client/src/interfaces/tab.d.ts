import { Dispatch } from 'redux';

export interface TabsProp {
    page: string;
    title: string;
    para: string;
    createLink: string;
    searchType: string;
    setSearchType: React.Dispatch<React.SetStateAction<string>>;
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
    activeTab: string;
    changeActiveTab: any;
    value1: string;
    value2: string;
    value3: string;
    value4: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
}