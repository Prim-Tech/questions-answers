/*
How to run postgresql on terminal: psql postgres -U secstanley
How to access specific database: psql secqa

Sounds like you would need to have created the database first and log into it and then run the schema file to create all the tables.


RUN THIS

1. psql postgres -U secstanley
2. \i schema.sql


*/


-- Drop database if exists
DROP DATABASE IF EXISTS sdcqa;

-- Create database
CREATE DATABASE sdcqa;

-- Connect to the newly created database
\c sdcqa;

-- Create questions table
CREATE TABLE IF NOT EXISTS questions (question_id SERIAL PRIMARY KEY, product_id INTEGER, question_body VARCHAR(1000), question_date VARCHAR(100), asker_name VARCHAR(100), asker_email VARCHAR(100), reported INTEGER, question_helpfulness INTEGER
);

-- Import data to questions table
\copy questions (question_id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness) FROM '/Users/stanleychu/questions-answers/EtlTransfer/questions.csv' DELIMITER ',' CSV HEADER;

-- Create answers table
CREATE TABLE IF NOT EXISTS answers (answer_id SERIAL PRIMARY KEY, question_id INTEGER REFERENCES questions(question_id), body VARCHAR(1000), date VARCHAR(100), answerer_name VARCHAR(100), answerer_email VARCHAR(100), reported INTEGER, helpfulness INTEGER);

-- Import data to answers table
\copy answers (answer_id, question_id, body, date, answerer_name, answerer_email, reported, helpfulness) FROM '/Users/stanleychu/questions-answers/EtlTransfer/answers.csv' DELIMITER ',' CSV HEADER;

-- Create photos table
CREATE TABLE IF NOT EXISTS photos (id SERIAL PRIMARY KEY, answer_id INTEGER REFERENCES answers(answer_id), url VARCHAR(1000));

-- Import data to photos table
\copy photos (id, answer_id, url) FROM '/Users/stanleychu/questions-answers/EtlTransfer/answers_photos.csv' DELIMITER ',' CSV HEADER;

-- Ater the column to be in BIG INT instead of VARCHAR
ALTER TABLE questions ALTER COLUMN question_date TYPE bigint USING question_date::bigint;
ALTER TABLE answers ALTER COLUMN date TYPE bigint USING date::bigint;

-- Create Index for faster query calls.
CREATE INDEX product_id_idx ON questions(product_id);
CREATE INDEX answer_id_idx ON answers(answer_id);
CREATE INDEX photo_id_idx ON photos(id);
CREATE INDEX question_id_idx ON questions(question_id);
CREATE INDEX answers_questions_id_idx ON answers(question_id);
CREATE INDEX photos_answers_id_idx ON photos(answer_id);

-- Reseting the SERIAL SEQUENCE
SELECT setval('questions_question_id_seq', (SELECT MAX(question_id) FROM questions)+1);
SELECT setval('answers_answer_id_seq', (SELECT MAX(answer_id) FROM answers)+1);
SELECT setval('photos_id_seq', (SELECT MAX(id) FROM photos)+1);


