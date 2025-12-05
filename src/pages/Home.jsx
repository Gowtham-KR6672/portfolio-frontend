import React, { useState, useEffect } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import Footer from '../components/Footer';
import axios from 'axios';
import { FaWhatsapp, FaLinkedin, FaGithub, FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

import StartupLoader from '../components/StartupLoader';

const Home = () => {
    const [portfolio, setPortfolio] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/portfolio`);
                setPortfolio(data);
            } catch (error) {
                console.error('Error fetching portfolio:', error);
            }
        };
        fetchPortfolio();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');
        try {
            await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/contact`, formData);
            setStatus('Message sent successfully!');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to send message.';
            setStatus(`Error: ${errorMessage}`);
        }
    };

    if (!portfolio) return <StartupLoader />;

    return (
        <div style={{ paddingTop: '80px' }}>
            {/* Hero Section */}
            {/* Hero Section */}
            <div className="container hero-container" style={{ height: '90vh', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '50px' }}>
                {/* Left Side: Text & Buttons */}
                <div className="hero-text-container" style={{ flex: 1, textAlign: 'left' }}>
                    <h1 className="neon-text hero-title" style={{ fontSize: '4.5rem', marginBottom: '15px', lineHeight: '1.1' }}>Gowtham K R</h1>
                    <p className="hero-subtitle" style={{ fontSize: '2rem', color: 'var(--text-color)', marginBottom: '40px' }}>Process Associate</p>

                    <div className="hero-buttons" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        <a href="#contact" className="glass-panel btn-contact" style={{ padding: '15px 35px', fontWeight: 'bold', fontSize: '1.2rem', borderRadius: '30px', textDecoration: 'none', display: 'inline-block' }}>
                            Contact Me
                        </a>
                        <a href="/assets/cv.pdf" download className="glass-panel btn-cv" style={{ padding: '15px 35px', fontWeight: 'bold', fontSize: '1.2rem', borderRadius: '30px', textDecoration: 'none', display: 'inline-block' }}>
                            Download CV
                        </a>
                    </div>
                </div>

                {/* Right Side: Profile Image */}
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="profile-image-container" style={{
                        width: '400px',
                        height: '400px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '4px solid var(--primary-color)',
                        boxShadow: '0 0 30px var(--primary-color)',
                        background: 'rgba(0,0,0,0.1)'
                    }}>
                        <img
                            src="/assets/profile.png"
                            alt="Gowtham K R"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.style.background = 'var(--glass-bg)'; e.target.parentNode.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:3rem;color:var(--primary-color)">GKR</div>'; }}
                        />
                    </div>
                </div>
            </div>

            <SectionWrapper id="summary" title="Summary">
                <div className="glass-panel">
                    <ul className="summary-text" style={{ listStyle: 'disc', paddingLeft: '20px', fontSize: '1.2rem', lineHeight: '1.6' }}>
                        {portfolio.summary.split('\n').map((point, index) => (
                            point.trim() && <li key={index} style={{ marginBottom: '10px' }}>{point.trim()}</li>
                        ))}
                    </ul>
                </div>
            </SectionWrapper>

            <SectionWrapper id="skills" title="Skills">
                <div className="skills-wrapper" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

                    {/* Technical Skills - Top Left */}
                    <div className="glass-panel" style={{ position: 'relative' }}>
                        <div className="tooltip-container" style={{ position: 'relative', display: 'inline-block' }}>
                            <h3 style={{ color: 'var(--secondary-color)', marginBottom: '15px', cursor: 'pointer' }}>Technical Skills</h3>
                            <span className="tooltip-text">Content can be edited in Admin Dashboard</span>
                        </div>
                        <div className="skills-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                            {portfolio.skills.technical.map((skill, index) => (
                                <div key={index} style={{ textAlign: 'center' }}>
                                    <div style={{ width: '80px', height: '80px', margin: '0 auto 10px', borderRadius: '50%', overflow: 'hidden', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {typeof skill === 'object' && skill.icon ? (
                                            <img src={skill.icon} alt={skill.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <span style={{ fontSize: '2rem', color: 'var(--text-color)' }}>{typeof skill === 'string' ? skill.charAt(0) : skill.name.charAt(0)}</span>
                                        )}
                                    </div>
                                    <p style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{typeof skill === 'string' ? skill : skill.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Soft Skills - Top Right */}
                    <div className="glass-panel" style={{ position: 'relative' }}>
                        <div className="tooltip-container" style={{ position: 'relative', display: 'inline-block' }}>
                            <h3 style={{ color: 'var(--secondary-color)', marginBottom: '15px', cursor: 'pointer' }}>Soft Skills</h3>
                            <span className="tooltip-text">Content can be edited in Admin Dashboard</span>
                        </div>
                        <div className="skills-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                            {portfolio.skills.soft.map((skill, index) => (
                                <div key={index} style={{ textAlign: 'center' }}>
                                    <div style={{ width: '80px', height: '80px', margin: '0 auto 10px', borderRadius: '50%', overflow: 'hidden', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {typeof skill === 'object' && skill.icon ? (
                                            <img src={skill.icon} alt={skill.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <span style={{ fontSize: '2rem', color: 'var(--text-color)' }}>{typeof skill === 'string' ? skill.charAt(0) : skill.name.charAt(0)}</span>
                                        )}
                                    </div>
                                    <p style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{typeof skill === 'string' ? skill : skill.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tools Used - Bottom Full Width */}
                    <div className="glass-panel" style={{ position: 'relative', gridColumn: '1 / -1' }}>
                        <div className="tooltip-container" style={{ position: 'relative', display: 'inline-block' }}>
                            <h3 style={{ color: 'var(--secondary-color)', marginBottom: '15px', cursor: 'pointer' }}>Tools Used</h3>
                            <span className="tooltip-text">Content can be edited in Admin Dashboard</span>
                        </div>
                        <div className="skills-grid-5" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
                            {portfolio.skills.professional.map((skill, index) => (
                                <div key={index} style={{ textAlign: 'center' }}>
                                    <div style={{ width: '80px', height: '80px', margin: '0 auto 10px', borderRadius: '50%', overflow: 'hidden', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {typeof skill === 'object' && skill.icon ? (
                                            <img src={skill.icon} alt={skill.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <span style={{ fontSize: '2rem', color: 'var(--text-color)' }}>{typeof skill === 'string' ? skill.charAt(0) : skill.name.charAt(0)}</span>
                                        )}
                                    </div>
                                    <p style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{typeof skill === 'string' ? skill : skill.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </SectionWrapper>

            <SectionWrapper id="experience" title="Experience">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
                    {portfolio.experience.map((exp, index) => (
                        <div key={index} className="glass-panel" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-color)', fontWeight: 'bold' }}>{exp.role}</h3>
                                    <p style={{ color: 'var(--primary-color)', fontSize: '1.1rem' }}>{exp.company}</p>
                                </div>
                                <span style={{ background: 'rgba(255,255,255,0.1)', padding: '5px 15px', borderRadius: '20px', fontSize: '0.9rem' }}>{exp.duration}</span>
                            </div>
                            <ul style={{ listStyle: 'disc', paddingLeft: '20px', color: 'var(--text-color)', lineHeight: '1.6' }}>
                                {exp.description.split('\n').map((point, i) => (
                                    point.trim() && <li key={i} style={{ marginBottom: '5px' }}>{point.trim()}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </SectionWrapper>

            <SectionWrapper id="education" title="Education">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                    {portfolio.education && portfolio.education.map((edu, index) => (
                        <div key={index} className="glass-panel">
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '5px' }}>{edu.degree}</h3>
                            <p style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>{edu.institution}</p>
                            <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '10px' }}>{edu.duration}</p>
                            {edu.marks && <p style={{ color: 'var(--primary-color)', fontWeight: 'bold', marginBottom: '10px' }}>Marks/Grade: {edu.marks}</p>}
                            <ul style={{ listStyle: 'disc', paddingLeft: '20px', fontSize: '0.95rem', lineHeight: '1.5', opacity: 0.9 }}>
                                {edu.description.split('\n').map((point, i) => (
                                    point.trim() && <li key={i} style={{ marginBottom: '5px' }}>{point.trim()}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </SectionWrapper>

            <SectionWrapper id="projects" title="Projects">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>

                    {/* Study Projects */}
                    <div className="glass-panel" style={{ padding: '30px' }}>
                        <h3 style={{ color: 'var(--accent-color)', fontSize: '1.8rem', marginBottom: '10px' }}>Study Projects</h3>
                        <p style={{ color: 'var(--text-color)', marginBottom: '20px', opacity: 0.8 }}>Academic projects demonstrating core concepts.</p>

                        {portfolio.projects.study.map((project, index) => (
                            <div key={index} style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid var(--glass-border)' }}>
                                <h4 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>{project.title}</h4>
                                <p style={{ marginBottom: '15px', lineHeight: '1.6' }}>{project.description}</p>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                                    {project.skills && project.skills.map((skill, i) => (
                                        <span key={i} style={{
                                            padding: '5px 15px',
                                            background: 'rgba(37, 99, 235, 0.1)',
                                            color: 'var(--primary-color)',
                                            borderRadius: '20px',
                                            fontSize: '0.9rem',
                                            border: '1px solid var(--primary-color)'
                                        }}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                <a href={project.link} target="_blank" rel="noreferrer" className="btn-cv" style={{
                                    padding: '10px 25px',
                                    borderRadius: '25px',
                                    textDecoration: 'none',
                                    display: 'inline-block',
                                    fontSize: '1rem',
                                    fontWeight: 'bold'
                                }}>
                                    View Project
                                </a>
                            </div>
                        ))}
                    </div>

                    {/* Worked Projects */}
                    <div className="glass-panel" style={{ padding: '30px' }}>
                        <h3 style={{ color: 'var(--accent-color)', fontSize: '1.8rem', marginBottom: '10px' }}>Worked Projects</h3>
                        <p style={{ color: 'var(--text-color)', marginBottom: '20px', opacity: 0.8 }}>Real-world applications and freelance work.</p>

                        {portfolio.projects.worked.map((project, index) => (
                            <div key={index} style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid var(--glass-border)' }}>
                                <h4 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>{project.title}</h4>
                                <p style={{ marginBottom: '15px', lineHeight: '1.6' }}>{project.description}</p>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                                    {project.skills && project.skills.map((skill, i) => (
                                        <span key={i} style={{
                                            padding: '5px 15px',
                                            background: 'rgba(37, 99, 235, 0.1)',
                                            color: 'var(--primary-color)',
                                            borderRadius: '20px',
                                            fontSize: '0.9rem',
                                            border: '1px solid var(--primary-color)'
                                        }}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                <a href={project.link} target="_blank" rel="noreferrer" className="btn-cv" style={{
                                    padding: '10px 25px',
                                    borderRadius: '25px',
                                    textDecoration: 'none',
                                    display: 'inline-block',
                                    fontSize: '1rem',
                                    fontWeight: 'bold'
                                }}>
                                    View Project
                                </a>
                            </div>
                        ))}
                    </div>

                </div>
            </SectionWrapper>



            <SectionWrapper id="certifications" title="Certifications">
                <div className="certifications-grid">
                    {portfolio.certifications.map((cert, index) => (
                        <div key={index} className="glass-panel" style={{ padding: '25px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-color)', fontWeight: 'bold' }}>{cert.title}</h3>
                            <p style={{ color: 'var(--text-color)', fontSize: '0.9rem', fontWeight: 'bold' }}>{cert.subtitle}</p>
                            <ul style={{ listStyle: 'disc', paddingLeft: '20px', fontSize: '0.95rem', lineHeight: '1.5', opacity: 0.9 }}>
                                {cert.description.split('\n').map((point, i) => (
                                    point.trim() && <li key={i} style={{ marginBottom: '5px' }}>{point.trim()}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </SectionWrapper>

            <SectionWrapper id="contact" title="Contact Me">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'center' }}>
                    {/* Left Side: Social Buttons */}
                    <div className="glass-panel" style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '20px', padding: '30px' }}>
                        <h3 style={{ marginBottom: '20px', color: 'var(--primary-color)' }}>Get in Touch</h3>

                        <a href={`mailto:${portfolio.socials.email}`} className="contact-link" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', transition: '0.3s', color: 'var(--text-color)' }}>
                            <MdEmail size={30} color="var(--primary-color)" />
                            <span style={{ fontSize: '1.1rem' }}>Email Me</span>
                        </a>

                        <a href={`tel:${portfolio.socials.phone}`} className="contact-link" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', transition: '0.3s', color: 'var(--text-color)' }}>
                            <FaPhoneAlt size={25} color="var(--primary-color)" />
                            <span style={{ fontSize: '1.1rem' }}>Call Me</span>
                        </a>

                        <a href={portfolio.socials.whatsapp} target="_blank" rel="noreferrer" className="contact-link" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', transition: '0.3s', color: 'var(--text-color)' }}>
                            <FaWhatsapp size={30} color="#25D366" />
                            <span style={{ fontSize: '1.1rem' }}>WhatsApp</span>
                        </a>

                        <a href={portfolio.socials.linkedin} target="_blank" rel="noreferrer" className="contact-link" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', transition: '0.3s', color: 'var(--text-color)' }}>
                            <FaLinkedin size={30} color="#0077B5" />
                            <span style={{ fontSize: '1.1rem' }}>LinkedIn</span>
                        </a>

                        <a href={portfolio.socials.github} target="_blank" rel="noreferrer" className="contact-link" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', transition: '0.3s', color: 'var(--text-color)' }}>
                            <FaGithub size={30} color="var(--text-color)" />
                            <span style={{ fontSize: '1.1rem' }}>GitHub</span>
                        </a>
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="glass-panel" style={{ flex: '1', minWidth: '300px', padding: '30px' }}>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <h3 style={{ marginBottom: '20px', color: 'var(--primary-color)' }}>Send a Message</h3>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                style={{ padding: '15px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', color: 'var(--text-color)', borderRadius: '5px', outline: 'none' }}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                style={{ padding: '15px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', color: 'var(--text-color)', borderRadius: '5px', outline: 'none' }}
                            />
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                style={{ padding: '15px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', color: 'var(--text-color)', borderRadius: '5px', outline: 'none' }}
                            ></textarea>
                            <button type="submit" style={{ padding: '15px', background: 'var(--primary-color)', border: 'none', color: '#000', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', borderRadius: '5px', transition: '0.3s' }}>
                                Send Message
                            </button>
                            {status && <p style={{ textAlign: 'center', color: status.includes('success') ? 'green' : 'red' }}>{status}</p>}
                        </form>
                    </div>
                </div>
            </SectionWrapper>

            <Footer />
        </div>
    );
};

export default Home;
