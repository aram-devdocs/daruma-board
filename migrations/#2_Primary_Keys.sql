ALTER TABLE auth_token
DROP COLUMN auth_token_id;

-- Add the new column with SERIAL data type
ALTER TABLE auth_token
ADD COLUMN auth_token_id SERIAL PRIMARY KEY;