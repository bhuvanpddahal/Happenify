import React from 'react';

interface SuggestionProp {
    setShowSuggestion: React.Dispatch<React.SetStateAction<boolean>>;
    text: string;
}

const Suggestion: React.FC<SuggestionProp> = ({
    setShowSuggestion,
    text
}: SuggestionProp) => {
    return (
        <div className='bg-primary text-lightgrey px-5 py-4 mb-4 rounded-lg text-right'>
            <p className='text-left'>{text}</p>
            <button onClick={() => setShowSuggestion(false)} className='px-5 py-2 bg-secondary text-dark rounded-sm mt-3 hover:bg-grey'>👍 Got it!</button>
        </div>
    )
};

export default Suggestion;