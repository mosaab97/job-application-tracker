const { checkSchema } = require('express-validator')

const getApplicationsByUserIdValidationSchema = checkSchema({
    id: {
        in: 'params',
        optional: false,
        isNumeric: {
            errorMessage: "Id must be a valid number"
        },
    }
})

const updateJobValidationSchema = checkSchema({
    id: {
      in: 'params',
      isNumeric: true,
      errorMessage: "Invalid job ID"
    },
    company_name: {
      optional: true,
      isString: true,
      errorMessage: "Invalid company name"
    },
    job_title: {
      optional: true,
      isString: true,
      errorMessage: "Invalid job title"
    },
    application_status: {
      optional: true,
      isIn: {
        options: [['Applied', 'Interviewing', 'Offered', 'Rejected']],
        errorMessage: "Invalid status"
      }
    }
  });
  
  // Delete Validation Schema
  const deleteJobValidationSchema = checkSchema({
    id: {
      in: 'params',
      isNumeric: true,
      errorMessage: "Invalid job ID"
    }
  });
  const createJobValidationSchema = checkSchema({
    company_name: {
        notEmpty: true,
        isString: true,
        errorMessage: "Company name is required"
    },
    job_title: {
        notEmpty: true,
        isString: true,
        errorMessage: "Job title is required"
    },
    application_status: {
        notEmpty: true,
        isIn: {
            options: [['Applied', 'Interviewing', 'Offered', 'Rejected']],
            errorMessage: "Invalid status"
        }
    },
    applied_date: {
        notEmpty: true,
        isISO8601: true,
        errorMessage: "Valid applied date is required"
    },
    interview_date: {
        optional: true,
        isISO8601: true,
        errorMessage: "Invalid interview date format"
    },
    job_link: {
        optional: true,
        isURL: true,
        errorMessage: "Invalid job link URL"
    },
    notes: {
        optional: true,
        isString: true,
        errorMessage: "Notes must be a string"
    }
});
module.exports = {
    getApplicationsByUserIdValidationSchema,
    deleteJobValidationSchema,
    updateJobValidationSchema,
    createJobValidationSchema
}