const API_BASE = '/api';

async function fetchAPI(endpoint, options = {}) {
  const token = localStorage.getItem('adminToken');

  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, config);

    // Check if response has content before trying to parse JSON
    const text = await response.text();
    let data;
    try {
      data = text ? JSON.parse(text) : null;
    } catch (parseError) {
      console.error(`Failed to parse JSON response from ${endpoint}:`, text);
      throw new Error(`Server returned invalid response: ${response.status} ${response.statusText}`);
    }

    if (!response.ok) {
      throw new Error(data?.error || `Request failed: ${response.status} ${response.statusText}`);
    }

    return data || [];
  } catch (error) {
    // Import logger dynamically to avoid circular deps
    import('../utils/logger.js').then(({ logger }) => {
      logger.error(`API call failed: ${endpoint}`, error);
    });
    throw error;
  }
}

export const api = {
  getBookings: () => fetchAPI('/bookings').then(data => data || []),
  getAvailability: (date) => fetchAPI(`/bookings/availability?date=${date}`),
  createBooking: (data) => fetchAPI('/bookings', { method: 'POST', body: JSON.stringify(data) }),
  updateBooking: (id, data) => fetchAPI(`/bookings/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  cancelBooking: (id) => fetchAPI(`/bookings/${id}`, { method: 'DELETE' }),

  getCustomers: () => fetchAPI('/customers').then(data => data || []),
  getCustomer: (id) => fetchAPI(`/customers/${id}`),
  updateCustomer: (id, data) => fetchAPI(`/customers/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCustomer: (id) => fetchAPI(`/customers/${id}`, { method: 'DELETE' }),

  login: (email, password) => fetchAPI('/admin/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  registerAdmin: (data) => fetchAPI('/admin/register', { method: 'POST', body: JSON.stringify(data) }),
  getMe: () => fetchAPI('/admin/me'),

  getServices: () => fetchAPI('/services'),

  getContacts: () => fetchAPI('/contacts').then(data => data || []),
  createContact: (data) => fetchAPI('/contacts', { method: 'POST', body: JSON.stringify(data) }),
  deleteContact: (id) => fetchAPI(`/contacts/${id}`, { method: 'DELETE' }),

  getSettings: () => fetchAPI('/settings'),
  updateSettings: (data) => fetchAPI('/settings', { method: 'PUT', body: JSON.stringify(data) }),
};
