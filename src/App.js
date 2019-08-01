import React, { useState } from 'react';
import MobileNavBar from './components/MobileNavBar';
import Card from './components/Card/Card';
import CardViewModalContent from './components/CardViewModalContent';
import Modal from 'react-modal';
import './App.css';

function App() {

    // This hides all content from screen readers while the modal is open
    Modal.setAppElement('#root')

    // Creating state variables
    const [modalVisible, showModal] = useState(false);
    const [modalXPosition, setModalXPosition] = useState(500);
    const [cardViewEnabled, showCardView] = useState(true); 
    const [language, setLanguage] = useState(updateLanguage());

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
        setModalXPosition(ev.target.getBoundingClientRect().x - 375 + 35);
        showModal(true);
    }

    function handleCloseModal(){
        showModal(false);
    }

    return (
        <div>
            <MobileNavBar language={language}></MobileNavBar>
            <div className="cardGrid">
                <button className="icon cardViewIcon" onClick={handleOpenModal}>cardView</button>
                <Modal style={{ content: {left: modalXPosition}}} isOpen={modalVisible} contentLabel="onRequestClose Example" onRequestClose={handleCloseModal} className="Modal" overlayClassName="Overlay">
                    <div className="modalArrow"></div>
                    <CardViewModalContent closeModal={handleCloseModal} cardViewEnabled={cardViewEnabled} showCardView={showCardView} language={language}></CardViewModalContent>
                </Modal>
                <Card language={language} viewType={{cardViewEnabled, showCardView}} thumbnail={"http://i3.ytimg.com/vi/RD_SLJG7oi8/maxresdefault.jpg"} contentType={"watch"} title={"Why Design Should Include Everyone"} endorsements={{featuredEndorsers: [{name: "John D.", profilePic: "https://randomuser.me/api/portraits/men/9.jpg"},{name: "John D.", profilePic: "https://randomuser.me/api/portraits/men/5.jpg"}], endorsements: 1200}} comments={123} difficulty={1} timeEstimate={10} description={`Sinéad Burke is acutely aware of details that are practically invisible to many of us. At 105 centimeters (or 3’ 5”) tall, the designed world — from the height of a lock to the range of available shoe sizes — often inhibits her ability to do things for herself. Here she tells us what it’s like to navigate the world as a little person and asks: “Who are we not designing for?”`}></Card>
                <Card language={language} viewType={{cardViewEnabled, showCardView}} thumbnail={require("./images/stock/read/pexels-photo-196649.jpeg")} contentType={"listen"} title={"Content Design Using Data and Evidence"} endorsements={{featuredEndorsers: [{name: "Jenessa M.", profilePic: "https://randomuser.me/api/portraits/women/43.jpg"},{name: "John D.", profilePic: "https://randomuser.me/api/portraits/men/17.jpg"}], endorsements: 1100}} comments={72} difficulty={1} timeEstimate={30} description={`Explains the difference between writing, editing, copyrighting and digital content design, tells the story of Gov.UK process of converting 75,000 pieces of content into 3,000, explains how to obtain data and evidence to support content design.`}></Card>
                <Card language={language} viewType={{cardViewEnabled, showCardView}} thumbnail={"https://images.unsplash.com/photo-1531053270060-6643c8e70e8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80"} contentType={"read"} title={"Designing for Public Services"} endorsements={{featuredEndorsers: [{name: "Emmanuel E.", profilePic: "https://randomuser.me/api/portraits/women/27.jpg"},{name: "John D.", profilePic: "https://randomuser.me/api/portraits/men/44.jpg"}], endorsements: 1300}} comments={86} difficulty={3} timeEstimate={150} description={`IDEO and Nesta team up to provide advice and create guides on how to design public services.`}></Card>
                <Card language={language} viewType={{cardViewEnabled, showCardView}} thumbnail={"https://images.unsplash.com/photo-1545670723-196ed0954986?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2252&q=80"} contentType={"course"} title={"Automate the Boring Stuff with Python"} endorsements={{featuredEndorsers: [{name: "Lauretta T.", profilePic: "https://randomuser.me/api/portraits/women/88.jpg"},{name: "John D.", profilePic: "https://randomuser.me/api/portraits/women/24.jpg"}], endorsements: 543}} comments={53} difficulty={2} timeEstimate={450} description={`A free, text-based tutorial accompanied with Youtube videos to help people learn the popular programming language Python at their own pace.`}></Card>
                <Card language={language} viewType={{cardViewEnabled, showCardView}} thumbnail={"https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2202&q=80"} contentType={"course"} title={"Fundamentals of Data Analysis for Government"} endorsements={{featuredEndorsers: [{name: "Raymond G.", profilePic: "https://randomuser.me/api/portraits/women/59.jpg"},{name: "John D.", profilePic: "https://randomuser.me/api/portraits/men/63.jpg"}], endorsements: 256}} comments={64} difficulty={1} timeEstimate={450} description={`A course targeting government employees that have a qualitative understanding of their work but have yet to master the quantitative skills required to leverage data in their day- to-day responsibilities.`}></Card>
                <Card language={language} viewType={{cardViewEnabled, showCardView}} thumbnail={"https://images.unsplash.com/photo-1483736762161-1d107f3c78e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80"} contentType={"course"} title={"Finding Stories in Data"} endorsements={{featuredEndorsers: [{name: "Sarah H.", profilePic: "https://randomuser.me/api/portraits/men/62.jpg"},{name: "John D.", profilePic: "https://randomuser.me/api/portraits/women/64.jpg"}], endorsements: 1000}} comments={87} difficulty={1} timeEstimate={450} description={`At the heart of driving change is the skill of finding and telling stories, using where relevant, compelling visualizations.`}></Card>
            </div>
            <button style={{margin: "20px"}} onClick={manualSwitchLanguage}>Change Language</button>
        </div>
    );
}

export default App;
