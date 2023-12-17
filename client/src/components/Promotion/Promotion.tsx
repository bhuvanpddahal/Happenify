import React from 'react';

interface PromotionProp {
    title: string;
    image: string;
    description: string;
}

const Promotion: React.FC<PromotionProp> = ({
    title,
    image,
    description
}: PromotionProp) => {
    return (
        <li className='min-w-200px'>
            <h1 className='font-medium line-clamp-1'>{title}</h1>
            <img className='h-180px w-full rounded-md shadow-image' src={image} alt="image" />
            <p className='text-15px line-clamp-3'>{description}</p>
        </li>
    )
};

export default Promotion;