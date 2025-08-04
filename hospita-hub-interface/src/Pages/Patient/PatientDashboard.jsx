import React from 'react'
import './PatientDashboard.css'; // Assuming you have a CSS file for styles
import { Link } from 'react-router-dom';
const PatientDashboard = () => {
    return (
        <div className='className-wrapper'>
            <div style={{ backgroundColor: '#blue' }}>
                <section className="hero-section">
                    <div className="hero-decorations">
                        <div className="hero-circle hero-circle-1"></div>
                        <div className="hero-circle hero-circle-2"></div>
                        <div className="hero-circle hero-circle-3"></div>
                        <div className="hero-circle hero-circle-4"></div>
                    </div>

                    <div className="container d-flex flex-column justify-content-center align-items-center h-100">
                        <div className="text-center mb-5">
                            <h1 className="hero-title mt-3">Your home for health</h1>

                            <div className="search-card mx-auto" style={{ maxWidth: "800px" }}>
                                <h2 className="h3 mb-4 text-dark">Find and Book</h2>

                                <div className="row g-3 mb-4">
                                    <div className="col-md-9">
                                        <div className="search-input-wrapper">
                                            <i className="fas fa-search search-icon d-flex justify-content"></i>
                                            <input type="text" className="form-control search-input" placeholder="Search doctors, clinics, hospitals, etc." />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="location-input">
                                            <i className="fas fa-map-marker-alt text-muted me-2"></i>
                                            <span>Bangalore</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex flex-wrap align-items-center gap-2">
                                    <span className="text-muted me-2">Popular searches:</span>
                                    <button className="btn popular-tag">Dermatologist</button>
                                    <button className="btn popular-tag">Pediatrician</button>
                                    <button className="btn popular-tag">Gynecologist/Obstetrician</button>
                                    <button className="btn popular-tag">Others</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Bottom Navigation --> */}
                    <div className="bottom-nav py-4" style={{ background: "#2341a6" }}>
                        <div className="container-fluid">
                            <div className="row justify-content-center">
                                <div className="col-6 col-md-2 d-flex flex-column align-items-center py-3">
                                    <i className="fas fa-comments fa-2x mb-2 text-white"></i>
                                    <span className="text-white">Consult with a doctor</span>
                                </div>
                                <div className="col-6 col-md-2 d-flex flex-column align-items-center py-3">
                                    <i className="fas fa-shopping-cart fa-2x mb-2 text-white"></i>
                                    <span className="text-white">Order Medicines</span>
                                </div>
                                <div className="col-6 col-md-2 d-flex flex-column align-items-center py-3">
                                    <i className="fas fa-file-alt fa-2x mb-2 text-white"></i>
                                    <span className="text-white">Book Appointment</span>
                                </div>
                                <div className="col-6 col-md-2 d-flex flex-column align-items-center py-3">
                                    <i className="fas fa-vial fa-2x mb-2 text-white"></i>
                                    <span className="text-white">Book test</span>
                                </div>
                                <div className="col-6 col-md-2 d-flex flex-column align-items-center py-3">
                                    <i className="fas fa-book-open fa-2x mb-2 text-white"></i>
                                    <span className="text-white">Read articles</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* <!-- Instant Appointment Section --> */}
            <section className="py-5 bg-body">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h2 className="section-title">
                                Instant appointment with doctors.<span className="text-primary">Guaranteed.</span>
                            </h2>

                            <div className="mb-4">
                                <div className="d-flex align-items-center mb-3">
                                    <i className="fas fa-check feature-check"></i>
                                    <span><strong>100,000</strong> Verified doctors</span>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <i className="fas fa-check feature-check"></i>
                                    <span><strong>3M+</strong> Patient recommendations</span>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <i className="fas fa-check feature-check"></i>
                                    <span><strong>25M</strong> Patients/year</span>
                                </div>
                            </div>

                            <button className="btn btn-primary-custom mb-4">Find me the right doctor</button>

                            <div>
                                <div className="testimonial-stars mb-2">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                                <p className="text-muted mb-2">
                                    Very helpful. Far easier than doing same things on computer. Allows quick and easy search with speedy booking. Even maintains history of doctors visited.
                                </p>
                                <div className="d-flex align-items-center">
                                    <div className="testimonial-avatar"></div>
                                    <span>Amit Sharma</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 text-center">
                            <video className="rh5v-DefaultPlayer_video"
                                poster="//www.practostatic.com/web-assets/home/assets/images/book.875ca26a3c4283c777660377e421e99b.png"
                                width="250" height="480" loading="false" autoPlay loop>
                                <source src="https://www.practostatic.com/web-assets/home/assets/videos/appointment.700ce682eaec91bf93b6574cb8f09cd0.webm"
                                    type="video/webm" />
                            </video>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Consultation Section --> */}
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 text-center mb-4 mb-lg-0">
                            <div className="phone-mockup mx-auto">
                                <div className="phone-header">
                                    <div className="d-flex align-items-center">
                                        <i className="fas fa-chevron-left me-2"></i>
                                        <div className="doctor-avatar"></div>
                                        <div>
                                            <div className="fw-bold">Dr. Mathili Pal</div>
                                            <div style={{ fontSize: "0.8rem", opacity: "0.8" }}>Consultation active</div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <i className="fas fa-phone me-2"></i>
                                        <span>12:30</span>
                                    </div>
                                </div>

                                <div className="p-3">
                                    <div className="chat-message message-sent">
                                        <p className="mb-1" style={{ fontSize: "0.9rem" }}>Hello doctor, I recently got a full body health checkup done. I wanted to know your opinion regarding some of the results in the report.</p>
                                        <small className="text-muted">10:11 AM</small>
                                    </div>

                                    <div className="chat-message message-received">
                                        <p className="mb-1" style={{ fontSize: "0.9rem" }}>Hey akshay. Send me the report. I'll have a look.</p>
                                        <small className="text-muted">10:12 AM</small>
                                    </div>

                                    <div className="chat-message message-sent">
                                        <div className="d-flex align-items-center mb-1">
                                            <i className="fas fa-file-alt me-2"></i>
                                            <span style={{ fontSize: "0.9rem" }}>Body checkup report</span>
                                        </div>
                                        <small className="text-muted">10:13 AM</small>
                                    </div>

                                    <div className="chat-message message-received">
                                        <p className="mb-1" style={{ fontSize: "0.9rem" }}>Seems like you have vitamin D deficiency. Rest all seems ok.</p>
                                        <small className="text-muted">10:20 AM</small>
                                    </div>
                                </div>

                                <div className="message-input">
                                    <i className="fas fa-paperclip text-muted me-2"></i>
                                    <i className="fas fa-image text-muted me-2"></i>
                                    <input type="text" className="form-control border-0 bg-transparent" placeholder="Write Message" />
                                    <button className="btn btn-primary btn-sm">
                                        <i className="fas fa-paper-plane"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <h2 className="section-title">
                                Skip the waiting room.<br />
                                Consult with a doctor
                            </h2>

                            <div className="mb-4">
                                <div className="d-flex align-items-center mb-3">
                                    <i className="fas fa-check feature-check"></i>
                                    <span>Fees starting at <strong>₹99</strong></span>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <i className="fas fa-check feature-check"></i>
                                    <span>Verified doctors respond in <strong>5 minutes</strong></span>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <i className="fas fa-check feature-check"></i>
                                    <span><strong>100%</strong> Private and confidential</span>
                                </div>
                            </div>

                            <div className="d-flex align-items-center mb-4">
                                <Link className="btn btn-primary-custom me-4" to='/patient/consult'>Consult now</Link>
                                <Link className="btn btn-outline-primary me-4" to='/patient/specialities'>View Specialities</Link>
                                <div className="d-flex align-items-center">
                                    <div className="online-indicator"></div>
                                    <span className="text-muted">88434 doctors online</span>
                                </div>
                            </div>

                            <div>
                                <div className="testimonial-stars mb-2">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                                <p className="text-muted mb-2">
                                    Good initiative. The doctors are responsive and provide you a brief consultation
                                </p>
                                <div className="d-flex align-items-center">
                                    <div className="testimonial-avatar"></div>
                                    <span>Aaron Moitra</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* <!-- Articles Section with Carousel --> */}
            <section className="py-5 bg-body">
                <div className="container">
                    <div className="row">
                        <h2 className="section-title text-center mb-5">Read top articles from health experts</h2>
                        <div className="col-4 mb-4">
                            <div className="card article-card h-100">
                                <div className="article-image-1"></div>
                                <div className="card-body">
                                    <h5 className="card-title">5 Ways to Burn Calories Without Exercising!</h5>
                                    <p className="text-muted mb-3">Ms.Swati Kapoor, Dietitian/Nutritionist</p>
                                    <div className="d-flex align-items-center text-muted">
                                        <span>275Likes</span>
                                        <span className="mx-2">•</span>
                                        <span>35800Views</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-4 mb-4">
                            <div className="card article-card h-100">
                                <div className="article-image-2"></div>
                                <div className="card-body">
                                    <h5 className="card-title">Do Mangoes Make You Gain Weight?</h5>
                                    <p className="text-muted mb-3">Ms.Swati Kapoor, Dietitian/Nutritionist</p>
                                    <div className="d-flex align-items-center text-muted">
                                        <span>211Likes</span>
                                        <span className="mx-2">•</span>
                                        <span>750741Views</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-4 mb-4">
                            <div className="card article-card h-100">
                                <div className="article-image-3"></div>
                                <div className="card-body">
                                    <h5 className="card-title">5 Small Changes for a Good Body</h5>
                                    <p className="text-muted mb-3">Ms.Swati Kapoor, Dietitian/Nutritionist</p>
                                    <div className="d-flex align-items-center text-muted">
                                        <span>205Likes</span>
                                        <span className="mx-2">•</span>
                                        <span>8551Views</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-4">
                            <button className="btn btn-primary-custom">More articles</button>
                        </div>
                    </div>

                </div>
            </section>

            {/* <!-- Medicine Section Enhanced --> */}
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h2 className="section-title">
                                Get all your medicines.<br />
                                Everytime. On time.
                            </h2>

                            <div className="mb-4">
                                <div className="d-flex align-items-center mb-3">
                                    <i className="fas fa-check feature-check"></i>
                                    <span>Guaranteed availability</span>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <i className="fas fa-check feature-check"></i>
                                    <span>Over <strong>130,000+</strong> genuine medicines</span>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <i className="fas fa-check feature-check"></i>
                                    <span>Home delivery in <strong>24hrs</strong></span>
                                </div>
                            </div>

                            <button className="btn btn-primary-custom mb-4">Order Medicines</button>

                            <div className="delivery-status">
                                <div className="d-flex align-items-center">
                                    <i className="fas fa-info-circle text-info me-2"></i>
                                    <span><strong>Last order delivered 4 hours 12 mins ago</strong> in Musakhedi, Indore</span>
                                </div>
                            </div>

                            <div className="mt-4">
                                <p className="text-muted mb-2">
                                    Very Helpful! I hope a lot more doctors come onboard soon. The Doctor's tool is also very helpful, apart from the app. The prescriptions are all on mail, and messages, which makes things very easy to use and track. Great job overall!
                                </p>
                                <div className="d-flex align-items-center">
                                    <i className="fas fa-chevron-left text-muted me-2"></i>
                                    <i className="fas fa-chevron-right text-muted"></i>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 text-center">
                            <div className="medicine-visual">
                                <div className="medicine-box">
                                    <div className="medicine-items">
                                        <div className="medicine-bottle"></div>
                                        <div className="medicine-bottle"></div>
                                        <div className="medicine-pills"></div>
                                    </div>
                                </div>
                                <div className="floating-pills pill-1"></div>
                                <div className="floating-pills pill-2"></div>
                                <div className="floating-pills pill-3"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Medical Records Section --> */}
            <section className="py-5 bg-body">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 text-center mb-4 mb-lg-0">
                            <div className="records-visual">
                                <div className="records-folder">
                                    <div className="records-documents">
                                        <div className="records-lines">
                                            <div className="records-line"></div>
                                            <div className="records-line"></div>
                                            <div className="records-line"></div>
                                            <div className="records-line"></div>
                                        </div>
                                    </div>
                                    <div className="security-badge">
                                        <i className="fas fa-shield-alt"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <h2 className="section-title">
                                All your medical records<br />
                                In one secure app.
                            </h2>

                            <div className="mb-4">
                                <div className="d-flex align-items-center mb-3">
                                    <i className="fas fa-check feature-check"></i>
                                    <span><strong>256-bit</strong> end to end encryption</span>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <i className="fas fa-check feature-check"></i>
                                    <span>Records are accessible <strong>only by you</strong></span>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <i className="fas fa-check feature-check"></i>
                                    <span>Access your records across <strong>8000+ centers</strong></span>
                                </div>
                            </div>
                            <button className="btn btn-primary-custom mb-4">Order Medicines</button>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}



export default PatientDashboard
