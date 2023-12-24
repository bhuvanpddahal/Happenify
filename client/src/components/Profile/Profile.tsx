import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Card from './Card';
import ProfileImg from '../../images/profile.png';
import Loader from '../Utils/Loaders/Loader';
import NotFound from '../Utils/NotFound';
import { State } from '../../interfaces/store';
import { getUserById } from '../../actions/auth';
import { REMOVE_SELECTED_USER } from '../../constants/auth';
import { EventOrPlace } from '../../interfaces/auth';

const Profile: React.FC = () => {
    const { id } = useParams();
    const location = useLocation();
    const dispatch: any = useDispatch();
    const [activeTab, setActiveTab] = useState('events');

    useEffect(() => {
        dispatch(getUserById(id || ''));
        return () => {
            dispatch({ type: REMOVE_SELECTED_USER });
        }
    }, [location]);

    const { selectedUser, isLoading } = useSelector((state: State) => state.auth);

    if(isLoading) return <Loader />
    if(!selectedUser) return <NotFound message='No such user' />

    return (
        <div className='bg-dim min-h-full flex flex-col-reverse sm:flex-row gap-3 p-3'>
            <div className='sm:w-60p bg-white p-4 rounded-lg shadow-image'>
                <div className='flex gap-5 md:gap-10'>
                    <div onClick={() => setActiveTab('events')} className={`w-110px py-1 border-b-3 border-solid flex items-center justify-center gap-1 cursor-pointer ${activeTab === 'events' ? 'border-secondary text-primarydark font-medium' : ''}`}>
                        <i className={`${activeTab === 'events' ? 'ri-calendar-check-fill' : 'ri-calendar-check-line'} text-22px`}></i> Events
                    </div>
                    <div onClick={() => setActiveTab('places')} className={`w-110px py-1 border-b-3 border-solid flex items-center justify-center gap-1 cursor-pointer ${activeTab === 'places' ? 'border-secondary text-primarydark font-medium' : ''}`}>
                        <i className={`${activeTab === 'places' ? 'ri-map-2-fill' : 'ri-map-2-line'} text-22px`}></i> Places
                    </div>
                </div>
                <ul className='flex gap-4 flex-wrap mt-5'>
                    {activeTab === 'events' ? (
                        selectedUser?.events?.map((event: EventOrPlace) => (
                            <Card
                                key={event.id}
                                to='events'
                                id={event.id}
                                image={event.image}
                                name={event.name}
                            />
                        ))
                    ) : (
                        selectedUser?.places?.map((place: EventOrPlace) => (
                            <Card
                                key={place.id}
                                to='places'
                                id={place.id}
                                image={place.image}
                                name={place.name}
                            />
                        ))
                    )}
                </ul>
            </div>
            <div className='flex-1'>
                <div className='pt-3 pb-1 flex justify-between mb-3 border-b border-solid border-grey'>
                    <div>Following: 12</div>
                    <div>Followers: 5.8K</div>
                </div>
                <div className='h-70px w-70px mx-auto'>
                    <img className='h-full w-full rounded-full bg-white shadow-image' src={ProfileImg} alt="profile" />
                </div>
                <h1 className='text-center font-medium mt-2'>Bhuvan Pd Dahal</h1>
                <div className='text-center text-15px'>bhuvandahal6@gmail.com</div>
                <div className='text-center mt-3'>
                    <button className='w-160px py-1 bg-primary text-lightgrey rounded-50px transition-bg duration-300 shadow-image hover:bg-primarydark'>
                        <i className="ri-user-follow-line text-18px"></i> Follow
                    </button>
                </div>
                <ul className='mt-3'>
                    <li className='flex items-center gap-1'>
                        <i className="ri-hourglass-line text-18px text-secondarydark"></i>
                        <span>25 Dec 2023</span>
                    </li>
                </ul>
            </div>
        </div>
    )
};

export default Profile;