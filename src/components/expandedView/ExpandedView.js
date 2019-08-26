import React from 'react';
import Title from 'title';
import Tags from '../Card/Tags';
import Modal from 'react-modal';
import ScrollLock from 'react-scrolllock';
import './ExpandedView.css';

const SpecialTitlePhrases = require("../../languages/SpecialTitlePhrases.json");

function ExpandedView(props) {

    function startResource() {
        window.open(props.expandedViewContent.url, "_blank");
    }

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
                            <div className="expandedViewImageArea">
                                <button className="icon overlayButton closeButton" onClick={props.handleCloseModal}>close</button>
                                <div className="expandedViewActionButtons">
                                    <button className="icon overlayButton">share</button>
                                    <button className="icon overlayButton">bookmark</button>
                                    <button className="icon overlayButton">moreNoOutline</button>
                                </div>
                                <img src={props.expandedViewContent.image}></img>
                            </div>
                            <div className="expandedViewTitleArea">
                                <div>
                                    <h1>{Title(props.expandedViewContent.title, SpecialTitlePhrases)}</h1>
                                    <h3>{getAuthors()}</h3>
                                </div>
                                <button className="startResourceButton" onClick={startResource}>{props.language.start} <span className="icon">course</span></button>
                            </div>
                            
                            <h2>{props.language.description}</h2>
                            <p>{props.expandedViewContent.description}</p>
                            <h2>{props.language.format}</h2>
                            <Tags language={props.language} difficulty={props.expandedViewContent.difficulty} timeEstimate={props.expandedViewContent.timeEstimate}></Tags>
                            <div className="tag">Hello World</div>
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