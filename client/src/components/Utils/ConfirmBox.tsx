import React from 'react';

interface ConfirmBoxProp {
    image: string;
    setShowConfirmBox:  React.Dispatch<React.SetStateAction<boolean>>;
    handleDeleteConfirm: () => void;
}

const ConfirmBox: React.FC<ConfirmBoxProp> = ({
    image,
    setShowConfirmBox,
    handleDeleteConfirm
}: ConfirmBoxProp) => {
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-darktrans z-30'>
            <div className='w-400px p-4 bg-white shadow-normal rounded-xl'>
                <header className='flex items-center justify-between'>
                    <h1 className='font-medium text-dark text-17px'>Delete post</h1>
                    <div onClick={() => setShowConfirmBox(false)} className='h-30px w-30px flex items-center justify-center rounded-full cursor-pointer transition-bg duration-300 hover:bg-lightgrey'>
                        <i className="ri-close-line text-20px"></i>
                    </div>
                </header>
                <h3 className='my-1'>Are you sure you want to delete this post?</h3>
                <img className='w-full h-200px object-cover rounded-md' src={image} alt="post" />
                <div className='flex justify-between mt-4'>
                    <button onClick={handleDeleteConfirm} className='w-100px py-1 bg-secondary rounded-sm transition-bg duration-300 hover:bg-secondarydark'>
                        <i className="ri-thumb-up-line"></i> Yes
                    </button>
                    <button onClick={() => setShowConfirmBox(false)} className='w-100px py-1 bg-primary text-lightgrey rounded-sm transition-bg duration-300 hover:bg-primarydark'>
                        <i className="ri-thumb-down-line"></i> No
                    </button>
                </div>
            </div>
        </div>
    )
};

export default ConfirmBox;