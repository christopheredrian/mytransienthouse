import React from 'react';

const Home = () => {

    const getFeaturedPhotoAlbums = () => {

    };

    return (
        <div>
            <header className="page-header page-header-light bg-img-cover overlay overlay-light overlay-80"
                    // style='background-image: url("{{$ui[' main_image_url'] ?? ''}}")'>
            >
                <div className="page-header-content py-5">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-8 col-lg-10 text-center">
                                {/*<h1 className="page-header-title">{{$ui['main_title'] ? ? ''}}</h1>*/}
                                <h1 className="page-header-title">MTH</h1>
                                <p className="page-header-text mb-4">Subtitle</p>
                                <a className="btn btn-marketing rounded-pill btn-primary" href="#">Get Started</a>
                                <a className="btn btn-link btn-marketing rounded-pill" href="#!">Learn More</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="svg-border-rounded text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144.54 17.34" preserveAspectRatio="none"
                         fill="currentColor">
                        <path d="M144.54,17.34H0V0H144.54ZM0,0S32.36,17.34,72.27,17.34,144.54,0,144.54,0"></path>
                    </svg>
                </div>
            </header>
            <section className="bg-white py-10">
                <div className="container">
                    {/*<div className="row d-flex justify-content-center mb-5">*/}

                        {/*@if(isset($photoAlbums) && !empty($photoAlbums))*/}
                        {/*@foreach($photoAlbums as $photoAlbum)*/}

                        {/*<div className="col-lg-4 mb-5">*/}
                            {/*<a className="card lift h-100" href="/photo-album/{{ $photoAlbum->id }}">*/}
                                {/*<img className="card-img-top photo-album" src={{$photoAlbum->url  }} alt="..."/>*/}
                                {/*<div className="card-body">*/}
                                    {/*<h4 className="card-title mb-2">{{$photoAlbum->name  }}</h4>*/}
                                    {/*<p className="card-text">{{$photoAlbum->description }}</p>*/}
                                {/*</div>*/}
                                {/*<div*/}
                                    {/*className="card-footer bg-transparent border-top d-flex align-items-center justify-content-between">*/}
                                    {/*<div className="small text-primary">See more</div>*/}
                                    {/*<div className="small text-primary"><i data-feather="arrow-right"></i></div>*/}
                                {/*</div*/}
                                {/*>*/}
                            {/*</a>*/}
                        {/*</div>*/}

                        {/*@endforeach*/}
                        {/*@endif*/}

                    {/*</div>*/}

                    {/*@if(isset($faqs) && !empty($faqs))*/}

                    {/*<div className="text-center mb-4"><h2>Your questions, answered.</h2></div>*/}

                    {/*<div className="accordion accordion-faq mb-5" id="helpAccordion">*/}

                        {/*@foreach($faqs as $faq)*/}

                        {/*<div className="card accordion-faq-item">*/}
                            {/*<a className="card-header" id="helpHeadingOne{{$faq->id}}" data-toggle="collapse"*/}
                               {/*data-target="#helpCollapseOne{{$faq->id}}" aria-expanded="true"*/}
                               {/*aria-controls="helpCollapseOne{{$faq->id}}"*/}
                               {/*href="javascript:void(0);"*/}
                            {/*>*/}
                                {/*<div className="accordion-faq-item-heading">*/}
                                    {/*{{$faq->faq_question }}*/}
                                    {/*<i className="accordion-faq-item-heading-arrow" data-feather="chevron-down"></i>*/}
                                {/*</div*/}
                                {/*>*/}
                            {/*</a>*/}
                            {/*<div className="collapse" id="helpCollapseOne{{$faq->id}}"*/}
                                 {/*aria-labelledby="helpHeadingOne{{$faq->id}}"*/}
                                 {/*data-parent="#helpAccordion">*/}
                                {/*<div className="card-body border-bottom">*/}
                                    {/*{{$faq->faq_answer }}*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</div>*/}

                        {/*@endforeach*/}
                    {/*</div>*/}
                    {/*@endif*/}
                </div>
            </section>
            <section className="bg-img-cover overlay overlay-light overlay-80 py-15"
                     // style={{backgroundImage: `url("https://source.unsplash.com/BlIhVfXbi9s/1600x800"`)}}>
                >
                <div className="container z-1">
                    <div className="mt-5">
                        <div className="display-4 mb-3 text-dark">Ready to book?</div>
                        <a className="btn btn-primary btn-marketing rounded-pill" href="/contact">Book Now</a>
                    </div>
                </div>
                <div className="svg-border-angled text-light">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"
                         fill="currentColor">
                        <polygon points="0,100 100,0 100,100"></polygon>
                    </svg>
                </div>
            </section>
        </div>
    )

};

export default Home;