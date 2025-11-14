import { openDB, saveUser, getUser, getUserByEmail } from './indexedDB';

// Authentication utility functions

// Initialize database
openDB().catch(err => {
  console.error('Failed to initialize IndexedDB:', err);
});

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

export const getUserProfile = async () => {
  // In a real app, this would fetch user data from IndexedDB
  const savedUser = localStorage.getItem('currentUser');
  if (savedUser) {
    return JSON.parse(savedUser);
  }
  
  // Default user data
  return {
    id: 'default-user',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Patient',
    avatar: null
  };
};

export const updateUserProfile = async (profileData) => {
  // In a real app, this would send updated profile data to IndexedDB
  localStorage.setItem('currentUser', JSON.stringify(profileData));
  console.log('Updating user profile:', profileData);
  return true;
};

// New functions for IndexedDB integration
export const saveUserProfile = async (userData) => {
  try {
    const user = await saveUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  } catch (error) {
    console.error('Error saving user profile:', error);
    throw error;
  }
};

export const loadUserProfile = async (userId) => {
  try {
    const user = await getUser(userId);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    return user;
  } catch (error) {
    console.error('Error loading user profile:', error);
    // Fallback to localStorage
    return getUserProfile();
  }
};

export const findUserByEmail = async (email) => {
  try {
    return await getUserByEmail(email);
  } catch (error) {
    console.error('Error finding user by email:', error);
    return null;
  }
};