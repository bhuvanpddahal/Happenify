import React, { useState } from 'react';

import LoadingImg from '../../images/loading.gif';

const RatingForm: React.FC = () => {
    const [star, setStar] = useState('1');
    const [review, setReview] = useState('');

    const isLoading = false;

    const handleSubmit = () => {}
    
    return (
        <div className='p-3 min-h-full flex items-center justify-center bg-dim'>
            <form onSubmit={handleSubmit} className='min-w-400px mb-4 md:text-17px rounded-lg px-4 py-3 bg-white shadow-box'>
                <div className='text-center mb-3'>
                    <h1 className='font-semibold text-20px text-dark'>Rate The Place</h1>
                </div>
                <div className='flex items-center justify-between pl-3 border border-solid rounded-sm border-grey mb-3'>
                    <div>
                        {[...Array(5)].map((_, index) => (
                            <i key={index} className={`ri-star-fill text-20px ${Number(star) > index ? 'text-secondary' : 'text-grey'}`}></i>
                        ))}
                    </div>
                    <select onChange={(e) => setStar(e.target.value)} className='outline-none px-3 py-2 border-l border-solid border-grey cursor-pointer' value={star}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div className='mb-1'>
                    <textarea onChange={(e) => setReview(e.target.value)} className='py-2 px-3 border border-solid border-grey outline-none w-full rounded-sm resize-none' rows={5} value={review} placeholder='Write a review *' required></textarea>
                </div>
                <div className='flex items-center flex-wrap-reverse justify-between gap-3 mb-1'>
                    <button className={`relative w-130px py-2 rounded-sm ${isLoading ? 'bg-secondary text-dark cursor-not-allowed' : 'bg-primary text-lightgrey hover:bg-primarydark'}`} type="submit" disabled={isLoading}>
                        {isLoading ? 'Rating...' : (
                            <><i className="ri-quill-pen-line"></i> Rate</>
                        )}
                        <img className='absolute h-40px top-1/2 left-1/2 translate-x-n50p translate-y-n50p' src={LoadingImg} alt="..." hidden={!isLoading} />
                    </button>
                </div>
            </form>
        </div>
    )
};

export default RatingForm;