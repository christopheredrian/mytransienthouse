import React, {useState, useEffect} from 'react';
import {fetchAll} from "../../../services/PhotosServices"

import {uploadPhotoAlbum} from '../../../services/PhotoAlbumsServices';

const AlbumForm = ({ onAlbumNameChange, onAlbumDescriptionChange }) => {

    return (
        <div className="col-lg-2">
            <div className="form-group">
                <input className="form-control form-control-sm" id="name" type="text" placeholder="Album name"
                    onChange={(e) => onAlbumNameChange(e, e.target.value)}
                />
            </div>
            <div className="form-group">
                <textarea className="form-control form-control-sm" id="description" rows="3" placeholder="Description"
                    onChange={(e) => onAlbumDescriptionChange(e, e.target.value)}
                />
            </div>
        </div>
    );
}

const SelectedPhotos = ({selectedPhotos, onDeselectPhoto, photoStyle}) => {

    return (
        <div className="col-lg-5">
            <label>Selected photos</label>
            <div className="card card-scrollable">
                <div className="sbp-preview">
                    <div className="sbp-preview-content">
                        <div style={{overflowY: "auto", maxHeight: "350px"}}>
                            <div className="card-body">
                                <div className="row">
                                    {
                                        !Array.isArray(selectedPhotos) ||
                                        selectedPhotos.length === 0 ? (
                                            <div className="justify-content-center">
                                                <p colSpan="3">No selected photos</p>
                                            </div>
                                        ) : (
                                            selectedPhotos.map((selectedPhoto) => {
                                                return (
                                                    <div className="col-lg-4" key={selectedPhoto.id}>
                                                        <div className="card mb-4 box-shadow">
                                                            <img className="card-img"
                                                                 src={selectedPhoto.url}
                                                                 style={photoStyle}/>
                                                            <div className="card-img-overlay">
                                                                <div className="btn-group float-right">
                                                                    <button className="btn btn-danger btn-xs btn-icon"
                                                                        onClick={(e) => onDeselectPhoto(e, {
                                                                            id: selectedPhoto.id,
                                                                            url: selectedPhoto.url
                                                                        })}
                                                                    >
                                                                        <i className="fas fa-minus"></i>
                                                                    </button>
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
    );
};

const PhotoPool = ({photos, onSelectPhoto, photoStyle}) => {

    return (
        <div className="col-lg-5">
            <label>Photo pool</label>
            <div className="card">
                <div className="sbp-preview">
                    <div className="sbp-preview-content">
                        <div style={{overflowY: "auto", maxHeight: "350px"}}>
                            <div className="card-body">
                                <div className="row">
                                    {
                                        !Array.isArray(photos) || photos.length === 0 ? (
                                            <div className="justify-content-center">
                                                <p colSpan="3">No uploaded photos</p>
                                            </div>
                                        ) : (
                                            photos.map((photo) => {
                                                return (
                                                    <div className="col-lg-4" key={photo.id}>
                                                        <div className="card mb-4 box-shadow">
                                                            <img className="card-img" src={photo.url} alt="Card image"
                                                                 style={photoStyle}
                                                            />
                                                            <div className="card-img-overlay">
                                                                <div
                                                                    className="btn-group float-right">
                                                                    <button
                                                                        className="btn btn-success btn-xs btn-icon"
                                                                        onClick={
                                                                            (e) => onSelectPhoto(e, {
                                                                                id: photo.id,
                                                                                url: photo.url
                                                                            })
                                                                        }
                                                                    >
                                                                        <i className="fas fa-plus"></i>
                                                                    </button>
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
    );
};

const UpsertPhotoAlbumModal = () => {

    const [photos, setPhotos] = useState(null);
    const [albumData, setAlbumData] = useState({
        name: '',
        description: '',
        selectedPhotos: []
    });

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

    const onAlbumNameChange = (e, name) => {
        e.preventDefault();

        setAlbumData({
            ...albumData,
            name
        });
    };

    const onAlbumDescriptionChange = (e, description) => {
        e.preventDefault();

        setAlbumData({
            ...albumData,
            description
        });
    };

    const onSelectPhoto = (e, selectedPhoto) => {
        e.preventDefault();

        setPhotos(photos.filter(photo => photo.id !== selectedPhoto.id));
        setAlbumData({
            ...albumData,
            selectedPhotos: albumData.selectedPhotos.concat([selectedPhoto])
        });
    };

    const onDeselectPhoto = (e, deselectedPhoto) => {
        e.preventDefault();

        setAlbumData({
            ...albumData,
            selectedPhotos: albumData.selectedPhotos.filter(selectedPhoto => selectedPhoto.id !== deselectedPhoto.id)
        });
        setPhotos(photos.concat([deselectedPhoto]));

    };

    const onSave = (e) => {
        e.preventDefault();

        console.log(albumData);

        uploadPhotoAlbum(albumData, (response) => {

            if (_.isFunction(onSuccess)) {
                onSuccess(response);
            }

        }, (message) => {
            console.log('Fail');
        });
    };

    const onSuccess = (response) => {
        console.log('onSuccess');
    };

    const photoStyle = {
        objectFit: "cover",
        width: "100%",
        height: "12vh",
        objectPosition: "50% -0%"
    };

    return (
        <div className="modal fade" id="upsertPhotoAlbumModal" tabIndex="-1" role="dialog"
            aria-labelledby="upsertPhotoAlbumModal" aria-hidden="true"
        >
            <div className="modal-dialog modal-xl" role="document">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">Create Album</h5>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row" style={{height: "70vh"}}>

                                <AlbumForm
                                    onAlbumNameChange={onAlbumNameChange}
                                    onAlbumDescriptionChange={onAlbumDescriptionChange}
                                />
                                <SelectedPhotos
                                    selectedPhotos={albumData.selectedPhotos}
                                    onDeselectPhoto={onDeselectPhoto}
                                    photoStyle={photoStyle}
                                />
                                <PhotoPool
                                    photos={photos}
                                    onSelectPhoto={onSelectPhoto}
                                    photoStyle={photoStyle}
                                />

                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-primary" type="button" onClick={(e) => onSave(e)}  data-dismiss="modal">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpsertPhotoAlbumModal;