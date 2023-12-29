import axios from 'axios';

import { FormDataProp as AuthFormData, EditData as AuthEditData } from '../interfaces/auth';
import { FormDataProp as EventFormData, BookData as EventBookData } from '../interfaces/event';
import { FormDataProp as PlaceFormData } from '../interfaces/place';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req: any) => {
    const token = localStorage.getItem('HappenifyToken');
    if (token) {
        req.headers.authorization = `Bearer ${token}`;
    }
    return req;
});

export const signup = (formData: AuthFormData) => API.post('/users/signup', formData);
export const login = (formData: AuthFormData) => API.post('/users/login', formData);
export const loginWithToken = () => API.post('/users/login-with-token');
export const getUserById = (id: string) => API.get(`/users/${id}`);
export const followUser = (id: string) => API.post(`/users/follow/${id}`);
export const unfollowUser = (id: string) => API.post(`/users/unfollow/${id}`);
export const updateProfile = (formData: AuthEditData) => API.patch('/users/update', formData);

export const createEvent = (formData: EventFormData) => API.post('/events', formData);
export const getTrendingEvents = (page: number, limit: number) => API.get(`/events?page=${page}&limit=${limit}`);
export const getUserEvents = (page: number, limit: number) => API.get(`/events/user?page=${page}&limit=${limit}`);
export const getEventById = (id: string) => API.get(`/events/${id}`);
export const searchTrendingEvents = (searchType: string, value: string, page: number, limit: number) => API.get(`/events/search/trending?${searchType}=${value}&page=${page}&limit=${limit}`);
export const searchUserEvents = (searchType: string, value: string, page: number, limit: number) => API.get(`/events/search/user?${searchType}=${value}&page=${page}&limit=${limit}`);
export const updateEvent = (id: string, formData: EventFormData) => API.patch(`/events/${id}`, formData);
export const deleteEvent = (id: string) => API.delete(`/events/${id}`);
export const bookEntry = (id: string, formData: EventBookData) => API.post(`/events/book-entry/${id}`, formData);

export const createPlace = (formData: PlaceFormData) => API.post('/places', formData);
export const getTrendingPlaces = (page: number, limit: number) => API.get(`/places?page=${page}&limit=${limit}`);
export const getUserPlaces = (page: number, limit: number) => API.get(`/places/user?page=${page}&limit=${limit}`);
export const getPlaceById = (id: string) => API.get(`/places/${id}`);
export const searchTrendingPlaces = (searchType: string, value: string, page: number, limit: number) => API.get(`/places/search/trending?${searchType}=${value}&page=${page}&limit=${limit}`);
export const searchUserPlaces = (searchType: string, value: string, page: number, limit: number) => API.get(`/places/search/user?${searchType}=${value}&page=${page}&limit=${limit}`);
export const updatePlace = (id: string, formData: PlaceFormData) => API.patch(`/places/${id}`, formData);
export const deletePlace = (id: string) => API.delete(`/places/${id}`);