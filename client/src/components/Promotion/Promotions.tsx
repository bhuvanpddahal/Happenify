import React from 'react';
import { Link } from 'react-router-dom';

import Promotion from './Promotion';

const Promotions: React.FC = () => {
    return (
        <div className='px-3 py-2 bg-dim'>
            <div className='text-center mb-3'>
                <h1 className='text-20px text-dark font-semibold'>Unleash Your Happenings!</h1>
                <p className='text-14px sm:text-15px '>Explore featured products and places.</p>
            </div>

            <Promotion
                title='Featured products'
                promoteLink='/promotions/product'
            />

            <Promotion
                title='Featured places'
                promoteLink='/promotions/place'
            />
        </div>
    )
};

export default Promotions;