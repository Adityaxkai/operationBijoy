import React, { useState, useEffect } from 'react';
import { Table, Button, Alert, Modal, Form } from 'react-bootstrap';
import apiFetch from './api';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    comment: '',
    date: '',
    image: null,
    imagePreview: '',
  });

  useEffect(() => {
    const fetchEvents = async () => {
        try {
            setLoading(true);
            const data = await apiFetch('/admin/events');
            
            // Ensure all events have the required properties
            const formattedEvents = data.map(event => ({
                id: event.id,
                title: event.title || '',
                comment: event.comment || '',
                date: event.date || new Date().toISOString(),
                image_path: event.image_path || null
            }));
            
            setEvents(formattedEvents);
            setError('');

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    fetchEvents();
}, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('comment', formData.comment);
    formDataToSend.append('date', formData.date);
    if (formData.image) {
        formDataToSend.append('image', formData.image);
    }

    try {
        const response = await fetch('http://localhost:8081/admin/events', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: formDataToSend
        });

        if (!response.ok) throw new Error('Failed to create event');
        
        const newEvent = await response.json();
        
        // Update the events state with the complete event data
        setEvents(prevEvents => [newEvent, ...prevEvents]);
        
        setShowModal(false);
        setFormData({
            title: '',
            comment: '',
            date: '',
            image: null,
            imagePreview: ''
        });
    } catch (err) {
        setError(err.message);
    }
};

  const handleDelete = async (id) => {
    try {
      await apiFetch(`/admin/events/${id}`, { method: 'DELETE' });
      setEvents(events.filter(event => event.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className='fs-2 fw-bolder'>Loading events...</div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <Button variant="primary" onClick={() => setShowModal(true)} >
          Add New Event
        </Button>
      </div>

      <Table striped bordered hover responsive className='table fs-4 fw-normal'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id}>
              <td>{event.title}</td>
              <td>{event.comment}</td>
              <td>
                    {event.date ? new Date(event.date).toLocaleDateString() : 'No date'}
              </td>
              <td>
                {event.image_path ? (
                    <img 
                        src={event.image_path.startsWith('http') 
                            ? event.image_path 
                            : `http://localhost:8081${event.image_path}`} 
                        alt="Event" 
                        style={{ width: '100px' }}
                        onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = '/placeholder-image.jpg'
                        }}
                    />
                    ) : (
                        <span>No Image</span>
                    )}
                </td>
              <td>
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => handleDelete(event.id)}
                  className='fs-4 fw-normal'
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Add New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Event Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className='fs-4 fw-normal'
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
                required
                className='fs-4 fw-normal'
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className='fs-4 fw-normal'
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className='fs-4 fw-normal'
              />
              {formData.imagePreview && (
                <img 
                  src={formData.imagePreview} 
                  alt="Preview" 
                  style={{ width: '100px', marginTop: '10px' }}
                />
              )}
            </Form.Group>
            <Button variant="primary" type="submit" className='fs-4 fw-normal'>
              Save Event
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AdminEvents;