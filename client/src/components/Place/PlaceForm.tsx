import React, { useState } from 'react';

import Suggestion from '../Utils/Suggestion';

const PlaceForm: React.FC = () => {
    const [showSuggestion, setShowSuggestion] = useState(true)

    return (
        <div className='p-3'>
            {showSuggestion && (
                <Suggestion
                    setShowSuggestion={setShowSuggestion}
                    text="Welcome to Place Magic! 🌟 Ready to create an unforgettable experience? Start by adding your place details below. Need inspiration? Check out our tips for crafting the perfect gathering. Let's turn your vision into a Happenify masterpiece! 🚀 #PlaceMagic #CreateMemories"
                />
            )}
        </div>
    )
};

export default PlaceForm;