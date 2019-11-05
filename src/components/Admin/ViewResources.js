import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import {Table, Container, Row, Col} from 'react-bootstrap';
import {postData, neoj_URI, prepData} from '../../lib/common.js';
import './Admin.css';

const ViewResources = (props) => {

    const [data, setData] = useState({data: [], isFetching: false});
    const [keys, setKeys] = useState([]);

    useEffect(() => {
        

        const resourceQuery = `query{Resource{title,url,image,timeEstimate,comments,creationYear{formatted},dateAdded,endorsed_by{firstName,lastName,profilePic},description,endorsements,secondary_used_as{name},practiced_as{name},primary_used_as{name},topic_of{name},type_of{name},tagged{name},difficulty,uid,resource_org{name},resource_lang{name},resource_skill{name},resource_author{name},resource_dig_standard{name}}}`;
        
        setData({data: [], isFetching:true});
        
        postData(neoj_URI, resourceQuery, {}).then((resource_data) => {
            let p_data = prepData(resource_data.data.Resource)
            setData({data: p_data, isFetching:false});
            setKeys(Object.keys(p_data[0]))
        }).catch(err => {
            console.log(err)
            setData({data: [], isFetching:false});
        }); 
    }, [])

    return (
        <Container fluid>
            <Row>
                <BasicTable data={data.data} keys={keys} />
            </Row>
        </Container>
    )
}



const BasicTable = (props) => (
    <Table striped bordered hover responsive>
        <thead>
            <tr>
                <th>Edit</th>
                <th>Delete</th>
                {props.keys.filter(k => typeof(props.data[0][k]) !== Object).map(k => <th>{k}</th>)}
            </tr>
        </thead>
        <tbody>
            {props.data.map(resource => (
                <tr>
                    <td><Link to={`/admin/edit/${resource['uid']}`} className="icon text-primary">edit</Link></td>
                    <td className="icon text-danger">close</td>
                    {props.keys.map(key => <td>{key === 'endorsements' ? resource[key]['endorsements'] : (key === 'image'? <a href={resource[key]}>View Image</a>: (key === 'url'? <a href={resource[key]}>Visit Page</a>: (resource[key] instanceof Array ? <ul> {resource[key].map(item => <li>{item}</li>)} </ul> : resource[key])))}</td>)}
                </tr>
            ))}
        </tbody>
    </Table>
);

export default ViewResources;
