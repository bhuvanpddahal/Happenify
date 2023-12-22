import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Suggestion from '../Utils/Suggestion';

const EntryForm: React.FC = () => {
    const [showSuggestion, setShowSuggestion] = useState(true);

    return (
        <div className='p-3'>
            {showSuggestion && (
                <Suggestion
                    setShowSuggestion={setShowSuggestion}
                    text="Please verify that your provided name, email, and phone number are accurate. This helps us keep you informed about any event updates. Also, for any questions or assistance, our friendly team is ready to help. Reach out to us at happenify@gmail.com or 987654321. Thank you for joining us! We look forward to creating lasting memories with you. 🎉"
                    guidelines={[]}
                />
            )}
            <form className='mb-4'>
                <h1 className='font-semibold text-20px text-dark mb-2'>Enter Your Necessary Details</h1>
                <div className='flex gap-3 mb-3 flex-wrap sm:flex-nowrap'>
                    <input className='py-2 px-3 border border-solid border-grey outline-none w-full rounded-sm' type="text" placeholder='Full Name *' required />
                    <input className='py-2 px-3 border border-solid border-grey outline-none w-full rounded-sm' type="email" placeholder='Email *' required />
                    <input className='py-2 px-3 border border-solid border-grey outline-none w-full rounded-sm' type="text" placeholder='Phone Number *' required />
                </div>
                <div className='mb-1'>
                    <textarea className='py-2 px-3 border border-solid border-grey outline-none w-full rounded-sm resize-none' rows={5} placeholder='Message *' required></textarea>
                </div>
                <div className='flex items-center flex-wrap-reverse justify-between gap-3'>
                    <button className='w-200px py-2 rounded-sm bg-primary text-lightgrey hover:bg-primarydark' type="submit"><i className="ri-book-2-line"></i> Book my entry</button>
                    <p className='text-15px'>By clicking on the 'Book my entry' button, you agree to our <Link to='/privacy-policy' className='text-secondarydark cursor-pointer hover:underline'>Privacy policy</Link>.</p>
                </div>
            </form>
        </div>
    )
};

export default EntryForm;