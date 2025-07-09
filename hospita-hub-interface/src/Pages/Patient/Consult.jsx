import React from 'react'
import './Consult.css'
const Consult = () => {
    return (
        <>
            <section className="hero-section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h1 className="hero-title">Skip the travel!</h1>
                            <h2 className="hero-subtitle">Take Online Doctor Consultation</h2>
                            <p className="hero-description">Private consultation + Audio call • Starts at just ₹199</p>

                            <div className="doctor-avatars">
                                <img src="/placeholder.svg?height=40&width=40" alt="Doctor" className="doctor-avatar" />
                                <img src="/placeholder.svg?height=40&width=40" alt="Doctor" className="doctor-avatar" />
                                <img src="/placeholder.svg?height=40&width=40" alt="Doctor" className="doctor-avatar" />
                                <span className="online-indicator"style={{width: "auto"}}>
                                    <span className="online-dot"></span>
                                    +197 Doctors are online
                                </span>
                            </div>

                            <button className="btn consult-btn">Consult Now</button>

                            <div className="trust-indicators">
                                <div className="trust-item">
                                    <i className="fas fa-user-md"></i>
                                    <span>Verified Doctors</span>
                                </div>
                                <div className="trust-item">
                                    <i className="fas fa-prescription"></i>
                                    <span>Digital Prescription</span>
                                </div>
                                <div className="trust-item">
                                    <i className="fas fa-redo"></i>
                                    <span>Free Followup</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-06%20090811-da5RDxcIeuKEHXj0ymgn4Xu6jJFdE4.png" alt="Woman consulting online" className="hero-image" />
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Specialties Section --> */}
            <section className="specialties-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <h2 className="section-title">25+ Specialities</h2>
                            <p className="section-subtitle">Consult with top doctors across specialities</p>
                        </div>
                        <div className="col-lg-4 text-end">
                            <button className="btn btn-outline-secondary">See all Specialities</button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-2 col-md-4 col-6">
                            <div className="specialty-card">
                                <div className="specialty-icon" style={{ background: "linear-gradient(135deg, #fbbf24, #f59e0b)" }}>
                                    👩‍⚕️
                                </div>
                                <div className="specialty-name">Gynaecology</div>
                                <div className="specialty-price">₹599</div>
                                <a href="#" className="specialty-link">Consult now</a>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 col-6">
                            <div className="specialty-card">
                                <div className="specialty-icon" style={{ background: "linear-gradient(135deg, #a78bfa, #8b5cf6)" }}>
                                    🔬
                                </div>
                                <div className="specialty-name">Sexology</div>
                                <div className="specialty-price">₹599</div>
                                <a href="#" className="specialty-link">Consult now</a>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 col-6">
                            <div className="specialty-card">
                                <div className="specialty-icon" style={{ background: "linear-gradient(135deg, #60a5fa, #3b82f6)" }}>
                                    🩺
                                </div>
                                <div className="specialty-name">General physician</div>
                                <div className="specialty-price">₹499</div>
                                <a href="#" className="specialty-link">Consult now</a>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 col-6">
                            <div className="specialty-card">
                                <div className="specialty-icon" style={{ background: "linear-gradient(135deg, #8b5cf6, #7c3aed)" }}>
                                    🧴
                                </div>
                                <div className="specialty-name">Dermatology</div>
                                <div className="specialty-price">₹549</div>
                                <a href="#" className="specialty-link">Consult now</a>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 col-6">
                            <div className="specialty-card">
                                <div className="specialty-icon" style={{ background: "linear-gradient(135deg, #f87171, #ef4444)" }}>
                                    🧠
                                </div>
                                <div className="specialty-name">Psychiatry</div>
                                <div className="specialty-price">₹599</div>
                                <a href="#" className="specialty-link">Consult now</a>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 col-6">
                            <div className="specialty-card">
                                <div className="specialty-icon" style={{ background: "linear-gradient(135deg, #fbbf24, #f59e0b)" }}>
                                    🫃
                                </div>
                                <div className="specialty-name">Stomach and digestion</div>
                                <div className="specialty-price">₹499</div>
                                <a href="#" className="specialty-link">Consult now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Health Concerns Section --> */}
            <section className="health-concerns-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <h2 className="section-title">Common Health Concerns</h2>
                            <p className="section-subtitle">Consult a doctor online for any health issue</p>
                        </div>
                        <div className="col-lg-4 text-end">
                            <button className="btn btn-outline-secondary">See All Symptoms</button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="card concern-card">
                                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-06%20090828-SYgAlgyQPEbN06NVORp5vkD5Dt7qlR.png" alt="Cough & Cold" className="card-img-top concern-image" />
                                <div className="card-body">
                                    <h5 className="concern-title">Cough & Cold?</h5>
                                    <p className="concern-price">₹ 499</p>
                                    <a href="#" className="specialty-link">Consult Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="card concern-card">
                                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-06%20090828-SYgAlgyQPEbN06NVORp5vkD5Dt7qlR.png" alt="Period problems" className="card-img-top concern-image" />
                                <div className="card-body">
                                    <h5 className="concern-title">Period problems?</h5>
                                    <p className="concern-price">₹ 599</p>
                                    <a href="#" className="specialty-link">Consult Now </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="card concern-card">
                                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-06%20090828-SYgAlgyQPEbN06NVORp5vkD5Dt7qlR.png" alt="Performance issues" className="card-img-top concern-image" />
                                <div className="card-body">
                                    <h5 className="concern-title">Performance issues in bed?</h5>
                                    <p className="concern-price">₹ 599</p>
                                    <a href="#" className="specialty-link">Consult Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="card concern-card">
                                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-06%20090828-SYgAlgyQPEbN06NVORp5vkD5Dt7qlR.png" alt="Skin problems" className="card-img-top concern-image" />
                                <div className="card-body">
                                    <h5 className="concern-title">Skin problems?</h5>
                                    <p className="concern-price">₹ 549</p>
                                    <a href="#" className="specialty-link">Consult Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Offers Section --> */}
            <section className="offers-section">
                <div className="container">
                    <h2 className="section-title text-center mb-5">Offers</h2>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="offer-card offer-green">
                                <div className="offer-badge">OFFER</div>
                                <h3 className="offer-title">Download the App & get<br />₹200 HealthCash</h3>
                                <button className="btn offer-btn">Download App <i className="fas fa-arrow-right ms-2"></i></button>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="offer-card offer-orange">
                                <div className="offer-badge">OFFER</div>
                                <h3 className="offer-title">Consult with specialists at<br />just ₹199</h3>
                                <button className="btn offer-btn">Consult Now <i className="fas fa-arrow-right ms-2"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- How it Works Section --> */}
            <section className="how-it-works-section">
                <div className="container">
                    <h2 className="section-title text-center mb-5">How it works</h2>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="step-item">
                                <div className="step-icon">
                                    <i className="fas fa-search"></i>
                                </div>
                                <h4 className="step-title">Select a speciality or symptom</h4>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="step-item">
                                <div className="step-icon">
                                    <i className="fas fa-video"></i>
                                </div>
                                <h4 className="step-title">Audio/video call with a verified doctor</h4>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="step-item">
                                <div className="step-icon">
                                    <i className="fas fa-prescription"></i>
                                </div>
                                <h4 className="step-title">Get a digital prescription & a free follow-up</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Stats Section --> */}
            <section className="stats-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-6">
                            <div className="stat-item">
                                <div className="stat-number">2,00,000+</div>
                                <div className="stat-label">Happy Users</div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="stat-item">
                                <div className="stat-number">20,000+</div>
                                <div className="stat-label">Verified Doctors</div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="stat-item">
                                <div className="stat-number">25+</div>
                                <div className="stat-label">Specialities</div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="stat-item">
                                <div className="stat-number">4.5 / 5</div>
                                <div className="stat-label">App Rating</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Benefits Section --> */}
            <section className="benefits-section">
                <div className="container">
                    <h2 className="section-title text-center mb-5">Benefits of Online Consultation</h2>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="benefit-item">
                                <div className="d-flex align-items-start">
                                    <i className="fas fa-check benefit-icon"></i>
                                    <div>
                                        <h4 className="benefit-title">Consult Top Doctors 24x7</h4>
                                        <p className="benefit-description">Connect instantly with a 24x7 specialist or choose to video visit a particular doctor.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="benefit-item">
                                <div className="d-flex align-items-start">
                                    <i className="fas fa-check benefit-icon"></i>
                                    <div>
                                        <h4 className="benefit-title">Convenient and Easy</h4>
                                        <p className="benefit-description">Start an instant consultation within 2 minutes or do video consultation at the scheduled time.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="benefit-item">
                                <div className="d-flex align-items-start">
                                    <i className="fas fa-check benefit-icon"></i>
                                    <div>
                                        <h4 className="benefit-title">100% Safe Consultations</h4>
                                        <p className="benefit-description">Be assured that your online consultation will be fully private and secured.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="benefit-item">
                                <div className="d-flex align-items-start">
                                    <i className="fas fa-check benefit-icon"></i>
                                    <div>
                                        <h4 className="benefit-title">Similar Clinic Experience</h4>
                                        <p className="benefit-description">Experience clinic-like consultation through a video call with the doctor. Video consultation is available only on the Practo app.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="benefit-item">
                                <div className="d-flex align-items-start">
                                    <i className="fas fa-check benefit-icon"></i>
                                    <div>
                                        <h4 className="benefit-title">Free Follow-up</h4>
                                        <p className="benefit-description">Get a valid digital prescription and a 7-day, free follow-up for further clarifications.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Video Section --> */}
            <section className="video-section">
                <div className="container">
                    <h2 className="section-title text-center mb-5">Experience online doctor consultations</h2>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="video-card">
                                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-06%20091053-ljUtB0kSwwhlFRq3T1GWgAhgCHrjiA.png" alt="Video consultation" className="video-thumbnail" />
                                <div className="video-title">#HelloDoctor Consult a doctor online from home</div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="video-card">
                                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-06%20091053-ljUtB0kSwwhlFRq3T1GWgAhgCHrjiA.png" alt="Video consultation" className="video-thumbnail" />
                                <div className="video-title">#HelloDoctor Consult a doctor online from home</div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="video-card">
                                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-06%20091053-ljUtB0kSwwhlFRq3T1GWgAhgCHrjiA.png" alt="Video consultation" className="video-thumbnail" />
                                <div className="video-title">Video Consult with Top Doctors Online</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Testimonials Section --> */}
            <section className="testimonials-section">
                <div className="container">
                    <h2 className="section-title text-center mb-5">What our users say about their online consultation experience</h2>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="testimonial-card">
                                <div className="d-flex align-items-center mb-3">
                                    <img src="/placeholder.svg?height=50&width=50" alt="Abhy" className="testimonial-avatar" />
                                    <div>
                                        <div className="testimonial-name">Abhy</div>
                                        <div className="testimonial-info">33 yr old IT Professional</div>
                                    </div>
                                </div>
                                <p className="testimonial-text">I was really sick and <strong>couldn't get out of bed</strong>. I talked to the doctor through Practo and he shared a <strong>prescription in 10 minutes</strong>. I even got the <strong>medicines delivered on the same day</strong> through Practo, just a WOW experience.</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="testimonial-card">
                                <div className="d-flex align-items-center mb-3">
                                    <img src="/placeholder.svg?height=50&width=50" alt="Preeti" className="testimonial-avatar" />
                                    <div>
                                        <div className="testimonial-name">Preeti</div>
                                        <div className="testimonial-info">26 yr old IT Professional</div>
                                    </div>
                                </div>
                                <p className="testimonial-text">I was in pain and it was really <strong>late at night</strong>. I wanted help but <strong>couldn't go to see the doctor</strong> due to lateness of the hour. Consulted online on Practo and <strong>doctor responded immediately</strong>.</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="testimonial-card">
                                <div className="d-flex align-items-center mb-3">
                                    <img src="/placeholder.svg?height=50&width=50" alt="Deepak" className="testimonial-avatar" />
                                    <div>
                                        <div className="testimonial-name">Deepak</div>
                                        <div className="testimonial-info">29 yr old traveller</div>
                                    </div>
                                </div>
                                <p className="testimonial-text">I was travelling to a <strong>remote place</strong> for scuba diving and <strong>injured myself</strong>. Tough to find doctors around, so did an <strong>online consultation</strong> on Practo and hey presto, I have my <strong>medicines</strong>. Disruptive. Convenient.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- FAQ Section --> */}
            <section className="faq-section">
                <div className="container">
                    <h2 className="section-title text-center mb-5">FAQs</h2>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="faq-item">
                                <div className="faq-question">
                                    <i className="fas fa-chevron-right me-2"></i>
                                    What is online doctor consultation?
                                </div>
                                <div className="faq-answer">
                                    Online doctor consultation or online medical consultation is a method ... <a href="#" className="text-primary">Read More</a>
                                </div>
                            </div>
                            <div className="faq-item">
                                <div className="faq-question">
                                    <i className="fas fa-chevron-right me-2"></i>
                                    Are your online doctors qualified?
                                </div>
                                <div className="faq-answer">
                                    We follow a strict verification process for every doctor providing onl... <a href="#" className="text-primary">Read More</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="faq-item">
                                <div className="faq-question">
                                    <i className="fas fa-chevron-right me-2"></i>
                                    How do I start online consultation with doctors on Practo?
                                </div>
                                <div className="faq-answer">
                                    Starting an online doctor consultation is very simple on Practo. Follo... <a href="#" className="text-primary">Read More</a>
                                </div>
                            </div>
                            <div className="faq-item">
                                <div className="faq-question">
                                    <i className="fas fa-chevron-right me-2"></i>
                                    Is online doctor consultation safe and secured on Practo?
                                </div>
                                <div className="faq-answer">
                                    The privacy of our patients is critical to us, and thus, we are compli... <a href="#" className="text-primary">Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Health Queries Section --> */}
            <section className="health-queries-section">
                <div className="container">
                    <h2 className="section-title mb-5">Health Queries</h2>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="query-item">
                                <div className="query-title">Experiencing doubts and flashbacks</div>
                                <div className="query-views">16 Views</div>
                                <div className="query-text">I have been experiencing intrusive thoughts, flashbacks of traumatic exper... <a href="#" className="text-primary">Read more</a></div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="query-item">
                                <div className="query-title">Low HB levels</div>
                                <div className="query-views">11 Views</div>
                                <div className="query-text">Dear Doctors, My wife is 32 weeks pregnant, Hb level throughout pregnancy is 9.... <a href="#" className="text-primary">Read more</a></div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="query-item">
                                <div className="query-title">Open Pores</div>
                                <div className="query-views">32 Views</div>
                                <div className="query-text">I have open pores on my nose and some acne. I am using a face wash with 2% salic... <a href="#" className="text-primary">Read more</a></div>
                            </div>
                        </div>
                    </div>
                    <div className="text-end mt-3">
                        <small className="text-muted">Last updated: 06 Jul 2025 | 7:36 AM</small>
                        <a href="#" className="text-primary ms-3">View more</a>
                    </div>
                </div>
            </section>

            {/* <!-- CTA Section --> */}
            <section className="cta-section">
                <div className="container">
                    <h2 className="cta-title">Still delaying your health concerns ?</h2>
                    <p className="cta-subtitle">Connect with India's top doctors online</p>
                    <button className="btn consult-btn">Consult Now</button>
                </div>
            </section>

            {/* <!-- App Download Section --> */}
            <section className="app-section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-06%20091137-0mMOTGhzZNnMyNO6ts9pwk4gGMP0Br.png" alt="Practo App" className="img-fluid" />
                        </div>
                        <div className="col-lg-6">
                            <h2 className="section-title">Download the Practo app</h2>
                            <p className="section-subtitle">Get ₹200 HealthCash</p>

                            <ul className="app-features">
                                <li>Video consult with Doctors</li>
                                <li>Live medicine order tracking</li>
                                <li>Exclusive healthcare packages</li>
                                <li>Ask free questions</li>
                            </ul>

                            <h4 className="mt-4 mb-3">Get the link to download the app</h4>
                            <div className="phone-input-group">
                                <span className="input-group-text">+91</span>
                                <input type="tel" className="form-control phone-input" placeholder="Enter phone number" />
                                <button className="btn send-btn">Send app link</button>
                            </div>

                            <div className="app-stores">
                                <img src="/placeholder.svg?height=50&width=150" alt="Google Play" className="store-btn" />
                                <img src="/placeholder.svg?height=50&width=150" alt="App Store" className="store-btn" />
                            </div>
                        </div>
                    </div>

                    <div className="footer-text">
                        <p><strong>Looking for a trusted & secured online dr consultation in India?</strong></p>
                        <p>Consult a doctor online on Practo for any health concern. Our pool of over 20,000 trusted doctors across 25+ specialities will ensure all your health queries are answered. You can get online dr advice from a Psychiatrist, Dermatologist, Gynaecologist, Sexologist, Pediatrician, Cardiologist, Neurologist, Gastroenterologist, Urologist, Endocrinologist, Dentist, Psychologist, and many more. Video consultation with a doctor is available only on Practo's online doctor app.</p>
                        <p><strong>Practo serves customers in the following cities:</strong> Bangalore, Mumbai, Delhi, Kolkata, Hyderabad, Chennai, Pune, Ahmedabad, Gurgaon and Ghaziabad.</p>
                        <p><strong>Recently Answered Questions:</strong> Experiencing doubts and flashbacks | Low HB levels | Open Pores | Foreskin problem | Ratnagiri good dietician | Narrow and high vaulted palate | Need help &amp; guidance | Heart related</p>
                        <p><strong>Topics:</strong> Looking for weight gain tips? | Worried about chest pain? | Want to get rid of dark circles? | How to use prega news kit? | Need some weight loss advice? | Work, family or relationship stress? | Looking to improve</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Consult
