import React, { useState } from 'react';
import CardContent from './CardContent';
import InteractionBar from './InteractionBar';
import {getContentType, imageErrorHandler} from '../../Helpers';
import './Card.css';

function Card(props) {

    const [contentType] = useState(getContentType(props.resource.format));
    const [typeClass] = useState(getTypeClass());

    function getTypeClass() {
        if (contentType === "watch"){
            return "icon watch";
        }
        if (contentType === "read"){
            return "icon read";
        }
        if (contentType === "course"){
            return "icon course";
        }
        return "icon";
    }

    // Card View
    if (props.viewType.cardViewEnabled){
        return (
            <div className="card">
                <div className="cardPreview">
                    <span className={typeClass}>{contentType}</span>
                    <img src={props.resource.image} onError={imageErrorHandler} alt="" title=""/>
                </div>
                <CardContent language={props.language} showExpandedView={props.showExpandedView} setExpandedViewContent={props.setExpandedViewContent} lockBodyScroll={props.lockBodyScroll} cardViewEnabled={props.viewType.cardViewEnabled} resource={props.resource}></CardContent>
                <InteractionBar language={props.language}></InteractionBar>
            </div>
        );
    }

    // Compact View
    else {
        return (
            <div className="compactCard">
                <div className="compactCardContent">
                <CardContent language={props.language} history={props.history} showExpandedView={props.showExpandedView} setExpandedViewContent={props.setExpandedViewContent} cardViewEnabled={props.viewType.cardViewEnabled} resource={props.resource}></CardContent>
                    <div className="cardPreview">
                        <div className="compactCardPreview">
                            <span className={typeClass}>{contentType}</span>
                            <img src={props.resource.image} onError={imageErrorHandler} alt="" title=""/>
                        </div>
                    </div>
                </div>
                <InteractionBar language={props.language}></InteractionBar>
            </div>
        );
    }
}

export default Card;