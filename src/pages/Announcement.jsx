import React, { useState } from 'react';
import './Announcement.css';

const Announcement = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    venue: '',
    date: '',
    time: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Event Submitted:', formData);
    alert('Event announcement submitted successfully!');
    // Optionally reset the form
    setFormData({
      eventName: '',
      venue: '',
      date: '',
      time: '',
      description: '',
    });
  };

  return (
    <div className="announcement-page">
      <h2 className="announcement-title">Create Upcoming Event</h2>
      <form className="announcement-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Event Name</label>
          <input
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Venue</label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            required
          />
        </div>

        <button type="submit" className="submit-btn">Submit Announcement</button>
      </form>
    </div>
  );
};

export default Announcement;
