import React from 'react';
import {Modal} from 'react-bootstrap';

import UserForm from './UserForm';

const FormModal = ({ userData, showUserForm, onClose, closeUserFormAfterSubmit }) => {
    return (
        <Modal
            show={showUserForm}
            onHide={onClose}
            size="md"
            aria-labelledby="user-form-modal"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="user-form-modal">
                    {userData ? 'Edit User' : 'Add User'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <UserForm
                    userData={userData}
                    onClose={onClose}
                    closeUserFormAfterSubmit={closeUserFormAfterSubmit}
                />
            </Modal.Body>
        </Modal>
    );
}

export { FormModal as default }
