import React, { useState } from "react";
import "./Events.css";
import { FaCalendarAlt } from "react-icons/fa";

export const Events = () => {
  const [showFormIndex, setShowFormIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    department: "",
    year: "",
    notes: "",
  });

  const events = [
    {
      title: "Summer Tournament 2025",
      description: "Join us for our summer tournament with exciting prizes!",
      date: "June 15–20, 2025",
    },
    {
      title: "Winter Tournament 2025",
      description: "Join us for our winter tournament with exciting prizes!",
      date: "December 10–15, 2025",
    },
    {
      title: "Annual Tournament 2025",
      description: "Join us for our annual tournament with exciting prizes!",
      date: "September 15–20, 2025",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Student Registered:", formData);
    alert("Registration submitted!");
    setShowFormIndex(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      college: "",
      department: "",
      year: "",
      notes: "",
    });
  };

  return (
    <section className="events-section">
      <h2 className="events-title">🎉 Upcoming Events</h2>
      <div className="events-grid">
        {events.map((event, index) => (
          <div className="event-card" key={index}>
            <div className="event-date-badge">
              <FaCalendarAlt className="calendar-icon" />
              {event.date}
            </div>
            <div className="event-content">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <button
                className="register-btn"
                onClick={() =>
                  setShowFormIndex(showFormIndex === index ? null : index)
                }
              >
                {showFormIndex === index ? "Close" : "Register"}
              </button>

              {showFormIndex === index && (
                <form className="registration-form" onSubmit={handleSubmit}>
                  <h4>Register for {event.title}</h4>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="college"
                    placeholder="College/University"
                    value={formData.college}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={formData.department}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="year"
                    placeholder="Year/Semester"
                    value={formData.year}
                    onChange={handleInputChange}
                  />
                  <textarea
                    name="notes"
                    placeholder="Any notes?"
                    value={formData.notes}
                    onChange={handleInputChange}
                  />
                  <button type="submit">Submit</button>
                </form>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
