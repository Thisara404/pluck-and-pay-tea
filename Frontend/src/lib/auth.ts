import axios from 'axios';

// Define API URL with your backend server address
const API_URL = 'http://localhost:5000/api';

// Main authentication service
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { 
      email, 
      password 
    });

    if (response.data && response.data.token) {
      // Store token and user data in localStorage
      localStorage.setItem('token', response.data.token);
      
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return true;
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (error: any) {
    // Handle various error scenarios
    console.error('Login error:', error.response?.data || error);
    
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.response?.data?.msg) {
      throw new Error(error.response.data.msg);
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error('Login failed. Please try again.');
    }
  }
};

export const register = async (userData: any) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error: any) {
    console.error('Registration error:', error.response?.data || error);
    
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.response?.data?.msg) {
      throw new Error(error.response.data.msg);
    } else {
      throw new Error('Registration failed. Please try again.');
    }
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  if (!user) return null;
  
  try {
    return JSON.parse(user);
  } catch (error) {
    return null;
  }
};

// Add axios interceptor for authorization headers
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);