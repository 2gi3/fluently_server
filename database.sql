-- Database as it was developed:

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
    country VARCHAR(50),
    native_language VARCHAR(50) NOT NULL,
    teaching_language VARCHAR(50) NOT NULL,
    learning_language VARCHAR(50) NOT NULL,
    description VARCHAR(300),
    banned BOOLEAN,
    status VARCHAR(15)
);


CREATE TABLE chatrooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    last_message_id INT
);

CREATE TABLE messages (
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

CREATE TABLE users_chats (
    user_id INT NOT NULL,
    chat_id INT NOT NULL,
    PRIMARY KEY (user_id, chat_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (chat_id) REFERENCES chat(id)
);

ALTER TABLE chatrooms
ADD COLUMN user1Id INT,
ADD COLUMN user2Id INT;

ALTER TABLE chatrooms
ADD CONSTRAINT FK_chatrooms_user1 FOREIGN KEY (user1Id) REFERENCES users(id),
ADD CONSTRAINT FK_chatrooms_user2 FOREIGN KEY (user2Id) REFERENCES users(id);

ALTER TABLE users_chats
ADD CONSTRAINT FK_users_chats_user FOREIGN KEY (user_id) REFERENCES users(id),
ADD CONSTRAINT FK_users_chats_chat FOREIGN KEY (chat_id) REFERENCES chatrooms(id);

ALTER TABLE messages
DROP FOREIGN KEY FK_message_chat;

ALTER TABLE messages
ADD CONSTRAINT FK_message_chat FOREIGN KEY (chatId) REFERENCES chatrooms(id);

CREATE TABLE refresh_tokens (
    token varchar(350) NOT NULL,
    PRIMARY KEY (token)
);

CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    body VARCHAR(255),
    image VARCHAR(255),
    type ENUM('question', 'moment') NOT NULL,
    topic VARCHAR(255),
    status ENUM('open', 'closed'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE user_posts (
    userId INT NOT NULL,
    postId INT NOT NULL,
    PRIMARY KEY (userId, postId),
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (postId) REFERENCES posts(id)
);

CREATE TABLE user_saved_posts (
    userId INT NOT NULL,
    postId INT NOT NULL,
    PRIMARY KEY (userId, postId),
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (postId) REFERENCES posts(id)
);
CREATE TABLE postComments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    postId INT NOT NULL,
    body VARCHAR(600) NOT NULL,
    created_at DATETIME,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (postId) REFERENCES posts(id)
);

CREATE TABLE post_comments (
    postId INT NOT NULL,
    commentId INT NOT NULL,
    PRIMARY KEY (postId, commentId),
    FOREIGN KEY (postId) REFERENCES posts(id),
    FOREIGN KEY (commentId) REFERENCES postComments(id)
);
-- Database Cleaned up code
-- Create the 'users' table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(300) NOT NULL,
    name VARCHAR(50) NOT NULL,
    age INT, 
    image VARCHAR(300),
    gender VARCHAR(50),
    nationality VARCHAR(50) NOT NULL,
    country VARCHAR(50),
    native_language VARCHAR(50) NOT NULL,
    teaching_language VARCHAR(50) NOT NULL,
    learning_language VARCHAR(50) NOT NULL,
    description VARCHAR(300),
    banned BOOLEAN,
    status VARCHAR(15)
);

-- Create the 'chatrooms' table
CREATE TABLE IF NOT EXISTS chatrooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    last_message_id INT
);

-- Create the 'messages' table
CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    chatId INT NOT NULL,
    userId INT NOT NULL,
    text VARCHAR(500) NOT NULL,
    status VARCHAR(15) NOT NULL,
    FOREIGN KEY (chatId) REFERENCES chatrooms(id),
    FOREIGN KEY (userId) REFERENCES users(id)
);

-- Create the 'users_chats' table
CREATE TABLE IF NOT EXISTS users_chats (
    user_id INT NOT NULL,
    chat_id INT NOT NULL,
    PRIMARY KEY (user_id, chat_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (chat_id) REFERENCES chatrooms(id)
);

-- Create the refresh_tokens table
CREATE TABLE refresh_tokens (
    token varchar(350) NOT NULL,
    PRIMARY KEY (token)
);

-- Add columns and foreign keys to 'chatrooms' table
ALTER TABLE chatrooms
ADD COLUMN user1Id INT,
ADD COLUMN user2Id INT,
ADD CONSTRAINT FK_chatrooms_user1 FOREIGN KEY (user1Id) REFERENCES users(id),
ADD CONSTRAINT FK_chatrooms_user2 FOREIGN KEY (user2Id) REFERENCES users(id);

-- Drop and re-add foreign key in 'messages' table
ALTER TABLE messages
DROP FOREIGN KEY FK_message_chat;

ALTER TABLE messages
ADD CONSTRAINT FK_message_chat FOREIGN KEY (chatId) REFERENCES chatrooms(id);

CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    body VARCHAR(255),
    image VARCHAR(255),
    type ENUM('question', 'moment') NOT NULL,
    topic VARCHAR(255),
    status ENUM('open', 'closed'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE user_posts (
    userId INT NOT NULL,
    postId INT NOT NULL,
    PRIMARY KEY (userId, postId),
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (postId) REFERENCES posts(id)
);

CREATE TABLE user_likes (
    userId INT NOT NULL,
    postId INT NOT NULL,
    PRIMARY KEY (userId, postId),
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (postId) REFERENCES posts(id)
);
CREATE TABLE postComments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    postId INT NOT NULL,
    body VARCHAR(600) NOT NULL,
    created_at DATETIME,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (postId) REFERENCES posts(id)
);
CREATE TABLE post_comments (
    postId INT NOT NULL,
    commentId INT NOT NULL,
    PRIMARY KEY (postId, commentId),
    FOREIGN KEY (postId) REFERENCES posts(id),
    FOREIGN KEY (commentId) REFERENCES postComments(id)
);