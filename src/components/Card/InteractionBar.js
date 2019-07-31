import React from 'react';
import './InteractionBar.css';

function InteractionBar(props) {

    return (
        <div className="interactionBar">
            <button><span className="icon">endorseOutlined</span> {props.language.endorse}</button>
            <button><span className="icon">commentOutlined</span> {props.language.comment}</button>
            <button><span className="icon">more</span> {props.language.more}</button>
        </div>
    );
}

export default InteractionBar;