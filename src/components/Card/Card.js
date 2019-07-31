import React from 'react';
import CardContent from './CardContent';
import InteractionBar from './InteractionBar';
import './Card.css';

function Card(props) {

    function getTypeClass() {
        if (props.contentType === "watch"){
            return "icon watch";
        }
        if (props.contentType === "read"){
            return "icon read";
        }
        if (props.contentType === "course"){
            return "icon course";
        }
        return "icon";
    }

    // Card View
    if (props.viewType.cardViewEnabled){
        return (
            <div className="card">
                <div className="cardPreview">
                    <span className={getTypeClass()}>{props.contentType}</span>
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
                <div className="cardPreview">
                    <span className={getTypeClass()}>{props.contentType}</span>
                    <img src={props.thumbnail} alt="" title=""/>
                </div>
                <CardContent language={props.language} title={props.title} description={props.description} endorsements={props.endorsements} comments={props.comments} difficulty={props.difficulty} timeEstimate={props.timeEstimate}></CardContent>
                <InteractionBar language={props.language}></InteractionBar>
            </div>
        );
    }
}

export default Card;