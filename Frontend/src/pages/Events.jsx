import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import "./Events.css";

export const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/events/public`);
        if (!response.ok) {
          if (response.status === 404 || response.status === 204) {
            setEvents([]);
            return;
          }
          throw new Error(`Server responded with ${response.status}`);
        }
        const data = await response.json();
        setEvents(Array.isArray(data)?data:[]);
        // console.log('Fetched events:', data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
        setEvents([]);
      }
    };

    const setupSSE = () => {
      const eventSource = new EventSource(`${import.meta.env.VITE_API_BASE_URL}/events/updates`);
      
      eventSource.onmessage = (e) => {
        try {
          const newData = JSON.parse(e.data);
          setEvents(prev => [...prev, ...newData]);
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

  if (error) {
    return <div className="error-message text-danger fs-4 fw-bold mt-5 p-5">Error loading events: {error}</div>;
  }

  return (
    <section className="events-section">
      <h2 className="events-title">🎉 Upcoming Events</h2>
      {events.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📅</div>
          <h3 className="empty-title">No Events Scheduled Yet</h3>
          <p className="empty-message">
            Check back later for an upcoming events.
          </p>
          {events.isAdmin && (
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/admin/events/create')}
            >
              Create Your First Event
            </button>
          )}
        </div>
      ) : (
        <div className="events-grid">
          {events.map((event, index) => (
            <div className="event-card" key={index}>
              <div className="event-image-container">
                <img 
                      src={event.image_path.startsWith('http') 
                        ? event.image_path 
                        : `${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${event.image_path}`} 
                        alt={event.title}    
                    onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = '/placeholder-image.jpg'
                    }}
                    className="event-image"
                  />
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
                <button className="register-btn" onClick={()=>navigate('/register')}>Register</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};