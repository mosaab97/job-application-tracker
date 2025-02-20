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
    // Validate allowed fields
    const allowedFields = [
      'company_name',
      'job_title',
      'job_location',
      'application_status',
      'applied_date',
      'interview_date',
      'job_link',
      'notes'
    ];
  
    const validUpdates = Object.keys(updates)
      .filter(key => allowedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = updates[key];
        return obj;
      }, {});
  
    // Prepare values in exact order matching SQL file parameters
    const values = [
      id,
      validUpdates.company_name,
      validUpdates.job_title,
      validUpdates.job_location,
      validUpdates.application_status,
      validUpdates.applied_date,
      validUpdates.interview_date,
      validUpdates.job_link,
      validUpdates.notes
    ];
  
    const result = await simpleExecute('jobApplication/updateApplication.sql', values);
    return result.rows[0];
  };
  
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