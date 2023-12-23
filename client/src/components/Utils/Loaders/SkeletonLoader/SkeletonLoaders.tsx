import React from 'react';

import SkeletonLoader from './SkeletonLoader';
import { numOfLoaders } from '../../../../constants/promotion';

const SkeletonLoaders: React.FC = () => {
    return (
        <div className='mt-5'>
            {[...Array(numOfLoaders)].map((_, index: number) => (
                <SkeletonLoader count={index + 1} />
            ))}
        </div>
    )
};

export default SkeletonLoaders;