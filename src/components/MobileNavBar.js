import React, {useState} from 'react';
import './MobileNavBar.css';

function MobileNavBar(props) {

    const [activeTopic, setTopic] = useState("For you");

    function checkIfActive(topic) {
        return activeTopic == topic ? "active" : undefined;
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
                <h3 className={checkIfActive("All")} onClick={() => {setTopic("All")}}>{props.language.all}</h3>
                <h3 className={checkIfActive("For you")} onClick={() => {setTopic("For you")}}>{props.language.forYou}</h3>
                <h3 className={checkIfActive("Design")} onClick={() => {setTopic("Design")}}>{props.language.design}</h3>
                <h3 className={checkIfActive("Digital Government")} onClick={() => {setTopic("Digital Government")}}>{props.language.digitalGovernment}</h3>
                <h3 className={checkIfActive("Data")} onClick={() => {setTopic("Data")}}>{props.language.data}</h3>
            </div>
        </div>
    );
}

export default MobileNavBar;