import React, { useState, useEffect } from 'react';
import { Form, Card, Container, Row, Col, Button, Nav} from 'react-bootstrap';
import './AddResourceView.css';
import {postData, neoj_URI} from '../../lib/common.js'
import { rename } from 'fs';

const description = ["The Digital Academy is developing an open online learning environment for curation of quality learning resources.", "Know of great tools, templates, courses, events, webinars, articles, etc on digital topics? Add them here.", "Your expertise will contribute to the living repository of content."]

const addResource = (data) => {
    /* */
}

const AddResourceView = (props) => {

    const [data, setData] = useState({data: [], isFetching: false});
    const [usages, setUsages] = useState([]);
    const [types, setTypes] = useState([]);
    const [secondaryUsages, setSecondaryUsages] = useState([]);
    const [topics, setTopics] = useState([]);

    // FORM INPUTS
    const [resourceName, setResourceName] = useState("");
    const [resourceLink, setResourceLink] = useState("");
    const [resourceDescription, setResourceDescription] = useState("");
    const [resourceOrganization, setResourceOrganization] = useState("");
    const [resourceOrgDecision, setResourceOrgDecision] = useState([]);
    const [resourceLang, setResourceLang] = useState([]);
    const [resourceTime, setResourceTime] = useState([25200]);
    const [resourceUsage, setResourceUsage] = useState([]);
    const [resourceTypes, setResourceTypes] = useState([]);
    const [resourceTopics, setResourceTopics] = useState([]);
    const [resourceSkillLvl, setResourceSkillLvl] = useState("Beginner");
    const [resourceTags, setResourceTags] = useState([]);
    const [resourceNote, setResourceNote] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();

        const randUuidQuery = `query{getRandomUid}`;
        
        const mutationQuery = `
        mutation addResource(
            $uid: String!
            $difficulty: Int!, 
            $image: String!,
            $url: String!, 
            $comments: Int!,
            $cost: Int!,
            $endorsements: Int!,
            $creationYear: _Neo4jDateInput,
            $description: String!,
            $title: String!,
            $timeEstimate: Int!,
            $dateAdded: String!
        ){
            CreateResource(
                image: $image,
                difficulty: $difficulty,
                url: $url,
                cost: $cost,
                comments: $comments,
                endorsements: $endorsements,
                creationYear: $creationYear,
                description: $description,
                title: $title,
                timeEstimate: $timeEstimate,
                dateAdded: $dateAdded,
                uid: $uid
            ){
                uid
            }
        }`

        const variables = {
            image: "https://images.unsplash.com/photo-1511317559916-56d5ddb62563?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=639&q=80",
            difficulty: resourceSkillLvl === "Beginner" ? 1 : (resourceSkillLvl === "Intermediate" ? 2 : 3),
            url: resourceLink,
            cost: 0,
            endorsements: 6400,
            creationYear: {
                year: 2018,
                month: 1,
                day: 1,
                formatted: "2018-01-01"
            },
            description: resourceDescription,
            title: resourceName,
            timeEstimate: 25200,
            dateAdded: new Date().toDateString(),
            comments: 2500
        }

        postData(neoj_URI, randUuidQuery, {}).then((ruid_data) => {
            postData(neoj_URI, mutationQuery, {uid: ruid_data.data.getRandomUid, ...variables}).then((data) => {
                console.log(ruid_data.data.getRandomUid);

                const randomUsers = ["38060f4e-2f32-4650-a09b-6ee09347e335", "f9bf5893-9d3b-4dc0-830f-a9974be240ab", "39e3065f-06c7-42fb-816d-01a44c256a00", "11a07aea-fa15-4b8a-b483-b7e2330f626b", "9c7887d4-3859-4bd3-8e47-3cec03b9d488", "c3308c09-6ef8-4949-bf24-56426cb4c0ed", "31f92cd7-3bae-404f-845f-a386287bb0a6", "99080e25-9fe6-4eee-b994-c6607b514078", "d2eebf71-910e-4b1f-bc66-0c4ccea8326b"]

                resourceTags.map(tag => {
                    postData(neoj_URI, associationQueryGenerator("AddTagResources", "_ResourceInput", "_TagInput"), {from: {uid: ruid_data.data.getRandomUid}, to: {name:tag}}).then((tag_data) => {
                        console.log("Tag added to resource")                        
                    }).catch(err => {
                        console.log(err)
                    });
                });

                resourceTopics.map(topic => {
                    postData(neoj_URI, associationQueryGenerator("AddTopicResources", "_ResourceInput", "_TopicInput"), {from: {uid: ruid_data.data.getRandomUid}, to: {name:topic}}).then((topic_data) => {
                        console.log("Topic added to resource")                        
                    }).catch(err => {
                        console.log(err)
                    });
                }); 

                resourceTypes.map(a_type => {
                    postData(neoj_URI, associationQueryGenerator("AddResourceType_of", "_ResourceInput", "_ResourceTypeInput"), {from: {uid: ruid_data.data.getRandomUid}, to: {name:a_type}}).then((type_data) => {
                        console.log("Type added to resource")                        
                    }).catch(err => {
                        console.log(err)
                    });
                });
                
                resourceLang.map(lang => {
                    postData(neoj_URI, associationQueryGenerator("AddLanguageResources", "_ResourceInput", "_LanguageInput"), {from: {uid: ruid_data.data.getRandomUid}, to: {name:lang.toLowerCase()}}).then((lang_data) => {
                        console.log("Language added to resource")                        
                    }).catch(err => {
                        console.log(err)
                    });
                });

                resourceUsage.map(use => {
                    postData(neoj_URI, associationQueryGenerator("AddSecondaryUsageResources", "_ResourceInput", "_SecondaryUsageInput"), {from: {uid: ruid_data.data.getRandomUid}, to: {name:use}}).then((usage_data) => {
                        console.log("Secondary usage added to resource")     
                    }).catch(err => {
                        console.log(err)
                    });
                });

                const readUsagesCount = resourceUsage.filter(val => val.includes("Read")).length;
                const listenUsagesCount = resourceUsage.filter(val => val.includes("Listen")).length;
                const watchUsagesCount = resourceUsage.filter(val => val.includes("Watch")).length;
                const participateUsagesCount = resourceUsage.filter(val => val.includes("Participate")).length;
                const useCount = resourceUsage.filter(val => val.includes("Use")).length;

                const counts = [
                    {usage: "Read", count: readUsagesCount},
                    {usage: "Listen", count: listenUsagesCount},
                    {usage: "Watch", count: watchUsagesCount},
                    {usage: "Participate", count: participateUsagesCount},
                    {usage: "Use", count: useCount}
                ];

                const use = counts.reduce((prev, current) => (prev.count > current.count) ? prev : current).usage
                               
                postData(neoj_URI, associationQueryGenerator("AddPrimaryUsageResources", "_ResourceInput", "_PrimaryUsageInput"), {from: {uid: ruid_data.data.getRandomUid}, to: {name:(use ? use : "All")}}).then((user_data) => {
                    console.log("Endorser added to resource")     
                }).catch(err => {
                    console.log(err)
                });

                for(let i = 0; i < 2; i++){
                    postData(neoj_URI, associationQueryGenerator("AddResourceEndorsed_by", "_ResourceInput", "_UserInput"), {from: {uid: ruid_data.data.getRandomUid}, to: {uid:randomUsers[Math.floor(Math.random()*randomUsers.length)]}}).then((user_data) => {
                        console.log("Endorser added to resource")     
                    }).catch(err => {
                        console.log(err)
                    });
                }

                if(resourceOrgDecision[0] === "Yes/ Oui"){
                    postData(neoj_URI, createQueryGenerator("CreateOrganization"), {name: resourceOrganization}).then((org_data) => {
                        console.log("Organization Created");
                        postData(neoj_URI, associationQueryGenerator("AddOrganizationResources", "_ResourceInput", "_OrganizationInput"), {from: {uid: ruid_data.data.getRandomUid}, to: {name:org_data.data.CreateOrganization.name}}).then((user_data) => {
                            console.log("Organization added to resource")     
                        }).catch(err => {
                            console.log(err)
                        });    
                    }).catch(err => {
                        console.log(err)
                    });
                }


            }).catch(err => {
                console.log(err)
            });
        }).catch(err => {
            console.log(err)
        });
    }

    const associationQueryGenerator = (name, from, to) => `mutation associate($from:${from}!, $to: ${to}!){${name} (from: $from, to: $to){from{uid}}}`;

    const createQueryGenerator = (queryName) => `mutation createNode($name: String!){${queryName}(name: $name){name}}`

    useEffect(() => {

        const query = `{PrimaryUsage{name},SecondaryUsage{name},ResourceType{name},Topic{name},Skill{name}}`


        setData({data: [], isFetching: true})

        postData(neoj_URI, query, {}).then((data) => {
            setData({data: data.data, isFetching: false})   
            setUsages(data.data.PrimaryUsage.map((usage => usage.name)))
            setTypes(data.data.ResourceType.map((type => type.name)))
            setSecondaryUsages(data.data.SecondaryUsage.map((secUsage => secUsage.name)))
            setTopics(data.data.Topic.map((topic => topic.name)))
        }).catch(err => {
            console.log(err)
            setData({data: [], isFetching: false})
        });

    }, [])
    
    return (
        <Container>
        <Row>
            <Form onSubmit={handleSubmit}>
                <TopCard title="Learning resources - quick entry form" description={description} />
                <FormInput label="Resource name" value={resourceName} setInfo={setResourceName} size="lg" width="8" required={true}/>
                <FormInput label="Resource link (URL)" size="lg" width="8" value={resourceLink} setInfo={setResourceLink} required={true}/>
                <FormInput label="Why is this a good resource?" size="lg" width="8" subText="This information may be used as a teaser or description text for the curated resource." type="textarea" value={resourceDescription} setInfo={setResourceDescription} required={true}/>

                <Row className="mt-4">
                    <Form.Group as={Col} md="8">
                        <Form.Label>Can we use your name and organization next to description of resource</Form.Label> 
                        <Form.Text className="text-muted mb-3">Choose "Yes" if we can use your name and organization to help the community discover those who are interested or are experts in a certain topic.</Form.Text>

                        <Form.Text className="text-muted mb-2">Choose "No" if you want your description to remain anonymous.</Form.Text>
                        <CheckBoxes selectedValues={resourceOrgDecision} setInfo={setResourceOrgDecision} name="orgSelect" type="radio" items={["Yes/ Oui", "No/ Non"]} inline={false}/>
                    </Form.Group>
                </Row>

                
                <FormInput label="Resource provided by ... from ..." size="lg" width="8" subText="Please add your full name and organization you work for" value={resourceOrganization} setInfo={setResourceOrganization}/>          

                <Row className="mt-4">
                    <Form.Group as={Col} md="8">
                        <Form.Label>Resource language</Form.Label> 
                        <Form.Text className="text-muted mb-3">Choose 1 or more options that apply.</Form.Text>
                        <CheckBoxes name="langSelect" selectedValues={resourceLang} setInfo={setResourceLang} type="checkbox" items={["English", "French", "Not Applicable"]} inline={false}/>
                    </Form.Group>
                </Row>                    

                <Row className="mt-4">
                    <Form.Group as={Col} md="8">
                        <Form.Label>Time to use the resource</Form.Label> 
                        <Form.Text className="text-muted mb-3">Choose 1 option</Form.Text>
                        <CheckBoxes required={true} selectedValues={resourceTime} setInfo={setResourceTime} name="timeSelect" type="radio" items={["5 min", "10 min", "30 min", "60 min", "2 h", "4 h", "7.5 h", "20 h", "40 h", "N/A"]} inline={true}/>
                    </Form.Group>
                </Row>  

                <Row className="mt-4">
                    <Form.Group as={Col} md="8">
                        <Form.Label>How is this resource best used?</Form.Label> 
                        <Form.Text className="text-muted mb-3">There are 5 broad types of tasks with more specific sub-tasks:</Form.Text>
                        
                        <BroadTypes types={usages} isFetching={data.isFetching}/>
                       
                        <Form.Text className="text-muted mb-2">Choose 1 or more options that best describe the resource</Form.Text>
                        <div className="row justify-content-center">
                            <CheckBoxes type="checkbox" name="usageSelect" selectedValues={resourceUsage} setInfo={setResourceUsage} items={secondaryUsages} width="6" controlId="usage" inline={true}/>
                        </div>
                    </Form.Group>
                </Row>  

                <Row className="mt-4">
                    <Form.Group as={Col} md="8">
                        <Form.Label>What type of resource is this?</Form.Label> 
                        <Form.Text className="text-muted mb-3">Choose 1 or more options that apply.</Form.Text>
                        <CheckBoxes selectedValues={resourceTypes} setInfo={setResourceTypes} name="typeSelect" type="checkbox" items={types} inline={false}/>
                    </Form.Group>
                </Row> 

                <Row className="mt-4">
                    <Form.Group as={Col} md="8">
                        <Form.Label>Which topic does this resource relate to?</Form.Label> 
                        <Form.Text className="text-muted mb-3">Choose 1 or more options that apply</Form.Text>
                        <CheckBoxes selectedValues={resourceTopics} name="topicSelect" items={topics} width="6" setInfo={setResourceTopics} controlId="usage" inline={false}/>
                    </Form.Group>
                </Row>  

                <Row className="mt-4">
                    <Form.Group as={Col} md="8">
                        <Form.Label>Resource skill level</Form.Label> 
                        <Form.Text className="text-muted mb-3">Choose 1 or more options that apply</Form.Text>
                        <FormSelect name="skillLvlSelect" setInfo={setResourceSkillLvl} options={["Beginner", "Intermediate", "Advanced"]} width="6" controlId="usage" required={true}/>
                    </Form.Group>
                </Row>  
                
                <FormInput label="Tags" size="lg" width="8" subText="Add any additional keywords that describe the resource" value={resourceTags} setInfo={setResourceTags}/>

                <FormInput label="Notes" size="lg" width="8" subText="Anything else you would like to add" type="textarea" value={resourceNote} setInfo={setResourceNote}/>

                <Row className="mt-4">
                    <Form.Group as={Col} md="8">
                        <Button variant="primary" size="lg" type="submit">
                            Submit
                        </Button>
                        <Form.Text className="text-muted mt-3 mb-5">Never submit passwords through this form.</Form.Text>
                    </Form.Group>
                </Row>
            </Form>
        </Row>
    </Container>
    )
}

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


