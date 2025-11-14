// Authentication utility functions

export const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

export const login = () => {
  localStorage.setItem('isAuthenticated', 'true');
  // Dispatch custom event to notify auth status change
  window.dispatchEvent(new Event('authChange'));
};

export const logout = () => {
  localStorage.removeItem('isAuthenticated');
  // Dispatch custom event to notify auth status change
  window.dispatchEvent(new Event('authChange'));
  // Redirect to home page or login page
  window.location.href = '/';
};

export const getUserProfile = () => {
  // In a real app, this would fetch user data from an API
  return {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Patient',
    avatar: null
  };
};

export const updateUserProfile = (profileData) => {
  // In a real app, this would send updated profile data to an API
  console.log('Updating user profile:', profileData);
  return true;
};