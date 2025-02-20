UPDATE job_applications
SET 
  company_name = $2,
  job_title = $3,
  job_location = $4,
  application_status = $5,
  applied_date = $6,
  interview_date = $7,
  job_link = $8,
  notes = $9,
  updated_at = NOW()
WHERE id = $1
RETURNING *;