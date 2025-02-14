import { createContext, useContext, useState } from 'react';
import { getAllJobs } from '../services/jobApplications';

const JobContext = createContext();

export const JobsProvider = ({ children }) => {

  const [jobApplications, setJobApplications] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const getAllApplications = async (id) => {
    setLoading(true)
    const res = await getAllJobs(id);
    setJobApplications(res)
    setLoading(false)
  }
  return (
    <JobContext.Provider value={{ jobsLoading: loading, jobApplications, getAllApplications }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => useContext(JobContext);