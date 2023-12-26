import React from 'react';

import { handleImgChange } from '../../../functions/util';
import { UploadImageProp } from '../../../interfaces/place';

const UploadImage: React.FC<UploadImageProp> = ({
    number,
    inputRef,
    image,
    setImage,
    required
}: UploadImageProp) => {
    return (
        <div onClick={() => inputRef?.current?.click()} className={`relative mb-3 h-160px sm:h-200px w-full border border-grey ${image.length ? 'border-solid overflow-hidden' : 'border-dashed flex flex-col items-center justify-center p-3'} rounded-sm cursor-pointer`}>
            {image.length ? (
                <img className='h-full w-full object-cover' src={image} alt="img" />
            ) : (
                <>
                    <i className="ri-image-line text-26px text-grey"></i>
                    <p className='text-darkgrey text-center'>Image{number} *</p>
                </>
            )}
            <input ref={inputRef} onChange={(e) => handleImgChange(e, setImage)} className='absolute opacity-0 pointer-events-none' type="file" required={required} />
        </div>
    )
};

export default UploadImage;