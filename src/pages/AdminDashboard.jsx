import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/portfolio`);
                setPortfolio(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching portfolio:', error);
                setLoading(false);
            }
        };
        fetchPortfolio();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleChange = (e, section, field, index = null, subField = null) => {
        const updatedPortfolio = { ...portfolio };

        if (section === 'socials') {
            updatedPortfolio.socials[field] = e.target.value;
        } else if (section === 'skills') {
            if (index !== null) {
                if (subField) {
                    updatedPortfolio.skills[field][index][subField] = e.target.value;
                } else {
                    // Handle legacy string case or direct object update if needed (though we use subField now)
                    updatedPortfolio.skills[field][index] = e.target.value;
                }
            }
        } else if (section === 'projects') {
            if (subField === 'skills') {
                updatedPortfolio.projects[field][index][subField] = e.target.value.split(',').map(s => s.trim());
            } else {
                updatedPortfolio.projects[field][index][subField] = e.target.value;
            }
        } else if (section === 'experience') {
            updatedPortfolio.experience[index][field] = e.target.value;
        } else if (section === 'education') {
            updatedPortfolio.education[index][field] = e.target.value;
        } else if (section === 'certifications') {
            updatedPortfolio.certifications[index][field] = e.target.value;
        } else {
            updatedPortfolio[field] = e.target.value;
        }

        setPortfolio(updatedPortfolio);
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/portfolio`, portfolio, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage('Portfolio updated successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error updating portfolio:', error);
            if (error.response) {
                console.error('Error Response:', error.response.data);
                setMessage(`Failed to update: ${error.response.data.message || error.response.statusText}`);
            } else {
                setMessage('Failed to update portfolio. Network error?');
            }
        }
    };

    // Helper to add items
    const addItem = (section, field = null) => {
        const updatedPortfolio = { ...portfolio };
        if (section === 'skills') {
            updatedPortfolio.skills[field].push({ name: '', icon: '' });
        } else if (section === 'projects') {
            updatedPortfolio.projects[field].push({ title: '', description: '', link: '', skills: [] });
        } else if (section === 'experience') {
            updatedPortfolio.experience.push({ role: '', company: '', duration: '', description: '' });
        } else if (section === 'education') {
            updatedPortfolio.education.push({ degree: '', institution: '', duration: '', description: '' });
        } else if (section === 'certifications') {
            updatedPortfolio.certifications.push({ title: '', subtitle: '', description: '' });
        }
        setPortfolio(updatedPortfolio);
    };

    // Helper to remove items
    const removeItem = (section, field, index) => {
        const updatedPortfolio = { ...portfolio };
        if (section === 'skills') {
            updatedPortfolio.skills[field].splice(index, 1);
        } else if (section === 'projects') {
            updatedPortfolio.projects[field].splice(index, 1);
        } else if (section === 'experience') {
            updatedPortfolio.experience.splice(index, 1);
        } else if (section === 'education') {
            updatedPortfolio.education.splice(index, 1);
        } else if (section === 'certifications') {
            updatedPortfolio.certifications.splice(index, 1);
        }
        setPortfolio(updatedPortfolio);
    };

    if (loading) return <div style={{ paddingTop: '100px', textAlign: 'center', color: '#fff' }}>Loading...</div>;

    return (
        <div style={{ paddingTop: '100px', paddingBottom: '50px', maxWidth: '1200px', margin: '0 auto', color: 'var(--text-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', padding: '0 20px' }}>
                <h1 className="neon-text">Admin Dashboard</h1>
                <button onClick={handleLogout} style={{ padding: '10px 20px', background: 'red', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
            </div>

            {message && <div style={{ padding: '15px', background: 'green', color: '#fff', textAlign: 'center', marginBottom: '20px', borderRadius: '5px' }}>{message}</div>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', padding: '0 20px' }}>

                {/* Summary Section */}
                <div className="glass-panel">
                    <h2 style={{ marginBottom: '15px', color: 'var(--primary-color)' }}>Summary</h2>
                    <textarea
                        value={portfolio.summary}
                        onChange={(e) => handleChange(e, 'main', 'summary')}
                        rows="4"
                        style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', color: 'var(--text-color)', borderRadius: '5px' }}
                    />
                </div>

                {/* Skills Section */}
                <div className="glass-panel">
                    <h2 style={{ marginBottom: '15px', color: 'var(--primary-color)' }}>Skills</h2>
                    {['technical', 'professional', 'soft'].map(type => (
                        <div key={type} style={{ marginBottom: '20px' }}>
                            <h3 style={{ textTransform: 'capitalize', marginBottom: '10px' }}>{type === 'professional' ? 'Tools Used' : type + ' Skills'}</h3>
                            {portfolio.skills[type].map((skill, index) => (
                                <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                    <input
                                        placeholder="Skill Name"
                                        value={typeof skill === 'string' ? skill : skill.name}
                                        onChange={(e) => handleChange(e, 'skills', type, index, 'name')}
                                        style={{ flex: 1, padding: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', color: 'var(--text-color)', borderRadius: '5px' }}
                                    />
                                    <input
                                        placeholder="Icon/GIF URL"
                                        value={typeof skill === 'string' ? '' : skill.icon}
                                        onChange={(e) => handleChange(e, 'skills', type, index, 'icon')}
                                        style={{ flex: 1, padding: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', color: 'var(--text-color)', borderRadius: '5px' }}
                                    />
                                    <button onClick={() => removeItem('skills', type, index)} style={{ background: 'red', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>X</button>
                                </div>
                            ))}
                            <button onClick={() => addItem('skills', type)} style={{ background: 'var(--primary-color)', color: '#000', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>+ Add Skill</button>
                        </div>
                    ))}
                </div>

                {/* Projects Section */}
                <div className="glass-panel">
                    <h2 style={{ marginBottom: '15px', color: 'var(--primary-color)' }}>Projects</h2>
                    {['study', 'worked'].map(type => (
                        <div key={type} style={{ marginBottom: '20px' }}>
                            <h3 style={{ textTransform: 'capitalize', marginBottom: '10px' }}>{type} Projects</h3>
                            {portfolio.projects[type].map((project, index) => (
                                <div key={index} style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '10px', marginBottom: '15px' }}>
                                    <input
                                        placeholder="Title"
                                        value={project.title}
                                        onChange={(e) => handleChange(e, 'projects', type, index, 'title')}
                                        style={{ width: '100%', padding: '10px', marginBottom: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', color: 'var(--text-color)', borderRadius: '5px' }}
                                    />
                                    <textarea
                                        placeholder="Description"
                                        value={project.description}
                                        onChange={(e) => handleChange(e, 'projects', type, index, 'description')}
                                        style={{ width: '100%', padding: '10px', marginBottom: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', color: 'var(--text-color)', borderRadius: '5px' }}
                                    />
                                    <input
                                        placeholder="Link"
                                        value={project.link}
                                        onChange={(e) => handleChange(e, 'projects', type, index, 'link')}
                                        style={{ width: '100%', padding: '10px', marginBottom: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', color: 'var(--text-color)', borderRadius: '5px' }}
                                    />
                                    <input
                                        placeholder="Skills Used (comma separated)"
                                        value={project.skills ? project.skills.join(', ') : ''}
                                        onChange={(e) => handleChange(e, 'projects', type, index, 'skills')}
                                        style={{ width: '100%', padding: '10px', marginBottom: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', color: 'var(--text-color)', borderRadius: '5px' }}
                                    />
                                    <button onClick={() => removeItem('projects', type, index)} style={{ background: 'red', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>Remove Project</button>
                                </div>
                            ))}
                            <button onClick={() => addItem('projects', type)} style={{ background: 'var(--primary-color)', color: '#000', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>+ Add Project</button>
                        </div>
                    ))}
                </div>

                {/* Experience Section */}
                <div className="glass-panel">
                    <h2 style={{ marginBottom: '15px', color: 'var(--primary-color)' }}>Experience</h2>
                    {portfolio.experience.map((exp, index) => (
                        <div key={index} style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '10px', marginBottom: '15px' }}>
                            <input
                                placeholder="Role"
                                value={exp.role}
                                onChange={(e) => handleChange(e, 'experience', 'role', index)}
                                style={{ width: '100%', padding: '10px', marginBottom: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', color: 'var(--text-color)', borderRadius: '5px' }}
                            />
                            <input
                                placeholder="Company"
                                value={exp.company}
                                onChange={(e) => handleChange(e, 'experience', 'company', index)}
                                style={{ width: '100%', padding: '10px', marginBottom: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', color: 'var(--text-color)', borderRadius: '5px' }}
                            />
                            <input
                                placeholder="Duration"
                                value={exp.duration}
                                onChange={(e) => handleChange(e, 'experience', 'duration', index)}
                                style={{ width: '100%', padding: '10px', marginBottom: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', color: 'var(--text-color)', borderRadius: '5px' }}
                            />
                            <textarea
                                placeholder="Description"
                                value={exp.description}
                                onChange={(e) => handleChange(e, 'experience', 'description', index)}
                                style={{ width: '100%', padding: '10px', marginBottom: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', color: 'var(--text-color)', borderRadius: '5px' }}
                            />
                            <button onClick={() => removeItem('experience', null, index)} style={{ background: 'red', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>Remove Experience</button>
                        </div>
                    ))}
                    <button onClick={() => addItem('experience')} style={{ background: 'var(--primary-color)', color: '#000', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>+ Add Experience</button>
                </div>

                {/* Education Section */}
                <div className="glass-panel">
                    <h2 style={{ marginBottom: '15px', color: 'var(--primary-color)' }}>Education</h2>
                    {portfolio.education && portfolio.education.map((edu, index) => (
                        <div key={index} style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '10px', marginBottom: '15px' }}>
                            <input
                                placeholder="Degree"
                                value={edu.degree}
                                onChange={(e) => handleChange(e, 'education', 'degree', index)}
                                style={{ width: '100%', padding: '10px', marginBottom: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', color: 'var(--text-color)', borderRadius: '5px' }}
                            />
                            <input
                                placeholder="Institution"
                                value={edu.institution}
                                onChange={(e) => handleChange(e, 'education', 'institution', index)}
                                style={{ width: '100%', padding: '10px', marginBottom: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', color: 'var(--text-color)', borderRadius: '5px' }}
                            />
                            <input
                                placeholder="Duration"
                                value={edu.duration}
                                onChange={(e) => handleChange(e, 'education', 'duration', index)}
                                style={{ width: '100%', padding: '10px', marginBottom: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', color: 'var(--text-color)', borderRadius: '5px' }}
                            />
                            <input
                                placeholder="Marks/Grade"
                                value={edu.marks || ''}
                                onChange={(e) => handleChange(e, 'education', 'marks', index)}
                                style={{ width: '100%', padding: '10px', marginBottom: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', color: 'var(--text-color)', borderRadius: '5px' }}
                            />
                            <textarea
                                placeholder="Description"
                                value={edu.description}
                                onChange={(e) => handleChange(e, 'education', 'description', index)}
                                style={{ width: '100%', padding: '10px', marginBottom: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', color: 'var(--text-color)', borderRadius: '5px' }}
                            />
                            <button onClick={() => removeItem('education', null, index)} style={{ background: 'red', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>Remove Education</button>
                        </div>
                    ))}
                    <button onClick={() => addItem('education')} style={{ background: 'var(--primary-color)', color: '#000', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>+ Add Education</button>
                </div>

                {/* Certifications Section */}
                <div className="glass-panel">
                    <h2 style={{ marginBottom: '15px', color: 'var(--primary-color)' }}>Certifications</h2>
                    {portfolio.certifications.map((cert, index) => (
                        <div key={index} style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '10px', marginBottom: '15px' }}>
                            <input
                                placeholder="Certificate Name"
                                value={cert.title}
                                onChange={(e) => handleChange(e, 'certifications', 'title', index)}
                                style={{ width: '100%', padding: '10px', marginBottom: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', color: 'var(--text-color)', borderRadius: '5px' }}
                            />
                            <input
                                placeholder="Provider"
                                value={cert.subtitle}
                                onChange={(e) => handleChange(e, 'certifications', 'subtitle', index)}
                                style={{ width: '100%', padding: '10px', marginBottom: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', color: 'var(--text-color)', borderRadius: '5px' }}
                            />
                            <textarea
                                placeholder="Description"
                                value={cert.description}
                                onChange={(e) => handleChange(e, 'certifications', 'description', index)}
                                style={{ width: '100%', padding: '10px', marginBottom: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', color: 'var(--text-color)', borderRadius: '5px' }}
                            />
                            <button onClick={() => removeItem('certifications', null, index)} style={{ background: 'red', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>Remove Certification</button>
                        </div>
                    ))}
                    <button onClick={() => addItem('certifications')} style={{ background: 'var(--primary-color)', color: '#000', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>+ Add Certification</button>
                </div>

                {/* Socials Section */}
                <div className="glass-panel">
                    <h2 style={{ marginBottom: '15px', color: 'var(--primary-color)' }}>Social Links</h2>
                    {Object.keys(portfolio.socials).map((key) => (
                        <div key={key} style={{ marginBottom: '10px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', textTransform: 'capitalize' }}>{key}</label>
                            <input
                                value={portfolio.socials[key]}
                                onChange={(e) => handleChange(e, 'socials', key)}
                                style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', color: 'var(--text-color)', borderRadius: '5px' }}
                            />
                        </div>
                    ))}
                </div>

                <button onClick={handleSave} style={{ padding: '15px', background: 'var(--primary-color)', color: '#000', border: 'none', borderRadius: '5px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' }}>
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default AdminDashboard;
