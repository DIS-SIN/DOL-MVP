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
import {postData, neoj_URI} from './lib/common.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'firebase/firestore';
import './App.css';

function App(props) {

    // This hides all content from screen readers while the modal is open
    Modal.setAppElement('#root')

    /* #region State Variables */

    // State variable to show/hide the loading screen
    const [loading, setLoading] = useState(true);

    // Sets the active topic in the mobile nav bar
    const [activeTopic, setTopic] = useState("");

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

    // State to get the first n resources
    const [first, setFirst] = useState(9);

    // State to store the resources fetched from the JSON API
    const [resources, setResources] = useState([]);

    // State to hide the showMoreButton
    const [seeMoreButtonVisible, setSeeMoreButtonVisible] = useState(true);


    /* #endregion */

    useEffect(() => {
        setLoading(true);
        setSeeMoreButtonVisible(true);

        const query = `query getResourcesByTopic($topic:String,$lang:String){resourcesByTopic(topic:$topic,lang:$lang,first:` + first + `){title,image,timeEstimate,comments,url,description,dateAdded,topic_of{name},creationYear{formatted},practiced_as{name},resource_lang{name},resource_skill{name},tagged{name},type_of{name},endorsed_by{lastName,firstName,profilePic},endorsements,difficulty,cost,uid,primary_used_as{name},resource_dig_standard{name},secondary_used_as{name}}}`

        const variables = { topic: activeTopic, lang: language.language === "Français" ? "french": "english"}


        postData(neoj_URI, query, variables).then((data) => {
            setLoading(false);
            let resourceList = formatJSON(data)            
            setResources(resourceList)
            checkForMoreResources(resourceList);
            directResourceLink(resourceList);
        }).catch(err => console.log(err));
    },[activeTopic, language, first])

    function formatJSON(data){
        let resourceList = []
        data.data.resourcesByTopic.map(resource => {
            // Reformat neo4j Json output to DOL json
            let {title, description, endorsements, difficulty, cost, dateAdded, uid, image, timeEstimate} = resource

            let creationYear = resource.creationYear.formatted
            let practices = resource.practiced_as.map(practice => practice.name)
            let skills = resource.resource_skill.map(skill => skill.name)
            let tags = resource.tagged.map(tag => tag.name)
            let types = resource.tagged.map(a_type => a_type.name)
            let useCases = resource.secondary_used_as.map(sec_usage => sec_usage.name)
            let digitalStandards = resource.resource_dig_standard.map(standard => standard.name)

            let topic = resource.topic_of.map(t => t.name) ? resource.topic_of.map(t => t.name)[0] : null
            let language = resource.resource_lang.map(l => l.name) ? resource.resource_lang.map(l => l.name)[0] : null  
            let format = resource.primary_used_as.map(f => f.name) ? resource.primary_used_as.map(f => f.name)[0] : null  

            let featuredEndorsers = resource.endorsed_by.map(endorser => {
                let {firstName, lastName, profilePic} = endorser 
                let name = firstName + " " + lastName
                return {name, profilePic}
            })

            let new_resource = {title, description, difficulty, cost, dateAdded, uid, image, timeEstimate, creationYear, practices, skills, tags, types, useCases, digitalStandards, topic, language, format, endorsements: {featuredEndorsers, endorsements}}

            resourceList.push(new_resource)
        })

        return resourceList
    }

    async function checkForMoreResources(resourceList) {
        if (resourceList === null || resourceList.length == 0){
            setSeeMoreButtonVisible(false);
            return;
        }

        const query = `query getResourcesByTopic($topic:String,$lang:String){resourcesByTopic(topic:$topic,lang:$lang,first:` + (first + 10) + `){title,image,timeEstimate,comments,url,description,dateAdded,topic_of{name},creationYear{formatted},practiced_as{name},resource_lang{name},resource_skill{name},tagged{name},type_of{name},endorsed_by{lastName,firstName,profilePic},endorsements,difficulty,cost,uid,primary_used_as{name},resource_dig_standard{name},secondary_used_as{name}}}`

        const variables = { topic: activeTopic, lang: language.language === "Français" ? "french": "english"}

        postData(neoj_URI, query, variables).then(data => {
            if (data === null || data.data.resourcesByTopic.length === 0 || data.data.resourcesByTopic.length === resourceList.length){
                setSeeMoreButtonVisible(false);
                return;
            }

            setSeeMoreButtonVisible(true);
            return;
        }).catch(err => {
            setSeeMoreButtonVisible(false);
            return;
        })
    }

    function getMoreResources() {
        setLoading(true);
        setFirst(first + 9)
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

