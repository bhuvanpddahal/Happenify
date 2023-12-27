import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchbarProp {
    tab: string;
    to: string;
    searchType: string;
    setSearchType: React.Dispatch<React.SetStateAction<string>>;
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const Searchbar: React.FC<SearchbarProp> = ({
    tab,
    to,
    searchType,
    setSearchType,
    searchValue,
    setSearchValue
}: SearchbarProp) => {
    const navigate = useNavigate();
    const [showSearchbar, setShowSearchbar] = useState(false);

    const toggleShowSearchbar = () => {
        setShowSearchbar((prevShowSearchbar) => !prevShowSearchbar);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter' && searchValue) {
            navigate(`/${to}?tab=${tab}&${searchType}=${searchValue}`);
        }
    };

    return (
        <div className='mb-2 h-40px flex items-center justify-end gap-[2px] text-15px sm:text-16px'>
            <div className={`rounded-50px transition-opacity duration-300 overflow-hidden bg-white shadow-box ${showSearchbar ? '' : 'sm:opacity-0 sm:pointer-events-none'}`}>
                <input onKeyDown={handleKeyDown} onChange={(e) => setSearchValue(e.target.value)} value={searchValue} className='outline-none w-120px sm:w-160px border-r border-solid border-grey px-3 py-2 bg-transparent' type="text" placeholder='Search event' />
                <select onChange={(e) => setSearchType(e.target.value)} className=' outline-none px-1 py-2' value={searchType}>
                    <option value="name">Name</option>
                    <option value="location">Location</option>
                </select>
            </div>
            <div onClick={toggleShowSearchbar} className='hidden sm:flex relative h-40px w-40px items-center justify-center bg-white rounded-full shadow-box transition-bg duration-300 cursor-pointer hover:bg-lightgrey'>
                <i className={`ri-search-line absolute text-20px transition-opacity duration-300 ${showSearchbar ? 'opacity-0 pointer-events-none' : ''}`}></i>
                <i className={`ri-close-line absolute text-22px transition-opacity duration-300 ${showSearchbar ? '' : 'opacity-0 pointer-events-none'}`}></i>
            </div>
        </div>
    )
};


export default Searchbar;