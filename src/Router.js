import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from './App';
import AddResourceView from './components/Admin/AddResourceView';
import NotFound from './NotFound';

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/admin/add" component={AddResourceView} />
                <Route path="/res/:resourceID" component={App} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
}

export default Router;