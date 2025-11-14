import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

let token = null;

export function setToken(t) { token = t; }

const client = axios.create({ baseURL: API_BASE });

client.interceptors.request.use(cfg => {
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// auth
export const register = (payload) => client.post('/auth/register', payload);
export const login = (payload) => client.post('/auth/login', payload);

// patients
export const getPatients = () => client.get('/patients');
export const createPatient = (data) => client.post('/patients', data);

// encounters
export const createEncounter = (data) => client.post('/encounters', data);

// AI
export const symptomCheck = (text) => client.post('/ai/symptom-check', { text });
export const imageAnalysis = (imageBase64) => client.post('/ai/image-analysis', { imageBase64 });

export default client;
