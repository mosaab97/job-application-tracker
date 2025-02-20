import { createContext, useContext, useState } from 'react';
import { getAllJobs, createJob, updateJob, deleteJob } from '../services/jobApplications';

const JobContext = createContext();

export const JobsProvider = ({ children }) => {
  const [jobApplications, setJobApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllApplications = async (id) => {
    setLoading(true);
    try {
      const res = await getAllJobs(id);
      setJobApplications(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createApplication = async (jobData) => {
    setLoading(true)
    try {
      setError(null);
      const newJob = await createJob(jobData);
      setJobApplications(prev => [...prev, newJob]);
      return newJob;
    } catch (err) {
      console.log(err)
      setError(err.response?.data?.message || 'Failed to create application');
      return null
      // throw err;
    } finally {
      setLoading(false)
    }
  };

  const updateApplication = async (id, updates) => {
    setLoading(true)
    try {
      const updatedJob = await updateJob(id, updates);
      setJobApplications(prev => 
        prev.map(job => job.id === id ? updatedJob : job)
      );
      return updateJob
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false)
    }
  };

  const deleteApplication = async (id) => {
    setLoading(true)
    try {
      await deleteJob(id);
      setJobApplications(prev => prev.filter(job => job.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false)
    }
  };

  return (
    <JobContext.Provider value={{ 
      jobsLoading: loading,
      jobApplications,
      error,
      getAllApplications,
      createApplication,
      updateApplication,
      deleteApplication
    }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => useContext(JobContext);