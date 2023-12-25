import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import NotFound from '../Utils/NotFound';
import ProfileImg from '../../images/profile.png';
import LoadingImg from '../../images/loading.gif';
import { handleImgChange } from '../../functions/util';
import { State } from '../../interfaces/store';
import { updateProfile } from '../../actions/auth';

const EditProfile: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch: any = useDispatch();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fullName, setFullName] = useState('');
    const [picture, setPicture] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        dispatch(updateProfile(id || '', { fullName, picture }, navigate));
    };

    useEffect(() => {
        setFullName(user?.fullName || '');
        setPicture(user?.picture || '');
    }, []);

    const { isLoading, user } = useSelector((state: State) => state.auth);

    if(!user) return <NotFound message='Please login first' />
    if(user?._id.toString() !== id) return <NotFound message="Cannot edit other's profile" />

    return (
        <div className='p-3 min-h-full flex items-center justify-center bg-dim'>
            <form onSubmit={handleSubmit} className='mb-4 md:text-17px rounded-lg px-4 py-3 bg-white shadow-image'>
                <div className='text-center mb-3'>
                    <h1 className='font-semibold text-20px text-dark'>Update Profile</h1>
                </div>
                <div className='flex gap-3 mb-3 flex-wrap sm:flex-nowrap'>
                    <input onChange={(e) => setFullName(e.target.value)} value={fullName} className='py-2 px-3 border border-solid border-grey outline-none w-full rounded-sm' type="text" placeholder='Update Full Name *' required />
                </div>
                <div onClick={() => fileInputRef?.current?.click()} className={`relative mb-3 h-200px w-full border border-grey ${picture.length ? 'border-solid overflow-hidden' : 'border-dashed flex flex-col items-center justify-center p-3'} rounded-sm cursor-pointer`}>
                    <img className='h-full w-full object-cover' src={picture || ProfileImg} alt="img" />
                    <input ref={fileInputRef} onChange={(e) => handleImgChange(e, setPicture)} className='absolute opacity-0 pointer-events-none' type="file" />
                </div>
                <div className='flex items-center flex-wrap-reverse justify-between gap-3 mb-1'>
                    <button className={`relative w-130px py-2 rounded-sm ${isLoading ? 'bg-secondary text-dark cursor-not-allowed' : 'bg-primary text-lightgrey hover:bg-primarydark'}`} type="submit" disabled={isLoading}>
                        {isLoading ? 'Updating...' : (
                            <><i className="ri-edit-box-line"></i> Update</>
                        )}
                        <img className='absolute h-40px top-1/2 left-1/2 translate-x-n50p translate-y-n50p' src={LoadingImg} alt="..." hidden={!isLoading} />
                    </button>
                </div>
            </form>
        </div>
    )
};

export default EditProfile;