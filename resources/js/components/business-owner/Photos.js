import React, {useState, useEffect} from 'react';
import {Camera, Image} from 'react-feather';

import {
    fetchAll, uploadPhoto, deletePhoto
} from "../../services/PhotosServices";

const Photos = ({loggedInUser = null}) => {

    const [photos, setPhotos] = useState([]);
    const [photoFiles, setPhotoFiles] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const fetchAllPhotos = () => {
        fetchAll((photos) => {
            setPhotos(photos);
        }, (error) => {
            // todo: handle
        })
    };

    useEffect(() => {
        fetchAllPhotos();
    }, []);

    const onFileSelectChange = (e) => {
        e.preventDefault();
        setPhotoFiles(e.target.files);
    };

    const onSuccess = (response) => {
        console.log('boom');
        fetchAllPhotos();
    };

    const onUpload = (e) => {
        e.preventDefault();

        const data = new FormData();
        Array.from(photoFiles).forEach(photoFile => data.append('photos[]', photoFile));

        uploadPhoto(data, (response) => {

            if (_.isFunction(onSuccess)) {
                onSuccess(response);
            }

        }, (message) => {
            setErrorMessage(message);
        });

    };

    const onDelete = (e, id) => {
        e.preventDefault();

        deletePhoto(id, (response) => {

            if (_.isFunction(onSuccess)) {
                onSuccess(response);
            }

        }, (message) => {
            setErrorMessage(message);
        });
    };

    const photoStyle = {
        width: "100%",
        objectFit: "cover",
        height: "250px",
        objectPosition: "50% -0%"
    };

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
                                            <form onSubmit={(e) => onUpload(e)} encType="multipart/form-data">
                                                <div className="form-group">
                                                    <input
                                                        type="file"
                                                        name="photos[]"
                                                        accept=".jpeg, .jpg, .png"
                                                        className="form-control-file"
                                                        onChange={(e) => onFileSelectChange(e)}
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
                                                                                 style={photoStyle}/>
                                                                        </div>

                                                                        <div className="card-body">
                                                                            <form
                                                                                onSubmit={(e) => onDelete(e, photo.id)}
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

export default Photos;
