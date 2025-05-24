import React, { useState, useEffect } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import  apiFetch  from './api';
import 'bootstrap/dist/css/bootstrap.min.css';
const AdminContacts = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
        try {
            setLoading(true);
            const data = await apiFetch('/admin/contacts');
            if (data && Array.isArray(data)) {
                setMessages(data);
            } else {
                setError('Invalid data format received');
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError(err.message || 'Failed to load messages');
        } finally {
            setLoading(false);
        }
    };
    fetchMessages();
}, []);

  const handleDelete = async (id) => {
    try {
      await apiFetch(`/admin/contacts/${id}`, { method: 'DELETE' });
      setMessages(messages.filter(msg => msg.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading messages...</div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Table striped bordered hover responsive cellPadding={0} cellSpacing={0} className='table fs-4 fw-normal'>
      <thead>
        <tr>
          <th>S.No.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Message</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {messages.map((message, index) => (
          <tr key={message.id}>
            <td>{index + 1}</td>
            <td>{message.name}</td>
            <td>{message.email}</td>
            <td>{message.message}</td>
            <td>
              <Button 
                variant="danger"
                className="fs-4 fw-normal" 
                size="sm"
                onClick={() => handleDelete(message.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AdminContacts;