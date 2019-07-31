import React, { useState } from 'react';
import './CardViewModalContent.css';

function CardViewModalContent(props) {

    function changeToCardView(showCardView) {
        props.showCardView(showCardView);
        props.closeModal();
    }

    return (
        <div className="cardViewModal">
            <div className="modalHeader">
                <h2>{props.language.view}</h2>
                <button className="closeModalButton" onClick={props.closeModal}>{props.language.done}</button>
            </div>
            <div className="cardViewModalContent">
                <button className={props.cardViewEnabled == true ? "active" : ""} onClick={() => {changeToCardView(true)}}><span className="icon">cardView</span>{props.language.cardView}</button>
                <button className={props.cardViewEnabled == false ? "active" : ""} onClick={() => {changeToCardView(false)}}><span className="icon">compactView</span>{props.language.compactView}</button>
            </div>
        </div>
    );
}

export default CardViewModalContent;
