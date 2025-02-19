const { simpleExecute } =  require("../config/database");

const getAllJobApplications = async (id) => {
    const result = await simpleExecute('jobApplication/getAllApplicationsByUserId.sql', [id])
    return result.rows;
}

const getJobApplicationById = async (id) => {
    const result = await simpleExecute('jobApplication/getApplicationById.sql', [id]);
    return result.rows[0];
  }
  
  const updateJobApplication = async (id, updates) => {
    const setClause = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');
    
    const values = [id, ...Object.values(updates)];
    
    const query = `
      UPDATE job_applications
      SET ${setClause}, updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `;
    
    const result = await simpleExecute(query, values);
    return result.rows[0];
  }
  
  const deleteJobApplication = async (id) => {
    await simpleExecute('jobApplication/deleteApplication.sql', [id]);
  }

  const createJobApplication = async (jobData) => {
    const result = await simpleExecute('jobApplication/createApplication.sql', [
        jobData.user_id,
        jobData.company_name,
        jobData.job_title,
        jobData.job_location,
        jobData.application_status,
        jobData.applied_date,
        jobData.interview_date,
        jobData.job_link,
        jobData.notes
    ]);
    return result.rows[0];
}
  
module.exports = {
    getAllJobApplications,
    getJobApplicationById,
    deleteJobApplication,
    updateJobApplication,
    createJobApplication
}