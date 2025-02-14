UPDATE users 
    SET name = $1, email = $2, updated_at = CURRENT_TIMESTAMP 
    WHERE id = $3 RETURNING *