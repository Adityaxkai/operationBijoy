// src/api.js
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api';

const apiFetch = async (url, options = {}) => {
  const token = localStorage.getItem('authToken');
  
  // Default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  // Add auth token if available
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Handle FormData differently
  if (options.body instanceof FormData) {
    delete headers['Content-Type']; // Let browser set it
  }

  try {
    const response = await fetch(`${baseURL}${url}`, {
      ...options,
      headers,
      credentials: 'include' // Important for cookies/sessions
    });

    // Handle unauthorized responses
    if (response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
      return;
    }

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || data.message || 'Request failed');
    }

    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};


// Add specialized admin fetch if needed
export const adminFetch = async (url, options = {}) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user?.is_admin) {
    window.location.href = '/login';
    return Promise.reject(new Error('Admin access required'));
  }
  return apiFetch(`/admin${url}`, options);
};

export default apiFetch;