import React from 'react';
import { Link } from 'react-router-dom';

import { TabsProp } from '../../interfaces/tab';
import { mapIcon, mapText } from '../../functions/tab';

const Tabs: React.FC<TabsProp> = ({
    title,
    para,
    createLink,
    activeTab,
    setActiveTab,
    value1,
    value2,
    value3,
    value4,
    option1,
    option2,
    option3,
    option4
}: TabsProp) => {
    return (
        <>
            <div className='flex justify-between gap-2 items-center flex-wrap mb-5'>
                <div>
                    <h1 className='text-20px text-dark font-semibold'>{title}</h1>
                    <p className='text-14px sm:text-15px'>{para}</p>
                </div>
                <Link to={createLink} className='bg-primary px-3 py-1 sm:text-17px rounded-md flex items-center gap-2 text-lightgrey cursor-pointer hover:bg-primarydark'>
                    <i className="ri-add-circle-line text-20px md:text-22px"></i> Create
                </Link>
            </div>

            {/* For larger devices */}
            <div className='hidden sm:flex gap-5 md:gap-10 lg:text-17px'>
                <div onClick={() => setActiveTab(value1)} className={`w-150px py-1 border-b-3 border-solid flex items-center justify-center gap-1 cursor-pointer ${activeTab === value1 ? 'border-secondary text-primarydark font-medium' : ''}`}>
                    <i className={`${activeTab === value1 ? 'ri-fire-fill' : 'ri-fire-line'} text-22px`}></i> {option1}
                </div>
                <div onClick={() => setActiveTab(value2)} className={`w-150px py-1 border-b-3 border-solid flex items-center justify-center gap-1 cursor-pointer ${activeTab === value2 ? 'border-secondary text-primarydark font-medium' : ''}`}>
                    <i className={`${activeTab === value2 ? 'ri-shield-star-fill' : 'ri-shield-star-line'} text-22px`}></i> {option2}
                </div>
                <div onClick={() => setActiveTab(value3)} className={`w-150px py-1 border-b-3 border-solid flex items-center justify-center gap-1 cursor-pointer ${activeTab === value3 ? 'border-secondary text-primarydark font-medium' : ''}`}>
                    <i className={`${activeTab === value3 ? 'ri-eye-2-fill' : 'ri-eye-2-line'} text-22px`}></i> {option3}
                </div>
                <div onClick={() => setActiveTab(value4)} className={`w-150px py-1 border-b-3 border-solid flex items-center justify-center gap-1 cursor-pointer ${activeTab === value4 ? 'border-secondary text-primarydark font-medium' : ''}`}>
                    <i className={`${activeTab === value4 ? 'ri-checkbox-fill' : 'ri-checkbox-line'} text-22px`}></i> {option4}
                </div>
            </div>

            {/* For mobile devices */}
            <div className='sm:hidden flex items-center justify-between flex-wrap gap-2'>
                <div className={`w-150px py-1 border-b-3 border-solid flex items-center justify-center gap-1 border-secondary text-primarydark font-medium`}>
                    <i className={`${mapIcon(activeTab)} text-22px`}></i> {mapText(activeTab)}
                </div>
                <select onChange={(e) => setActiveTab(e.target.value)} value={activeTab} className='border border-solid border-grey px-3 py-2 cursor-pointer outline-none rounded-md'>
                    <option value={value1}>{option1}</option>
                    <option value={value2}>{option2}</option>
                    <option value={value3}>{option3}</option>
                    <option value={value4}>{option4}</option>
                </select>
            </div>
        </>
    )
};

export default Tabs;