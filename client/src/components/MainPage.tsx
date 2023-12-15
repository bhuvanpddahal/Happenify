import React from 'react';

import Sidebar from './Sidebar';
import Content from './Content';

const MainPage: React.FC = () => {
    return (
        <div className='flex flex-1'>
            <Sidebar />
            <Content />
        </div>
    )
};

export default MainPage;