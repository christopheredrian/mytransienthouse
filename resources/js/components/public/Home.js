import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import {publicFetchAll as fetchAllFaqs} from "../../services/FaqsServices";
import {publicFetchAll as fetchAllPhotoAlbums} from "../../services/PhotoAlbumsServices";

import FaqsList from './subcomponents/FaqsList';
import FeaturedPhotoAlbumsList from './subcomponents/FeaturedPhotoAlbumsList';

const Home = ({ui = null}) => {

    const [faqs, setFaqs] = useState([]);
    const [photoAlbums, setPhotoAlbums] = useState([]);

    const fetchFaqs = () => {
        fetchAllFaqs((faqs) => {
            setFaqs(faqs);
        }, (error) => {
            // todo: handle
        });
    };

    const fetchPhotoAlbums = () => {
        fetchAllPhotoAlbums((photoAlbums) => {
            setPhotoAlbums(photoAlbums);
        }, (error) => {
            // todo: handle
        });
    };

    useEffect(() => {
        fetchFaqs();
        fetchPhotoAlbums();
    }, []);

    window.scrollTo({
        left:0,
        top: 0,
        behavior: "smooth"
    });

    return (
        <div>
            <Header ui={ui}/>
            <section className="bg-white py-10">
                <div className="container">
                    <FeaturedPhotoAlbumsList photoAlbums={photoAlbums} />
                    <FaqsList faqs={faqs}/>
                </div>
            </section>
            <BookNow />
        </div>
    )

};

const Header = ({ui}) => {

    return (
        <header
            className="page-header page-header-light bg-img-cover overlay overlay-light overlay-80"
            style={{backgroundImage: `url("${ui.main_image_url}")`}}
        >
            <div className="page-header-content py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-8 col-lg-10 text-center">
                            <h1 className="page-header-title">{ ui.main_title ? ui.main_title : 'MTH' }</h1>
                            <p className="page-header-text mb-4">{ ui.main_subtitle ? ui.main_subtitle : 'MTH' }</p>
                            <a className="btn btn-marketing rounded-pill btn-primary" href="#">Get Started</a>
                            <a className="btn btn-link btn-marketing rounded-pill" href="#!">Learn More</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="svg-border-rounded text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144.54 17.34" preserveAspectRatio="none"
                     fill="currentColor">
                    <path d="M144.54,17.34H0V0H144.54ZM0,0S32.36,17.34,72.27,17.34,144.54,0,144.54,0" />
                </svg>
            </div>
        </header>
    )

};

const BookNow = () => {

    return (
        <section
            className="bg-img-cover overlay overlay-light overlay-80 py-15"
            style={{backgroundImage: `url("https://source.unsplash.com/BlIhVfXbi9s/1600x800")`}}
        >
            <div className="container z-1">
                <div className="mt-5">
                    <div className="display-4 mb-3 text-dark">Ready to book?</div>
                    <a className="btn btn-primary btn-marketing rounded-pill" href="/contact">Book Now</a>
                </div>
            </div>
            <div className="svg-border-angled text-light">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"
                     fill="currentColor">
                    <polygon points="0,100 100,0 100,100"/>
                </svg>
            </div>
        </section>
    )

};

const mapStateToProps = (state) => {
    return {
        ui: state.ui ? state.ui : null,
    }
};

export default connect(mapStateToProps)(Home);
