
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
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
    learning_language VARCHAR(50) NOT NULL,
    description VARCHAR(300),
    banned BOOLEAN,
    status VARCHAR(15)
);


CREATE TABLE chat (
    id INT AUTO_INCREMENT PRIMARY KEY,
    last_message_id INT
);

CREATE TABLE message (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    chatId INT NOT NULL,
    userId INT NOT NULL,
    text VARCHAR(500) NOT NULL,
    status VARCHAR(15) NOT NULL
);

ALTER TABLE message
ADD CONSTRAINT FK_message_chat FOREIGN KEY (chatId) REFERENCES chat(id);

ALTER TABLE message
ADD CONSTRAINT FK_message_users FOREIGN KEY (userId) REFERENCES users(id);

CREATE TABLE user_chat (
    user_id INT NOT NULL,
    chat_id INT NOT NULL,
    PRIMARY KEY (user_id, chat_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (chat_id) REFERENCES chat(id)
);

-- CREATE TABLE chat (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     last_message_id INT,
--     FOREIGN KEY (last_message_id) REFERENCES message(id)
-- );

-- CREATE TABLE message (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     chatId INT NOT NULL,
--     userId INT NOT NULL,
--     text VARCHAR(500) NOT NULL,
--     status VARCHAR(15) NOT NULL,
--     FOREIGN KEY (chatId) REFERENCES chat(id),
--     FOREIGN KEY (userId) REFERENCES users(id)
-- );

-- CREATE TABLE user_chat (
--     user_id INT NOT NULL,
--     chat_id INT NOT NULL,
--     PRIMARY KEY (user_id, chat_id),
--     FOREIGN KEY (user_id) REFERENCES users(id),
--     FOREIGN KEY (chat_id) REFERENCES chat(id)
-- );


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
