import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Home from './Home';
import NotFound from './NotFound';

import RichPreview from './components/RichPreview';

import './App.css';

function App(props) {

    console.log("DATA:", props.data);

    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/resource/:resourceID" component={Home} />
            <Route exact path="/rp" component={RichPreview} />
            <Route path="/rp/:title" component={RichPreview} />
            <Route component={NotFound} />
        </Switch>
    );
}

export default App;
