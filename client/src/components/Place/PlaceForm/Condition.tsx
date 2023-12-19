import React from 'react';

import { ConditionProp } from '../../../interfaces/place';

const Condition: React.FC<ConditionProp> = ({
    index,
    condition,
    termsAndConditions,
    setTermsAndConditions
}: ConditionProp) => {
    const removeCondition = (index: number) => {
        const newTermsAndConditions = termsAndConditions.filter((condition: string, ind: number) => ind !== index);
        setTermsAndConditions(newTermsAndConditions);
    };

    return (
        <li className='flex items-center'>
            <i className="ri-check-line text-22px text-primarydark"></i>
            <p className='flex-1 px-3 py-1'>{condition}</p>
            <i onClick={() => removeCondition(index)} className="ri-close-line text-22px text-secondarydark cursor-pointer"></i>
        </li>
    )
};

export default Condition;