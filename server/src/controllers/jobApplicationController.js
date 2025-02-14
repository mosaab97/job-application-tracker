
const { getAllJobApplications } = require("../models/jobApplicationModel");
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

module.exports = { getAllJobs }