const CheckBoxes = (props) => (
    props.items.map(checkBox => (
        // Checks if selected value is already in selectedValues arra, if there removes it, if not adds it
        <Form.Check value={checkBox} type={props.type} label={checkBox} name={props.name} onChange={e => props.setInfo(props.selectedValues.indexOf(e.target.value) > -1 ? props.selectedValues.filter(value => value !== e.target.value) : [...props.selectedValues, e.target.value])} inline={props.inline} required={props.required && props.type === "radio" ? true : false}/>
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
            <Form.Control size={props.size} as={props.type} placeholder={props.placeholder} value={props.value} onChange={e => props.setInfo(e.target.value)} required={props.required}/>
        </Form.Group>
    </Row>
)

const BroadTypes = (props) => (
    <div>
        <ul>
            {props.types.map(type => (
                <li className="list-unstyled" key={`type_${type}`}>
                    <span className="text-muted mb-1">{type}</span>
                </li>
            ))}
        </ul>
        <p>{props.isFetching ? 'Fetching usages...' : ''}</p>
    </div>
)

const FormSelect = (props) => (
    <Form.Control as="select" name={props.name} onChange={e => props.setInfo(props.selectedValues.indexOf(e.target.value) > -1 ? props.selectedValues.filter(value => value !== e.target.value) : [...props.selectedValues, e.target.value])} required={props.required}>
        {props.options.map(option => <option>{option}</option>)}
    </Form.Control>
)

const NavPills = (props) => (
    <Nav variant="pills">
        {props.options.map((option) => (
            <Nav.Item>
                <Nav.Link>{option}</Nav.Link>
            </Nav.Item>
        ))}
    </Nav>
)


export default AddResourceView;
