import React, {useState} from 'react';
import {Button, Row, Col, Container, Card} from 'react-bootstrap';
import ReactDOM from 'react-dom';
import axios from 'axios'


const SideBar = () => {
    return (
        <Row>
            <Col> 1 of 1</Col>
        </Row>
    );
};

const AdminApp = () => {

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
                alert("There was an error while fetcing requests");
            });

    };

    return (
        <Container>
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

                        <ul>
                            {
                                Array.isArray(testData) &&
                                (testData.length > 0) &&
                                testData.map(({content, id}) => {
                                    return <li key={id}>{content}</li>
                                })
                            }
                        </ul>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminApp;

if (document.getElementById('app')) {
    ReactDOM.render(<AdminApp/>, document.getElementById('app'));
}
