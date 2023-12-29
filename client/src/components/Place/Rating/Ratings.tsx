import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Rating from './Rating';
import NotFound from '../../Utils/NotFound';
import Loader from '../../Utils/Loaders/Loader';
import { State } from '../../../interfaces/store';
import { getPlaceById } from '../../../actions/place';
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE_SELECTED_PLACE } from '../../../constants/place';

const Ratings: React.FC = () => {
    const { id } = useParams();
    const dispatch: any = useDispatch();

    useEffect(() => {
        dispatch(getPlaceById(id || ''));
        return () => {
            dispatch({ type: REMOVE_SELECTED_PLACE });
        };
    }, []);

    const { isLoading, selectedPlace } = useSelector((state: State) => state.place);

    return (
        <div className='p-3 min-h-full flex items-center justify-center bg-dim'>
            <div className='max-w-xl w-full mb-4 md:text-17px rounded-lg px-4 py-3 bg-white shadow-box'>
                <div className='text-center mb-3'>
                    <h1 className='font-semibold text-20px text-dark'>Ratings</h1>
                </div>
                {isLoading 
                    ? <Loader />
                    :  selectedPlace ? (
                        selectedPlace?.ratings?.raters?.length ? (
                            <ul className='mb-1'>
                                {selectedPlace?.ratings?.raters?.map((rater, index) => (
                                    <Rating
                                        key={index}
                                        id={rater?.id?.toString()}
                                        fullName={rater?.fullName}
                                        picture={rater?.picture}
                                        star={rater?.star}
                                        review={rater?.review}
                                        isLast={index === selectedPlace?.ratings?.raters?.length - 1}
                                    />
                                ))}
                            </ul>
                        ) : (
                            <NotFound message='No ratings' />
                        )
                    ) : (
                        <NotFound message='Place not found' />
                    )
                }
            </div>
        </div>
    )
};

export default Ratings;

// (
    
// )