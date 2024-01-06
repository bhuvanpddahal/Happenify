import React from 'react';

import LoadingImg from '../../../images/loading.gif';

const Loader: React.FC = () => {
    return (
        <div className='text-center py-4'>
            <img className='h-50px inline-block' src={LoadingImg} alt="Loading..." />
        </div>
    )
};

export default Loader;