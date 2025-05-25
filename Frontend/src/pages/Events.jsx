import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import { usePrograms } from "../context/ProgramContext";
import "./Events.css";

export const Events = () => {
  const [apiEvents, setApiEvents] = useState([]);
  const [error, setError] = useState(null);
  const { programs } = usePrograms(); // Programs from AdminPanel context
  const navigate = useNavigate();

  // Fetch events from API and listen to server-sent updates
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:8081/users');
        if (!res.ok) throw new Error('Failed to fetch events');
        const data = await res.json();
        setApiEvents(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      }
    };

    const setupSSE = () => {
      const source = new EventSource('http://localhost:8081/updates');
      source.onmessage = (e) => {
        try {
          const newData = JSON.parse(e.data);
          setApiEvents(prev => [...prev, ...newData]);
        } catch (err) {
          console.error('SSE parse error:', err);
        }
      };
      source.onerror = () => {
        console.error('SSE connection error');
        source.close();
      };
      return source;
    };

    fetchData();
    const sse = setupSSE();
    return () => sse.close();
  }, []);

  // Merge API + AdminPanel events
  const combinedEvents = [
    ...apiEvents.map(event => ({
      title: event.title || "Untitled Event",
      date: event.date,
      comment: event.comment || "",
      image_path: event.image_path || null,
    })),
    ...programs.map(program => ({
      title: program.name || "Untitled Program",
      date: program.date,
      comment: program.details || "",
      image_path: null,
    })),
  ];

  if (error) {
    return <div className="error-message">Error loading events: {error}</div>;
  }

  return (
    <section className="events-section">
      <h2 className="events-title">🎉 Upcoming Events</h2>

      {combinedEvents.length === 0 ? (
        <div className="loading-message">Loading events...</div>
>>>>>>> be8619c (AdminpanlAdd)
      ) : (
        <div className="events-grid">
          {combinedEvents.map((event, index) => (
            <div className="event-card" key={index}>
              <div className="event-image-container">
                <img
                  src={event.image_path || "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e"}
                  alt={event.title}
                  className="event-image"
                />
>>>>>>> be8619c (AdminpanlAdd)
              </div>
              <div className="event-date-badge">
                <FaCalendarAlt className="calendar-icon" />
                {event.date
                  ? new Date(event.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "Date TBA"}
              </div>
              <div className="event-content">
                <h3>{event.title}</h3>
                <p>{event.comment}</p>
                <button className="register-btn" onClick={() => navigate("/register")}>
                  Register
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
