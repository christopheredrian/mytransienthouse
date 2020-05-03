import React from 'react';
import {LightgalleryProvider, LightgalleryItem} from "react-lightgallery";

import "lightgallery.js/dist/css/lightgallery.css";
import './PhotosList.css';

const PhotosList = ({photos}) => {

    const renderSwitch = (index) => {
        switch (index) {
            case 0:
                return 'mt-n5';
            case 1:
                return 'mt-md-n5';
            case 2:
                return 'mt-xl-n5';
            default:
                return '';
        }
    };

    return (
        <section className="bg-light pb-10">
            <div className="container">
                <div className="row d-flex justify-content-center" id="selector">
                    <LightgalleryProvider>
                        {
                            photos.map(({id, url}, index) => {
                                return (
                                    <div className={`col-md-6 col-xl-4 mb-5 ${renderSwitch(index)} item`} key={id}>
                                        <a className="card card-portfolio h-100" href="#">
                                            <LightgalleryItem key={id} group="any" src={ url }>
                                                <img className="card-img-top photo" src={ url } alt="..."/>
                                            </LightgalleryItem>

                                        </a>
                                    </div>
                                )
                            })
                        }
                    </LightgalleryProvider>
                </div>
                <div className="svg-border-rounded text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144.54 17.34" preserveAspectRatio="none"
                         fill="white">
                        <path d="M144.54,17.34H0V0H144.54ZM0,0S32.36,17.34,72.27,17.34,144.54,0,144.54,0"/>
                    </svg>
                </div>
            </div>
        </section>
    )
};

export default PhotosList;
