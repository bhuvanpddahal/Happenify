import React from 'react';
import { Link } from 'react-router-dom';

interface CardProp {
    to: string;
    id: string;
    image: string;
    name: string;
}

const Card: React.FC<CardProp> = ({
    to,
    id,
    image,
    name
}: CardProp) => {
    return (
        <li className='w-250px'>
            <Link to={`/${to}/${id}`} className='inline-block h-160px w-full border border-solid border-grey overflow-hidden rounded-md cursor-pointer'>
                <img className='h-full w-full object-contain transition-transform duration-300 hover:scale-110' src={image} alt={`${name}`} />
            </Link>
            <div className='mt-n5px text-15px text-center line-clamp-1'>{name}</div>
        </li>
    )
};

export default Card;