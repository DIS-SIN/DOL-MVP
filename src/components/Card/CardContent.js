import React from 'react';
import {titleCase} from '../../Helpers';
import ActivityBar from './ActivityBar';
import Tags from './Tags';
import './CardContent.css';

function CardContent(props) {

    function showExpandedView(){
        props.setExpandedViewContent(props.resource);
        props.showExpandedView(true);
    }

    function compactDescription(description) {
        let maxDescriptionLength = 270;
        if (!props.cardViewEnabled){
            maxDescriptionLength = 78;
        }

        if (description.length <= maxDescriptionLength){
            return description;
        }
        description = description.substr(0, maxDescriptionLength).split(" ");
        description.pop();

        description[description.length - 1] = description[description.length - 1].replace(",", "").replace(".", "");

        return `${description.join(" ")}...`;
    }

    // THIS FUNCTION IS TEMPORARY AND SHOULD BE REMOVED WHEN TITLE LENGTH RESTRICTION GOES INTO PLACE
    function compactTitle(title) {
        return title.substr(0, 60);
    }

    if (!props.cardViewEnabled){
        props.resource.title = compactTitle(props.resource.title);
    }

    return (
        <div className="cardContent">
            <h4 onClick={showExpandedView} tabIndex={0} className="cardTitle">{titleCase(props.resource.title, props.language.language)}</h4>
            <div>
            <ActivityBar language={props.language} endorsements={props.resource.endorsements} comments={props.resource.comments}/>

            </div>
            <p className="cardDescription">{compactDescription(props.resource.description)}</p>
            <Tags language={props.language} difficulty={props.resource.difficulty} timeEstimate={props.resource.timeEstimate}></Tags>
        </div>
    );
}

export default CardContent;