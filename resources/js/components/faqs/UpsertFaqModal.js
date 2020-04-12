import React, {useEffect, useState} from "react";
import _ from "lodash";

import {fetchOne, upsert} from "../../services/FaqsServices";
import {Button, Modal} from "react-bootstrap";
import Ingredients from "../ingredients";

/**
 * @param id
 * @param onSuccess
 * @param onClose
 * @param createMode
 * @returns {*}
 * @constructor
 */
function UpsertFaqModal({id, onSuccess, onClose, createMode = false}) {

    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [faq, setFaq] = useState({
        faq_question: '',
        faq_answer: '',
    });

    const onSimpleFormChange = (e) => {

        setFaq({
            ...faq,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {

        if (createMode) {
            setShow(true);
        }

    }, [createMode]);

    useEffect(() => {

        if (id) {
            setShow(true);

            if (id > 0) {
                fetchOne(id, (faq) => {
                    setFaq(faq);
                    setShow(true);
                    setErrorMessage(null);
                }, () => {

                });
            }
        }

    }, [id]);


    const handleClose = () => {
        setShow(false);
        onClose();
    };

    const onSave = () => {
        upsert(faq, (response) => {

            if (_.isFunction(onSuccess)) {
                onSuccess(response);
            }
            handleClose();

        }, (message) => {
            setErrorMessage(message);
        });
    };

    return (
        <Modal show={show} onHide={handleClose} size={'lg'}>
            <Modal.Header closeButton>
                <Modal.Title>Create / Update</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    (errorMessage) &&
                    <Ingredients.Info infoClass={'danger'}>
                        {errorMessage}
                    </Ingredients.Info>
                }
                <div className="sbp-preview-content">

                    <div className="form-group">
                        <label htmlFor="faq_question">FAQ Label</label>
                        <input
                            className="form-control"
                            id="faq_question"
                            type="text"
                            placeholder="Question Label"
                            name="faq_question"
                            value={faq.faq_question}
                            onChange={onSimpleFormChange}
                        />
                    </div>


                    <div className="form-group">
                        <label htmlFor="faq_answer">
                            FAQ Answer
                        </label>
                        <textarea
                            name="faq_answer"
                            className="form-control"
                            id="faq_answer"
                            rows="3"
                            onChange={onSimpleFormChange}
                            value={faq.faq_answer}
                        />
                    </div>


                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={onSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpsertFaqModal;
