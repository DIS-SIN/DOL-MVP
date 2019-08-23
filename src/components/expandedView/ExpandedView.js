import React from 'react';
import Title from 'title';
import Tags from '../Card/Tags';
import Modal from 'react-modal';
import ScrollLock from 'react-scrolllock';
import './ExpandedView.css';

const SpecialTitlePhrases = require("../../languages/SpecialTitlePhrases.json");

function ExpandedView(props) {

    function getAuthors() {
        let author = props.expandedViewContent.author;
        let org = props.expandedViewContent.organizationalAffiliation;
        if (author && org){
            return `${author} - ${org}`;
        }
        else if (author){
            return author;
        }
        else if (org){
            return org;
        }
        else{
            return "No Author - No Organization";
        }
    }

    if (props.expandedViewContent != null){
        return (
            <Modal closeTimeoutMS={150} isOpen={props.expandedViewVisible} contentLabel="Expanded View" onRequestClose={props.handleCloseModal} className="Modal expandedView" overlayClassName="Overlay">
                <ScrollLock>
                <div className="expandedViewScrollContainer">
                    <div className="expandedViewContentContainer">
                <img src={props.expandedViewContent.image}></img>
                <h1>{Title(props.expandedViewContent.title, SpecialTitlePhrases)}</h1>
                <h3>{getAuthors()}</h3>
                <button onClick={() => {console.log("Clicked on Button")}}>Button</button>
                <h2>{props.language.description}</h2>
                <p>{props.expandedViewContent.description}</p>
                <h2>{props.language.format}</h2>
                <Tags language={props.language} difficulty={props.expandedViewContent.difficulty} timeEstimate={props.expandedViewContent.timeEstimate}></Tags>
                <h2>{props.language.practices}</h2>
                <h2>{props.language.skills}</h2>
                <h2>{props.language.digitalStandards}</h2>
                </div>
                </div>
                </ScrollLock>
            </Modal>
        );
    }
    return null;
}

export default ExpandedView;