-- Sélection de la base
USE projet;

-- Encodage UTF-8
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- Création des tables
CREATE TABLE users (
    id CHAR(36) PRIMARY KEY,
    role INT NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    UNIQUE (username),
    UNIQUE (email)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE forums (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    image VARCHAR(255),
    creation_date DATETIME NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    content VARCHAR(255) NOT NULL,
    creation_date DATETIME NOT NULL,
    id_subject BIGINT NOT NULL,
    id_author CHAR(36) NOT NULL,
    FOREIGN KEY (id_subject) REFERENCES subjects(id) ON DELETE CASCADE,
    FOREIGN KEY (id_author) REFERENCES users(id) ON DELETE CASCADE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Insertion des utilisateurs
INSERT INTO users (id, role, username, email, password, avatar) VALUES
('550e8400-e29b-41d4-a716-446655440000', 1, 'admin', 'admin@example.com', '$2y$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa', ''),
('550e8400-e29b-41d4-a716-446655440001', 0, 'user', 'user@example.com', '$2y$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa', ''),
('550e8400-e29b-41d4-a716-446655440002', 0, 'johndoe', 'john@example.com', '$2y$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa', 'https://example.com/avatar1.png'),
('550e8400-e29b-41d4-a716-446655440003', 0, 'janedoe', 'jane@example.com', '$2y$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa', 'https://example.com/avatar2.png'),
('550e8400-e29b-41d4-a716-446655440004', 0, 'gamer42', 'gamer@example.com', '$2y$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa', 'https://example.com/avatar3.png'),
('550e8400-e29b-41d4-a716-446655440005', 0, 'fitlife', 'fit@example.com', '$2y$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa', 'https://example.com/avatar4.png');

-- Insertion des forums
INSERT INTO forums (name, description, image, creation_date) VALUES
('Web Development', 'Tout sur HTML, CSS, JS et les frameworks', NULL, NOW()),
('Gaming', 'Discussions autour des jeux vidéo récents ou rétro', NULL, NOW()),
('Fitness & Santé', 'Programmes, nutrition et motivation', NULL, NOW());

-- Insertion des sujets
INSERT INTO subjects (title, content, image, creation_date, is_locked, id_forum, id_author) VALUES
-- Web Dev
('React vs Vue : lequel choisir en 2025 ?', 'Je commence un nouveau projet SPA, vous me conseillez quoi ?', NULL, NOW(), FALSE, 1, '550e8400-e29b-41d4-a716-446655440002'),
('Conseils pour un bon portfolio développeur ?', 'Vous avez des exemples ou conseils à me filer ?', NULL, NOW(), FALSE, 1, '550e8400-e29b-41d4-a716-446655440003'),

-- Gaming
('Votre avis sur Elden Ring DLC ?', 'Il vaut vraiment les 30€ ou pas ?', NULL, NOW(), FALSE, 2, '550e8400-e29b-41d4-a716-446655440004'),
('Je cherche des jeux chill sur PC', 'Pas de compétitif, juste détente après le boulot', NULL, NOW(), FALSE, 2, '550e8400-e29b-41d4-a716-446655440004'),

-- Fitness
('Programme full body 3x/semaine ?', 'Est-ce que c’est efficace pour une prise de masse ?', NULL, NOW(), FALSE, 3, '550e8400-e29b-41d4-a716-446655440005'),
('Quels snacks sains pour le boulot ?', 'Marre des Kinder Bueno, des idées de trucs bons et clean ?', NULL, NOW(), FALSE, 3, '550e8400-e29b-41d4-a716-446655440005');

-- Insertion des messages
INSERT INTO messages (content, creation_date, id_subject, id_author) VALUES
-- Sujet 1
('Perso je préfère Vue pour sa simplicité.', NOW(), 1, '550e8400-e29b-41d4-a716-446655440003'),
('React a plus d’opportunités pro selon moi.', NOW(), 1, '550e8400-e29b-41d4-a716-446655440002'),
('T’as regardé Svelte ? Un bon mix entre les deux.', NOW(), 1, '550e8400-e29b-41d4-a716-446655440001'),

-- Sujet 2
('Un portfolio minimaliste avec projets propres, c’est le top.', NOW(), 2, '550e8400-e29b-41d4-a716-446655440000'),
('Ajoute une page “à propos” bien personnelle !', NOW(), 2, '550e8400-e29b-41d4-a716-446655440001'),
('Fais attention à l’accessibilité aussi.', NOW(), 2, '550e8400-e29b-41d4-a716-446655440002'),

-- Sujet 3
('Oui, très bon contenu mais un peu court.', NOW(), 3, '550e8400-e29b-41d4-a716-446655440003'),
('Je l’ai trouvé dur mais kiffant !', NOW(), 3, '550e8400-e29b-41d4-a716-446655440004'),
('T’as des boss secrets dans le DLC aussi.', NOW(), 3, '550e8400-e29b-41d4-a716-446655440001'),

-- Sujet 4
('Journey et Stardew Valley, parfaits pour chill.', NOW(), 4, '550e8400-e29b-41d4-a716-446655440003'),
('Slime Rancher aussi est super relaxant.', NOW(), 4, '550e8400-e29b-41d4-a716-446655440001'),
('Essayez aussi Unpacking, petite perle.', NOW(), 4, '550e8400-e29b-41d4-a716-446655440004'),

-- Sujet 5
('Full body c’est très bien pour les débutants.', NOW(), 5, '550e8400-e29b-41d4-a716-446655440005'),
('Faut juste bien gérer les temps de repos.', NOW(), 5, '550e8400-e29b-41d4-a716-446655440003'),
('Inclure du gainage, c’est un plus aussi.', NOW(), 5, '550e8400-e29b-41d4-a716-446655440002'),

-- Sujet 6
('Amandes, pommes et barres protéinées maison !', NOW(), 6, '550e8400-e29b-41d4-a716-446655440005'),
('Tente les energy balls à base de dattes !', NOW(), 6, '550e8400-e29b-41d4-a716-446655440004'),
('Smoothie banane-cacahuète dans une gourde 👌', NOW(), 6, '550e8400-e29b-41d4-a716-446655440003');
