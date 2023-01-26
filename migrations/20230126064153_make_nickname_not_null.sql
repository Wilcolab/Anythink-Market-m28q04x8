UPDATE users SET nickname = 'no_nickname' WHERE nickname IS NULL;
ALTER TABLE users ALTER COLUMN nickname SET NOT NULL;