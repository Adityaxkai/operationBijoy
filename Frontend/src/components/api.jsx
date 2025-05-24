
const baseURL = 'http://localhost:8081';

const apiFetch = async (url, options = {}) => {
  const token = localStorage.getItem('authToken');
  
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${baseURL}${url}`, {
      ...options,
      headers,
    });

    // Handle unauthorized (401) responses
    if (response.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
      return Promise.reject(new Error('Session expired'));
    }

    // Handle forbidden (403) responses - let the component handle it
    if (response.status === 403) {
      return Promise.reject(new Error('Admin access required'));
    }

    const data = await response.json();
    
    if (!response.ok) {
      return Promise.reject(data.message ? new Error(data.message) : data);
    }

    return data;
  } catch (error) {
    console.error('API call failed:', error);
    return Promise.reject(error);
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