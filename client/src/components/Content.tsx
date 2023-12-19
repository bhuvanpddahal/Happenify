import React from 'react';
import {
    Routes,
    Route,
    Navigate
} from 'react-router-dom';

import Events from './Event/Events';
import EventDetails from './Event/EventDetails';
import EventForm from './Event/EventForm';
import EntryForm from './Event/EntryForm';
import Places from './Place/Places';
import PlaceForm from './Place/PlaceForm/PlaceForm';
import Promotions from './Promotion/Promotions';
import Calendar from './Calendar';
import Expenses from './Expenses';
import Analytics from './Analytics';

const Content: React.FC = () => {
    return (
        <div className='flex-1 h-full overflow-hidden pb-10 md:pb-55px lg:pb-0'>
            <Routes>
                <Route path='/' element={<Navigate to='/events' replace />} />
                <Route path='/events/*'>
                    <Route index element={<Events />} />
                    <Route path='search' element={<Events />} />
                    <Route path=':id' element={<EventDetails />} />
                    <Route path=':id/book-entry' element={<EntryForm />} />
                    <Route path='create' element={<EventForm />} />
                </Route>
                <Route path='/places/*'>
                    <Route index element={<Places />} />
                    <Route path=':id/book' element={<EntryForm />} />
                    <Route path='create' element={<PlaceForm />} />
                </Route>
                <Route path='/promotions' element={<Promotions />} />
                <Route path='/calendar' element={<Calendar />} />
                <Route path='/expenses' element={<Expenses />} />
                <Route path='/analytics' element={<Analytics />} />
            </Routes>
        </div>
    )
};

export default Content;