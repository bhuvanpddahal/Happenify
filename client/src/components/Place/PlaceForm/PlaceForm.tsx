import React, { useState, useRef } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import Condition from './Condition';
import UploadImage from './UploadImage';
import LoadingImg from '../../../images/loading.gif';
import Suggestion from '../../Utils/Suggestion';
import { placeOptions, allFacilities } from '../../../data/place';
import { Option } from '../../../interfaces/util';
import { Facility } from '../../../interfaces/place';
import { createPlace } from '../../../actions/place';
import { State } from '../../../interfaces/store';
import { text } from '../../../constants/place';

const PlaceForm: React.FC = () => {
    const dispatch: any = useDispatch();
    const navigate: any = useNavigate();
    const bottomRef = useRef<HTMLDivElement>(null);
    const conditionInput = useRef<HTMLInputElement>(null);
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
    const [facilities, setFacilities] = useState<string[]>([]);
    const [pricePerHour, setPricePerHour] = useState('');
    const [termsAndConditions, setTermsAndConditions] = useState<string[]>([]);
    const [facebook, setFacebook] = useState('');
    const [twitter, setTwitter] = useState('');
    const refs = [fileInputRef1, fileInputRef2, fileInputRef3];
    const images = [image1, image2, image3];
    const setImages = [setImage1, setImage2, setImage3];

    const toggleFacility = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let newFacilities;
        if(e.target.checked) {
            newFacilities = [...facilities, allFacilities[index].name];
        } else {
            newFacilities = facilities.filter((facility: string) => facility !== allFacilities[index].name);
        }
        setFacilities(newFacilities);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const selectedType = placeOptions.find((option) => option.value === type);
        const value = selectedType?.value || '';
        const typeName = selectedType?.type || '';
        const formData = {
            name,
            location,
            capacity,
            description,
            type: { value, name: typeName },
            contact,
            images: [image1, image2, image3],
            facilities,
            pricePerHour,
            termsAndConditions,
            facebook,
            twitter
        };
        dispatch(createPlace(formData, navigate));
    };

    const addCondition = () => {
        if(!conditionInput.current?.value) return;
        const newTermsAndConditions = [...termsAndConditions, conditionInput.current?.value.trim() || ''];
        setTermsAndConditions(newTermsAndConditions);
        conditionInput.current.value = '';
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const { isLoading } = useSelector((state: State) => state.place);

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
                            number={i + 1}
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
                <div className='mb-3'>
                    <h3 className='text-darkgrey'>Facilities:</h3>
                    <ul className='ml-5 flex gap-x-4 gap-y-3 flex-wrap'>
                        {allFacilities.map((facility: Facility, index: number) => (
                            <li key={index} className='flex items-center gap-1'>
                                <input onChange={(e) => toggleFacility(e, index)} id={facility.id} className='accent-primary' type="checkbox" />
                                <label htmlFor={facility.id}>{facility.name}</label>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='mb-3'>
                    <h3 className='text-darkgrey'>Terms and Conditions:</h3>
                    <ul className='ml-5'>
                        {termsAndConditions.length ? (
                            termsAndConditions.map((condition: string, index: number) => (
                                <Condition
                                    key={index}
                                    index={index}
                                    condition={condition}
                                    termsAndConditions={termsAndConditions}
                                    setTermsAndConditions={setTermsAndConditions}
                                />
                            ))
                        ) : (
                            <div className='py-1'>Add conditions to view here!</div>
                        )}
                        <div ref={bottomRef}></div>
                    </ul>
                    <div className='relative ml-5'>
                        <input ref={conditionInput} className='py-2 pl-3 pr-50px border border-solid border-grey outline-none w-full rounded-sm' type="text" placeholder='Enter a condition' />
                        <i onClick={addCondition} className="ri-add-line absolute text-22px top-0 right-0 h-full w-40px bg-primary text-lightgrey rounded-r-sm cursor-pointer flex items-center justify-center"></i>
                    </div>
                </div>
                <div className='flex items-center flex-wrap-reverse justify-between gap-3 mb-1'>
                    <button className={`relative w-200px py-2 rounded-sm ${isLoading ? 'bg-secondary text-dark cursor-not-allowed' : 'bg-primary text-lightgrey hover:bg-primarydark'}`} type="submit" disabled={isLoading}>
                        {isLoading ? 'Creating...' : (
                            <><i className="ri-add-circle-line"></i> Create my place</>
                        )}
                        <img className='absolute h-40px top-1/2 left-1/2 translate-x-n50p translate-y-n50p' src={LoadingImg} alt="..." hidden={!isLoading} />
                    </button>
                    <p className='text-15px'>By clicking on the 'Create my place' button, you agree to our <Link to='/privacy-policy' className='text-secondarydark cursor-pointer hover:underline'>Privacy policy</Link>.</p>
                </div>
            </form>
        </div>
    )
};

export default PlaceForm;