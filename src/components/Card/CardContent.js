import React from 'react';
import Title from 'title'
import ActivityBar from './ActivityBar';
import Tags from './Tags';
import './CardContent.css';

function CardContent(props) {

    function showExpandedView(){
        props.showExpandedView(true);
    }

    return (
        <div className="cardContent">
            <h4 onClick={showExpandedView} className="cardTitle">{Title(props.title, {special: ["GC","UX",".ca"]})}</h4>
            <div>
            <ActivityBar language={props.language} endorsements={props.endorsements} comments={props.comments}/>

            </div>
            <p className="cardDescription">{props.description}</p>
            <Tags language={props.language} difficulty={props.difficulty} timeEstimate={props.timeEstimate}></Tags>
        </div>
    );
}

export default CardContent;