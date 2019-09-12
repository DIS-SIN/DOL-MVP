import React, { useState, useEffect } from 'react';
import {GCSplashScreen, GCHeader, GCFooter} from 'gc-tortilla';
import MobileNavBar from './components/MobileNavBar';
import Card from './components/Card/Card';
import CardViewModalContent from './components/CardViewModalContent';
import ExpandedView from './components/expandedView/ExpandedView';
import Modal from 'react-modal';
import ScrollLock from 'react-scrolllock';
import './App.css';

function App(props) {

    // This hides all content from screen readers while the modal is open
    Modal.setAppElement('#root')

    /* #region State Variables */

    // Modal to switch between card & compact views
    const [modalVisible, showModal] = useState(false);
    const [modalXPosition, setModalXPosition] = useState(500);

    // Expanded View Modal
    const [expandedViewContent, setExpandedViewContent] = useState(null);
    const [expandedViewVisible, showExpandedView] = useState(false);

    // Lock scrolling on the body
    const [scrollLocked, lockScrolling] = useState(false);

    // State to store which type of view is being used (card/compact)
    const [cardViewEnabled, showCardView] = useState(getCardViewPreference());

    // Language state to hold the selected language's dictionary
    const [language, setLanguage] = useState(updateLanguage());

    // State to store the resources fetched from the JSON API
    const [resources, setResources] = useState([]);

    /* #endregion */

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/DIS-SIN/DOL-MVP/master/Airtable%20to%20JSON/output/dolDB.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setResources(data);
            
            directResourceLink(data);
        });
    },[])

    // Checks to see if the user is coming in from a shared link leading directly to a resource
    function directResourceLink(data) {
        if (props.match.params.resourceID){
            let foundResource = data.find(resource => {
                return resource.id === props.match.params.resourceID;
            });
            if (foundResource){
                setExpandedViewContent(foundResource);
                showExpandedView(true);
            }
            else{
                props.history.push("/error");
            }
        }
    }

    function getCardViewPreference() {
        if (localStorage && localStorage.showCardView){
            return JSON.parse(localStorage.showCardView);
        }
        // Returning true sets the view to Card View
        return true;
    }

    function updateLanguage(){
        if (window.navigator.language){
            if (window.navigator.language.includes("fr-")){
                return require("./languages/fr-CA.json");
            }
        }
        return require("./languages/en-CA.json");
    }

    function manualSwitchLanguage(){
        language.language === "English" ? setLanguage(require("./languages/fr-CA.json")) : setLanguage(require("./languages/en-CA.json"));
    }

    function handleOpenModal(ev) {
        let modalWidth = 375;
        let modalOffset = 31;
        if (window.innerWidth > 1200){
            modalOffset += (window.innerWidth - 1200) / 2
        }
        lockScrolling(true);
        setModalXPosition(modalOffset);
        showModal(true);
    }

    function handleCloseModal(){
        showExpandedView(false);
        props.history.push("");
        // This timeout is to prevent the view change modal jumping during the closing animation
        setTimeout(() => {
            showModal(false);
            // This timeout is due to the 150ms animation on the class .ReactModal__Overlay in App.css
            setTimeout(() => {
                lockScrolling(false);
            }, 150);
        }, 1);
        
    }

    return (
        <div>
            <GCSplashScreen routes={{english: "/", french: "/"}}/>
            <GCHeader className="gcHeader"/>
            <MobileNavBar language={language}></MobileNavBar>
            <div className="cardGrid">
                <button className="icon cardViewIcon" onClick={handleOpenModal}>cardView</button>
                <ScrollLock isActive={scrollLocked}>
                <div style={{display:"none"}}>
                <Modal style={{ content: {right: modalXPosition}}} closeTimeoutMS={150} isOpen={modalVisible} contentLabel="Switch View Preferences Modal" onRequestClose={handleCloseModal} className="Modal" overlayClassName="Overlay">
                    <div className="modalArrow"></div>
                    <CardViewModalContent closeModal={handleCloseModal} cardViewEnabled={cardViewEnabled} showCardView={showCardView} language={language}></CardViewModalContent>
                </Modal>
                </div>
                </ScrollLock>
                <ExpandedView language={language} handleCloseModal={handleCloseModal} expandedViewVisible={expandedViewVisible} expandedViewContent={expandedViewContent} handleCloseModal={handleCloseModal}/>

                { resources.map( (resource, index)=>(
                    <Card key={index} language={language} viewType={{cardViewEnabled, showCardView}} history={props.history} showExpandedView={showExpandedView} setExpandedViewContent={setExpandedViewContent} resource={resource}/>
                )) }
                
            </div>
            <button style={{margin: "20px"}} onClick={manualSwitchLanguage}>Change Language</button>
            <GCFooter/>
        </div>
    );
}

export default App;
