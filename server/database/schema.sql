
CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    profile_pic VARCHAR(255),
    total_points INT DEFAULT 0,
    current_points INT DEFAULT 0
);

CREATE TABLE game (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    price VARCHAR(50)
);

CREATE TABLE favorite (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    game_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES game(id) ON DELETE CASCADE
);

CREATE TABLE prize (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    exchange_price INT NOT NULL
);

CREATE TABLE prize_acquired (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    prize_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (prize_id) REFERENCES prize(id) ON DELETE CASCADE
);


INSERT INTO user (name, firstname, email, username, password_hash, phone_number, profile_pic, total_points, current_points)
VALUES
('Dupont', 'Jean', 'jean.dupont@example.com', 'jdupont', '$2y$10$abcdefghij1234567890', '0612345678', 'profile1.jpg', 300, 150),
('Martin', 'Claire', 'claire.martin@example.com', 'cmartin', '$2y$10$klmnopqrst0987654321', '0698765432', 'profile2.jpg', 400, 200),
('Diop', 'Mamadou', 'mamadou.diop@example.com', 'mdiop', '$2y$10$uvwxyzabcdef1234567890', '0778543210', 'profile3.jpg', 500, 320),
('Nguyen', 'Linh', 'linh.nguyen@example.com', 'lnguyen', '$2y$10$mnopqrstuv9876543210', '0654789632', 'profile4.jpg', 200, 90),
('Lopez', 'Carlos', 'carlos.lopez@example.com', 'clopez', '$2y$10$abcdef1234567890klmno', '0689456712', 'profile5.jpg', 150, 120);

INSERT INTO game (name, description, image, price) VALUES
('Pac-Man', 'Le célèbre jeu de labyrinthe où vous devez manger tous les points tout en évitant les fantômes', 'game1.jpg', '1'),
('Street-Fighter 2', 'Le jeu de combat légendaire avec des personnages emblématiques du monde entier', 'game2.jpg', '2'),
('Donkey Kong', 'Aidez Mario à sauver Pauline en évitant les tonneaux lancés par Donkey Kong', 'game3.jpg', '1'),
('Galaga', "Affrontez des vagues d'ennemis dans l'espace dans ce shoot'em up classique", 'game4.jpg', '1'),
('Asteroids', "Détruisez les astéroïdes et les soucoupes volantes dans l'espace", 'game5.jpg', '1'),
('Space Invaders', "Détruisez les vagues d'aliens avant qu'ils n'atteignent le bas de l'écran", 'game6.jpg', '1');

INSERT INTO Prize (name, description, image, exchange_price) VALUES
('T-shirt', 'Un t-shirt aux couleurs de votre jeu préféré', 'prize1.jpg',60 ),
('Mug', 'Un mug pour boire votre café ou thé en pensant à votre jeu préféré', 'prize2.jpg', 40),
('Stickers', 'Des stickers pour décorer votre ordinateur ou votre téléphone', 'prize3.jpg', 20),
('Peluche', 'Une peluche de votre personnage préféré', 'prize4.jpg', 80),
('Figurine', 'Une figurine de votre personnage préféré', 'prize5.jpg', 100),
('Poster', 'Un poster pour décorer votre chambre ou votre bureau', 'prize6.jpg', 20),
('Porte-clés', 'Un porte-clés pour emmener votre personnage préféré partout avec vous', 'prize7.jpg', 25),
('Crédit de jeu', 'Un crédit de jeu pour continuer à jouer sans dépenser', 'prize8.jpg', 10),
('Snack', 'Un snack pour vous rebooster', 'prize9.jpg', 15),
('Boisson soft', 'Une boisson pour vous désaltérer', 'prize10.jpg', 15);

INSERT INTO prize_acquired (user_id, prize_id) VALUES
(2, 1),
(2, 2),
(3, 3),
(3, 4),
(4, 5),
(5, 6),
(5, 7),
(5, 8);

