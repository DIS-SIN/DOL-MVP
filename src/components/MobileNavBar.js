import React from 'react';
import './MobileNavBar.css';

function MobileNavBar(props) {

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
                <h3>{props.language.all}</h3>
                <h3 className="active">{props.language.forYou}</h3>
                <h3>{props.language.design}</h3>
                <h3>{props.language.digitalGovernment}</h3>
                <h3>{props.language.data}</h3>
            </div>
        </div>
    );
}

export default MobileNavBar;