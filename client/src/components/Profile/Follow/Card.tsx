import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import ProfileImg from '../../../images/profile.png';
import LoadingImg from '../../../images/loading.gif';
import { unfollowUser } from '../../../actions/auth';

interface CardProp {
    tab: string;
    userId: string;
    id: string;
    followId: string;
    fullName: string;
    email: string;
    picture: string;
    isLast: boolean;
    dispatch: any;
}

const Card: React.FC<CardProp> = ({
    tab,
    userId,
    id,
    followId,
    fullName,
    email,
    picture,
    isLast,
    dispatch
}: CardProp) => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(true);
    };

    const isMiniLoading = true;

    return (
        <li className={`w-full flex items-center justify-between border border-solid border-grey px-3 py-2 rounded-md ${!isLast ? 'mb-3' : ''}`}>
            <Link to={`/profile/${followId}`} className='inline-flex items-center mt-1 gap-2'>
                <img className='h-40px w-40px border rounded-full object-cover shadow-sm' src={picture || ProfileImg} alt="profile" />
                <div className='text-15px'>
                    <div className='font-medium'>{fullName}</div>
                    <div className='text-dark mt-n5px'>{email}</div>
                </div>
            </Link>
            {tab === 'following' && (
                userId === id && (
                    <button className={`relative w-130px py-1 rounded-50px transition-bg duration-300 text-15px ${isActive && isMiniLoading ? 'bg-secondary text-dark cursor-not-allowed' : 'bg-primary text-lightgrey cursor-pointer hover:bg-primarydark'}`} disabled={isActive && isMiniLoading}>
                        <img className={`absolute h-35px top-1/2 left-1/2 translate-x-n50p translate-y-n50p ${!isActive || !isMiniLoading ? 'hidden' : ''}`} src={LoadingImg} alt="..." />
                    </button>
                )
            )}
        </li>
    )
};

export default Card;