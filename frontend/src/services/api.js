import axios from "axios";

const API = axios.create({
  baseURL: "/api",
});

// Add a request interceptor to include the auth token
API.interceptors.request.use((config) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo && userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return config;
});

export const login = (email, password) => API.post("/auth/login", { email, password });
export const register = (userData) => API.post("/auth/register", userData);

export const fetchPosts = () => API.get("/posts");
export const createPost = (postData) => API.post("/posts", postData);
export const updatePost = (id, postData) => API.put(`/posts/${id}`, postData);
export const deletePost = (id) => API.delete(`/posts/${id}`);

// Mood APIs
export const fetchMoods = () => API.get("/mood");
export const addMood = (moodData) => API.post("/mood", moodData);

// Assessment APIs
export const fetchAssessments = () => API.get("/assessments");
export const saveAssessment = (data) => API.post("/assessments", data);

// Appointment APIs
export const fetchAppointments = () => API.get("/appointments");
export const bookAppointment = (data) => API.post("/appointments", data);
export const updateAppointmentStatus = (id, status) => API.put(`/appointments/${id}`, { status });
export const fetchCounselors = () => API.get("/users/counselors");

// Resource APIs
export const fetchResources = () => API.get("/resources");
export const addResource = (data) => API.post("/resources", data);
export const deleteResource = (id) => API.delete(`/resources/${id}`);

export default API;
