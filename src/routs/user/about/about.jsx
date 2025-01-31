import React from 'react'
import './about.css'
// import Partners from '../../../components/sliders/partnerSlider/Partners'
const about = () => {
    return (
        <>
            <section className="">
                <div className="container">
                    <h1 className="text-center roboto sectHead text-capitalize text-dark pt-5 pageHeader">
                        About
                    </h1>
                    <div className="separetor my-5 mx-auto bg-dark"></div>
                    <p className="text-dark heroAbout50 fw-bold text-center m-auto mb-3">
                        Proin eu ante vel mauris molestie dignissim non eget nunc. Integer ac massa orci. Suspendisse vulputate
                        semper nunc eget
                        rhoncus.
                    </p>
                    <p className="text-center m-auto ">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu ante vel mauris molestie dignissim non
                        eget nunc.
                        Integer ac massa orci. Suspendisse vulputate semper nunc eget rhoncus. Ut sit amet porta sem, interdum
                        tincidunt libero.
                        Nulla vel quam lobortis, varius est scelerisque, dapibus nisl.
                    </p>
                </div>
            </section>


            <section className="missionVissionSect my-5">
                <div className="missionBox">
                    <div className="container py-5">
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <div className=" h-100 d-flex flex-column justify-content-center">
                                    <div className="missionHead fw-bold text-light">
                                        The Mission
                                    </div>
                                    <h1 className=" fw-bold p-4 ps-0 text-light">
                                        At the heart of everything, we set out to offer the best quality
                                    </h1>
                                    <div className="separetor bg-light my-5"></div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="py-0 py-md-5 d-flex flex-column justify-content-center">
                                    <p className="missionText fw-bold text-light">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu ante vel mauris
                                        molestie
                                        dignissim non eget nunc.
                                        Integer ac massa orci. Suspendisse vulputate semper nunc eget rhoncus. Aenean placerat
                                        facilisis ex, eu laoreet lorem
                                        convallis.
                                    </p>
                                    <p className="missionText fw-bold text-light">
                                        Fusce gravida justo a lectus tempus lacinia. Ut mollis scelerisque ultricies. Aenean
                                        facilisis efficitur magna, at
                                        feugiat massa bibendum at. Etiam ut venenatis urna.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* 
            <Partners /> */}
            {/* <!-- history section  --> */}
            <section className="historySect border-bottom mt-5">
                <div className="container py-5">
                    <h1 className="text-center roboto sectHead text-capitalize text-dark pt-5 pageHeader">
                        How it Started
                    </h1>
                    <div className="separetor my-5 mx-auto bg-dark"></div>
                    <p className="heroAbout50 text-center m-auto mb-5">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis,
                        pulvinar dapibus
                        leo.
                    </p>
                    <div className="row historyBox">
                        <div className="col-12 col-lg-6 px-0">
                            <div className="historyText p-2 p-sm-5 text-center text-lg-start">
                                <h1 className="roboto text-dark fw-bolder">Vel mauris molestie dignissim</h1>
                                <p className="fw-bold text-dark">
                                    Proin eu ante vel mauris molestie dignissim non eget nunc. Integer ac massa orci.
                                    Suspendisse vulputate semper nunc eget
                                    rhoncus.
                                </p>
                                <p>
                                    Praesent vel faucibus ligula. Sed sit amet ipsum eget velit aliquet faucibus. Maecenas et
                                    odio id turpis sollicitudin
                                    pulvinar sit amet vitae augue. Phasellus nec ultricies arcu. Quisque efficitur tellus sit
                                    amet bibendum molestie. Duis
                                    id egestas odio. Phasellus lacinia ex quis faucibus tempor. Sed feugia.
                                </p>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 px-0">
                            <div className="historyPic"></div>
                        </div>
                    </div>
                    <div className="separetor my-5 mx-auto bg-dark"></div>
                </div>
            </section>

        </>
    )
}

export default about
