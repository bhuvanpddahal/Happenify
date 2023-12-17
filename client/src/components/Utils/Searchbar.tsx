import React from 'react';

const Searchbar: React.FC = () => {
    return (
        <div className='flex justify-center mb-5'>
            <input className='w-350px border text-lg border-solid border-grey outline-none px-5 py-3 transition-searchbar duration-300 rounded-l-100px focus:rounded-l-lg' type="text" placeholder={`Search events`} />
            <select className='outline-none text-lg border-y border-r px-3 border-solid border-grey transition-searchbar duration-300 rounded-r-100px focus:rounded-r-lg'>
                <option value="title">Title</option>
                <option value="tag">Tag</option>
            </select>
        </div>
    )
};

export default Searchbar;