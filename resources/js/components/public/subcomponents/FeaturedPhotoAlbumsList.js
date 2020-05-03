import React from 'react';
import {ArrowRight} from "react-feather";

import './FeaturedPhotoAlbumsList.css'

import {Link} from "react-router-dom";

const FeaturedPhotoAlbumsList = ({photoAlbums}) => {
    return (
        <div>
            {
                (!photoAlbums || photoAlbums.length === 0 || !Array.isArray(photoAlbums)) ? (
                    ''
                ) : (
                    <div className="row d-flex justify-content-center mb-5">
                        {
                            photoAlbums.map(({id, url, name, description}) => {
                                return (
                                    <div className="col-lg-4 mb-5" key={id}>
                                        <Link to={`/photo_album/${id}`} className={'card lift h-100'}>
                                            <img className="card-img-top photo-album" src={ url } alt="..."/>
                                            <div className="card-body">
                                                <h4 className="card-title mb-2">{ name }</h4>
                                                <p className="card-text">{ description }</p>
                                            </div>
                                            <div
                                                className="card-footer bg-transparent border-top d-flex align-items-center justify-content-between">
                                                <div className="small text-primary">See more</div>
                                                <div className="small text-primary"><ArrowRight /></div>
                                            </div
                                            >
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
};

export default FeaturedPhotoAlbumsList;
