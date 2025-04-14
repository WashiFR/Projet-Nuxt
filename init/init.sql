USE projet;

CREATE TABLE users (
    id CHAR(36) PRIMARY KEY,
    role INT NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    UNIQUE (username),
    UNIQUE (email)
);

CREATE TABLE forums (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    image VARCHAR(255),
    creation_date DATETIME NOT NULL
);

CREATE TABLE subjects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    creation_date DATETIME NOT NULL,
    is_locked BOOLEAN DEFAULT FALSE,
    id_forum BIGINT NOT NULL,
    id_author CHAR(36) NOT NULL,
    FOREIGN KEY (id_forum) REFERENCES forums(id) ON DELETE CASCADE,
    FOREIGN KEY (id_author) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    content VARCHAR(255) NOT NULL,
    creation_date DATETIME NOT NULL,
    id_subject BIGINT NOT NULL,
    id_author CHAR(36) NOT NULL,
    FOREIGN KEY (id_subject) REFERENCES subjects(id) ON DELETE CASCADE,
    FOREIGN KEY (id_author) REFERENCES users(id) ON DELETE CASCADE
);
