import React, {useState} from 'react';
import {upsert as upsertSupportRequest} from '../../services/SupportRequestsServices'

import Loading from './../ingredients/Loading';

const SupportRequest = () => {

    const [loading, setLoading] = useState(false);
    const [referenceNumber, setReferenceNumber] = useState(null);

    window.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth"
    });

    return ( loading ? (<Loading />) : (
            <div className="container bg-light">
                <div className="row pt-10 pb-5 mt-10">
                    { !referenceNumber ? (
                        <Form
                            setReferenceNumber={setReferenceNumber}
                            setLoading={setLoading}
                        />
                    ) : (
                        <SupportRequestSuccess
                            referenceNumber={referenceNumber}
                            setReferenceNumber={setReferenceNumber}
                        />
                    )}
                </div>
            </div>
        )

    );

};

const SupportRequestSuccess = ({referenceNumber, setReferenceNumber}) => {
    return (
        <div className="container bg-light">
            <div className="row pt-10 pb-10">
                <div className="col text-center">
                    <p>
                        Thank you for your interest! We will get back to you soon. <br/>
                    </p>
                    <p className="font-weight-bold">
                        Please keep this for future reference<br/>
                        Request Number: <strong>{referenceNumber}</strong>
                    </p>
                    <button
                        className={'btn btn-primary btn-marketing px-4'}
                        onClick={() => setReferenceNumber(null)}
                    >
                        NEW REQUEST
                    </button>
                </div>
            </div>
        </div>
    )
};

const Form = ({setReferenceNumber, setLoading}) => {

    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
        email: '',
        subject: '',
        body: ''
    });

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log('onSubmit', formData);

        if (!formData.full_name || !formData.phone || !formData.email || !formData.subject || !formData.body) {
            setError('Please provide data for all fields.');
        } else {
            upsertSupportRequest(formData, ({referenceNumber}) => {
                setError('');

                setReferenceNumber(referenceNumber);
                setLoading(false);
            }, (error) => {
                alert(error);
                setError(error);
            });
        }
    };

    return (
        <div className="col">
            <form onSubmit={onSubmit}>
                { error && <h3>{error}</h3> }
                <div className="form-row">
                    <div className="form-group col-md-4"><label className="text-dark">Full name</label>
                        <input className="form-control py-4"
                               id="fullName"
                               type="text"
                               name="full_name"
                               placeholder="Enter your name"
                               value={formData.full_name}
                               onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                               required
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label className="text-dark">Phone Number</label>
                        <input name="phone"
                               className="form-control py-4"
                               id="phone"
                               type="text"
                               placeholder="Enter Phone Number (ex. 0935...)"
                               pattern="[0-9]{11}"
                               value={formData.phone}
                               onChange={(e) => setFormData({...formData, phone: e.target.value})}
                               required
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label className="text-dark">Email</label>
                        <input name="email"
                               className="form-control py-4"
                               id="email"
                               type="email"
                               placeholder="Enter Email Address"
                               value={formData.email}
                               onChange={(e) => setFormData({...formData, email: e.target.value})}
                               required
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <div className="form-group"><label className="text-dark">Subject</label>
                            <input
                                id="subject"
                                name="subject"
                                type="text"
                                className="form-control"
                                placeholder="Inquring for..."
                                value={formData.subject}
                                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="text-dark">Message</label>
                    <textarea className="form-control py-3" id="inputMessage"
                              placeholder="Enter your message..."
                              name="body"
                              rows="4"
                              value={formData.body}
                              onChange={(e) => setFormData({...formData, body: e.target.value})}
                              required
                    >
                            </textarea>
                </div>
                <div className="text-center">
                    <button className="btn btn-primary btn-marketing mt-4" type="submit">Submit Request</button>
                </div>
            </form>
        </div>
    )
};

export default SupportRequest;
