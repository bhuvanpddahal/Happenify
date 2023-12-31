import React from 'react';

import BlackLogo from '../images/black-logo.png';

const Analytics: React.FC = () => {
    document.title = 'Analytics - Happenify';

    return (
        <div className='h-full flex flex-col items-center justify-center gap-1'>
            <img className='h-50px' src={BlackLogo} alt="Happenify" />
            <span className='text-xl text-normal font-semibold'>We're working on Analytics. It will be out soon.</span>
        </div>
    )
};

export default Analytics;