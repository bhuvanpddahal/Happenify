import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import Card from './Card';
import NotFound from '../../Utils/NotFound';
import { getUserById } from '../../../actions/auth';
import { State } from '../../../interfaces/store';
import { REMOVE_SELECTED_USER } from '../../../constants/auth';

const Follow: React.FC = () => {
    const { id } = useParams();
    const location = useLocation();
    const dispatch: any = useDispatch();
    const isFollowing = location.pathname.includes('/following');
    const [activeTab, setActiveTab] = useState(isFollowing ? 'following' : 'followers');
    
    useEffect(() => {
        dispatch(getUserById(id || ''));
        return () => {
            dispatch({ type: REMOVE_SELECTED_USER });
        };
    }, []);

    const { isLoading, selectedUser } = useSelector((state: State) => state.auth);

    return (
        <div className='bg-dim min-h-full flex justify-center p-3'>
            <div className='bg-white max-w-xl w-full p-4 rounded-lg shadow-box'>
                <div className='flex gap-5 md:gap-10'>
                    <div onClick={() => setActiveTab('following')} className={`w-110px py-1 border-b-3 border-solid flex items-center justify-center gap-1 cursor-pointer ${activeTab === 'following' ? 'border-secondary text-primarydark font-medium' : ''}`}>
                        <i className={`${activeTab === 'following' ? 'ri-user-heart-fill' : 'ri-user-heart-line'} text-22px`}></i> Following
                    </div>
                    <div onClick={() => setActiveTab('followers')} className={`w-110px py-1 border-b-3 border-solid flex items-center justify-center gap-1 cursor-pointer ${activeTab === 'followers' ? 'border-secondary text-primarydark font-medium' : ''}`}>
                        <i className={`${activeTab === 'followers' ? 'ri-user-star-fill' : 'ri-user-star-line'} text-22px`}></i> Followers
                    </div>
                </div>
                <ul className='flex gap-4 flex-wrap mt-5'>
                    {activeTab === 'following' ? (
                        selectedUser?.following?.length ? (
                            [...selectedUser?.following].reverse().map((followed, index) => (
                                <Card
                                    key={index}
                                    id={followed?.id?.toString()}
                                    fullName={followed?.fullName}
                                    email={followed?.email}
                                    picture={followed?.picture}
                                    isLast={index === selectedUser?.following?.length - 1}
                                />
                            ))
                        ) : (
                            <NotFound message='Following nobody' />
                        )
                    ) : (
                        selectedUser?.followers?.length ? (
                            [...selectedUser?.followers].reverse().map((follower, index) => (
                                <Card
                                    key={index}
                                    id={follower?.id?.toString()}
                                    fullName={follower?.fullName}
                                    email={follower?.email}
                                    picture={follower?.picture}
                                    isLast={index === selectedUser?.followers?.length - 1}
                                />
                            ))
                        ) : (
                            <NotFound message='No followers' />
                        )
                    )}
                </ul>
            </div>
        </div>
    )
};

export default Follow;