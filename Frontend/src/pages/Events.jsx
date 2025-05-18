import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import { usePrograms } from "../context/ProgramContext"; // Import context
import "./Events.css";

export const Events = () => {
  const [apiEvents, setApiEvents] = useState([]);
  const [error, setError] = useState(null);
  const { programs } = usePrograms(); // ✅ Programs from Admin Panel
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8081/users');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setApiEvents(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      }
    };

    const setupSSE = () => {
      const eventSource = new EventSource('http://localhost:8081/updates');
      eventSource.onmessage = (e) => {
        try {
          const newData = JSON.parse(e.data);
          setApiEvents(prev => [...prev, ...newData]);
        } catch (err) {
          console.error('SSE parsing error:', err);
        }
      };
      eventSource.onerror = () => {
        console.error('SSE connection error');
        eventSource.close();
      };
      return eventSource;
    };

    fetchData();
    const eventSource = setupSSE();
    return () => {
      eventSource.close();
    };
  }, []);

  // ✅ Combine API events with Admin-added programs
  const combinedEvents = [
    ...apiEvents.map(event => ({
      title: event.title,
      date: event.date,
      comment: event.comment,
      image_path: event.image_path
    })),
    ...programs.map(program => ({
      title: program.name,
      date: program.date,
      comment: program.details,
      image_path: null
    }))
  ];

  if (error) {
    return <div className="error-message">Error loading events: {error}</div>;
  }

  return (
    <section className="events-section">
      <h2 className="events-title">🎉 Upcoming Events</h2>
<<<<<<< HEAD
      {events.length === 0 ? (
        <div className="loading-message fs-1 fw-bolder">Loading events...</div>
=======
      {combinedEvents.length === 0 ? (
        <div className="loading-message">Loading events...</div>
>>>>>>> be8619c (AdminpanlAdd)
      ) : (
        <div className="events-grid">
          {combinedEvents.map((event, index) => (
            <div className="event-card" key={index}>
              <div className="event-image-container">
<<<<<<< HEAD
                <img 
                    src={event.image_path.startsWith('http') 
                        ? event.image_path 
                        : `http://localhost:8081${event.image_path}`} 
                        alt={event.title}
                    onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = '/placeholder-image.jpg'
                    }}
                    className="event-image"
                  />
=======
                <img
                  src={event.image_path || 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e'}
                  alt={event.title}
                  className="event-image"
                />
>>>>>>> be8619c (AdminpanlAdd)
              </div>
              <div className="event-date-badge">
                <FaCalendarAlt className="calendar-icon" />
                {new Date(event.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
              <div className="event-content">
                <h3>{event.title}</h3>
                <p>{event.comment}</p>
                <button className="register-btn" onClick={() => navigate('/register')}>Register</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
