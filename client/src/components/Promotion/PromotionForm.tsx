import React, { useState } from 'react';

import Suggestion from '../Utils/Suggestion';
import {
    text,
    guidelines
} from '../../constants/promotion';

const PromotionForm: React.FC = () => {
    const [showSuggestion, setShowSuggestion] = useState(true);

    return (
        <div className='p-3 min-h-full bg-dim'>
            {showSuggestion && (
                <Suggestion
                    setShowSuggestion={setShowSuggestion}
                    text={text}
                    guidelines={guidelines}
                />
            )}
        </div>
    )
};

export default PromotionForm;