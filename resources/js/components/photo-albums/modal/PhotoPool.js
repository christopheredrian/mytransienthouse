import React from 'react';

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

export default PhotoPool;
