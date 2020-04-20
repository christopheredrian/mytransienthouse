import React from 'react';

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

export default AlbumForm;
