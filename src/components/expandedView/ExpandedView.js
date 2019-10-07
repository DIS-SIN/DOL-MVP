import React, {useState, useEffect} from 'react';
import {titleCase} from '../../Helpers';
import Tags from '../Card/Tags';
import MetaTags from '../MetaTags';
import history from "../History";
import Modal from 'react-modal';
import { Dropdown } from 'react-bootstrap';
import ScrollLock from 'react-scrolllock';
import './ExpandedView.css';

function ExpandedView(props) {

    function startResource() {
        window.open(props.expandedViewContent.url, "_blank");
    }

    function shareWithAPI() {
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

    function shareResource(method) {
        let intentURL = null;
        if (method == "email"){
            intentURL = `mailto:?Subject=${encodeURI("Check this out on Digital Open Learning!")}&body=${encodeURI(props.expandedViewContent.title + "\n" + props.expandedViewContent.dynamicLink)}`;
            window.open(intentURL);
            return;
        }
        if (method == "facebook"){
            intentURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURI(props.expandedViewContent.dynamicLink)}&t=${encodeURI(props.expandedViewContent.title)}`;
        }
        if (method == "twitter"){
            intentURL = `https://twitter.com/share?url=${encodeURI(props.expandedViewContent.dynamicLink)}&text=${encodeURI("Check this out on Digital Open Learning!")}`;
        }
        window.open(intentURL, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
    }

    function setShareMethod() {
        if (window.navigator.share) {
            return (
                <button className="icon overlayButton" onClick={shareWithAPI}>share</button>
            );
        }
        else {
            return (
                <Dropdown className="shareDropDown">
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="button">
                        <button className="icon overlayButton">share</button>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => shareResource("email")}>Email</Dropdown.Item>
                        <Dropdown.Item onClick={() => shareResource("twitter")}>Twitter</Dropdown.Item>
                        <Dropdown.Item onClick={() => shareResource("facebook")}>Facebook</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            );
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
                                    {setShareMethod()}
                                    <button className="icon overlayButton">bookmark</button>
                                    <button className="icon overlayButton">moreNoOutline</button>
                                </div>
                                <img src={props.expandedViewContent.image}></img>
                            </div>
                            <div className="expandedViewTitleArea">
                                <div>
                                    <h1>{titleCase(props.expandedViewContent.title, props.language.language)}</h1>
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