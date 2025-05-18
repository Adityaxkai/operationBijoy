import React, { useState } from 'react';
import './AdminPanel.css';
import { usePrograms } from '../context/ProgramContext'; // Import the context

export const AdminPanel = () => {
  const { addProgram, programs } = usePrograms(); // Use shared state
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    venue: '',
    details: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProgram(formData); // Use context function to add
    setFormData({ name: '', date: '', venue: '', details: '' });
  };

  return (
    <section className="admin-panel">
      <div className="admin-container">
        <h2 className="admin-title">🛠️ Admin Panel</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Program Name"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
          />
          <input
            type="text"
            name="venue"
            placeholder="Venue"
            required
            value={formData.venue}
            onChange={handleChange}
          />
          <textarea
            name="details"
            rows="4"
            placeholder="Program Details"
            required
            value={formData.details}
            onChange={handleChange}
          ></textarea>
          <button type="submit">Add Program</button>
        </form>

        <div className="program-list">
          <h3>Upcoming Programs</h3>
          {programs.length === 0 ? (
            <p>No programs added yet.</p>
          ) : (
            <ul>
              {programs.map((program, index) => (
                <li key={index}>
                  <strong>{program.name}</strong> on {program.date} at {program.venue}
                  <p>{program.details}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};
