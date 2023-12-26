import React from 'react';

import { OptionsProp } from '../../interfaces/util';

const Options: React.FC<OptionsProp> = ({
    userId,
    holder,
    showOptions,
    toggleShowOptions,
    handleEditClick,
    handleDeleteClick,
    handleBlockPost,
    handleViewOrganizer
}) => {
    return (
        <div onClick={toggleShowOptions} className='h-30px w-30px relative flex items-center justify-center rounded-full cursor-pointer transition-bg duration-300 hover:bg-lightgrey'>
            <i className="ri-more-2-line text-18px"></i>
            <ul className={`absolute bottom-1 right-1 py-1 w-160px bg-white rounded-lg text-15px shadow-image overflow-hidden z-10 transition-transform duration-200 origin-bottom-right ${showOptions ? 'scale-100 pointer-events-auto' : 'scale-0 pointer-events-none'}`}>
                {userId === holder?.id ? (
                    <>
                        <li onClick={handleEditClick} className='py-1 px-3 flex items-center gap-1 hover:bg-lightgrey'>
                            <i className="ri-pencil-fill text-16px text-normal"></i> Edit
                        </li>
                        <li onClick={handleDeleteClick} className='py-1 px-3 flex items-center gap-1 hover:bg-lightgrey'>
                            <i className="ri-delete-bin-6-fill text-16px text-normal"></i> Delete
                        </li>
                    </>
                ) : (
                    <>
                        <li onClick={handleBlockPost} className='py-1 px-3 flex items-center gap-1 hover:bg-lightgrey'>
                            <i className="ri-spam-2-fill text-18px text-normal"></i> Block this post
                        </li>
                        <li onClick={handleViewOrganizer} className='py-1 px-3 flex items-center gap-1 hover:bg-lightgrey'>
                            <i className="ri-eye-fill text-18px text-normal"></i> View organizer
                        </li>
                    </>
                )}
            </ul>
        </div>
    )
};

export default Options;