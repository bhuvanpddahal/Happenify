import React from 'react';

import BlackLogo from '../images/black-logo.png';

const Expenses: React.FC = () => {
    document.title = 'Expenses - Happenify';

    return (
        <div className='h-full flex flex-col items-center justify-center gap-1'>
            <img className='h-50px' src={BlackLogo} alt="Happenify" />
            <span className='text-xl text-normal font-semibold'>We're working on Expenses. It will be out soon.</span>
        </div>
    )
};

export default Expenses;