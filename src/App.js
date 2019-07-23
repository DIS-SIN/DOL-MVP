import React, { useState } from 'react';
import MobileNavBar from './components/MobileNavBar';
import './App.css';

function App() {

    const [language, setLanguage] = useState((require("./languages/en-CA.json")));

    function updateLanguage() {
        if (window.navigator.language){
            if (window.navigator.language.includes("fr-")){
                setLanguage(require("./languages/fr-CA.json"));
                return;
            }
        }
        setLanguage(require("./languages/en-CA.json"))
    }

    return (
        <div>
            <h1>{language.searchBarPlaceholder}</h1>
            <button style={{width: "50px", height: "100px", backgroundColor: "red"}} onClick={updateLanguage}></button>
            <MobileNavBar></MobileNavBar>
        </div>
    );
}

export default App;
