import React, { useState, useEffect } from 'react';
import { Book, Plus } from 'react-feather';

import UpsertPhotoAlbumModal from './UpsertPhotoAlbumModal';
import { fetchAll } from '../../../services/PhotoAlbumsServices';

const PhotoAlbumsList = () => {

    const [show, setShow] = useState(false);
    const [isCreateMode, setIsCreateMode] = useState(null);
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

    const onUpsertSuccess = () => {
        fetchAllPhotoAlbums();
    };

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
                                        onClick={() => {
                                            setIsCreateMode(true);
                                            setShow(true)
                                        }}
                                    >
                                        <Plus /> Create Album
                                    </button>
                                </div>
                                <div className="card-body">
                                    <div className="comntainer">
                                        <div className="row">
                                            {
                                                !Array.isArray(photoAlbums) || photoAlbums.length === 0 ? (
                                                    <div className="justify-content-center">
                                                        <p colSpan="3">No Photo Albums</p>
                                                    </div>
                                                ) : (
                                                        photoAlbums.map((photoAlbum) => {
                                                            return (
                                                                <div className="col-lg-3 d-flex align-items-stretch" key={photoAlbum.id}>
                                                                    <div className="card mb-4 box-shadow">
                                                                        <img className="card-img-top"
                                                                            src={photoAlbum.url}
                                                                            alt="Card image cap"
                                                                            style={{ width: "100%", height: "15vw", objectFit: "cover", objectPosition: "50% -0%" }}
                                                                        />
                                                                        <div className="card-body px-3 py-3">
                                                                            <div className="text-dark  mb-2">
                                                                                {photoAlbum.name}
                                                                                <div className="text-xs text-muted">
                                                                                    {
                                                                                        photoAlbum.description.length <= 90 ? (
                                                                                            photoAlbum.description
                                                                                        ) : (
                                                                                            `${photoAlbum.description.substring(0, 90)}...`
                                                                                        )
                                                                                    }
                                                                                </div>
                                                                            </div>
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
                                </div>

                                <UpsertPhotoAlbumModal
                                    show={show}
                                    setShow={setShow}
                                    isCreateMode={isCreateMode}
                                    onUpsertSuccess={onUpsertSuccess}
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PhotoAlbumsList;
