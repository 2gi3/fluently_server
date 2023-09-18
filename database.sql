CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(300) NOT NULL,
    name VARCHAR(50) NOT NULL,
    age INT, 
    image VARCHAR(300),
    gender VARCHAR(50),
    nationality VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL,
    native_language VARCHAR(50) NOT NULL,
    teaching_language VARCHAR(50) NOT NULL,
    learning_language VARCHAR(50)NOT NULL,
    description VARCHAR(300),
    banned boolean
);

---- COMMENTED TABLES HAVE NOT BEEN CREATED YET ----
-- CREATE TABLE reports (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     reporting_user INT NOT NULL,
--     reported_user INT NOT NULL,
--     reported_messages varchar(250),
--     FOREIGN KEY (reporting_user) REFERENCES users(id),
--     FOREIGN KEY (reported_user) REFERENCES users(id)
-- );

-- CREATE TABLE chats (
--     chat_id INT PRIMARY KEY AUTO_INCREMENT,
--     user_id1 INT NOT NULL,
--     user_id2 INT NOT NULL,
--     chat_started TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_id1) REFERENCES users(id),
--     FOREIGN KEY (user_id2) REFERENCES users(id)
-- );
