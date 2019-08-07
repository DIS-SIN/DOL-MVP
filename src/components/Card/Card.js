import React, { useState } from 'react';
import CardContent from './CardContent';
import InteractionBar from './InteractionBar';
import './Card.css';

function Card(props) {

    const [contentType] = useState(getContentType());
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

    function getContentType() {
        let contentType = props.contentType.toLowerCase();
        switch (contentType) {
            case "read":
                return "read";
                break;
            case "use":
                return "read";
                break;
            case "attend":
                return "course";
                break;
            case "watch":
                return "watch";
                break;
            default:
                return "read";
                break;
        }
    }

    function compactDescription(description) {
        if (description.length <= 100){
            return description;
        }
        description = description.substr(0, 100).split(" ");
        description.pop();

        description[description.length - 1] = description[description.length - 1].replace(",", "").replace(".", "");

        return `${description.join(" ")}...`;
    }

    // Card View
    if (props.viewType.cardViewEnabled){
        return (
            <div className="card">
                <div className="cardPreview">
                    <span className={typeClass}>{contentType}</span>
                    <img src={props.thumbnail} alt="" title=""/>
                </div>
                <CardContent language={props.language} title={props.title} description={props.description} endorsements={props.endorsements} comments={props.comments} difficulty={props.difficulty} timeEstimate={props.timeEstimate}></CardContent>
                <InteractionBar language={props.language}></InteractionBar>
            </div>
        );
    }

    // Compact View
    else {
        return (
            <div className="compactCard">
                <div className="compactCardContent">
                    <CardContent language={props.language} title={props.title} description={compactDescription(props.description)} endorsements={props.endorsements} comments={props.comments} difficulty={props.difficulty} timeEstimate={props.timeEstimate}></CardContent>
                    <div className="cardPreview">
                        <div className="compactCardPreview">
                            <span className={typeClass}>{contentType}</span>
                            <img src={props.thumbnail} alt="" title=""/>
                        </div>
                    </div>
                </div>
                <InteractionBar language={props.language}></InteractionBar>
            </div>
        );
    }
}

export default Card;