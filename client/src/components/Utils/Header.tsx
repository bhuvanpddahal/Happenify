import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProp {
    title: string;
    para: string;
    createLink: string;
}

const Header: React.FC<HeaderProp> = ({
    title,
    para,
    createLink
}: HeaderProp) => {
    return (
        <div className='flex justify-between gap-2 items-center flex-wrap mb-2'>
            <div>
                <h1 className='text-20px text-dark font-semibold'>{title}</h1>
                <p className='text-14px sm:text-15px'>{para}</p>
            </div>
            {createLink !== '/calendar' && (
                <Link to={createLink} className='bg-primary px-3 py-1 rounded-md flex items-center gap-1 text-lightgrey cursor-pointer hover:bg-primarydark'>
                    <i className="ri-add-circle-line text-20px"></i> Create
                </Link>
            )}
        </div>
    )
};

export default Header;