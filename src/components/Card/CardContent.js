import React from 'react';
import ActivityBar from './ActivityBar';
import Tags from './Tags';
import './CardContent.css';

function CardContent(props) {

    return (
        <div className="cardContent">
            <h4 className="cardTitle">{props.title}</h4>
            <div>
            <ActivityBar language={props.language} endorsements={props.endorsements} comments={props.comments}/>

            </div>
            <p className="cardDescription">{props.description}</p>
            <Tags language={props.language} difficulty={props.difficulty} timeEstimate={props.timeEstimate}></Tags>
        </div>
    );
}

export default CardContent;