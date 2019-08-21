import React from 'react';
import Title from 'title';
import ActivityBar from './ActivityBar';
import Tags from './Tags';
import './CardContent.css';

const SpecialTitlePhrases = require("../../languages/SpecialTitlePhrases.json");

function CardContent(props) {

    function showExpandedView(){
        props.setExpandedViewContent({
            title: props.title,
            description: props.description
        });
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

    return (
        <div className="cardContent">
            <h4 onClick={showExpandedView} className="cardTitle">{Title(props.title, SpecialTitlePhrases)}</h4>
            <div>
            <ActivityBar language={props.language} endorsements={props.endorsements} comments={props.comments}/>

            </div>
            <p className="cardDescription">{compactDescription(props.description)}</p>
            <Tags language={props.language} difficulty={props.difficulty} timeEstimate={props.timeEstimate}></Tags>
        </div>
    );
}

export default CardContent;