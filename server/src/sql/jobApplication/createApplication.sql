INSERT INTO job_applications (
    user_id,
    company_name,
    job_title,
    job_location,
    application_status,
    applied_date,
    interview_date,
    job_link,
    notes
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING *;