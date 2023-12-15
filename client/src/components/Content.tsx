import React from 'react';
import {
    Routes,
    Route,
    Navigate
} from 'react-router-dom';

import Events from './Event/Events';
import Places from './Places';
import Promotions from './Promotions';
import Calendar from './Calendar';
import Expenses from './Expenses';
import Analytics from './Analytics';
import EventDetails from './Event/EventDetails';
import EventForm from './Event/EventForm';
import EntryForm from './Event/EntryForm';

const Content: React.FC = () => {
    return (
        <div className='flex-1 pb-10 md:pb-55px lg:pb-0'>
            <Routes>
                <Route path='/' element={<Navigate to='/events' replace />} />
                <Route path='/events/*'>
                    <Route index element={<Events />} />
                    <Route path=':id' element={<EventDetails />} />
                    <Route path=':id/book-entry' element={<EntryForm />} />
                    <Route path='create' element={<EventForm />} />
                </Route>
                <Route path='/places' element={<Places />} />
                <Route path='/promotions' element={<Promotions />} />
                <Route path='/calendar' element={<Calendar />} />
                <Route path='/expenses' element={<Expenses />} />
                <Route path='/analytics' element={<Analytics />} />
            </Routes>
        </div>
    )
};

export default Content;