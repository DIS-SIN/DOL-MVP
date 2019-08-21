import React from 'react';
import Modal from 'react-modal';
import './ExpandedView.css';

function ExpandedView(props) {

    if (props.expandedViewContent != null){
        return (
            <Modal closeTimeoutMS={150} isOpen={props.expandedViewVisible} contentLabel="Expanded View" onRequestClose={props.handleCloseModal} className="Modal expandedView" overlayClassName="Overlay">
                <h1>{props.expandedViewContent.title}</h1>
                <p>{props.expandedViewContent.description}</p>
            </Modal>
        );
    }
    return null;
}

export default ExpandedView;