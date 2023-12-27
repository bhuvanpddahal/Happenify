import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Card from './Card';
import LoadingImg from '../../images/loading.gif';
import ProfileImg from '../../images/profile.png';
import Loader from '../Utils/Loaders/Loader';
import NotFound from '../Utils/NotFound';
import { State } from '../../interfaces/store';
import { getUserById } from '../../actions/auth';
import { REMOVE_SELECTED_USER } from '../../constants/auth';
import { EventOrPlace, Follow } from '../../interfaces/auth';
import {
    followUser,
    unfollowUser
} from '../../actions/auth';

const Profile: React.FC = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch: any = useDispatch();
    const [activeTab, setActiveTab] = useState('events');

    const handleClick = () => {
        if(isCurrentUser) {
            navigate(`/profile/${id}/edit`);
        } else {
            if(isFollowing) {
                dispatch(unfollowUser(id || ''));
            } else {
                dispatch(followUser(id || ''));
            }
        }
    };

    useEffect(() => {
        document.title = 'Profile - Happenify';
        dispatch(getUserById(id || ''));
        return () => {
            dispatch({ type: REMOVE_SELECTED_USER });
        }
    }, [location]);

    const { selectedUser, user, isLoading, isMiniLoading } = useSelector((state: State) => state.auth);
    const isCurrentUser = selectedUser?._id === user?._id;
    let isFollowing: Follow | undefined;
    if(!isCurrentUser) isFollowing = user?.following.find((followedUser) => followedUser.id === selectedUser?._id);
    
    if(isLoading) return <Loader />
    if(!selectedUser) return <NotFound message='No such user' />

    return (
        <div className='bg-dim min-h-full flex flex-col-reverse sm:flex-row gap-3 p-3'>
            <div className='sm:w-60p bg-white p-4 rounded-lg shadow-modal'>
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
                        selectedUser?.events.length ? (
                            [...selectedUser?.events].reverse().map((event: EventOrPlace) => (
                                <Card
                                    key={event.id}
                                    to='events'
                                    id={event.id}
                                    image={event.image}
                                    name={event.name}
                                />
                            ))
                        ) : (
                            <NotFound message='No events' />
                        )
                    ) : (
                        selectedUser?.places.length ? (
                            [...selectedUser?.places].reverse().map((place: EventOrPlace) => (
                                <Card
                                    key={place.id}
                                    to='places'
                                    id={place.id}
                                    image={place.image}
                                    name={place.name}
                                />
                            ))
                        ) : (
                            <NotFound message='No places' />
                        )
                    )}
                </ul>
            </div>
            <div className='flex-1'>
                <div className='pt-3 pb-1 flex justify-between mb-3 border-b border-solid border-grey'>
                    <div>Following: {selectedUser?.following.length}</div>
                    <div>Followers: {selectedUser?.followers.length}</div>
                </div>
                <div className='h-70px w-70px mx-auto'>
                    <img className='h-full w-full rounded-full bg-white shadow-box' src={selectedUser?.picture || ProfileImg} alt="profile" />
                </div>
                <h1 className='text-center font-medium mt-2'>{selectedUser?.fullName}</h1>
                <div className='text-center text-15px mt-n5px'>{selectedUser?.email}</div>
                <div className='text-center mt-3'>
                    <button onClick={handleClick} className={`relative w-160px py-1 rounded-50px transition-bg duration-300 ${isMiniLoading ? 'bg-secondary text-dark cursor-not-allowed' : 'bg-primary text-lightgrey hover:bg-primarydark'}`} disabled={isMiniLoading}>
                        {isCurrentUser ? (
                            <><i className="ri-pencil-line text-18px"></i> Edit profile</>
                        ) : (
                            isFollowing ? (
                                <><i className="ri-user-unfollow-line text-18px"></i> {isMiniLoading ? 'Unfollowing...' : 'Unfollow'}</>
                            ) : (
                                <><i className="ri-user-follow-line text-18px"></i> {isMiniLoading ? 'Following...' : 'Follow'}</>
                            )
                        )}
                        <img className='absolute h-40px top-1/2 left-1/2 translate-x-n50p translate-y-n50p' src={LoadingImg} alt="..." hidden={!isMiniLoading} />
                    </button>
                    {isCurrentUser && (
                        <Link to='/auth' className='py-2 px-3 ml-2 rounded-full bg-secondary transition-bg duration-300 hover:bg-grey'>
                            <i className="ri-logout-box-r-line text-18px"></i>
                        </Link>
                    )}
                </div>
                <ul className='mt-3'>
                    <li className='flex items-center gap-1'>
                        <i className="ri-hourglass-line text-18px text-secondarydark"></i>
                        <span>{moment(selectedUser?.joinedAt).format('LL')}</span>
                    </li>
                </ul>
            </div>
        </div>
    )
};

export default Profile;