import React, {useEffect, useState} from 'react';

import {ChevronDown, Edit, Trash2, PlusCircle} from "react-feather";
import {
    fetchAll, deleteFaq
} from "../../services/FaqsServices";
import UpsertFaqModal from './UpsertFaqModal';

const FaqsList = () => {

    const [faqs, setFaqs] = useState([]);
    const [selectedFaqId, setSelectedFaqId] = useState(null);
    const [isCreateMode, setIsCreateMode] = useState(false);

    const fetchAllFaqs = () => {
        fetchAll((faqs) => {
            setFaqs(faqs);
        }, (error) => {
            // todo: handle
        })
    };

    useEffect(() => {
        fetchAllFaqs();
    }, []);

    const onModalSuccess = (response) => {
        fetchAllFaqs();
        setIsCreateMode(false);
    };

    return (
        <div className={'container mt-5'}>

            <UpsertFaqModal
                id={selectedFaqId}
                onSuccess={onModalSuccess}
                onClose={() => setSelectedFaqId(undefined)}
                createMode={isCreateMode}
            />

            <div className="text-center mb-4"><h2>Your questions, answered.</h2></div>

            <div className={'text-right m-4'}>
                <PlusCircle
                    onClick={() => {
                        setSelectedFaqId(-1);
                        setIsCreateMode(true);
                    }}/>
            </div>

            <div className="accordion accordion-faq mb-5" id="helpAccordion">
                {
                    faqs.length <= 0 ?
                        <div className={'alert alert-info'}>
                            There are no FAQs setup yet
                        </div>
                        :
                        faqs.map(({id, faq_question, faq_answer}, index) => {
                            return (
                                <div className="card accordion-faq-item" key={id}>

                                    <a className="card-header collapsed" id={`helpHeading${index}`}
                                       data-toggle="collapse"
                                       data-target={`#helpCollapse${index}`} aria-expanded="true"
                                       aria-controls={`helpCollapse${index}`}
                                       href="#"
                                    >
                                        <div className="accordion-faq-item-heading">{faq_question}
                                            <ChevronDown/>
                                        </div>
                                    </a>

                                    <div className="collapse" id={`helpCollapse${index}`}
                                         aria-labelledby={`helpHeading${index}`}
                                         data-parent="#helpAccordion">
                                        <div className="card-body border-bottom">
                                            <Trash2 className={'float-right cursor mx-2'} onClick={() => {
                                                const yes = confirm("Are you sure you want to delete this FAQ?");

                                                if (yes) {
                                                    deleteFaq(id);
                                                    setIsCreateMode(false);
                                                    fetchAllFaqs();
                                                }

                                            }}/>
                                            <Edit
                                                className={'float-right cursor'}
                                                onClick={() => {
                                                    setSelectedFaqId(id);
                                                }}
                                            />
                                            {faq_answer}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
        </div>
    );
};


export default FaqsList;
