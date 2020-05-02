import React from 'react';
import {Link} from "react-router-dom";

import './FeaturedPhotoAlbumsList.css'

const PhotoAlbumsList = ({albumAliasLabel, photoAlbums}) => {
    return (
        <section className="bg-white py-4">
            <div className="container">
                <h2 className="mb-4">{ albumAliasLabel }</h2>
                <div className="row">
                    <div className="col-xl-3 col-lg-4 col-md-6 mb-5">
                        <Link to={"/gallery"} className={'card lift h-100'}>
                            {/*<div className="card-flag card-flag-dark card-flag-top-right card-flag-lg">*/}
                            {/*{{ $allPhotosCount }}*/}
                            {/*{{ $allPhotosCount === 1 ? ' photo' : ' photos' }}*/}
                            {/*</div>*/}
                            <img className="card-img-top" src="https://source.unsplash.com/tG36rvCeqng/800x500"
                                 alt="..."/>
                            <div className="card-body p-3">
                                <div className="card-title small mb-0">All Photos</div>
                                <div className="text-xs text-gray-500">All photos for this residence</div>
                            </div>
                        </Link>
                    </div>

                    {
                        photoAlbums.map(({id, url, name, description}) => {
                            return (
                                <div className="col-xl-3 col-lg-4 col-md-6 mb-5" key={id}>
                                    <Link to={`/photo_album/${id}`} className={'card lift h-100'}>
                                        <img className="card-img-top photo mini-photo" src={`${url}`}
                                             alt="..."/>
                                        <div className="card-body p-3">
                                            <div className="card-title small mb-0">{ name }</div>
                                            <div className="text-xs text-gray-500">
                                                { description.length <= 30 ? description
                                                    : `${description.substring(0, 30)}...`
                                                }
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="svg-border-rounded text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144.54 17.34" preserveAspectRatio="none"
                         fill="white">
                        <path d="M144.54,17.34H0V0H144.54ZM0,0S32.36,17.34,72.27,17.34,144.54,0,144.54,0" />
                    </svg>
                </div>
            </div>
        </section>
    )
};

export default PhotoAlbumsList;
