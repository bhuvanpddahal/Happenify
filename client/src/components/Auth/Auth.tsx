import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Logo from '../../images/main-logo.png';
import LoadingImg from '../../images/loading.gif';
import { signup, login } from '../../actions/auth';
import { LOGOUT } from '../../constants/auth';
import { handleImgChange } from '../../functions/util';
import { State } from '../../interfaces/store';

const Auth: React.FC = () => {
    const dispatch: any = useDispatch();
    const navigate: any = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isLogin, setIsLogin] = useState(true);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [picture, setPicture] = useState('');
     
    const toggleIsLogin = () => {
        setIsLogin((prevIsLogin) => !prevIsLogin);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const formData = {
            fullName,
            email,
            password,
            picture
        };

        if(isLogin) {
            dispatch(login(formData, navigate));
        } else {
            dispatch(signup(formData, navigate));
        }
    };

    useEffect(() => {
        dispatch({ type: LOGOUT });
    }, []);

    const { isLoading } = useSelector((state: State) => state.auth);

    return (
        <div className='p-3 min-h-screen flex items-center justify-center bg-dim'>
            <form onSubmit={handleSubmit} className='mb-4 md:text-17px rounded-lg px-4 py-3 bg-white shadow-box'>
                <div className='text-center mb-3'>
                    <h1 className='font-semibold text-20px text-dark mb-n10px'>{isLogin ? 'Log In' : 'Sign Up'}</h1>
                    <img className='h-40px lg:h-50px inline-block' src={Logo} alt="Happenify" />
                </div>
                <div className='flex gap-3 mb-3 flex-wrap sm:flex-nowrap'>
                    {!isLogin && <input onChange={(e) => setFullName(e.target.value)} value={fullName} className='py-2 px-3 border border-solid border-grey outline-none w-full rounded-sm' type="text" placeholder='Full Name *' required />}
                    <input onChange={(e) => setEmail(e.target.value)} value={email} className='py-2 px-3 border border-solid border-grey outline-none w-full rounded-sm' type="email" placeholder='Email *' required />
                    <input onChange={(e) => setPassword(e.target.value)} value={password} className='py-2 px-3 border border-solid border-grey outline-none w-full rounded-sm' type="password" placeholder='Password *' required />
                </div>
                {!isLogin && (
                    <div onClick={() => fileInputRef?.current?.click()} className={`relative mb-3 h-200px w-full border border-grey ${picture.length ? 'border-solid overflow-hidden' : 'border-dashed flex flex-col items-center justify-center p-3'} rounded-sm cursor-pointer`}>
                        {picture.length ? (
                            <img className='h-full w-full object-cover' src={picture} alt="img" />
                        ) : (
                            <>
                                <i className="ri-image-line text-26px text-grey"></i>
                                <p className='text-darkgrey text-center'>Click to upload an image (This is optional but it's recommended to have a profile picture)</p>
                            </>
                        )}
                        <input ref={fileInputRef} onChange={(e) => handleImgChange(e, setPicture)} className='absolute opacity-0 pointer-events-none' type="file" />
                    </div>
                )}
                <div className='flex items-center flex-wrap-reverse justify-between gap-3 mb-1'>
                    <button className={`relative w-130px py-2 rounded-sm ${isLoading ? 'bg-secondary text-dark cursor-not-allowed' : 'bg-primary text-lightgrey hover:bg-primarydark'}`} type="submit" disabled={isLoading}>
                        {isLoading
                            ? isLogin ? 'Logging in' : 'Signing up'
                            : (
                                <><i className="ri-login-box-line"></i> {isLogin ? 'Log In' : 'Sign Up'}</>
                            )
                        }
                        <img className='absolute h-40px top-1/2 left-1/2 translate-x-n50p translate-y-n50p' src={LoadingImg} alt="..." hidden={!isLoading} />
                    </button>
                    <p className='text-16px'>If you {isLogin ? "don't" : "already"} have an account, <span onClick={toggleIsLogin} className='text-secondarydark cursor-pointer hover:underline'>{isLogin ? 'Sign up' : 'Log in'}</span>.</p>
                </div>
            </form>
        </div>
    )
};

export default Auth;