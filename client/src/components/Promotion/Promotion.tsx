import React from 'react';
import { Link } from 'react-router-dom';

import Card from './Card';

interface PromotionProp {
    title: string;
    promoteLink: string;
}

const Promotion: React.FC<PromotionProp> = ({
    title,
    promoteLink
}: PromotionProp) => {
    const promotions = [1, 2, 3, 2, 3, 2, 3, 2, 3];

    return (
        <div className='px-4 pt-3 pb-2 bg-white rounded-lg shadow-image mb-4'>
            <h2 className='text-18px text-dark font-semibold'>{title}</h2>
                
            {/* <div className='flex items-center justify-between'>
                <h2 className='text-18px text-dark font-semibold'>{title}</h2>
                <Link to={promoteLink} className='bg-primary px-3 py-1 rounded-md flex items-center gap-2 text-lightgrey cursor-pointer hover:bg-primarydark'>
                    <i className="ri-rocket-line text-20px"></i> Promote
                </Link>
            </div> */}
            <ul className='mt-3 flex gap-3 overflow-visible overflow-x-hidden pb-13px hover:overflow-x-auto hover:pb-2'>
                {promotions.map((promotion: any) => (
                    <Card
                        title='Culinary Delights at FoodFiesta'
                        image=''
                        description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt est ipsa excepturi voluptas ab eveniet velit dolores exercitationem illum quos. Officiis, voluptatem deleniti.'
                    />
                ))}
            </ul>
            <div className='text-right my-2'>
                <Link to={promoteLink} className='bg-primary text-15px px-3 py-1 rounded-md inline-flex items-center gap-1 text-lightgrey cursor-pointer hover:bg-primarydark'>
                    <i className="ri-rocket-line text-18px"></i> Promote
                </Link>
            </div>
        </div>
    )
};

export default Promotion;