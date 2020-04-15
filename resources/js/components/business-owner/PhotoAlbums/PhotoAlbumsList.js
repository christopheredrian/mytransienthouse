import React, {useState, useEffect} from 'react';
import {Book, Plus} from 'react-feather';

import UpsertPhotoAlbumModal from './UpsertPhotoAlbumModal';

import { fetchAll } from '../../../services/PhotoAlbumsServices';

const PhotoAlbumsList = () => {

    const [photoAlbums, setPhotoAlbums] = useState(null);

    const fetchAllPhotoAlbums = () => {
        fetchAll((photoAlbums) => {
            setPhotoAlbums(photoAlbums);
        }, (error) => {
            // todo: handle
        })
    };

    useEffect(() => {
        fetchAllPhotoAlbums();
    }, []);

    return (
        <main>
            <div className="page-header pb-10 page-header-dark bg-gradient-primary-to-secondary">
                <div className="container-fluid">
                    <div className="page-header-content">
                        <h1 className="page-header-title">
                            <div className="page-header-icon">
                                <Book />
                            </div>
                            <span>Photo Albums</span>
                        </h1>
                        <div className="page-header-subtitle">Album management for your residence</div>
                    </div>
                </div>
            </div>

            <div className="container-fluid mt-n10">
                <div className="row">
                    <div className="col-lg-12">
                        <div id="default ">
                            <div className="card card-header-actions">
                                <div className="card-header">
                                    Albums
                                    <button
                                        className="btn btn-primary btn-sm"
                                        type="button"
                                        data-toggle="modal"
                                        data-target="#upsertPhotoAlbumModal"
                                    >
                                        <Plus/> Create Album
                                    </button>
                                </div>
                                <div className="card-body">
                                    <div className="row">


                                        {
                                            !Array.isArray(photoAlbums) || photoAlbums.length === 0 ? (
                                                <div className="justify-content-center">
                                                    <p colSpan="3">No Photo Albums</p>
                                                </div>
                                            ) : (
                                                photoAlbums.map((photoAlbum) => {
                                                    return (
                                                        <div className="col-md-4" key={photoAlbum.id}>
                                                            <div className="card mb-4 box-shadow">
                                                                <img className="card-img-top"
                                                                     src="https://mytransienthouse.s3.amazonaws.com/local/dev/sean/photos/1_genove/business-owner/19096247_10209699730152335_1697922340_o.jpg"
                                                                     alt="Card image cap"/>
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{photoAlbum.name}</h5>
                                                                    <p className="card-text">
                                                                        {photoAlbum.description}
                                                                    </p>
                                                                    <div className="d-flex justify-content-between align-items-center">
                                                                        <div className="btn-group">
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-sm btn-outline-secondary"
                                                                            >
                                                                                View
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-sm btn-outline-secondary"
                                                                            >
                                                                                Edit
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            )
                                        }
                                    </div>
                                </div>

                                <UpsertPhotoAlbumModal/>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PhotoAlbumsList;
