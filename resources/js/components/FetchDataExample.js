import React, {useState} from "react";
import axios from "axios";
import {Button, Card, Col, ListGroup, Row} from "react-bootstrap";

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
        <Row className="justify-content-center">
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

export default FetchDataExample;
