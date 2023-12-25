import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import LoadingImg from '../../images/loading.gif';
import { eventOptions } from '../../data/event';
import { Option } from '../../interfaces/util';
import { handleImgChange } from '../../functions/util';
import { createEvent } from '../../actions/event';
import { State } from '../../interfaces/store';
import { text } from '../../constants/event';
import Suggestion from '../Utils/Suggestion';

const EventForm: React.FC = () => {
    document.title = 'Create Event - Happenify';
    const dispatch: any = useDispatch();
    const navigate: any = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showSuggestion, setShowSuggestion] = useState(true);
    const [name, setName] = useState('');
    const [dateAndTime, setDateAndTime] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [ticketPrice, setTicketPrice] = useState('');
    const [type, setType] = useState('concert');
    const [image, setImage] = useState('');
    const [facebook, setFacebook] = useState('');
    const [twitter, setTwitter] = useState('');
    const [contact, setContact] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const selectedType = eventOptions.find((option) => option.value === type);
        const value = selectedType?.value || '';
        const typeName = selectedType?.type || '';
        const formData = {
            name,
            dateAndTime,
            location,
            description,
            ticketPrice,
            type: { value, name: typeName },
            image,
            facebook,
            twitter,
            contact
        };
        dispatch(createEvent(formData, navigate));
    };

    const { isLoading } = useSelector((state: State) => state.event);

    return (
        <div className='p-3 bg-dim'>
            {showSuggestion && (
                <Suggestion
                    setShowSuggestion={setShowSuggestion}
                    text={text}
                    guidelines={[]}
                />
            )}
            <form onSubmit={handleSubmit} className='px-4 py-3 bg-white shadow-image rounded-lg'>
                <h1 className='font-semibold text-20px text-dark mb-2'>Enter The Necessary Event Details</h1>
                <div className='flex gap-3 mb-3 flex-wrap sm:flex-nowrap'>
                    <input onChange={(e) => setName(e.target.value)} className='py-2 px-3 border border-solid border-grey outline-none w-full rounded-sm' value={name} type="text" placeholder='Name *' required />
                    <input onChange={(e) => setDateAndTime(e.target.value)} className='py-2 px-3 border border-solid border-grey outline-none w-full rounded-sm' value={dateAndTime} type="datetime-local" placeholder='Date *' required />
                    <input onChange={(e) => setLocation(e.target.value)} className='py-2 px-3 border border-solid border-grey outline-none w-full rounded-sm' value={location} type="text" placeholder='Location *' required />
                </div>
                <div className='mb-1'>
                    <textarea onChange={(e) => setDescription(e.target.value)} className='py-2 px-3 border border-solid border-grey outline-none w-full rounded-sm resize-none' rows={5} value={description} placeholder='Description *' required></textarea>
                </div>
                <div className='flex gap-3 mb-4 flex-wrap sm:flex-nowrap'>
                    <input onChange={(e) => setTicketPrice(e.target.value)} className='py-2 px-3 border border-solid border-grey outline-none w-full rounded-sm' value={ticketPrice} type="number" placeholder='Ticket price *' required />
                    <select onChange={(e) => setType(e.target.value)} className='py-2 px-3 border border-solid border-grey outline-none w-full rounded-sm' value={type}>
                        {eventOptions.map((option: Option) => (
                            <option key={option.value} value={option.value}>{option.type}</option>
                        ))}
                    </select>
                </div>
                <div onClick={() => fileInputRef?.current?.click()} className={`relative mb-3 h-200px w-full border border-grey ${image.length ? 'border-solid overflow-hidden' : 'border-dashed flex flex-col items-center justify-center p-3'} rounded-sm cursor-pointer`}>
                    {image.length ? (
                        <img className='h-full w-full object-cover' src={image} alt="img" />
                    ) : (
                        <>
                            <i className="ri-image-line text-26px text-grey"></i>
                            <p className='text-darkgrey text-center'>Click to upload an event related image (This is mandatory)</p>
                        </>
                    )}
                    <input ref={fileInputRef} onChange={(e) => handleImgChange(e, setImage)} className='absolute opacity-0 pointer-events-none' type="file" required />
                </div>
                <div className='flex gap-3 mb-3 flex-wrap sm:flex-nowrap'>
                    <input onChange={(e) => setFacebook(e.target.value)} className='py-2 px-3 border border-solid border-grey outline-none w-full rounded-sm' value={facebook} type="text" placeholder='Facebook account *' required />
                    <input onChange={(e) => setTwitter(e.target.value)} className='py-2 px-3 border border-solid border-grey outline-none w-full rounded-sm' value={twitter} type="text" placeholder='Twitter account *' required />
                    <input onChange={(e) => setContact(e.target.value)} className='py-2 px-3 border border-solid border-grey outline-none w-full rounded-sm' value={contact} type="email" placeholder='Conatct email *' required />
                </div>
                <div className='flex items-center flex-wrap-reverse justify-between gap-3 mb-1'>
                    <button className={`relative w-200px py-2 rounded-sm ${isLoading ? 'bg-secondary text-dark cursor-not-allowed' : 'bg-primary text-lightgrey hover:bg-primarydark'}`} type="submit" disabled={isLoading}>
                        {isLoading ? 'Creating...' : (
                            <><i className="ri-add-circle-line"></i> Create my event</>
                        )}
                        <img className='absolute h-40px top-1/2 left-1/2 translate-x-n50p translate-y-n50p' src={LoadingImg} alt="..." hidden={!isLoading} />
                    </button>
                    <p className='text-15px'>By clicking on the 'Create my event' button, you agree to our <Link to='/privacy-policy' className='text-secondarydark cursor-pointer hover:underline'>Privacy policy</Link>.</p>
                </div>
            </form>
        </div>
    )
};

export default EventForm;