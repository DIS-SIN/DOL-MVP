import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import './MobileNavBar.css';

function MobileNavBar(props) {

    function checkIfActive(topic) {
        return props.activeTopic == topic ? "active" : undefined;
    }

    function manualSwitchLanguage(){
        if (props.language.language === "English"){
            localStorage.langIsEnglish = false;
            props.setLanguage(require("../languages/fr-CA.json"));
        }
        else {
            localStorage.langIsEnglish = true;
            props.setLanguage(require("../languages/en-CA.json"));
        }
    }

    return (
        <div className="mobileNavBar">
            <div className="row">
                <div className="rowAccessory left">
                    {/* <img className="profile" src={require('../images/defaultProfile.jpg')} alt={props.language.profileIconAltText} title={props.language.profile}/> */}
                    <button className="languageButton" onClick={manualSwitchLanguage}><span className="icon">language</span>{props.language.language === "English" ? "Fr" : "En"}</button>
                    <Link to="admin/add" className="languageButton adminButton">Admin</Link>
                </div>
                <input className="searchBar" type="text" placeholder={props.language.searchBarPlaceholder}/>
                <div className="rowAccessory right">
                    <div className="profile"></div>
                </div>
            </div>
            <div className="row">
                <h3 className={checkIfActive("All")} onClick={() => {props.setTopic("")}}>{props.language.all}</h3>
                <h3 className={checkIfActive("For you")} onClick={() => {props.setTopic("")}}>{props.language.forYou}</h3>
                <h3 className={checkIfActive("Design")} onClick={() => {props.setTopic("Design")}}>{props.language.design}</h3>
                <h3 className={checkIfActive("Digital Government")} onClick={() => {props.setTopic("Digital government")}}>{props.language.digitalGovernment}</h3>
                <h3 className={checkIfActive("Data")} onClick={() => {props.setTopic("Data")}}>{props.language.data}</h3>
            </div>
        </div>
    );
}

export default MobileNavBar;