// ============================================================
// BIKE BAZAAR PATNA - PHP & MYSQL BACKEND INTEGRATION SERVICE
// ============================================================

// Base API URLs to attempt connecting to XAMPP PHP backend
export const PRIMARY_API_URL = 'http://localhost/api';
export const SECONDARY_API_URL = 'http://127.0.0.1/api';

/**
 * Helper method to perform HTTP requests with automatic IP/Port fallback & localStorage sync
 */
async function fetchAPI(endpoint, options = {}) {
  const candidateBases = [
    'http://localhost/api',
    'http://127.0.0.1/api',
    'http://localhost:8080/api',
    'http://127.0.0.1:8080/api',
    'http://localhost:8000/api',
    'http://localhost/bike-bazaar/api',
    'http://localhost:8080/bike-bazaar/api',
    '/api'
  ];

  for (const base of candidateBases) {
    const url = `${base}/${endpoint}`;
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`%c[PHP Backend Connected] (${url})`, 'color: #10b981; font-weight: bold;', data);
        return data;
      }
    } catch {
      // Try next candidate URL silently
    }
  }

  console.warn(`[Backend Notice] Apache Server offline or not started in XAMPP. Using local persistence mode.`);
  return null;
}

// ------------------------------------------------------------
// 1. VEHICLE INVENTORY API
// ------------------------------------------------------------
export const bikesAPI = {
  getAll: async () => {
    const res = await fetchAPI('bikes.php', { method: 'GET' });
    return res && res.success ? res.data : null;
  },

  add: async (bikeData) => {
    const res = await fetchAPI('bikes.php', {
      method: 'POST',
      body: JSON.stringify(bikeData)
    });
    return res;
  },

  update: async (bikeData) => {
    const res = await fetchAPI('bikes.php', {
      method: 'PUT',
      body: JSON.stringify(bikeData)
    });
    return res;
  },

  delete: async (id) => {
    const res = await fetchAPI(`bikes.php?id=${id}`, { method: 'DELETE' });
    return res;
  }
};

// ------------------------------------------------------------
// 2. TEST DRIVE BOOKINGS API
// ------------------------------------------------------------
export const testDrivesAPI = {
  getAll: async () => {
    const res = await fetchAPI('test_drives.php', { method: 'GET' });
    return res && res.success ? res.data : null;
  },

  add: async (tdData) => {
    const res = await fetchAPI('test_drives.php', {
      method: 'POST',
      body: JSON.stringify(tdData)
    });
    return res;
  },

  updateStatus: async (id, status) => {
    const res = await fetchAPI('test_drives.php', {
      method: 'PUT',
      body: JSON.stringify({ id, status })
    });
    return res;
  },

  delete: async (id) => {
    const res = await fetchAPI(`test_drives.php?id=${id}`, { method: 'DELETE' });
    return res;
  }
};

// ------------------------------------------------------------
// 3. SELL & VALUATION LEADS API
// ------------------------------------------------------------
export const sellLeadsAPI = {
  getAll: async () => {
    const res = await fetchAPI('sell_leads.php', { method: 'GET' });
    return res && res.success ? res.data : null;
  },

  add: async (sellData) => {
    const res = await fetchAPI('sell_leads.php', {
      method: 'POST',
      body: JSON.stringify(sellData)
    });
    return res;
  },

  updateStatus: async (id, status) => {
    const res = await fetchAPI('sell_leads.php', {
      method: 'PUT',
      body: JSON.stringify({ id, status })
    });
    return res;
  },

  delete: async (id) => {
    const res = await fetchAPI(`sell_leads.php?id=${id}`, { method: 'DELETE' });
    return res;
  }
};

// ------------------------------------------------------------
// 4. CUSTOMER CONTACT MESSAGES API
// ------------------------------------------------------------
export const contactLeadsAPI = {
  getAll: async () => {
    const res = await fetchAPI('contact_inquiries.php', { method: 'GET' });
    return res && res.success ? res.data : null;
  },

  add: async (contactData) => {
    const res = await fetchAPI('contact_inquiries.php', {
      method: 'POST',
      body: JSON.stringify(contactData)
    });
    return res;
  },

  updateStatus: async (id, status) => {
    const res = await fetchAPI('contact_inquiries.php', {
      method: 'PUT',
      body: JSON.stringify({ id, status })
    });
    return res;
  },

  delete: async (id) => {
    const res = await fetchAPI(`contact_inquiries.php?id=${id}`, { method: 'DELETE' });
    return res;
  }
};

// ------------------------------------------------------------
// 5. OWNER AUTHENTICATION API
// ------------------------------------------------------------
export const adminAuthAPI = {
  login: async (email, password) => {
    const res = await fetchAPI('admin_auth.php', {
      method: 'POST',
      body: JSON.stringify({ action: 'login', email, password })
    });
    return res;
  },

  updatePassword: async (email, oldPassword, newPassword) => {
    const res = await fetchAPI('admin_auth.php', {
      method: 'POST',
      body: JSON.stringify({ action: 'update_password', email, oldPassword, newPassword })
    });
    return res;
  }
};
