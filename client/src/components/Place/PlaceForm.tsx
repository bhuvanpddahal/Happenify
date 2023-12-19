import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Suggestion from '../Utils/Suggestion';
import { handleImgChange } from '../../functions/util';
import { placeOptions } from '../../data/place';
import { Option } from '../../interfaces/util';

const PlaceForm: React.FC = () => {
    const dispatch: any = useDispatch();
    const navigate: any = useNavigate();
    const fileInputRef1 = useRef<HTMLInputElement>(null);
    const fileInputRef2 = useRef<HTMLInputElement>(null);
    const fileInputRef3 = useRef<HTMLInputElement>(null);
    const [showSuggestion, setShowSuggestion] = useState(true);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [capacity, setCapacity] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('hotel');
    const [contact, setContact] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [facilities, setFacilities] = useState([]);
    const [accessibility, setAccessability] = useState([]);
    const [bookingProcess, setBookingProcess] = useState([]);
    const [pricePerHour, setPricePerHour] = useState('');
    const [termsAndConditions, setTermsAndConditions] = useState([]);
    const [facebook, setFacebook] = useState('');
    const [twitter, setTwitter] = useState('');
    const refs = [fileInputRef1, fileInputRef2, fileInputRef3];
    const images = [image1, image2, image3];
    const setImages = [setImage1, setImage2, setImage3];

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // const formData = {
        //     name,
        //     dateAndTime,
        //     location,
        //     description,
        //     ticketPrice,
        //     type,
        //     image,
        //     facebook,
        //     twitter,
        //     contact
        // };
        // dispatch(createPlace(formData, navigate));
    };

    interface UploadImageProp {
        index: number;
        inputRef: any;
        image: string;
        setImage: any;
    }

    const UploadImage = ({ index, inputRef, image, setImage }: UploadImageProp) => (
        <div onClick={() => inputRef?.current?.click()} className={`relative mb-3 h-160px sm:h-200px w-full border border-grey ${image.length ? 'border-solid overflow-hidden' : 'border-dashed flex flex-col items-center justify-center p-3'} rounded-sm cursor-pointer`}>
            {image.length ? (
                <img className='h-full w-full object-cover' src={image} alt="img" />
            ) : (
                <>
                    <i className="ri-image-line text-26px text-grey"></i>
                    <p className='text-darkgrey text-center'>Image{index + 1} *</p>
                </>
            )}
            <input ref={inputRef} onChange={(e) => handleImgChange(e, setImage)} className='absolute opacity-0 pointer-events-none' type="file" required />
        </div>
    );

    return (
        <div className='p-3'>
            {showSuggestion && (
                <Suggestion
                    setShowSuggestion={setShowSuggestion}
                    text="Welcome to Place Magic! 🌟 Ready to create an unforgettable experience? Start by adding your place details below. Need inspiration? Check out our tips for crafting the perfect gathering. Let's turn your vision into a Happenify masterpiece! 🚀 #PlaceMagic #CreateMemories"
                />
            )}
            <form onSubmit={handleSubmit} className='mb-4'>
                <h1 className='font-semibold text-20px text-dark mb-2'>Enter The Necessary Place Details</h1>
                <div className='flex gap-3 mb-3 flex-wrap sm:flex-nowrap'>
                    <input onChange={(e) => setName(e.target.value)} className='py-2 px-3 border border-solid border-grey outline-none w-full rounded-sm' value={name} type="text" placeholder='Name *' required />
                    <input onChange={(e) => setLocation(e.target.value)} className='py-2 px-3 border border-solid border-grey outline-none w-full rounded-sm' value={location} type="text" placeholder='Location *' required />
                    <input onChange={(e) => setCapacity(e.target.value)} className='py-2 px-3 border border-solid border-grey outline-none w-full rounded-sm' value={capacity} type="number" placeholder='Capacity *' required />
                </div>
                <div className='mb-1'>
                    <textarea onChange={(e) => setDescription(e.target.value)} className='py-2 px-3 border border-solid border-grey outline-none w-full rounded-sm resize-none' rows={5} value={description} placeholder='Description *' required></textarea>
                </div>
                <div className='flex gap-3 mb-4 flex-wrap sm:flex-nowrap'>
                    <input onChange={(e) => setPricePerHour(e.target.value)} className='py-2 px-3 border border-solid border-grey outline-none w-full rounded-sm' value={pricePerHour} type="number" placeholder='Price per hour *' required />
                    <select onChange={(e) => setType(e.target.value)} className='py-2 px-3 border border-solid border-grey outline-none w-full rounded-sm' value={type}>
                        {placeOptions.map((option: Option) => (
                            <option key={option.value} value={option.value}>{option.type}</option>
                        ))}
                    </select>
                </div>
                <div className='flex flex-col sm:flex-row gap-3'>
                    {[...Array(3)].map((_, i) => (
                        <UploadImage
                        key={i}
                        index={i}
                        inputRef={refs[i]}
                        image={images[i]}
                        setImage={setImages[i]}
                        />
                    ))}
                </div>
                <div className='flex gap-3 mb-3 flex-wrap sm:flex-nowrap'>
                    <input onChange={(e) => setFacebook(e.target.value)} className='py-2 px-3 border border-solid border-grey outline-none w-full rounded-sm' value={facebook} type="text" placeholder='Facebook account *' required />
                    <input onChange={(e) => setTwitter(e.target.value)} className='py-2 px-3 border border-solid border-grey outline-none w-full rounded-sm' value={twitter} type="text" placeholder='Twitter account *' required />
                    <input onChange={(e) => setContact(e.target.value)} className='py-2 px-3 border border-solid border-grey outline-none w-full rounded-sm' value={contact} type="email" placeholder='Conatct email *' required />
                </div>
            </form>
        </div>
    )
};

export default PlaceForm;