import React from 'react';
import Promotion from './Promotion';

const Promotions: React.FC = () => {
    const promotions = [1, 2, 3, 2, 3, 2, 3, 2, 3];

    return (
        <div className='px-3 py-2 bg-dim'>
            <div className='text-center mb-3'>
                <h1 className='text-20px text-dark font-semibold'>Unleash Your Happenings!</h1>
                <p className='text-14px sm:text-15px '>Explore featured products and places.</p>
            </div>
            <div className='px-4 pt-3 pb-2 bg-white rounded-lg shadow-image mb-4'>
                <h2 className='text-18px text-dark font-semibold'>Featured products</h2>
                <ul className='mt-3 flex gap-3 overflow-x-auto overflow-visible'>
                    {promotions.map((promotion: any) => (
                        <Promotion
                            title='Culinary Delights at FoodFiesta'
                            image=''
                            description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt est ipsa excepturi voluptas ab eveniet velit dolores exercitationem illum quos. Officiis, voluptatem deleniti.'
                        />
                    ))}
                </ul>
            </div>
            <div className='px-4 pt-3 pb-2 bg-white rounded-lg shadow-image mb-2'>
                <h2 className='text-18px text-dark font-semibold'>Featured places</h2>
                <ul className='mt-3 flex gap-3 overflow-x-auto overflow-visible'>
                    {promotions.map((promotion: any) => (
                        <Promotion
                            title='Culinary Delights at FoodFiesta'
                            image=''
                            description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt est ipsa excepturi voluptas ab eveniet velit dolores exercitationem illum quos. Officiis, voluptatem deleniti.'
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
};

export default Promotions;