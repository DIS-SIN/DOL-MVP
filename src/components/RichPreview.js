import React, {useState, useEffect} from 'react';
import {Helmet} from "react-helmet";

function RichPreview(props) {

    return (
        <div>
            <Helmet>
                <title>{props.match.params.title}</title>
            </Helmet>
            <h1>Rich Preview</h1>
        </div>
    );
}

export default RichPreview;