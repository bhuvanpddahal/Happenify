import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Suggestion from '../Utils/Suggestion';
import LoadingImg from '../../images/loading.gif';
import { bookEntry } from '../../actions/event';
import { State } from '../../interfaces/store';

const EntryForm: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch: any = useDispatch();
    const [showSuggestion, setShowSuggestion] = useState(true);
    const [phoneNum, setPhoneNum] = useState('');
    const [numOfTickets, setNumOfTickets] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const formData = {
            phoneNum,
            numOfTickets
        };
        console.log(id, formData);
        dispatch(bookEntry(id || '', formData, navigate));
    };

    const { isMiniLoading } = useSelector((state: State) => state.event);

    return (
        <div className='min-h-full p-3 bg-dim'>
            {showSuggestion && (
                <Suggestion
                    setShowSuggestion={setShowSuggestion}
                    text="Please verify that your provided name, email, and phone number are accurate. This helps us keep you informed about any event updates. Also, for any questions or assistance, our friendly team is ready to help. Reach out to us at happenify@gmail.com or 987654321. Thank you for joining us! We look forward to creating lasting memories with you. 🎉"
                    guidelines={[]}
                />
            )}
            <form onSubmit={handleSubmit} className='mb-4 px-4 py-3 bg-white shadow-box rounded-lg'>
                <h1 className='font-semibold text-20px text-dark mb-2'>Enter Your Necessary Details</h1>
                <div className='flex gap-3 mb-3 flex-wrap sm:flex-nowrap'>
                    <input onChange={(e) => setPhoneNum(e.target.value)} className='py-2 px-3 border border-solid border-grey outline-none w-full rounded-sm' value={phoneNum} type="number" placeholder='Phone number *' min={100000} max={100000000000} required />
                    <input onChange={(e) => setNumOfTickets(e.target.value)} className='py-2 px-3 border border-solid border-grey outline-none w-full rounded-sm' value={numOfTickets} type="number" placeholder='Number of tickets *' required />
                </div>
                <div className='flex items-center flex-wrap-reverse justify-between gap-3 mb-1'>
                    <button className={`relative w-200px py-2 rounded-sm ${isMiniLoading ? 'bg-secondary text-dark cursor-not-allowed' : 'bg-primary text-lightgrey hover:bg-primarydark'}`} type="submit" disabled={isMiniLoading}>
                        {isMiniLoading ? 'Booking entry...' : (
                            <><i className="ri-book-2-line"></i> Book my entry pass</>
                        )}
                        <img className='absolute h-40px top-1/2 left-1/2 translate-x-n50p translate-y-n50p' src={LoadingImg} alt="..." hidden={!isMiniLoading} />
                    </button>
                    <p className='text-15px'>By clicking on the 'Create my event' button, you agree to our <Link to='/privacy-policy' className='text-secondarydark cursor-pointer hover:underline'>Privacy policy</Link>.</p>
                </div>
            </form>
        </div>
    )
};

export default EntryForm;