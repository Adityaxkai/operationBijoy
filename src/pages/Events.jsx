import React from "react";
import "./Events.css";
import { FaCalendarAlt } from "react-icons/fa";

export const Events = () => {
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
              <button className="register-btn">Register</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
