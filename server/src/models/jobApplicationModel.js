const { simpleExecute } =  require("../config/database");

const getAllJobApplications = async (id) => {
    const result = await simpleExecute('jobApplication/getAllApplicationsByUserId.sql', [id])
    return result.rows;
}

module.exports = {
    getAllJobApplications
}