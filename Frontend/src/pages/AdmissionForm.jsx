import React, { useState } from 'react';
import './AdmissionForm.css';

function AdmissionForm() {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    address: '',
    aadhaar: '',
    location: '',
    institution: '',
    course: ''
  });

  const courses = [
    'Computer Basics',
    'Tally with GST',
    'Graphic Designing',
    'Spoken English',
    'Web Development',
    'Programming in Python'
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Admission submitted successfully!');
  };

  return (
    <div className="form-container">
      <h2>Student Admission Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="studentName" placeholder="Student's Full Name" required onChange={handleChange} />
        <input type="text" name="parentName" placeholder="Parent's Name" required onChange={handleChange} />
        <textarea name="address" placeholder="Address" required onChange={handleChange}></textarea>
        <input type="text" name="aadhaar" placeholder="Aadhaar Number" maxLength="12" required onChange={handleChange} />
        <input type="text" name="location" placeholder="Location" required onChange={handleChange} />
        <input type="text" name="institution" placeholder="School or College Name" required onChange={handleChange} />
        <select name="course" required onChange={handleChange}>
          <option value="">Select a Course</option>
          {courses.map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AdmissionForm;
