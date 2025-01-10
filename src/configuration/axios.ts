// import axios from 'axios';

// // Retrieve user info from localStorage
// const data = localStorage.getItem('userInfo');
// export const user = data ? JSON.parse(data) : null;

// // Create an Axios instance
// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL, // Use your environment variable directly here
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add a request interceptor to include the token dynamically
// api.interceptors.request.use(
//   (config) => {
//     if (user?.token?.access) {
//       config.headers.Authorization = `Bearer ${user.token.access}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default api;



import axios from 'axios';

// Retrieve user info from localStorage
const data = localStorage.getItem('userInfo');
export const user = data ? JSON.parse(data) : null;

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Use your environment variable directly here
});


// Add a request interceptor to include the token dynamically
api.interceptors.request.use(
  (config) => {
    if (user?.token?.access) {
      config.headers.Authorization = `Bearer ${user.token.access}`;
    }
    
    // Check if payload is an image (for example, by checking for 'image' in the file type)
    if (config.data && config.data instanceof FormData) {
      // Check if any part of the FormData is an image (this assumes a file input in FormData)
      const isImage = Array.from(config.data.values()).some(file => file instanceof Blob && file.type.startsWith('image/'));
      
      if (isImage) {
        // Remove Content-Type header if image is in the payload
        delete config.headers['Content-Type'];
      } else {
        // Set Content-Type to application/json if the payload is not an image
        config.headers['Content-Type'] = 'application/json';
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

