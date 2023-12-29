import React from 'react';
import { Link } from 'react-router-dom';

interface RatePlaceBtnProp {
    id: string;
}

const RatePlaceBtn: React.FC<RatePlaceBtnProp> = ({ id }: RatePlaceBtnProp) => {
    return (
        <Link to={`/places/${id}/rate`} className='fixed bottom-16 md:bottom-20 lg:bottom-6 right-6 py-1 px-3 rounded-50px text-15px bg-secondary shadow-box transition-bg duration-300 hover:bg-grey'>
            <i className="ri-emotion-line text-18px"></i> Rate this place
        </Link>
    )
};

export default RatePlaceBtn;