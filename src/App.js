import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Home from './Home';
import NotFound from './NotFound';

import './App.css';

function App() {

    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/resource/:resourceID" component={Home} />
            <Route component={NotFound} />
        </Switch>
    );
}

export default App;
