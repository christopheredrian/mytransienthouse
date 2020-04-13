import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Camera, Image } from 'react-feather';
import axios from'axios';

import Endpoints from "./../../config/Endpoints";

const Photos = ({loggedInUser = null}) => {
    const [photos, setPhotos] = useState([]);
    const [photoFiles, setPhotoFiles] = useState('');

    const photoStyle = {
        width: "100%",
        objectFit: "cover",
        height: "250px",
        objectPosition: "50% -0%"
    };

    const onFileChange = (e) => {
        e.preventDefault();

        setPhotoFiles(e.target.files);
    };

    const uploadPhoto = (e) => {
        e.preventDefault();

        const data = new FormData();

        Array.from(photoFiles).forEach(photoFile => data.append('photos[]', photoFile));
        // data.append('userId', loggedInUser.id);

        /**
         * Get data from endpoint
         */
        axios.post(`${Endpoints.UPLOAD_PHOTO}`, data)
            .then(({data}) => {
                /**
                 * Success response
                 * set state data
                 */

                // console.log(`DEBUG: Successfully uploaded photo!`, data);
                getPhotos();
            })
            .catch(error => {
                console.error(error);
                alert("There was an error uploading the photo.");
            });

    };

    const deletePhoto = (e, id) => {
        e.preventDefault();

        axios.post(`${Endpoints.DELETE_PHOTO}`, { id })
            .then(({data}) => {
                /**
                 * Success response
                 * set state data
                 */

                // console.log(`DEBUG: Successfully deleted photo!`, data);
                getPhotos();
            })
            .catch(error => {
                console.error(error);
                alert("There was an error deleting the photo.");
            });
    };

    const getPhotos = () => {

        /**
         * Get data from endpoint
         */
        axios.get(`${Endpoints.PHOTOS_DATA}`)
            .then(({data}) => {
                /**
                 * Success response
                 * set state data
                 */

                // console.log('DEBUG: PHOTO DATA', data)
                setPhotos(data.data);
            })
            .catch(error => {
                console.error(error);
                alert("There was an error while fetching requests");
            });
    };

    useEffect(() => {
        getPhotos();
    }, []);

    return (
        <main>
            <div className="page-header pb-10 page-header-dark bg-gradient-primary-to-secondary">
                <div className="container-fluid">
                    <div className="page-header-content">
                        <h1 className="page-header-title">
                            <div className="page-header-icon">
                                <Camera />
                            </div>
                            <span>Photos</span>
                        </h1>
                        <div className="page-header-subtitle">Photo overview and management of your residence</div>
                    </div>
                </div>
            </div>

            <div className="container-fluid mt-n10">
                <div className="row">
                    <div className="col-lg-4">
                        <div id="default ">
                            <div className="card mb-4 ">
                                <div className="card-header">Upload Photo/s</div>
                                <div className="card-body">
                                    <div className="sbp-preview">
                                        <div className="sbp-preview-content">
                                            <form onSubmit={(e) => uploadPhoto(e)} encType="multipart/form-data">
                                                <div className="form-group">
                                                    <input
                                                        type="file"
                                                        name="photos[]"
                                                        accept=".jpeg, .jpg, .png"
                                                        className="form-control-file"
                                                        onChange={(e) => onFileChange(e)}
                                                        multiple
                                                        required
                                                    />
                                                </div>
                                                <button
                                                    className="btn btn-primary"
                                                    type="submit"
                                                >
                                                    Upload
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8">
                        <div id="default ">
                            <div className="card mb-4 ">
                                <div className="card card-icon ">
                                    <div className="row no-gutters">
                                        <div className="col-auto card-icon-aside bg-warning">
                                            <Image />
                                        </div>
                                        <div className="col">
                                            <div className="card-body py-5">
                                                <h5 className="card-title">{photos.length} uploaded photos</h5>
                                                <p className="card-text">You can choose below which photos to
                                                    display
                                                    for your customers</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <div id="default">
                            <div className="card mb-4">
                                <div className="card-header">Gallery</div>
                                <div className="card-body">
                                    <div className="sbp-preview mb-4">
                                        <div className="sbp-preview-content">
                                            <div className="row">

                                                {
                                                    !Array.isArray(photos) || photos.length === 0 ? (
                                                        <div className="justify-content-center">
                                                            <p colSpan="3">No Photos</p>
                                                        </div>
                                                    ) : (
                                                        photos.map((photo) => {
                                                            return (
                                                                <div className="col-lg-3" key={photo.id}>
                                                                    <div className="card">
                                                                        <div>
                                                                            <img className="card-img-top"
                                                                                 src={ photo.url }
                                                                                 alt=" ..."
                                                                                 style={photoStyle} />
                                                                        </div>

                                                                        <div className="card-body">
                                                                            <form
                                                                                onSubmit={(e) => deletePhoto(e, photo.id)}
                                                                            >
                                                                                <button
                                                                                    className="btn btn-outline-danger btn-sm float-right"
                                                                                    type="submit">
                                                                                    Delete
                                                                                </button>
                                                                            </form>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.loggedInUser ? state.loggedInUser : null,
    }
};

export default connect(mapStateToProps)(Photos);
