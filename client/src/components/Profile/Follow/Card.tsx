import React from 'react';
import { Link } from 'react-router-dom';

import ProfileImg from '../../../images/profile.png';

interface CardProp {
    id: string;
    fullName: string;
    email: string;
    picture: string;
    isLast: boolean;
}

const Card: React.FC<CardProp> = ({
    id,
    fullName,
    email,
    picture,
    isLast
}: CardProp) => {
    const isMiniLoading = false;
    return (
        <li className={`w-full flex items-center justify-between border border-solid border-grey px-3 py-2 rounded-md ${!isLast ? 'mb-3' : ''}`}>
            <Link to={`/profile/${id}`} className='inline-flex items-center mt-1 gap-2'>
                <img className='h-40px w-40px border rounded-full object-cover shadow-sm' src={picture || ProfileImg} alt="profile" />
                <div className='text-15px'>
                    <div className='font-medium'>{fullName}</div>
                    <div className='text-dark'>{email}</div>
                </div>
            </Link>
            <button className={`relative w-130px py-1 rounded-50px transition-bg duration-300 text-15px ${isMiniLoading ? 'bg-secondary text-dark cursor-not-allowed' : 'bg-primary text-lightgrey hover:bg-primarydark'}`} disabled={isMiniLoading}>
                <i className="ri-user-unfollow-line"></i> Unfollow
            </button>
        </li>
    )
};

export default Card;