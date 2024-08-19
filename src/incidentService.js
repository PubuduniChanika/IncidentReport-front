import axios from 'axios';

const API_URL = 'http://localhost:8080/api/incidents';

export const getAllIncidents = () => {
    return axios.get(API_URL);
};

export const getIncidentById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const createIncident = (incident) => {
    return axios.post(API_URL, incident);
};

export const updateIncident = (id, incidentDetails) => {
    return axios.put(`${API_URL}/${id}`, incidentDetails);
};

export const deleteIncident = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};
