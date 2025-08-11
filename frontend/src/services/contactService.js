import axios from 'axios';

const API_URL = 'http://localhost:5000/api/contacts/';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    }
    return {};
};

const getContacts = () => {
    return axios.get(API_URL, getAuthHeaders());
};

const createContact = (contact) => {
    return axios.post(API_URL, contact, getAuthHeaders());
};

const getContact = (id) => {
    return axios.get(API_URL + id, getAuthHeaders());
};

const updateContact = (id, contact) => {
    return axios.put(API_URL + id, contact, getAuthHeaders());
};

const deleteContact = (id) => {
    return axios.delete(API_URL + id, getAuthHeaders());
};

const contactService = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
};

export default contactService;
