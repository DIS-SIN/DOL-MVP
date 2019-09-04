import React from 'react';
import {Helmet} from "react-helmet";

function NotFound() {

    return (
        <div>
            <Helmet>
                <title>Error!</title>
            </Helmet>
            <h1>404 Error</h1>
            <p>Page not found!</p>
        </div>
    );
}

export default NotFound;