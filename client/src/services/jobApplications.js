import api from './server';

export const getAllJobs = async (id) => {
    const response = await api.get(`/jobs/all/${id}`);
    return response.data;
};
