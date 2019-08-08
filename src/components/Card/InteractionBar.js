import React from 'react';
import { Dropdown } from 'react-bootstrap';
import './InteractionBar.css';

function InteractionBar(props) {

    return (
        <div className="interactionBar">
            <button><span className="icon">endorseOutlined</span> {props.language.endorse}</button>
            <button><span className="icon">commentOutlined</span> {props.language.comment}</button>
            <Dropdown className="dropDownButton">
                <Dropdown.Toggle variant="success" id="dropdown-basic" className="button">
                    <span className="icon">more</span> {props.language.more}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default InteractionBar;