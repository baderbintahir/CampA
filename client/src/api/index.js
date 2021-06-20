import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

// Posts
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

// Users
export const login = (formData) => API.post('/users/login', formData);
export const fetchUsers = () => API.get('/users');
export const createUser = (newUser) => API.post('/users', newUser);
export const updateUser = (id, updatedUser) => API.patch(`/users/${id}`, updatedUser);
export const deleteUser = (id) => API.delete(`/users/${id}`);

// Societies
export const fetchSocieties = () => API.get('/societies');
export const createSociety = (newSociety) => API.post('/societies', newSociety);
export const updateSociety = (id, updatedSociety) => API.patch(`/societies/${id}`, updatedSociety);
export const deleteSociety = (id) => API.delete(`/societies/${id}`);