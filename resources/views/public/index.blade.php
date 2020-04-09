@extends('layouts.public.app')

@section('content')
    <header class="page-header page-header-light bg-img-cover overlay overlay-light overlay-80"
            style='background-image: url("https://source.unsplash.com/R-LK3sqLiBw/1600x1200")'>
        <div class="page-header-content py-5">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-xl-8 col-lg-10 text-center">
                        <h1 class="page-header-title">Rent home or rooms</h1>
                        <p class="page-header-text mb-5">Our home is open for all vacationers!
                        Staying with us is a great way to start your ideal vacation. Let's get started and book your stay with us!</p>
                        <a class="btn btn-marketing rounded-pill btn-primary" href="#!">Get Started</a><a
                                class="btn btn-link btn-marketing rounded-pill" href="#!">Learn More</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="svg-border-rounded text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144.54 17.34" preserveAspectRatio="none"
                 fill="currentColor">
                <path d="M144.54,17.34H0V0H144.54ZM0,0S32.36,17.34,72.27,17.34,144.54,0,144.54,0"></path>
            </svg>
        </div>
    </header>
    <section class="bg-white py-10">
        <div class="container">
            <div class="row mb-5">
                <div class="col-lg-4 mb-5">
                    <a class="card lift h-100" href="#!"
                    ><img class="card-img-top" src="https://source.unsplash.com/2d4lAQAlbDA/800x500" alt="..."/>
                        <div class="card-body">
                            <h4 class="card-title mb-2">Outdoor Patio</h4>
                            <p class="card-text">Our property features a beautiful, private outdoor area with
                                seating and a pool.</p>
                        </div>
                        <div class="card-footer bg-transparent border-top d-flex align-items-center justify-content-between">
                            <div class="small text-primary">See more</div>
                            <div class="small text-primary"><i data-feather="arrow-right"></i></div>
                        </div
                        >
                    </a>
                </div>
                <div class="col-lg-4 mb-5">
                    <a class="card lift h-100" href="#!"
                    ><img class="card-img-top" src="https://source.unsplash.com/MP0bgaS_d1c/800x500" alt="..."/>
                        <div class="card-body">
                            <h4 class="card-title mb-2">Full Kitchen</h4>
                            <p class="card-text">A fully stocked kitchen with all modern amenities provides a
                                peaceful cooking environment.</p>
                        </div>
                        <div class="card-footer bg-transparent border-top d-flex align-items-center justify-content-between">
                            <div class="small text-primary">See more</div>
                            <div class="small text-primary"><i data-feather="arrow-right"></i></div>
                        </div
                        >
                    </a>
                </div>
                <div class="col-lg-4 mb-5">
                    <a class="card lift h-100" href="#!"
                    ><img class="card-img-top" src="https://source.unsplash.com/iAftdIcgpFc/800x500" alt="..."/>
                        <div class="card-body">
                            <h4 class="card-title mb-2">Comfortable Bedding</h4>
                            <p class="card-text">With three newly updated bedrooms you will be sleeping soundly
                                during your stay.</p>
                        </div>
                        <div class="card-footer bg-transparent border-top d-flex align-items-center justify-content-between">
                            <div class="small text-primary">See more</div>
                            <div class="small text-primary"><i data-feather="arrow-right"></i></div>
                        </div
                        >
                    </a>
                </div>
            </div>
            <div class="text-center mb-4"><h2>Your questions, answered.</h2></div>
            <div class="accordion accordion-faq mb-5" id="helpAccordion">
                <div class="card accordion-faq-item">
                    <a class="card-header" id="helpHeadingOne" data-toggle="collapse"
                       data-target="#helpCollapseOne" aria-expanded="true" aria-controls="helpCollapseOne"
                       href="javascript:void(0);"
                    >
                        <div class="accordion-faq-item-heading">Is there a minimum number of nights?<i
                                    class="accordion-faq-item-heading-arrow" data-feather="chevron-down"></i>
                        </div
                        >
                    </a>
                    <div class="collapse show" id="helpCollapseOne" aria-labelledby="helpHeadingOne"
                         data-parent="#helpAccordion">
                        <div class="card-body border-bottom">Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non
                            cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                            Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee
                            nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes
                            anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                            Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you
                            probably haven't heard of them accusamus labore sustainable VHS.
                        </div>
                    </div>
                </div>
                <div class="card accordion-faq-item">
                    <a class="card-header collapsed" id="helpHeadingTwo" data-toggle="collapse"
                       data-target="#helpCollapseTwo" aria-expanded="true" aria-controls="helpCollapseTwo"
                       href="javascript:void(0);"
                    >
                        <div class="accordion-faq-item-heading">How close is the nearest grocery store?<i
                                    class="accordion-faq-item-heading-arrow" data-feather="chevron-down"></i>
                        </div
                        >
                    </a>
                    <div class="collapse" id="helpCollapseTwo" aria-labelledby="helpHeadingTwo"
                         data-parent="#helpAccordion">
                        <div class="card-body border-bottom">Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non
                            cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                            Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee
                            nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes
                            anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                            Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you
                            probably haven't heard of them accusamus labore sustainable VHS.
                        </div>
                    </div>
                </div>
                <div class="card accordion-faq-item">
                    <a class="card-header collapsed" id="helpHeadingThree" data-toggle="collapse"
                       data-target="#helpCollapseThree" aria-expanded="true" aria-controls="helpCollapseThree"
                       href="javascript:void(0);"
                    >
                        <div class="accordion-faq-item-heading">Is there a discount for longer term rental
                            periods?<i class="accordion-faq-item-heading-arrow" data-feather="chevron-down"></i>
                        </div
                        >
                    </a>
                    <div class="collapse" id="helpCollapseThree" aria-labelledby="helpHeadingThree"
                         data-parent="#helpAccordion">
                        <div class="card-body border-bottom">Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non
                            cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                            Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee
                            nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes
                            anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                            Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you
                            probably haven't heard of them accusamus labore sustainable VHS.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="bg-img-cover overlay overlay-light overlay-80 py-15"
             style='background-image: url("https://source.unsplash.com/BlIhVfXbi9s/1600x800")'>
        <div class="container z-1">
            <div class="mt-5">
                <div class="display-4 mb-3 text-dark">Ready to book?</div>
                <a class="btn btn-primary btn-marketing rounded-pill" href="#!">Search Availability</a>
            </div>
        </div>
        <div class="svg-border-angled text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"
                 fill="currentColor">
                <polygon points="0,100 100,0 100,100"></polygon>
            </svg>
        </div>
    </section>
    <section class="bg-white py-10">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 mb-5 mb-lg-0 divider-right">
                    <div class="testimonial p-lg-5">
                        <div class="mb-3 text-yellow"><i class="fas fa-star"></i><i class="fas fa-star"></i><i
                                    class="fas fa-star"></i><i class="fas fa-star"></i><i
                                    class="fas fa-star"></i></div>
                        <p class="testimonial-quote text-primary">"I was impressed with how beautiful and clean
                            this property was. The owner definitely goes the extra mile to help their
                            guests!"</p>
                        <div class="testimonial-name">Dustine</div>
                        <div class="testimonial-position">Cali, Colombia</div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="testimonial p-lg-5">
                        <div class="mb-3 text-yellow"><i class="fas fa-star"></i><i class="fas fa-star"></i><i
                                    class="fas fa-star"></i><i class="fas fa-star"></i><i
                                    class="fas fa-star"></i></div>
                        <p class="testimonial-quote text-primary">"Amazing location, convenient parking, and a
                            lots of amenities and extras. I will definitely be returning here whenever I'm in
                            town."</p>
                        <div class="testimonial-name">Lia Peterson</div>
                        <div class="testimonial-position">Sacramento, CA, USA</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection