import React from 'react';

import WhiteLogo from '../../images/white-logo.png';

const Footer: React.FC = () => {
    return (
        <div className='bg-primarydark px-3 py-1'>
            <div className='text-white text-15px md:text-16px flex items-center justify-center gap-2 rounded-sm'>
                <div>Copyright ©</div>
                <img className='h-30px md:h-35px' src={WhiteLogo} alt="Happenify" />
                <div>2023. All rights reserved.</div>
            </div>
        </div>
    )
};

export default Footer;