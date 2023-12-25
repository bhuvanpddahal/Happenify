import React, { useState } from 'react';
import Calendar from 'react-calendar';

import Header from '../Utils/Header';

const CalendarPage: React.FC = () => {
    document.title = 'Calendar - Happenify';
    const [date, setDate] = useState(new Date());

    return (
        <div className='p-3 min-h-full bg-dim'>
            <Header
                title='Calendar'
                para='View and edit your calendar.'
                createLink='/calendar'
            />

            <Calendar
                value={date}
                nextLabel='M>'
                nextAriaLabel='Go to next month'
                next2Label='Y>>'
                next2AriaLabel='Go to next year'
                prevLabel='<M'
                prevAriaLabel='Go to prev month'
                prev2Label='<<Y'
                prev2AriaLabel='Go to prev year'
            />
        </div>
    )
};

export default CalendarPage;