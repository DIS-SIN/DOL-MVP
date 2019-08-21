import React from 'react';
import Title from 'title';
import Modal from 'react-modal';
import './ExpandedView.css';

const SpecialTitlePhrases = require("../../languages/SpecialTitlePhrases.json");

function ExpandedView(props) {

    if (props.expandedViewContent != null){
        return (
            <Modal closeTimeoutMS={150} isOpen={props.expandedViewVisible} contentLabel="Expanded View" onRequestClose={props.handleCloseModal} className="Modal expandedView" overlayClassName="Overlay">
                <h1>{Title(props.expandedViewContent.title, SpecialTitlePhrases)}</h1>
                <p>{props.expandedViewContent.description}</p>
            </Modal>
        );
    }
    return null;
}

export default ExpandedView;