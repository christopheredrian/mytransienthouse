import React, {useState, useEffect} from 'react';
import {Modal} from 'react-bootstrap';

import {fetchAll} from "../../services/PhotosServices"

import {
    upsertPhotoAlbum,
    fetchAllSelectedPhotos,
    fetchAllUnselectedPhotos
} from '../../services/PhotoAlbumsServices';

import './UpsertPhotoAlbumModal.css'

const AlbumForm = ({name, description, onAlbumNameChange, onAlbumDescriptionChange}) => {

    return (
        <div className="col-lg-2">
            <div className="form-group">
                <input
                    id="name"
                    type="text"
                    placeholder="Album name"
                    className="form-control form-control-sm"
                    value={name}
                    onChange={(e) => onAlbumNameChange(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <textarea
                    id="description"
                    rows="3"
                    placeholder="Description"
                    className="form-control form-control-sm"
                    value={description}
                    onChange={(e) => onAlbumDescriptionChange(e.target.value)}
                    required
                />
            </div>
        </div>
    );
};

const PhotoButtons = ({label, photo, onPhotoSelect, onSelectFeaturedPhoto = null}) => {

    return (
        <div>
            {
                label === "selected" ? (
                    <div className="d-flex justify-content-between">
                        <button
                            className={`btn btn-xs btn-${photo.is_featured ? 'yellow' : 'blue'} btn-icon`} type="button"
                            title="Make cover photo"
                            onClick={() => onSelectFeaturedPhoto(photo.id)}
                        >
                            <i className="fas fa-star"/>
                        </button>

                        <button
                            className="btn btn-xs btn-red btn-icon" type="button" title="Remove from photo album"
                            onClick={(e) => onPhotoSelect({id: photo.id, url: photo.url, is_featured: false})}
                        >
                            <i className="fas fa-minus"/>
                        </button>
                    </div>
                ) : (
                    <div className="d-flex justify-content-end">
                        <button
                            className="btn btn-xs btn-green btn-icon" type="button" title="Add to photo album"
                            onClick={(e) => onPhotoSelect({id: photo.id, url: photo.url, is_featured: false})}
                        >
                            <i className="fas fa-plus"/>
                        </button>
                    </div>
                )
            }
        </div>
    );

};

const PhotoPool = ({label, photos, onPhotoSelect, onSelectFeaturedPhoto = null}) => {

    const photoStyle = {
        objectFit: "cover",
        width: "100%",
        height: "12vh",
        objectPosition: "50% -0%",
        maxWidth: "100px",
        maxHeight: "100px",
    };

    return (
        <div className="col-lg-5">
            <div className="text-dark ml-2 mb-2">
                {label === 'selected' ? "Selected Photos" : "Photo Pool"}
                <div className="text-xs text-muted">
                    {label === 'selected' ? "Photos included in this album" : "Available photos not included in this album."}
                </div>
            </div>
            <div className="card">
                <div className="sbp-preview">
                    <div className="sbp-preview-content">
                        <div style={{overflowY: "auto", maxHeight: "500px"}}>
                            <div className="card-body">
                                <div className="row">
                                    {
                                        !Array.isArray(photos) || photos.length === 0 ? (
                                            <div className="justify-content-center">
                                                <p colSpan="3">
                                                    {
                                                        label === 'selected' ? "No selected photos" : "No uploaded photos"
                                                    }
                                                </p>
                                            </div>
                                        ) : (
                                            photos.map((photo) => {
                                                return (
                                                    <div className="col-lg-3 col-sm-2" key={photo.id}>
                                                        <div className="card mb-4 box-shadow">
                                                            <img className="card-img"
                                                                 src={photo.url}
                                                                 style={photoStyle}/>
                                                            <div className="card-img-overlay p-1">
                                                                <PhotoButtons
                                                                    label={label}
                                                                    photo={photo}
                                                                    onPhotoSelect={onPhotoSelect}
                                                                    onSelectFeaturedPhoto={onSelectFeaturedPhoto}
                                                                />
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

const UpsertPhotoAlbumModal = ({show, setShow, setPhotoAlbumForEdit, photoAlbumForEdit = null, onUpsertSuccess}) => {

    const [photos, setPhotos] = useState(null);
    const [albumData, setAlbumData] = useState({
        id: null,
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

    const fetchPhotoAlbumPhotos = (photoAlbum) => {

        fetchAllUnselectedPhotos(photoAlbum.id, (photos) => {
            setPhotos(photos);
        }, (error) => {
            // todo: handle
        });

        fetchAllSelectedPhotos(photoAlbum.id, (photos) => {
            setAlbumData({
                id: photoAlbum.id,
                name: photoAlbum.name,
                description: photoAlbum.description,
                selectedPhotos: photos
            });
        }, (error) => {
            // todo: handle
        })
    };

    useEffect(() => {

        if (photoAlbumForEdit === null) {
            fetchAllPhotos();
        } else {
            console.log('edit mode', photoAlbumForEdit);
            fetchPhotoAlbumPhotos(photoAlbumForEdit);

        }

    }, [photoAlbumForEdit]);


    const onAlbumNameChange = (name) => {
        setAlbumData({
            ...albumData,
            name
        });
    };

    const onAlbumDescriptionChange = (description) => {
        setAlbumData({
            ...albumData,
            description
        });
    };

    const onSelectPhoto = (selectedPhoto) => {
        // Remove photo from photo pool
        setPhotos(photos.filter(photo => photo.id !== selectedPhoto.id));

        // Add photo to selected photos
        setAlbumData({
            ...albumData,
            selectedPhotos: albumData.selectedPhotos.concat([selectedPhoto])
        });
    };

    const onDeselectPhoto = (deselectedPhoto) => {
        // Remove photo from selected photos
        setAlbumData({
            ...albumData,
            selectedPhotos: albumData.selectedPhotos.filter(selectedPhoto => selectedPhoto.id !== deselectedPhoto.id)
        });

        // Add photo to photo pool
        setPhotos(photos.concat([deselectedPhoto]));
    };

    const onSelectFeaturedPhoto = (id) => {
        setAlbumData({
            ...albumData,
            selectedPhotos: albumData.selectedPhotos.map(selectedPhoto => {
                selectedPhoto.is_featured = (selectedPhoto.id === id)
                return selectedPhoto;
            })
        });

    };

    const closeModal = () => {
        if (photoAlbumForEdit) {
            setPhotos(null);
            setPhotoAlbumForEdit(null);
            setAlbumData({
                id: null,
                name: '',
                description: '',
                selectedPhotos: []
            });
        }

        setShow(false);
    };

    const onSuccess = () => {
        closeModal();
        onUpsertSuccess();
    };

    const onSave = (e) => {
        upsertPhotoAlbum(albumData, (response) => {
            if (_.isFunction(onSuccess)) {
                onSuccess();
            }
        }, (message) => {
            console.log('Fail');
        });
    };

    return (
        <div>
            <Modal
                show={show}
                onHide={() => closeModal()}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Create Album
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid">
                        <div className="row" style={{height: "100%"}}>
                            <AlbumForm
                                name={albumData.name}
                                description={albumData.description}
                                onAlbumNameChange={onAlbumNameChange}
                                onAlbumDescriptionChange={onAlbumDescriptionChange}
                            />
                            <PhotoPool
                                label={"selected"}
                                photos={albumData.selectedPhotos}
                                onPhotoSelect={onDeselectPhoto}
                                onSelectFeaturedPhoto={onSelectFeaturedPhoto}
                            />
                            <PhotoPool
                                label={"pool"}
                                photos={photos}
                                onPhotoSelect={onSelectPhoto}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="row">
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={(e) => onSave(e)}
                            disabled={!albumData.name || !albumData.description || albumData.selectedPhotos.length === 0}
                        >
                            Save
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );

};

export default UpsertPhotoAlbumModal;