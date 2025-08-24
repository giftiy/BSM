// Mock API functions for now to ensure the file can be loaded.

// Simulates a user registration API call
export const register = async (userData) => {
  console.log('Registering user:', userData);
  // Pretend we are talking to a server for 1 second
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Return a fake token
  return { token: 'fake-jwt-token-for-registration' };
};

// Simulates a user login API call
export const login = async (credentials) => {
  console.log('Logging in with:', credentials);
  // Pretend we are talking to a server for 1 second
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Return a fake token
  return { token: 'fake-jwt-token-for-login' };
};