import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {useParams} from "react-router-dom";

import {publicFetchAll} from "../../services/PhotosServices";

import PhotosList from './PhotosList';
import PhotoAlbumsList from './PhotoAlbumsList';

import './PhotosList.css'

const Gallery = ({ albumAliasLabel, businessName }) => {

    let { id } = useParams();

    const [photos, setPhotos] = useState([]);
    const [otherAlbums, setOtherAlbums] = useState([]);

    const fetchAllPhotos = () => {
        publicFetchAll(({photos, otherAlbums, allPhotosCount, }) => {
            setPhotos(photos);
            setOtherAlbums(otherAlbums);
        }, (error) => {
            // todo: handle
        })
    };

    useEffect(() => {
        fetchAllPhotos();
    }, []);

    return (
        <div>
            <Header businessName={businessName} />
            <PhotosList photos={photos}/>
            <PhotoAlbumsList
                albumAliasLabel={albumAliasLabel}
                photoAlbums={otherAlbums}
            />
            <GetStarted />
        </div>
    )
};

const Header = ({ businessName, photoAlbum = null }) => {
    return(
        <header className="page-header page-header-dark bg-gradient-primary-to-secondary">
            <div className="page-header-content">
                <div className="container text-center">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <h1 className="page-header-title mb-3">{ photoAlbum ? photoAlbum.name : 'All Photos'}</h1>
                            <p className="page-header-text mb-0">
                                { photoAlbum ? photoAlbum.description : `All photos for ${businessName}` }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="svg-border-rounded text-light">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144.54 17.34" preserveAspectRatio="none"
                     fill="currentColor">
                    <path d="M144.54,17.34H0V0H144.54ZM0,0S32.36,17.34,72.27,17.34,144.54,0,144.54,0" />
                </svg>
            </div>
        </header>
    )
};

const GetStarted = () => {
    return (
        <section className="bg-white pt-0 pb-10">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-8 col-md-10 text-center py-5 mb-0">
                        <h2>Ready to get started?</h2>
                        <p className="lead text-gray-500">
                            We'd love to hear about your ideal vacation stay, needs and inquiries. We are currently accepting reservations!
                        </p>
                        <a className="btn btn-primary btn-marketing rounded-pill" href="/contact">BOOK NOW</a>
                    </div>
                </div>
            </div>
            <div className="svg-border-rounded text-light">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144.54 17.34" preserveAspectRatio="none"
                     fill="currentColor">
                    <path d="M144.54,17.34H0V0H144.54ZM0,0S32.36,17.34,72.27,17.34,144.54,0,144.54,0" />
                </svg>
            </div>
        </section>
    )
};

const mapStateToProps = (state) => {
    return {
        businessName: state.account ? state.account.business_name : null,
        albumAliasLabel: state.ui ? state.ui.album_alias_label : null,
    }
};

export default connect(mapStateToProps)(Gallery);
