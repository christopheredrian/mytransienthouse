import React, {useState, useEffect} from 'react';
import {Camera, MoreVertical} from 'react-feather';
import {Dropdown, ButtonGroup} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
    fetchAll, uploadPhoto, deletePhoto
} from "../../services/PhotosServices";

const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
    <button
        className="btn btn-transparent-dark btn-icon"
        ref={ref}
        onClick={e => {
            e.preventDefault();
            onClick(e);
        }}
    >
        <MoreVertical />
        {children}
    </button>
));

const PhotosList = ({loggedInUser = null}) => {

    const [isUploading, setIsUploading] = useState(false);
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
        setIsUploading(false);
        fetchAllPhotos();
    };

    const onUpload = (e) => {
        e.preventDefault();

        setIsUploading(true);

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

        const confirmDelete = confirm(`Are you sure you want to delete this photo?`);

        if (confirmDelete) {
            deletePhoto(id, (response) => {

                if (_.isFunction(onSuccess)) {
                    onSuccess(response);
                }

            }, (message) => {
                setErrorMessage(message);
            });
        }
    };

    const photoStyle = {
        width: "100%",
        objectFit: "cover",
        height: "200px",
        overflow: "hidden",
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
                    <div className="col-xl-3">
                        <div className="row">
                            <div id="default" className="w-100">
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
                                                        disabled={isUploading}
                                                    >
                                                        { isUploading ? (
                                                            <FontAwesomeIcon className="mr-2" icon="spinner" spin />
                                                        ) : (
                                                            <FontAwesomeIcon className="mr-2" icon="upload"/>
                                                        )
                                                        }
                                                        {isUploading ? " Uploading" : " Upload"}
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-9">
                        <div id="default" className="h-100">
                            <div className="card mb-4 h-100">
                                <div className="card-header">
                                    <ul className="nav nav-tabs card-header-tabs">
                                        <li className="nav-item">
                                            <a className="nav-link active" href="#">
                                                All Photos <span className="badge badge-warning">{photos.length}</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link disabled" href="#">Albums</a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="card-body">
                                    <div
                                        className="sbp-preview p-2"
                                        style={{overflowY: "auto", maxHeight: "calc(100vh - 400px)"}}
                                    >
                                        <div className="row">
                                            {
                                                !Array.isArray(photos) || photos.length === 0 ? (
                                                    <div className="justify-content-center">
                                                        <p colSpan="3">No Photos</p>
                                                    </div>
                                                ) : (
                                                    photos.map((photo) => {
                                                        return (
                                                            <div className=" col-xl-3" key={photo.id}>
                                                                <div className="card mb-3 box-shadow">
                                                                    <img
                                                                        className="card-img"
                                                                        src={photo.url}
                                                                        style={photoStyle}
                                                                    />
                                                                    <div
                                                                        className="card-img-overlay p-1"
                                                                        style={{height: "200px"}}
                                                                    >
                                                                        <div className="d-flex justify-content-end">

                                                                            <Dropdown as={ButtonGroup}>
                                                                                <Dropdown.Toggle
                                                                                    as={CustomToggle}
                                                                                    variant="success"
                                                                                    id="dropdown-split-basic"
                                                                                />

                                                                                <Dropdown.Menu>
                                                                                    <Dropdown.Item
                                                                                        onClick={(e) => onDelete(e, photo.id)}
                                                                                    >
                                                                                        Delete
                                                                                    </Dropdown.Item>
                                                                                </Dropdown.Menu>
                                                                            </Dropdown>
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
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default PhotosList;
