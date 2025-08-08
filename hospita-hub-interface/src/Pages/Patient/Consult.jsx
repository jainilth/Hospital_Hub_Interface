import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Consult.css";

const healthConcerns = [
    { title: "Cold & Flu", desc: "Quick relief from common symptoms", img: "https://img.icons8.com/color/96/000000/sneeze.png" },
    { title: "Headaches", desc: "Expert diagnosis and treatment", img: "https://img.icons8.com/color/96/000000/headache.png" },
    { title: "Stomach Issues", desc: "Digestive health consultation", img: "https://img.icons8.com/color/96/000000/stomach-ache.png" },
    { title: "Skin Problems", desc: "Dermatology consultations", img: "https://img.icons8.com/color/96/000000/skin-care.png" },
];

const offers = [
    {
        title: "Download the App & get ₹200 HealthCash",
        desc: "Download App",
        img: "https://www.practo.com/consult/static/images/offer-app-v1.png",
        cta: "Download App"
    },
    {
        title: "Consult with specialists at just ₹199",
        desc: "Consult Now",
        img: "https://www.practo.com/consult/static/images/offer-specialist-v1.png",
        cta: "Consult Now"
    }
];

const doctors = [
    { name: "Dr. Sarah Johnson", specialty: "Cardiologist", img: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Dr. Michael Chen", specialty: "Neurologist", img: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Dr. Emily Davis", specialty: "Pediatrician", img: "https://randomuser.me/api/portraits/women/65.jpg" },
];

const steps = [
    { title: "Select a specialty", desc: "Pick your health concern", icon: "https://img.icons8.com/color/48/000000/medical-doctor.png" },
    { title: "Book & Pay", desc: "Choose a doctor and slot", icon: "https://img.icons8.com/color/48/000000/calendar--v1.png" },
    { title: "Consult", desc: "Connect via video or chat", icon: "https://img.icons8.com/color/48/000000/video-call.png" },
];

export default function Consult() {
    const [specializations, setSpecializations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:5220/api/Specialization/GetAllSpecializations")
            .then((res) => setSpecializations(res.data))
            .catch(() => setSpecializations([]));
    }, []);

    return (
        <div className="consult-practo-template">
            {/* Hero Section */}
            <section className="hero-practo container-fluid">
                <div className="hero-practo-left">
                    <h1>Skip the travel!<br />Take Online Doctor Consultation</h1>
                    <p className="hero-practo-sub">Private consultation • Audio call • Starts at just ₹199</p>
                    <div className="hero-practo-rating">
                        <img src="https://img.icons8.com/color/24/000000/star.png" alt="star" />
                        <span>4.8/5 • 100k+ users</span>
                    </div>
                    <button className="cta" onClick={() => navigate('/patient/specialities')}>Consult Now</button>
                    <div className="hero-practo-tags">
                        <span>Video Consult</span>
                        <span>Digital Prescription</span>
                        <span>Free Follow-up</span>
                    </div>
                </div>
                <div className="hero-practo-right">
                    <img src="https://www.practo.com/consult/static/images/homepage-hero-image-web-v1.png" alt="Doctor" />
                </div>
            </section>

            {/* Specialties Section */}
            <section className="specialties-practo">
                <div className="specialties-practo-header">
                    <h2>25+ Specialities</h2>
                    <p>Consult with top doctors across specialities</p>
                    <button className="see-all-btn">See all Specialities</button>
                </div>
                <div className="specialties-practo-list">
                    {specializations.length > 0 ? (
                        specializations.map((s, i) => (
                            <div className="specialty-practo-card" key={i}>
                                <img className="specialty-practo-icon" src={s.iconUrl || "https://img.icons8.com/color/96/000000/medical-doctor.png"} alt={s.specializationName} />
                                <div className="specialty-practo-name">{s.specializationName}</div>
                                <Link className="specialty-practo-link" to={`/patient/doctors?specializationId=${s.specializationId}&speciality=${encodeURIComponent(s.specializationName || '')}`}>Consult now &gt;</Link>
                            </div>
                        ))
                    ) : (
                        <div style={{ color: "#888", textAlign: "center", width: "100%" }}>No specialties available.</div>
                    )}
                </div>
            </section>

            {/* Doctors Section */}
            <section className="doctors-practo">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h2>Our Doctors</h2>
                    <button className="see-all-btn">See all Specialities</button>
                </div>
                <div className="doctors-practo-list">
                    {doctors.map((d, i) => (
                        <div className="doctor-practo-card" key={i}>
                            <img src={d.img} alt={d.name} />
                            <div className="doctor-practo-name">{d.name}</div>
                            <div className="doctor-practo-specialty">{d.specialty}</div>
                        </div>
                    ))}
                </div>
            </section>


            {/* Health Concerns Section
            <section className="health-concerns-practo">
                <div className="health-concerns-practo-header">
                    <h2>Common Health Concerns</h2>
                    <button className="see-all-btn">See all Problems</button>
                </div>
                <div className="health-concerns-practo-list">
                    {healthConcerns.map((c, i) => (
                        <div className="health-concern-practo-card" key={i}>
                            <img src={c.img} alt={c.title} />
                            <div className="health-concern-practo-title">{c.title}</div>
                            <div className="health-concern-practo-desc">{c.desc}</div>
                            <button className="health-concern-practo-link">Consult now &gt;</button>
                        </div>
                    ))}
                </div>
            </section> */}

            {/* Offers Section */}
            <section className="offers-practo">
                <div className="offers-practo-list">
                    {offers.map((offer, i) => (
                        <div className="offer-practo-card" key={i}>
                            <div className="offer-practo-content">
                                <h3>{offer.title}</h3>
                                <button className="offer-practo-btn">{offer.cta}</button>
                            </div>
                            <img src={offer.img} alt={offer.title} />
                        </div>
                    ))}
                </div>
            </section>


            {/* How it Works Section */}
            <section className="how-it-works-practo">
                <h2>How it works</h2>
                <div className="how-it-works-practo-list">
                    {steps.map((s, i) => (
                        <div className="how-it-works-practo-card" key={i}>
                            <img src={s.icon} alt={s.title} />
                            <div className="how-it-works-practo-title">{s.title}</div>
                            <div className="how-it-works-practo-desc">{s.desc}</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
