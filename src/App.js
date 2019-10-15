import React, { useState, useEffect, useRef } from 'react';
import MobileNavBar from './components/MobileNavBar';
import Card from './components/Card/Card';
import CardViewModalContent from './components/CardViewModalContent';
import ExpandedView from './components/expandedView/ExpandedView';
import Modal from 'react-modal';
import MetaTags from './components/MetaTags';
import history from "./components/History";
import LoadingScreen from './components/LoadingScreen';
import ScrollLock from 'react-scrolllock';
import firebase from 'firebase/app'
import 'firebase/firestore';
import './App.css';

function App(props) {

    // This hides all content from screen readers while the modal is open
    Modal.setAppElement('#root')

    /* #region State Variables */

    // State variable to show/hide the loading screen
    const [loading, setLoading] = useState(true);

    // Sets the active topic in the mobile nav bar
    const [activeTopic, setTopic] = useState("For you");

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

    // State to hide the showMoreButton
    const [seeMoreButtonVisible, setSeeMoreButtonVisible] = useState(true);

    /* #endregion */

    useEffect(() => {
        setLoading(true);
        setSeeMoreButtonVisible(true);
        try {
            var firebaseConfig = {
                apiKey: "AIzaSyCEjvQBNLH87Y5d-eCy4JAR8HAMUmUs-uc",
                authDomain: "digital-open-learning.firebaseapp.com",
                databaseURL: "https://digital-open-learning.firebaseio.com",
                projectId: "digital-open-learning",
                storageBucket: "digital-open-learning.appspot.com",
                messagingSenderId: "547442934763",
                appId: "1:547442934763:web:93b5b076a533ba9938cfae"
              };
              // Initialize Firebase
              firebase.initializeApp(firebaseConfig);
              // TEMPORARY ALERT FOR PROTOTYPE VERSION
              alert("THIS IS A PROTOTYPE OF DIGITAL OPEN LEARNING\n\nPlease be aware that this is only a prototype version so things might not work as expected along with some missing features.");
        } catch (error) {
            // console.error(error);
        }

        if (activeTopic == "All" || activeTopic == "For you"){
            firebase.firestore().collection("resources").where(JSON.parse(localStorage.langIsEnglish) ? "languages.english" : "languages.french", "==", true).orderBy("dateAdded", "desc").limit(9).get().then((data) => {
                let resourceList = []
                let res = null;
                data.forEach(doc => {
                    res = Object.create(doc.data());
                    res.id = doc.id;
                    resourceList.push(res);
                });
                console.log(resourceList);
                setResources(resourceList);
                checkForMoreResources(resourceList);
                directResourceLink(resourceList);
                setLoading(false);
            });
        }
        else {
            // Data from air table capitlizes only the first letter, this line ensures that format
            let topic = activeTopic.charAt(0).toUpperCase() + activeTopic.toLowerCase().slice(1);
            firebase.firestore().collection("resources").where("topic", "==", topic).where(JSON.parse(localStorage.langIsEnglish) ? "languages.english" : "languages.french", "==", true).orderBy("dateAdded", "desc").limit(9).get().then((data) => {
                let resourceList = []
                let res = null;
                data.forEach(doc => {
                    res = Object.create(doc.data());
                    res.id = doc.id;
                    resourceList.push(res);
                });
                console.log(resourceList);
                setResources(resourceList);
                checkForMoreResources(resourceList);
                directResourceLink(resourceList);
                setLoading(false);
            });
        }
    },[activeTopic, language])

    async function checkForMoreResources(resourceList) {
        if (resourceList === null || resourceList.length == 0){
            setSeeMoreButtonVisible(false);
            return;
        }
        let startAfter = resourceList[resourceList.length - 1];
        let resource = await firebase.firestore().collection("resources").where(JSON.parse(localStorage.langIsEnglish) ? "languages.english" : "languages.french", "==", true).orderBy("dateAdded", "desc").startAfter(startAfter.dateAdded).limit(1).get();
        if (resource.docs.length == 0) {
            setSeeMoreButtonVisible(false);
        }
    }

    function getMoreResources() {
        setLoading(true);
        let currentResources = resources;
        firebase.firestore().collection("resources").where(JSON.parse(localStorage.langIsEnglish) ? "languages.english" : "languages.french", "==", true).orderBy("dateAdded", "desc").startAfter(resources[resources.length - 1].dateAdded).limit(9).get().then((data) => {
            let resourceList = []
            let res = null;
            data.forEach(doc => {
                res = Object.create(doc.data());
                res.id = doc.id;
                resourceList.push(res);
            });
            setResources(resources.concat(resourceList));

            checkForMoreResources(resourceList);
    
            console.log(resources);
            setLoading(false);
        })
    }

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
                firebase.firestore().collection("resources").doc(props.match.params.resourceID).get()
                .then(doc => {
                    if (!doc.exists) {
                        console.error("No such document!");
                    }
                    else {
                        console.log('Document data:', doc.data());
                        setExpandedViewContent(doc.data());
                        showExpandedView(true);
                    }
                })
                .catch(err => {
                    console.error(err);
                    props.history.push("/error");
                });
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
        if (localStorage.langIsEnglish){
            if (JSON.parse(localStorage.langIsEnglish) == true){
                return require("./languages/en-CA.json");
            }
            else {
                return require("./languages/fr-CA.json");
            }
        }
        if (window.navigator.language){
            if (window.navigator.language.includes("fr-")){
                localStorage.langIsEnglish = false;
                return require("./languages/fr-CA.json");
            }
        }
        localStorage.langIsEnglish = true;
        return require("./languages/en-CA.json");
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
                history.replace(`/`);
            }, 150);
        }, 1);
    }

    function renderBlankCards() {
        let blankCards = [];
        let numberOfBlanks = resources.length % 3;
        if (cardViewEnabled && numberOfBlanks != 0){
            [...Array(3 - numberOfBlanks)].forEach(blank => {
                blankCards.push(
                    <div key={`blank_${blank}`} className="blank card"></div>
                );
            });
            return blankCards;
        }
        return null;
    }

    return (
        <div>
            <MetaTags title="Digital Open Learning" description="An online learning platform" url="https://dol-test.ca" image="https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1867&q=80"/>
            <MobileNavBar language={language} setLanguage={setLanguage} activeTopic={activeTopic} setTopic={setTopic}></MobileNavBar>
            <div className="viewSettingsBar">
                {/* <button className="viewIcon sortButton">Endorsements <span className="icon">dropdown</span></button> */}
                <button className="icon viewIcon" onClick={handleOpenModal}>cardView</button>
            </div>
            <div className="cardGrid">
                {loading ? <LoadingScreen/> : null}
                <ScrollLock isActive={scrollLocked}>
                <div style={{display:"none"}}>
                <Modal style={{ content: {right: modalXPosition}}} closeTimeoutMS={150} isOpen={modalVisible} contentLabel="Switch View Preferences Modal" onRequestClose={handleCloseModal} className="Modal" overlayClassName="Overlay">
                    <div className="modalArrow"></div>
                    <CardViewModalContent closeModal={handleCloseModal} cardViewEnabled={cardViewEnabled} showCardView={showCardView} language={language}></CardViewModalContent>
                </Modal>
                </div>
                </ScrollLock>
                {expandedViewVisible ? <ExpandedView language={language} handleCloseModal={handleCloseModal} expandedViewVisible={expandedViewVisible} expandedViewContent={expandedViewContent} handleCloseModal={handleCloseModal}/> : null}

                { resources.map( (resource, index)=>(
                    <Card key={index} language={language} viewType={{cardViewEnabled, showCardView}} history={props.history} showExpandedView={showExpandedView} setExpandedViewContent={setExpandedViewContent} resource={resource}/>
                )) }
                {renderBlankCards()}
            </div>
            <div className="seeMoreButton">
                <button className={!seeMoreButtonVisible ? "hide" : null} onClick={getMoreResources}>Load more</button>
            </div>
        </div>
    );
}

export default App;
