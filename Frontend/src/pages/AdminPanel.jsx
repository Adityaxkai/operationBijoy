import React, { useState } from 'react';
import { usePrograms } from '../context/ProgramContext';
import './AdminPanel.css';
import { Button, Card, Form, Row, Col } from 'react-bootstrap';

export const AdminPanel = () => {
  const { addProgram, deleteProgram, programs } = usePrograms();
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
    addProgram(formData);
    setFormData({ name: '', date: '', venue: '', details: '' });
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this program?")) {
      deleteProgram(index);
    }
  };

  return (
    <section className="py-5 bg-light min-vh-100">
      <div className="container">
        <h2 className="text-center mb-5 fw-bold text-primary display-5">
          🛠️ Admin Control Panel
        </h2>

        {/* Enhanced Form Card */}
        <Card className="p-5 shadow-lg mb-5 border-0 bg-white">
          <h4 className="mb-4 text-primary">➕ Create a New Program</h4>
          <Form onSubmit={handleSubmit}>
            <Row className="g-4">
              <Col md={6}>
                <Form.Group controlId="programName">
                  <Form.Label className="fw-semibold">Program Name</Form.Label>
                  <Form.Control
                    size="lg"
                    type="text"
                    name="name"
                    placeholder="Enter program name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="programDate">
                  <Form.Label className="fw-semibold">Date</Form.Label>
                  <Form.Control
                    size="lg"
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="programVenue">
                  <Form.Label className="fw-semibold">Venue</Form.Label>
                  <Form.Control
                    size="lg"
                    type="text"
                    name="venue"
                    placeholder="Enter venue"
                    required
                    value={formData.venue}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group controlId="programDetails">
                  <Form.Label className="fw-semibold">Program Details</Form.Label>
                  <Form.Control
                    size="lg"
                    as="textarea"
                    rows={5}
                    name="details"
                    placeholder="Describe the program in detail..."
                    required
                    value={formData.details}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={12} className="text-end">
                <Button type="submit" variant="primary" size="lg" className="px-5">
                  Add Program
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>

        {/* Program List */}
        <h4 className="mb-4 text-dark">📅 Upcoming Programs</h4>
        {programs.length === 0 ? (
          <p className="text-muted">No programs added yet.</p>
        ) : (
          <Row className="g-4">
            {programs.map((program, index) => (
              <Col md={6} lg={4} key={index}>
                <Card className="shadow-sm h-100 border-0">
                  <Card.Body>
                    <Card.Title className="text-primary fs-5 fw-semibold">{program.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {program.date} • {program.venue}
                    </Card.Subtitle>
                    <Card.Text>{program.details}</Card.Text>
                    <div className="text-end">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </section>
  );
};
