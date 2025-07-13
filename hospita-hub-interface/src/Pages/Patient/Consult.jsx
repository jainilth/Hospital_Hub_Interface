import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  Heart,
  Brain,
  Eye,
  Stethoscope,
  Baby,
  Activity,
  Download,
  Play,
  Star,
  CheckCircle,
  Users,
  Clock,
  Shield,
  PhoneCall,
} from "lucide-react";
import "./Consult.css";

const Specialisties = () => {
  const [specializations, setSpecializations] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5220/api/Specialization/GetAllSpecializations")
      .then((res) => setSpecializations(res.data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <div className="specialties-grid">
        {specializations.map((specialty, index) => (
          <div key={index} className="specialty-card">
            <div className="specialty-icon">
              {/* <specialty.icon size={32} /> */}
            </div>
            <h3>{specialty.specializationName}</h3>
            {/* <p>{specialty.patients} patients</p> */}
            <Link>consult now{">"}</Link>
          </div>
        ))}
      </div>
    </>
  );
};

const Departments = () => {};

const Consult = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // const specialties = [
  //     { name: 'Cardiology', icon: Heart, patients: '2.5k+' },
  //     { name: 'Neurology', icon: Brain, patients: '1.8k+' },
  //     { name: 'Ophthalmology', icon: Eye, patients: '3.2k+' },
  //     { name: 'General Medicine', icon: Stethoscope, patients: '5.1k+' },
  //     { name: 'Pediatrics', icon: Baby, patients: '2.9k+' },
  //     { name: 'Psychiatry', icon: Activity, patients: '1.5k+' }
  // ];

  const healthConcerns = [
    {
      title: "Cold & Flu",
      description: "Get quick relief from common symptoms",
      image: "/api/placeholder/300/200",
    },
    {
      title: "Headaches",
      description: "Expert diagnosis and treatment",
      image: "/api/placeholder/300/200",
    },
    {
      title: "Stomach Issues",
      description: "Digestive health consultation",
      image: "/api/placeholder/300/200",
    },
    {
      title: "Skin Problems",
      description: "Dermatology consultations",
      image: "/api/placeholder/300/200",
    },
  ];

  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      experience: "15 years",
      rating: 4.9,
      consultations: "2,500+",
      image: "/api/placeholder/150/150",
    },
    {
      name: "Dr. Michael Chen",
      specialty: "Neurologist",
      experience: "12 years",
      rating: 4.8,
      consultations: "1,800+",
      image: "/api/placeholder/150/150",
    },
    {
      name: "Dr. Emily Davis",
      specialty: "Pediatrician",
      experience: "10 years",
      rating: 4.9,
      consultations: "3,200+",
      image: "/api/placeholder/150/150",
    },
    {
      name: "Dr. James Wilson",
      specialty: "General Medicine",
      experience: "8 years",
      rating: 4.7,
      consultations: "2,100+",
      image: "/api/placeholder/150/150",
    },
  ];

  const testimonials = [
    {
      name: "Alice Johnson",
      review:
        "Amazing experience! The doctor was very professional and helped me understand my condition clearly.",
      rating: 5,
      condition: "Migraine Treatment",
    },
    {
      name: "Robert Smith",
      review:
        "Quick and convenient consultation. Saved me a trip to the hospital during busy schedule.",
      rating: 5,
      condition: "Cold & Flu",
    },
    {
      name: "Maria Garcia",
      review:
        "Excellent service for my child. The pediatrician was patient and caring throughout the consultation.",
      rating: 5,
      condition: "Child Health Checkup",
    },
  ];

  const faqs = [
    {
      question: "How do I book an online consultation?",
      answer:
        "Simply select your specialty, choose a doctor, pick a time slot and complete the booking process.",
    },
    {
      question: "Is online consultation safe?",
      answer:
        "Yes, all consultations are conducted through secure, encrypted platforms ensuring complete privacy.",
    },
    {
      question: "What if I need a prescription?",
      answer:
        "Doctors can provide digital prescriptions which you can use at any pharmacy or for medicine delivery.",
    },
    {
      question: "How much does a consultation cost?",
      answer:
        "Consultation fees vary by specialty and doctor experience, typically ranging from $25-75.",
    },
  ];

  return (
    <div className="consult-container">
      {/* Hero Section */}
      <section className="hero-section1">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Skip the travel!</h1>
            <h2>Take Online Doctor Consultation</h2>
            <p>
              Connect instantly with a 24x7 specialist or choose to video
              consult later.
            </p>
            <div className="rating-info">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="star-filled" size={20} />
                ))}
              </div>
              <span>Rated 4.8/5 by 25,000+ patients</span>
            </div>
            <button className="cta-button">
              <PhoneCall size={20} />
              Consult Now
            </button>
          </div>
          <div className="hero-image">
            <img
              src="https://www.practo.com/consult/static/images/homepage-hero-image-web-v1.png"
              alt="Doctor consultation"
            />
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="specialties-section">
        <div className="section-header">
          <h2>25+ Specialities</h2>
          <p>Consult with top doctors across all specialities</p>
          <button className="view-all-btn">View All</button>
        </div>
        <Specialisties />
      </section>

      {/* Health Concerns Section */}
      <section className="health-concerns-section">
        <div className="section-header">
          <h2>Common Health Concerns</h2>
          <p>Quick consultation for everyday health issues</p>
          <button className="view-all-btn">View All</button>
        </div>
        <div className="concerns-grid">
          {healthConcerns.map((concern, index) => (
            <div key={index} className="concern-card">
              <div className="concern-image">
                <img src={concern.image} alt={concern.title} />
              </div>
              <div className="concern-content">
                <h3>{concern.title}</h3>
                <p>{concern.description}</p>
                <button className="consult-btn">Consult Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Offers Section */}
      <section className="offers-section">
        <h2>Offers</h2>
        <div className="offers-grid">
          <div className="offer-card primary">
            <div className="offer-content">
              <h3>Download the App & get ₹200 HealthCash</h3>
              <p>Use code: WELCOME200</p>
              <button className="download-btn">
                <Download size={20} />
                Download App
              </button>
            </div>
            <div className="offer-image">
              <img
                height={"150px"}
                src="https://www.practo.com/consult/static/images/offer-app-v1.png"
                alt="App download offer"
              />
            </div>
          </div>
          <div className="offer-card secondary">
            <div className="offer-content">
              <h3>Consult with specialists at just ₹199</h3>
              <p>Limited time offer</p>
              <button className="consult-btn">Consult Now</button>
            </div>
            <div className="offer-doctor">
              <img
                height={"150px"}
                src="https://www.practo.com/consult/static/images/offer-specialist-v1.png"
                alt="Doctor"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="doctors-section">
        <h2>Our Top Doctors</h2>
        <div className="doctors-grid">
          {doctors.map((doctor, index) => (
            <div key={index} className="doctor-card">
              <div className="doctor-image">
                <img src={doctor.image} alt={doctor.name} />
              </div>
              <div className="doctor-info">
                <h3>{doctor.name}</h3>
                <p className="specialty">{doctor.specialty}</p>
                <p className="experience">{doctor.experience} experience</p>
                <div className="doctor-stats">
                  <span className="rating">
                    <Star className="star-filled" size={16} />
                    {doctor.rating}
                  </span>
                  <span className="consultations">
                    {doctor.consultations} consultations
                  </span>
                </div>
                <button className="book-btn">Book Consultation</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section className="how-it-works-section">
        <h2>How it works</h2>
        <div className="steps-grid">
          <div className="step">
            <div className="step-icon">
              <Users size={40} />
            </div>
            <h3>Select your health concern</h3>
            <p>Choose from 25+ specialties</p>
          </div>
          <div className="step">
            <div className="step-icon">
              <Clock size={40} />
            </div>
            <h3>Book a slot & pay online</h3>
            <p>Available 24x7 for consultation</p>
          </div>
          <div className="step">
            <div className="step-icon">
              <PhoneCall size={40} />
            </div>
            <h3>Start your consultation</h3>
            <p>Connect via video/audio call</p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat">
            <h3>2,00,000+</h3>
            <p>Happy Patients</p>
          </div>
          <div className="stat">
            <h3>20,000+</h3>
            <p>Video Consultations</p>
          </div>
          <div className="stat">
            <h3>25+</h3>
            <p>Specialities</p>
          </div>
          <div className="stat">
            <h3>4.8/5</h3>
            <p>Average Rating</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <h2>Benefits of Online Consultation</h2>
        <div className="benefits-grid">
          <div className="benefit">
            <CheckCircle className="benefit-icon" />
            <h3>Consult Top Doctors 24x7</h3>
            <p>Connect with experienced doctors anytime, anywhere</p>
          </div>
          <div className="benefit">
            <Shield className="benefit-icon" />
            <h3>Guaranteed and Safe</h3>
            <p>100% safe and secure platform with end-to-end encryption</p>
          </div>
          <div className="benefit">
            <Clock className="benefit-icon" />
            <h3>100% Refund Consultations</h3>
            <p>Get full refund if consultation doesn't happen</p>
          </div>
          <div className="benefit">
            <Heart className="benefit-icon" />
            <h3>Follow Care Experience</h3>
            <p>Continuous care and follow-up consultations</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What our users say about their online consultation experience</h2>
        <div className="testimonials-container">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`testimonial-card ${
                index === activeTestimonial ? "active" : ""
              }`}
              onClick={() => setActiveTestimonial(index)}
            >
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="star-filled" size={16} />
                ))}
              </div>
              <p>"{testimonial.review}"</p>
              <div className="testimonial-author">
                <strong>{testimonial.name}</strong>
                <span>{testimonial.condition}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>FAQs</h2>
        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* App Download Section */}
      <section className="app-download-section">
        <div className="app-content">
          <div className="app-info">
            <h2>Download the Practo app</h2>
            <p>Get the link to download the app</p>
            <div className="phone-input">
              <input type="tel" placeholder="Enter phone number" />
              <button>Send Link</button>
            </div>
            <div className="download-links">
              <img src="/api/placeholder/150/50" alt="Download on App Store" />
              <img src="/api/placeholder/150/50" alt="Get it on Google Play" />
            </div>
          </div>
          <div className="app-mockup">
            <img
              src="https://www.practo.com/consult/static/images/app-download-banner-web.png"
              alt="Practo app mockup"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Consult;
