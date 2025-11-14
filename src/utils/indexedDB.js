// IndexedDB utility for HealthConnect Rural application
const DB_NAME = 'HealthConnectRural';
const DB_VERSION = 1;
const USER_STORE = 'users';
const APPOINTMENT_STORE = 'appointments';
const REMINDER_STORE = 'reminders';
const HEALTH_RECORD_STORE = 'healthRecords';

let dbInstance = null;

// Open database connection
export const openDB = () => {
  return new Promise((resolve, reject) => {
    if (dbInstance) {
      resolve(dbInstance);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.error('Error opening IndexedDB:', request.error);
      reject(request.error);
    };

    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(dbInstance);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Create users store
      if (!db.objectStoreNames.contains(USER_STORE)) {
        const userStore = db.createObjectStore(USER_STORE, { keyPath: 'id' });
        userStore.createIndex('email', 'email', { unique: true });
        userStore.createIndex('role', 'role', { unique: false });
      }

      // Create appointments store
      if (!db.objectStoreNames.contains(APPOINTMENT_STORE)) {
        const appointmentStore = db.createObjectStore(APPOINTMENT_STORE, { keyPath: 'id', autoIncrement: true });
        appointmentStore.createIndex('userId', 'userId', { unique: false });
        appointmentStore.createIndex('doctorId', 'doctorId', { unique: false });
        appointmentStore.createIndex('date', 'date', { unique: false });
      }

      // Create reminders store
      if (!db.objectStoreNames.contains(REMINDER_STORE)) {
        const reminderStore = db.createObjectStore(REMINDER_STORE, { keyPath: 'id', autoIncrement: true });
        reminderStore.createIndex('userId', 'userId', { unique: false });
        reminderStore.createIndex('date', 'date', { unique: false });
        reminderStore.createIndex('type', 'type', { unique: false });
      }

      // Create health records store
      if (!db.objectStoreNames.contains(HEALTH_RECORD_STORE)) {
        const healthRecordStore = db.createObjectStore(HEALTH_RECORD_STORE, { keyPath: 'id', autoIncrement: true });
        healthRecordStore.createIndex('userId', 'userId', { unique: false });
        healthRecordStore.createIndex('date', 'date', { unique: false });
        healthRecordStore.createIndex('type', 'type', { unique: false });
      }
    };
  });
};

// Close database connection
export const closeDB = () => {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
  }
};

// User operations
export const saveUser = async (user) => {
  const db = await openDB();
  const transaction = db.transaction([USER_STORE], 'readwrite');
  const store = transaction.objectStore(USER_STORE);
  
  // Add timestamp
  const userWithTimestamp = {
    ...user,
    updatedAt: new Date().toISOString()
  };
  
  return new Promise((resolve, reject) => {
    const request = store.put(userWithTimestamp);
    request.onsuccess = () => resolve(userWithTimestamp);
    request.onerror = () => reject(request.error);
  });
};

