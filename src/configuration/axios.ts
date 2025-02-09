import axios from "axios";

const data = localStorage.getItem('userInfo');
export const user = data ? JSON.parse(data) : null;

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Use your environment variable directly here
});

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const response = await api.post('/auth/refresh', { refresh: user.token.refresh });
    console.log("refresh token", response.data);
    
    return response.data.access;
  } catch (error) {
    console.error('Refresh token failed:', error);
    throw error;
  }
};

// Add a request interceptor to include the token dynamically
api.interceptors.request.use(
  async (config) => {
    if (user?.token?.access) {
      config.headers.Authorization = `Bearer ${user.token.access}`;
    }
    
    // Check if payload is an image
    if (config.data && config.data instanceof FormData) {
      const isImage = Array.from(config.data.values()).some(
        (file) => file instanceof Blob && file.type.startsWith('image/')
      );

      if (isImage) {
        delete config.headers['Content-Type'];
      } else {
        config.headers['Content-Type'] = 'application/json';
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle token expiration and refresh
api.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;

    // If the error is due to an expired token and we haven't retried yet
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        localStorage.clear();
        const newAccessToken = await refreshAccessToken();
        user.token.access = newAccessToken; // Update the stored token
        localStorage.setItem('userInfo',newAccessToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
