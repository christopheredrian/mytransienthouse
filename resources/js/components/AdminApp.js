import React, {useState} from 'react';
import axios from 'axios';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import {
    Button, Row, Col, Container, Card,
    ListGroup
} from 'react-bootstrap';

import UserList from './admin/UserList'

const ADMIN_ROOT_PATH = '/admin';


const FetchDataExample = () => {

    const [testData, setTestData] = useState([
        {id: 1, content: 'Test Data on JS 1'},
        {id: 2, content: 'Test Data on JS 2'},
        {id: 3, content: 'Test Data on js 3'},
    ]);

    const getTestData = () => {

        /**
         * Get data from endpoint
         */
        axios.get('/test_data')
            .then(({data}) => {
                /**
                 * Success response
                 * set state data
                 */
                setTestData(data);

            })
            .catch(error => {
                console.error(error);
                alert("There was an error while fetching requests");
            });

    };

    return (
        <Row className="justify-content-center mt-5">
            <Col md={8}>
                <Card className={'p-5'}>
                    <Card.Title>
                        AdminApp.js
                    </Card.Title>
                    <Card.Text>
                        Click button to get data from server
                    </Card.Text>
                    <Card.Text>
                        <Button size={"sm"} onClick={getTestData}>Get data (via AJAX)</Button>
                    </Card.Text>

                    <ListGroup>
                        {
                            Array.isArray(testData) &&
                            (testData.length > 0) &&
                            testData.map(({content, id}) => {
                                return <ListGroup.Item key={id}>{content}</ListGroup.Item>
                            })
                        }
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
};

const AdminApp = () => {

    return (
        <Container>
            <div className={'pt-5'}>
                <Router>
                    {/* Sidebar */}
                    <nav id={'sidebar'}>
                        <div className="sidebar-header">
                            <h3>Bootstrap Sidebar</h3>
                        </div>
                        <ul className="list-unstyled components">

                            <li><Link to={`${ADMIN_ROOT_PATH}/fetch-sample`}>Fetch Data Example</Link></li>
                            <li><Link to={`${ADMIN_ROOT_PATH}/users`}>Users</Link></li>
                        </ul>
                    </nav>
                    {/* Main Component Rendered*/}
                    <div id={'content'}>
                        <Switch>
                            <Route path={`${ADMIN_ROOT_PATH}/fetch-sample`}><FetchDataExample/></Route>
                            <Route path={`${ADMIN_ROOT_PATH}/users`}><UserList/></Route>
                        </Switch>
                    </div>
                </Router>

            </div>
        </Container>
    );
};

export default AdminApp;
