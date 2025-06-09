
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api';

const apiFetch = async (url, options = {}) => {
  const token = localStorage.getItem('authToken');
  
  // Default headers
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
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
      credentials: 'include' // Important for sessions
    });

    // Handle unauthorized responses
    if (response.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login?session_expired=true';
      return Promise.reject(new Error('Session expired'));
    }
    if (response.status === 204) {
      return null;
    }
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(
        data?.error?.message || 
        data?.message || 
        'Request failed with status ' + response.status
      );
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

export const admissionAPI = {
  submit: (formData) => apiFetch('/admission', {
    method: 'POST',
    body: JSON.stringify(formData)
  }),
  
  getAll: () => apiFetch('/admission/admin/list'),
  
  delete: (id) => apiFetch(`/admission/admin/delete/${id}`, {
    method: 'DELETE'
  })
};

export default apiFetch;