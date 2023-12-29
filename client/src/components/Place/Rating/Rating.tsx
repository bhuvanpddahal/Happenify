import React from 'react';
import { Link } from 'react-router-dom';

import ProfileImg from '../../../images/profile.png';

interface RatingProp {
    id: string;
    fullName: string;
    picture: string;
    star: number;
    review: string;
    isLast: boolean;
}

const Rating: React.FC<RatingProp> = ({
    id,
    fullName,
    picture,
    star,
    review,
    isLast,
}: RatingProp) => {
    return (
        <li className={`border border-solid border-grey px-3 py-2 rounded-md ${!isLast ? 'mb-3' : ''}`}>
            <div className='flex items-center justify-between'>
                <Link to={`/profile/${id}`} className='inline-flex items-center mt-1 gap-2'>
                    <img className='h-40px w-40px border rounded-full object-cover shadow-sm' src={picture || ProfileImg} alt="profile" />
                    <div className='text-15px font-medium'>{fullName}</div>
                </Link>
                <div>
                    {[...Array(5)].map((_, index) => (
                        <i key={index} className={`ri-star-fill text-18px ${star > index ? 'text-secondary' : 'text-grey'}`}></i>
                    ))}
                </div>
            </div>
            <p className='text-15px mt-1 line-clamp-3'>{review}</p>
        </li>
    )
};

export default Rating;