import React from 'react';

import Navbar from './Utils/Navbar';
import MainPage from './MainPage';

const Page: React.FC = () => {
    return (
        <div className='flex flex-col h-screen'>
            <Navbar />
            <MainPage />
        </div>
    )
};

export default Page;