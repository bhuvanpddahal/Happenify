import React from 'react';

import NotFoundImg from '../../images/not-found.jpg';

interface Prop {
    message: string;
}

const NotFound: React.FC<Prop> = ({ message }: Prop) => {
    return (
        <div className='h-full w-full flex flex-col items-center justify-center'>
            <img className='h-160px sm:h-200px md:h-250px' src={NotFoundImg} alt="not-found" />
            <div className='text-dark md:text-17px'>{message}</div>
        </div>
    )
};

export default NotFound;