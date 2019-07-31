import React, { useState } from 'react';
import './CardViewModalContent.css';

function CardViewModalContent(props) {

    return (
        <div className="cardViewModal">
            <div className="modalHeader">
                <h2>View</h2>
                <button onClick={props.closeModal} className="closeModalButton">Done</button>
            </div>
            <div className="cardViewModalContent">
                <button className="active"><span className="icon">cardView</span>Card View</button>
                <button><span className="icon">compactView</span>Compact View</button>
            </div>
        </div>
    );
}

export default CardViewModalContent;
