import React, { Fragment } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';

import Policies from './components/Policies';
import Page from './components/Page';
import Auth from './components/Auth/Auth';
import AlertBox from './components/Alert/AlertBox';

const App: React.FC = () => {
    return (
        <Router>
            <Fragment>
                <AlertBox />
                <Routes>
                    <Route path='/auth' element={<Auth />} />
                    <Route path='/privacy-policy' element={<Policies />} />
                    <Route path='*' element={<Page />} />
                </Routes>
            </Fragment>
        </Router>
    )
};

export default App;
