import React from 'react';
import {ChevronDown} from "react-feather";

const FaqsList = ({faqs}) => {
    return (
        <div>
            {
                (!faqs || faqs.length === 0 || !Array.isArray(faqs)) ? (
                    ''
                ) : (
                    <div>
                        <div className="text-center mb-4"><h2>Your questions, answered.</h2></div>
                        <div className="accordion accordion-faq mb-5" id="helpAccordion">
                            {
                                faqs.map(({id, faq_question, faq_answer}, index) => {
                                    return (
                                        <div className="card accordion-faq-item" key={id}>
                                            <a className="card-header collapsed" id={`helpHeading${index}`}
                                               data-toggle="collapse"
                                               data-target={`#helpCollapse${index}`} aria-expanded="true"
                                               aria-controls={`helpCollapse${index}`}
                                               href="#"
                                            >
                                                <div className="accordion-faq-item-heading">
                                                    {faq_question}
                                                    <ChevronDown/>
                                                </div>
                                            </a>

                                            <div className="collapse" id="helpCollapseOne{{$faq->id}}"
                                                 aria-labelledby="helpHeadingOne{{$faq->id}}"
                                                 data-parent="#helpAccordion">
                                                <div className="card-body border-bottom">
                                                    { faq_answer }
                                                </div>
                                            </div>


                                            <div className="collapse" id={`helpCollapse${index}`}
                                                 aria-labelledby={`helpHeading${index}`}
                                                 data-parent="#helpAccordion">
                                                <div className="card-body border-bottom">
                                                    {faq_answer}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
};

export default FaqsList;
