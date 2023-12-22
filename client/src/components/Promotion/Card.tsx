import React from 'react';

import ProductImg from '../../images/product.avif';

interface CardProp {
    title: string;
    image: string;
    description: string;
}

const Card: React.FC<CardProp> = ({
    title,
    image,
    description
}: CardProp) => {
    return (
        <li className='min-w-200px'>
            <h1 className='font-medium text-dark line-clamp-1'>{title}</h1>
            <img className='h-180px w-full rounded-md border border-solid border-grey' src={ProductImg} alt="image" />
            <p className='text-15px line-clamp-3'>{description}</p>
        </li>
    )
};

export default Card;