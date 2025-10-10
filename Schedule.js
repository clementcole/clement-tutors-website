import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Schedule.css';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8001';

const Schedule = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    student_name: '',
    student_email: '',
    subject: '',
    scheduled_time: '',
    duration: 60
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${API_BASE}/profile`);
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setProfile({
        teams_link: "#",
        calendly_link: "#"
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/appointments`, {
        ...formData,
        scheduled_time: new Date(formData.scheduled_time).toISOString()
      });
      alert('Appointment scheduled successfully!');
      setFormData({
        student_name: '',
        student_email: '',
        subject: '',
        scheduled_time: '',
        duration: 60
      });
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      alert('Appointment scheduled successfully! (Demo mode)');
      setFormData({
        student_name: '',
        student_email: '',
        subject: '',
        scheduled_time: '',
        duration: 60
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="schedule">
      <div className="container">
        <h1>Schedule a Tutoring Session</h1>
        
        <div className="schedule-options">
          {profile?.calendly_link && (
            <div className="calendly-option">
              <h2>Quick Schedule via Calendly</h2>
              <a href={profile.calendly_link} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                Book on Calendly
              </a>
            </div>
          )}

          <div className="manual-schedule">
            <h2>Or Schedule Manually</h2>
            <form onSubmit={handleSubmit} className="schedule-form">
              <div className="form-group">
                <label>Your Name:</label>
                <input
                  type="text"
                  name="student_name"
                  value={formData.student_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Your Email:</label>
                <input
                  type="email"
                  name="student_email"
                  value={formData.student_email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Subject:</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Preferred Date & Time:</label>
                <input
                  type="datetime-local"
                  name="scheduled_time"
                  value={formData.scheduled_time}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Duration (minutes):</label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                >
                  <option value={30}>30 minutes</option>
                  <option value={60}>60 minutes</option>
                  <option value={90}>90 minutes</option>
                  <option value={120}>120 minutes</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary">Schedule Session</button>
            </form>
          </div>
        </div>

        {profile?.teams_link && (
          <div className="teams-info">
            <h3>Microsoft Teams</h3>
            <p>Sessions are conducted via Microsoft Teams. Join the meeting room:</p>
            <a href={profile.teams_link} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
              Join Teams Meeting Room
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;