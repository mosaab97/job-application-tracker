import api from './server';

export const getAllJobs = async (id) => {
  const response = await api.get(`/jobs/all/${id}`);
  return response.data;
};

export const createJob = async (jobData) => {
  const response = await api.post('/jobs', jobData);
  return response.data;
};

export const updateJob = async (id, jobData) => {
  const response = await api.put(`/jobs/${id}`, jobData);
  return response.data;
};

export const deleteJob = async (id) => {
  await api.delete(`/jobs/${id}`);
};