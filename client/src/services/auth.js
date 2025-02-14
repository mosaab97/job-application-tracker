import api from './server';

export const loginApi = async (credentials) => {
    const response = await api.post('/users/login', credentials);
    return response.data;
};

export const signup = async (userData) => {
    const response = await api.post('/users/signup', userData);
    return response.data;
};

// export const logout = async () => {
//     const response = await api.post('/users/logout');
//     return response.data;
// };