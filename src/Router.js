import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from './App';
import AddResourceView from './components/Admin/AddResourceView';
import ViewResources from './components/Admin/ViewResources';
import EditResource from './components/Admin/EditResource';
import NotFound from './NotFound';

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/admin/add" component={AddResourceView} />
                <Route exact path="/admin/view" component={ViewResources} />
                <Route exact path="/admin/edit/:uid" component={EditResource} />
                <Route path="/res/:resourceID" component={App} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
}

export default Router;