import React from 'react';
import { Form, Card, Container, Row, Col, Button } from 'react-bootstrap';
import './AddResourceView.css';


const TopCard = (props) => (
    <Row>
        <Card style={{ width: '40rem' }}>
            <Card.Img variant="top" src="https://dl.airtable.com/.formViewLogoImages/39b804c056f6cfecf49bf69b7ae1d289/3460b650" className="topImage"/>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    <Paragraphs items={props.description}/>
                </Card.Text>
            </Card.Body>
        </Card>
    </Row>
)

const description = ["The Digital Academy is developing an open online learning environment for curation of quality learning resources.", "Know of great tools, templates, courses, events, webinars, articles, etc on digital topics? Add them here.", "Your expertise will contribute to the living repository of content."]


const AddResourceView = () => (
    <Container>
        <Row>
            <Form>
                <TopCard title="Learning resources - quick entry form" description={description} />
                <FormInput label="Resource name" size="lg" width="8"/>
                <FormInput label="Resource link (URL)" size="lg" width="8"/>
                <FormInput label="Why is this a good resource?" size="lg" width="8" subText="This information may be used as a teaser or description text for the curated resource." type="textarea"/>

                <Row className="mt-4">
                    <Form.Group as={Col} md="8">
                        <Form.Label>Can we use your name and organization next to description of resource</Form.Label> 
                        <Form.Text className="text-muted mb-3">Choose "Yes" if we can use your name and organization to help the community discover those who are interested or are experts in a certain topic.</Form.Text>

                        <Form.Text className="text-muted mb-2">Choose "No" if you want your description to remain anonymous.</Form.Text>
                        <CheckBoxes type="radio" items={["Yes/ Oui", "No/ Non"]} />
                    </Form.Group>
                </Row>

                
                <FormInput label="Resource provided by ... from ..." size="lg" width="8" subText="Please add your full name and organization you work for" />          

                <Row className="mt-4">
                    <Form.Group as={Col} md="8">
                        <Form.Label>Resource language</Form.Label> 
                        <Form.Text className="text-muted mb-3">Choose 1 or more options that apply.</Form.Text>
                        <CheckBoxes type="checkbox" items={["English", "French", "Not Applicable"]} />
                    </Form.Group>
                </Row>                    

                <Row className="mt-4">
                    <Form.Group as={Col} md="8">
                        <Form.Label>Time to use the resource</Form.Label> 
                        <Form.Text className="text-muted mb-3">Choose 1 option</Form.Text>
                        <CheckBoxes type="radio" items={["5 min", "10 min", "30 min", "60 min", "2 h", "4 h", "7.5 h", "20 h", "40 h", "N/A"]} />
                    </Form.Group>
                </Row>  

                <Row className="mt-4">
                    <Form.Group as={Col} md="8">
                        <Form.Label>How is this resource best used?</Form.Label> 
                        <Form.Text className="text-muted mb-3">There are 5 broad types of tasks with more specific sub-tasks:</Form.Text>
                        <p>
                            <BroadTypes types={["Attend", "Listen"]}/>
                        </p>
                        <Form.Text className="text-muted mb-2">Choose 1 or more options that best describe the resource</Form.Text>
                        <FormSelect options={["Listen - Podcast", "Read - Report"]} width="6" controlId="usage"/>
                    </Form.Group>
                </Row>  

                <Row className="mt-4">
                    <Form.Group as={Col} md="8">
                        <Form.Label>What type of resource is this?</Form.Label> 
                        <Form.Text className="text-muted mb-3">Choose 1 or more options that apply.</Form.Text>
                        <CheckBoxes type="checkbox" items={["Case study", "How to", "Research"]} />
                    </Form.Group>
                </Row> 

                <Row className="mt-4">
                    <Form.Group as={Col} md="8">
                        <Form.Label>Which topic does this resource relate to?</Form.Label> 
                        <Form.Text className="text-muted mb-3">Choose 1 or more options that apply</Form.Text>
                        <FormSelect options={["Digital", "Data", "Design"]} width="6" controlId="usage"/>
                    </Form.Group>
                </Row>  

                <Row className="mt-4">
                    <Form.Group as={Col} md="8">
                        <Form.Label>Resource skill level</Form.Label> 
                        <Form.Text className="text-muted mb-3">Choose 1 or more options that apply</Form.Text>
                        <FormSelect options={["Beginner", "Intermediate", "Advanced"]} width="6" controlId="usage"/>
                    </Form.Group>
                </Row>  
                
                <FormInput label="Tags" size="lg" width="8" subText="Add any additional keywords that describe the resource"/>

                <FormInput label="Notes" size="lg" width="8" subText="Anything else you would like to add" type="textarea"/>

                <Row className="mt-4">
                    <Form.Group as={Col} md="8">
                        <Button variant="primary" type="submit" size="lg">
                            Submit
                        </Button>
                        <Form.Text className="text-muted mt-3 mb-5">Never submit passwords through this form.</Form.Text>
                    </Form.Group>
                </Row>
            </Form>
        </Row>
    </Container>
)


const CheckBoxes = (props) => (
    props.items.map(checkBox => (
        <Form.Group controlId={`radio-${checkBox}`}>
            <Form.Check type={props.type} label={checkBox}/>
        </Form.Group>
    ))
)

const Paragraphs = (props) => (
    props.items.map(item => <p>{item}</p>)
)


const FormInput = (props) => (
    <Row className="mt-4">
        <Form.Group as={Col} md={props.width} controlId={props.controlId}>
            <Form.Label className="mb-2">{props.label}</Form.Label>
            <Form.Text className="text-muted mb-1">{props.subText}</Form.Text>
            <Form.Control size={props.size} as={props.type} placeholder={props.placeholder} required/>
        </Form.Group>
    </Row>
)

const BroadTypes = (props) => (
    <ul>
        {props.types.map(type => (
            <li className="list-unstyled">
                <span className="text-muted mb-1">{type}</span>
            </li>
        ))}
    </ul>
)

const FormSelect = (props) => (
    <Form.Control as="select">
        {props.options.map(option => <option>{option}</option>)}
    </Form.Control>
)

export default AddResourceView;
