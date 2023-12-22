import React from 'react';

import Logo from '../images/main-logo.png';
import Footer from './Utils/Footer';

const Policies: React.FC = () => {
    return (
        <div className='bg-dim'>
            <div className='max-w-3xl mx-auto px-3 pt-4 pb-6 bg-white shadow-image'>
                <div className='text-center border-b border-solid border-grey pb-1'>
                    <img className='h-40px lg:h-50px inline-block' src={Logo} alt="Happenify" />
                    <h1 className='text-20px text-primarydark'>Our Privacy Policies</h1>
                </div>
                <div className='border-b border-solid border-grey py-3'>
                    <h3 className='md:text-17px font-medium text-dark'>Last Updated: Jan 10, 2024</h3>
                    <p className='ml-5'>Welcome to Happenify! We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our event management services.</p>
                </div>
                <div className='border-b border-solid border-grey py-3'>
                    <h3 className='md:text-17px font-medium text-primary mb-3'>1. Information We Collect</h3>
                    <div className='ml-5'>
                        <h4 className='font-medium text-normal mb-2'>1.1 Personal Information</h4>
                        <div className='ml-5 mb-3'>
                            <p>• Types of Data Collected:</p>
                            <ul className='ml-5'>
                                <li>- Full Name</li>
                                <li>- Email Address</li>
                                <li>- Phone Number</li>
                            </ul>
                        </div>
                        <h4 className='font-medium text-normal mb-2'>1.2 Usage Data</h4>
                        <div className='ml-5'>
                            <p>• Usage Data may include:</p>
                            <ul className='ml-5'>
                                <li>- IP Address</li>
                                <li>- Browser Type</li>
                                <li>- Pages Visited</li>
                                <li>- Time and Date of Visit</li>
                                <li>- Referring Pages</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='border-b border-solid border-grey py-3'>
                    <h3 className='md:text-17px font-medium text-primary mb-3'>2. How We Use Your Information</h3>
                    <div className='ml-5'>
                        <p>• We may use the information collected for the following purposes:</p>
                        <ul className='ml-5'>
                            <li>- To facilitate and improve your event registration experience.</li>
                            <li>- To send you event-related updates and communications.</li>
                            <li>- To analyze and optimize our app's performance and user experience.</li>
                            <li>- To comply with legal obligations.</li>
                        </ul>
                    </div>
                </div>
                <div className='border-b border-solid border-grey py-3'>
                    <h3 className='md:text-17px font-medium text-primary mb-3'>3. Data Sharing and Disclosure</h3>
                    <div className='ml-5'>We do not sell, trade, or otherwise transfer your personal information to outside parties. Your data may be shared with trusted third parties who assist us in operating our app, as long as they agree to keep this information confidential.</div>
                </div>
                <div className='border-b border-solid border-grey py-3'>
                    <h3 className='md:text-17px font-medium text-primary mb-3'>4. Security</h3>
                    <div className='ml-5'>We implement a variety of security measures to safeguard your personal information. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure.</div>
                </div>
                <div className='border-b border-solid border-grey py-3'>
                    <h3 className='md:text-17px font-medium text-primary mb-3'>5. Your Choices</h3>
                    <div className='ml-5'>
                        <p>• You have the right to:</p>
                        <ul className='ml-5'>
                            <li>- Review and correct your personal information.</li>
                            <li>- Opt-out of receiving event-related communications.</li>
                        </ul>
                    </div>
                </div>
                <div className='border-b border-solid border-grey py-3'>
                    <h3 className='md:text-17px font-medium text-primary mb-3'>6. Changes to This Privacy Policy</h3>
                    <div className='ml-5'>We may update our Privacy Policy from time to time. Any changes will be posted on this page, and the date of the latest revision will be indicated.</div>
                </div>
                <div className='py-3'>
                    <h3 className='md:text-17px font-medium text-primary mb-3'>7. Contact Us</h3>
                    <div className='ml-5'>If you have any questions or concerns about this Privacy Policy, please contact us at <span className='text-secondarydark cursor-pointer hover:underline'>happenify@gmail.com</span>.</div>
                </div>
                <Footer />
            </div>
        </div>
    )
};

export default Policies;