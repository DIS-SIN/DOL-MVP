import React, {useState} from 'react';
import './MobileNavBar.css';

function MobileNavBar(props) {

    function checkIfActive(topic) {
        return props.activeTopic == topic ? "active" : undefined;
    }

    return (
        <div className="mobileNavBar">
            <div className="row">
                <div className="rowAccessory left">
                    <img className="profile" src={require('../images/defaultProfile.jpg')} alt={props.language.profileIconAltText} title={props.language.profile}/>
                </div>
                <input className="searchBar" type="text" placeholder={props.language.searchBarPlaceholder}/>
                <div className="rowAccessory right">
                    <div className="profile"></div>
                </div>
            </div>
            <div className="row">
                <h3 className={checkIfActive("All")} onClick={() => {props.setTopic("All")}}>{props.language.all}</h3>
                <h3 className={checkIfActive("For you")} onClick={() => {props.setTopic("For you")}}>{props.language.forYou}</h3>
                <h3 className={checkIfActive("Design")} onClick={() => {props.setTopic("Design")}}>{props.language.design}</h3>
                <h3 className={checkIfActive("Digital Government")} onClick={() => {props.setTopic("Digital Government")}}>{props.language.digitalGovernment}</h3>
                <h3 className={checkIfActive("Data")} onClick={() => {props.setTopic("Data")}}>{props.language.data}</h3>
            </div>
        </div>
    );
}

export default MobileNavBar;