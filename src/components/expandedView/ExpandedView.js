import React, {useState, useEffect} from 'react';
import Title from 'title';
import Tags from '../Card/Tags';
import MetaTags from '../MetaTags';
import history from "../History";
import Modal from 'react-modal';
import ScrollLock from 'react-scrolllock';
import './ExpandedView.css';

const SpecialTitlePhrases = require("../../languages/SpecialTitlePhrases.json");

function ExpandedView(props) {

    function startResource() {
        window.open(props.expandedViewContent.url, "_blank");
    }

    function shareResource() {
        if (window.navigator.share) {
            window.navigator.share({
            title: props.expandedViewContent.title,
            url: props.expandedViewContent.dynamicLink
        }).then(() => {
            console.log('Thanks for sharing!');
        })
        .catch(console.error);
        }
        else {
            // fallback
            console.log("Needs manual share window");
        }
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

    if (props.expandedViewVisible){

        console.log(props);
        history.replace(`/resource/${props.expandedViewContent.dynamicLink.split("/resource/")[1]}`);

        return (
            <Modal closeTimeoutMS={150} isOpen={props.expandedViewVisible} contentLabel="Expanded View" onRequestClose={props.handleCloseModal} className="Modal expandedView" overlayClassName="Overlay">
                <MetaTags title={props.expandedViewContent.title} description={props.expandedViewContent.description} url={props.expandedViewContent.dynamicLink} image={props.expandedViewContent.image}/>
                <ScrollLock>
                    <div className="expandedViewScrollContainer">
                        <div className="expandedViewContentContainer">
                            <div className="expandedViewImageArea">
                                <button className="icon overlayButton closeButton" onClick={props.handleCloseModal}>close</button>
                                <div className="expandedViewActionButtons">
                                    <button className="icon overlayButton" onClick={shareResource}>share</button>
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
                            <div className="expandedViewContentArea">
                                <h2>{props.language.description}</h2>
                                <p>{props.expandedViewContent.description}</p>
                                <h2>{props.language.format}</h2>
                                <Tags language={props.language} difficulty={props.expandedViewContent.difficulty} timeEstimate={props.expandedViewContent.timeEstimate}></Tags>
                                <Tags language={props.language} title={props.language.practices} docRefs={props.expandedViewContent.practices} attribute="practice"/>
                                <Tags language={props.language} title={props.language.skills} docRefs={props.expandedViewContent.skills} attribute="skill"/>
                                <Tags language={props.language} title={props.language.digitalStandards} docRefs={props.expandedViewContent.digitalStandards} attribute="standard"/>
                            </div>
                        </div>
                    </div>
                </ScrollLock>
            </Modal>
        );
    }
    return null;
}

export default ExpandedView;