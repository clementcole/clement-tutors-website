import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8001';

const Home = () => {
    const [profile, setProfile] = useState(null);
    const [subjects, setSubjects] = useState([]);

useEffect(() => {
    fetchProfile();
    fetchSubjects();
}, []);

const fetchProfile = async () => {
    try {
        const response = await axios.get(`${API_BASE}/profile`);
        setProfile(response.data);
    } catch (error) {
        console.error('Error fetching profile:', error);
        // Set default profile if API fails
        setProfile({
        name: "Clement",
        title: "Tutor",
        bio: "Experienced tutor specializing in various subjects. Contact me to schedule a session!",
        email: "clementacole75@gmail.com",
        phone: "+14696471640",
        teams_link: "#",
        calendly_link: "#"
        });
    }
};

const fetchSubjects = async () => {
    try {
        const response = await axios.get(`${API_BASE}/subjects`);
        setSubjects(response.data);
    } catch (error) {
        console.error('Error fetching subjects:', error);
      // Set default subjects if API fails
        setSubjects([
        { id: 1, name: "Mathematics", description: "Algebra, Calculus, Geometry", level: "All Levels", hourly_rate: 20 },
        { id: 2, name: "Science", description: "Physics, Chemistry, Biology", level: "High School", hourly_rate: 20 },
        { id: 3, name: "Programming", description: "Python, JavaScript, Web Development", level: "Beginner-Advanced", hourly_rate: 20 }
        ]);
    }
};

if (!profile) return <div className="loading">Loading...</div>;

return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <h1>{profile.name}</h1>
          <h2>{profile.title}</h2>
          <p className="bio">{profile.bio}</p>
          <div className="cta-buttons">
            <a href="/schedule" className="btn btn-primary">Schedule a Session</a>
            <a href={profile.teams_link} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
              Join Teams Meeting
            </a>
          </div>
        </div>
      </section>

      <section className="subjects">
        <div className="container">
          <h2>Subjects I Teach</h2>
          <div className="subjects-grid">
            {subjects.map(subject => (
              <div key={subject.id} className="subject-card">
                <h3>{subject.name}</h3>
                <p>{subject.description}</p>
                <div className="subject-meta">
                  <span className="level">{subject.level}</span>
                  {subject.hourly_rate && (
                    <span className="rate">${subject.hourly_rate}/hr</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="quick-contact">
        <div className="container">
          <h2>Get in Touch</h2>
          <div className="contact-info">
            <p>📧 {profile.email}</p>
            <p>📞 {profile.phone}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;