import React from 'react';

interface Guideline {
    header: string;
    para: string;
}

interface SuggestionProp {
    setShowSuggestion: React.Dispatch<React.SetStateAction<boolean>>;
    text: string;
    guidelines: Guideline[];
}

interface GuidelineProp {
    count: number;
    header: string;
    para: string;
}

const Suggestion: React.FC<SuggestionProp> = ({
    setShowSuggestion,
    text,
    guidelines
}: SuggestionProp) => {
    const Guideline: React.FC<GuidelineProp> = ({
        count,
        header,
        para
    }: GuidelineProp) => (
        <li><span className='text-darkgrey'>{count}. {header}:</span> {para}</li>
    );

    return (
        <div className='bg-primary text-lightgrey px-5 py-4 mb-4 rounded-lg text-right shadow-image'>
            <p className='text-left'>{text}</p>
            {guidelines.length > 0 && (
                <ul className='text-left my-2'>
                    {guidelines.map((guideline, index) => (
                        <Guideline
                            key={index}
                            count={index + 1}
                            header={guideline.header}
                            para={guideline.para}
                        />
                    ))}
                </ul>
            )}
            <button onClick={() => setShowSuggestion(false)} className='px-5 py-2 bg-secondary text-dark rounded-sm mt-3 hover:bg-grey'>👍 Got it!</button>
        </div>
    )
};

export default Suggestion;