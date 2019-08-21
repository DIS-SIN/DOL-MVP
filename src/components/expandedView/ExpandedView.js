import React from 'react';
import Modal from 'react-modal';
import './ExpandedView.css';

function ExpandedView(props) {

    return (
        <Modal closeTimeoutMS={150} isOpen={props.expandedViewVisible} contentLabel="Expanded View" onRequestClose={props.handleCloseModal} className="Modal" overlayClassName="Overlay">
            
        </Modal>
    );
}

export default ExpandedView;