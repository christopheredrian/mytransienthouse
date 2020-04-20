import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';

import AlbumForm from './AlbumForm'
import PhotoPool from './PhotoPool'

import './UpsertPhotoAlbumModal.css'

import { fetchAll } from "../../../services/PhotosServices"

import {
    upsertPhotoAlbum,
    fetchAllSelectedPhotos,
    fetchAllUnselectedPhotos
} from '../../../services/PhotoAlbumsServices';



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

        setAlbumData({
            id: null,
            name: '',
            description: '',
            selectedPhotos: []
        });

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