
const { getAllJobApplications, getJobApplicationById, updateJobApplication, createJobApplication, deleteJobApplication } = require("../models/jobApplicationModel");
const { findUserById } = require("../models/userModel");


const getAllJobs = async (req, res) => {
    try {
        const { id } = req.params;
        if(id) {
            const user = await findUserById(id);
            if(user) {
                const jobapplications = await getAllJobApplications(id);
                return res.status(200).json(jobapplications); 
            }
            return res.status(404).json({msg: "user not found"}) ;
        }
        return res.status(500).json({msg: "somthing went wrong"})
    } catch(e) {
        return res.status(500).json({msg: "somthing went wrong"})
    }
}

const updateJob = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const userId = req.user.id; 
  
      if(id && updates) {
        const job = await getJobApplicationById(id);
        if(!job || job.user_id !== userId) {
          return res.status(404).json({ msg: "Job application not found" });
        }
  
        const updatedJob = await updateJobApplication(id, updates);
        return res.status(200).json(updatedJob);
      }
      return res.status(400).json({ msg: "Invalid request" });
    } catch(e) {
      console.log(e)
      return res.status(500).json({ msg: "Something went wrong" });
    }
  }
  
  const deleteJob = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
  
      if(id) {
        const job = await getJobApplicationById(id);
        if(!job || job.user_id !== userId) {
          return res.status(404).json({ msg: "Job application not found" });
        }
        await deleteJobApplication(id);
        return res.status(200).json({ msg: "Job application deleted" });
      }
      return res.status(400).json({ msg: "Invalid request" });
    } catch(e) {
      return res.status(500).json({ msg: "Something went wrong" });
    }
  }

  const createJob = async (req, res) => {
    try {
        const userId = req.user.id; // From auth middleware
        const jobData = { ...req.body, user_id: userId };
        const newJob = await createJobApplication(jobData);
        return res.status(201).json(newJob);
    } catch(e) {
        return res.status(500).json({ msg: "Something went wrong" });
    }
}
module.exports = { 
    getAllJobs,
    deleteJob,
    updateJob,
    createJob
}