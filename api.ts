import axios, { AxiosError } from 'axios';

const API_URL = 'http://192.168.158.156:5000'; // Use your backend URL here

// Signup function
export const signupUser = async (username: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/signup`, {
      username,
      email,
      password,
    });
    return response.data; // Returns token and username on success
  } catch (error: unknown) {
    // Check if error is an instance of AxiosError
    if (axios.isAxiosError(error)) {
      // AxiosError has a response property
      throw error.response ? error.response.data : error.message;
    } else {
      // Handle unexpected errors
      throw (error as Error).message;
    }
  }
};

// Login function
export const loginUser = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });
      return response.data; // Returns token and username on success
    } catch (error: unknown) {
      // Check if error is an instance of AxiosError
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log('API Error Response:', error.response.data);
          throw error.response.data;  // Throw the response error data
        } else {
          console.log('API Error:', error.message);
          throw error.message;
        }
      } else {
        // Handle unexpected errors
        console.log('Unexpected Error:', (error as Error).message);
        throw (error as Error).message;
      }
    }
  };
  
