import React from 'react';
import './MobileNavBar.css';

function MobileNavBar() {
    return (
        <div className="mobileNavBar">
            <img className="profile" src={require('../images/defaultProfile.jpg')} alt="The default profile icon" title="Profile"/>
            <input className="searchBar" type="text" placeholder={<span className="material-icons">search</span>}/>
        </div>
    );
}

export default MobileNavBar;