export const getUser = async (userId) => {
  const db = await openDB();
  const transaction = db.transaction([USER_STORE], 'readonly');
  const store = transaction.objectStore(USER_STORE);
  
  return new Promise((resolve, reject) => {
    const request = store.get(userId);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const getUserByEmail = async (email) => {
  const db = await openDB();
  const transaction = db.transaction([USER_STORE], 'readonly');
  const store = transaction.objectStore(USER_STORE);
  const index = store.index('email');
  
  return new Promise((resolve, reject) => {
    const request = index.get(email);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Appointment operations
export const saveAppointment = async (appointment) => {
  const db = await openDB();
  const transaction = db.transaction([APPOINTMENT_STORE], 'readwrite');
  const store = transaction.objectStore(APPOINTMENT_STORE);
  
  const appointmentWithTimestamp = {
    ...appointment,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  return new Promise((resolve, reject) => {
    const request = store.add(appointmentWithTimestamp);
    request.onsuccess = () => resolve(appointmentWithTimestamp);
    request.onerror = () => reject(request.error);
  });
};

export const getAppointmentsByUser = async (userId) => {
  const db = await openDB();
  const transaction = db.transaction([APPOINTMENT_STORE], 'readonly');
  const store = transaction.objectStore(APPOINTMENT_STORE);
  const index = store.index('userId');
  
  return new Promise((resolve, reject) => {
    const request = index.getAll(userId);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Reminder operations
export const saveReminder = async (reminder) => {
  const db = await openDB();
  const transaction = db.transaction([REMINDER_STORE], 'readwrite');
  const store = transaction.objectStore(REMINDER_STORE);
  
  const reminderWithTimestamp = {
    ...reminder,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  return new Promise((resolve, reject) => {
    const request = store.add(reminderWithTimestamp);
    request.onsuccess = () => resolve(reminderWithTimestamp);
    request.onerror = () => reject(request.error);
  });
};

export const getRemindersByUser = async (userId) => {
  const db = await openDB();
  const transaction = db.transaction([REMINDER_STORE], 'readonly');
  const store = transaction.objectStore(REMINDER_STORE);
  const index = store.index('userId');
  
  return new Promise((resolve, reject) => {
    const request = index.getAll(userId);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const updateReminder = async (id, reminder) => {
  const db = await openDB();
  const transaction = db.transaction([REMINDER_STORE], 'readwrite');
  const store = transaction.objectStore(REMINDER_STORE);
  
  const reminderWithTimestamp = {
    ...reminder,
    updatedAt: new Date().toISOString()
  };
  
  return new Promise((resolve, reject) => {
    const request = store.put(reminderWithTimestamp);
    request.onsuccess = () => resolve(reminderWithTimestamp);
    request.onerror = () => reject(request.error);
  });
};

export const deleteReminder = async (id) => {
  const db = await openDB();
  const transaction = db.transaction([REMINDER_STORE], 'readwrite');
  const store = transaction.objectStore(REMINDER_STORE);
  
  return new Promise((resolve, reject) => {
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

// Health record operations
export const saveHealthRecord = async (record) => {
  const db = await openDB();
  const transaction = db.transaction([HEALTH_RECORD_STORE], 'readwrite');
  const store = transaction.objectStore(HEALTH_RECORD_STORE);
  
  const recordWithTimestamp = {
    ...record,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  return new Promise((resolve, reject) => {
    const request = store.add(recordWithTimestamp);
    request.onsuccess = () => resolve(recordWithTimestamp);
    request.onerror = () => reject(request.error);
  });
};

export const getHealthRecordsByUser = async (userId) => {
  const db = await openDB();
  const transaction = db.transaction([HEALTH_RECORD_STORE], 'readonly');
  const store = transaction.objectStore(HEALTH_RECORD_STORE);
  const index = store.index('userId');
  
  return new Promise((resolve, reject) => {
    const request = index.getAll(userId);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Clear all data (for testing purposes)
export const clearAllData = async () => {
  const db = await openDB();
  
  const stores = [USER_STORE, APPOINTMENT_STORE, REMINDER_STORE, HEALTH_RECORD_STORE];
  
  for (const storeName of stores) {
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    await new Promise((resolve, reject) => {
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
};

// Export database (for backup purposes)
export const exportData = async () => {
  const db = await openDB();
  const result = {};
  
  const stores = [USER_STORE, APPOINTMENT_STORE, REMINDER_STORE, HEALTH_RECORD_STORE];
  
  for (const storeName of stores) {
    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    result[storeName] = await new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  
  return result;
};

// Import database (for restore purposes)
export const importData = async (data) => {
  const db = await openDB();
  
  for (const [storeName, records] of Object.entries(data)) {
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    
    for (const record of records) {
      await new Promise((resolve, reject) => {
        const request = store.put(record);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    }
  }
};

export default {
  openDB,
  closeDB,
  saveUser,
  getUser,
  getUserByEmail,
  saveAppointment,
  getAppointmentsByUser,
  saveReminder,
  getRemindersByUser,
  updateReminder,
  deleteReminder,
  saveHealthRecord,
  getHealthRecordsByUser,
  clearAllData,
  exportData,
  importData
};