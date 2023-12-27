import React from 'react';

import Loader from './Loader';
import { numOfLoaders } from '../../../../constants/promotion';

const SkeletonLoader: React.FC = () => {
    return (
        <div className='mt-5'>
            {[...Array(numOfLoaders)].map((_, index: number) => (
                <Loader
                    key={index}
                    count={index + 1}
                />
            ))}
        </div>
    )
};

export default SkeletonLoader;