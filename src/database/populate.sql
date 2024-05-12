CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de usuários
CREATE TABLE Users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- Tabela de gêneros de filmes
CREATE TABLE Genres (
    genre_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL
);

-- Tabela de filmes
CREATE TABLE Movies (
    movie_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    director VARCHAR(255) NOT NULL,
    release_year INT NOT NULL,
    genre_id UUID NOT NULL,
    FOREIGN KEY (genre_id) REFERENCES Genres(genre_id)
);

-- Tabela para elenco dos filmes
CREATE TABLE Production_Cast (
    cast_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100) NOT NULL,
    movie_id UUID NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES Movies(movie_id)
);

-- Tabela para avaliação dos filmes
CREATE TABLE Ratings (
    rating_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    movie_id UUID NOT NULL,
    rating FLOAT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (movie_id) REFERENCES Movies(movie_id)
);

-- Tabela de favoritos
CREATE TABLE Favorites (
  	favorite_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    movie_id UUID NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (movie_id) REFERENCES Movies(movie_id)
);

-- Inserir dados na tabela Users (Senha "John Doe": password123)
INSERT INTO Users (name, email, password) VALUES
    ('John Doe', 'john@example.com', '$2a$12$CGBU2dPnOqxdh6dGBdFYBO/GNyO1GKiajvrV3Zh1BW6i1Yoe6Zj4K');

-- Inserir dados na tabela Genres
INSERT INTO Genres (name) VALUES
    ('Ação'),
    ('Comédia'),
    ('Drama'),
    ('Crime'),
    ('Terror'),
    ('Ficção Científica'),
    ('Romance'),
    ('Aventura'),
    ('Fantasia'),
    ('Animação');

-- Inserir dados na tabela Movies
INSERT INTO Movies (title, director, release_year, genre_id) VALUES
    ('Matrix', 'Lana Wachowski, Lilly Wachowski', 1999, (SELECT genre_id FROM Genres WHERE name = 'Ficção Científica')),
    ('Pulp Fiction', 'Quentin Tarantino', 1994, (SELECT genre_id FROM Genres WHERE name = 'Crime')),
    ('Um Sonho de Liberdade', 'Frank Darabont', 1994, (SELECT genre_id FROM Genres WHERE name = 'Drama')),
    ('Batman: O Cavaleiro das Trevas', 'Christopher Nolan', 2008, (SELECT genre_id FROM Genres WHERE name = 'Ação')),
    ('Forrest Gump', 'Robert Zemeckis', 1994, (SELECT genre_id FROM Genres WHERE name = 'Drama')),
    ('A Origem', 'Christopher Nolan', 2010, (SELECT genre_id FROM Genres WHERE name = 'Ficção Científica')),
    ('Clube da Luta', 'David Fincher', 1999, (SELECT genre_id FROM Genres WHERE name = 'Drama')),
    ('O Senhor dos Anéis: O Retorno do Rei', 'Peter Jackson', 2003, (SELECT genre_id FROM Genres WHERE name = 'Aventura')),
    ('O Poderoso Chefão', 'Francis Ford Coppola', 1972, (SELECT genre_id FROM Genres WHERE name = 'Crime')),
    ('O Rei Leão', 'Roger Allers, Rob Minkoff', 1994, (SELECT genre_id FROM Genres WHERE name = 'Animação'));

-- Inserir dados na tabela Production_Cast
INSERT INTO Production_Cast (name, role, movie_id) VALUES
    ('Keanu Reeves', 'Neo', (SELECT movie_id FROM Movies WHERE title = 'Matrix')),
    ('Carrie-Anne Moss', 'Trinity', (SELECT movie_id FROM Movies WHERE title = 'Matrix')),
    ('Samuel L. Jackson', 'Jules Winnfield', (SELECT movie_id FROM Movies WHERE title = 'Pulp Fiction')),
    ('Tim Robbins', 'Andy Dufresne', (SELECT movie_id FROM Movies WHERE title = 'Um Sonho de Liberdade')),
    ('Morgan Freeman', 'Ellis Boyd "Red" Redding', (SELECT movie_id FROM Movies WHERE title = 'Um Sonho de Liberdade')),
    ('Christian Bale', 'Batman', (SELECT movie_id FROM Movies WHERE title = 'Batman: O Cavaleiro das Trevas')),
    ('Heath Ledger', 'Coringa', (SELECT movie_id FROM Movies WHERE title = 'Batman: O Cavaleiro das Trevas')),
    ('Tom Hanks', 'Forrest Gump', (SELECT movie_id FROM Movies WHERE title = 'Forrest Gump')),
    ('Leonardo DiCaprio', 'Cobb', (SELECT movie_id FROM Movies WHERE title = 'A Origem')),
    ('Brad Pitt', 'Tyler Durden', (SELECT movie_id FROM Movies WHERE title = 'Clube da Luta'));


-- Inserir dados na tabela Ratings
INSERT INTO Ratings (user_id, movie_id, rating) VALUES
    ((SELECT user_id FROM Users WHERE name = 'John Doe'), (SELECT movie_id FROM Movies WHERE title = 'Matrix'), 4.5),
    ((SELECT user_id FROM Users WHERE name = 'John Doe'), (SELECT movie_id FROM Movies WHERE title = 'Pulp Fiction'), 4.8),
    ((SELECT user_id FROM Users WHERE name = 'John Doe'), (SELECT movie_id FROM Movies WHERE title = 'Um Sonho de Liberdade'), 4.7),
    ((SELECT user_id FROM Users WHERE name = 'John Doe'), (SELECT movie_id FROM Movies WHERE title = 'Batman: O Cavaleiro das Trevas'), 4.9),
    ((SELECT user_id FROM Users WHERE name = 'John Doe'), (SELECT movie_id FROM Movies WHERE title = 'Forrest Gump'), 4.6),
    ((SELECT user_id FROM Users WHERE name = 'John Doe'), (SELECT movie_id FROM Movies WHERE title = 'A Origem'), 4.8),
    ((SELECT user_id FROM Users WHERE name = 'John Doe'), (SELECT movie_id FROM Movies WHERE title = 'Clube da Luta'), 4.9),
    ((SELECT user_id FROM Users WHERE name = 'John Doe'), (SELECT movie_id FROM Movies WHERE title = 'O Senhor dos Anéis: O Retorno do Rei'), 4.7),
    ((SELECT user_id FROM Users WHERE name = 'John Doe'), (SELECT movie_id FROM Movies WHERE title = 'O Poderoso Chefão'), 4.5),
    ((SELECT user_id FROM Users WHERE name = 'John Doe'), (SELECT movie_id FROM Movies WHERE title = 'O Rei Leão'), 4.2);

-- Inserir dados na tabela Favorites
INSERT INTO Favorites (user_id, movie_id) VALUES
    ((SELECT user_id FROM Users WHERE name = 'John Doe'), (SELECT movie_id FROM Movies WHERE title = 'Matrix')),
    ((SELECT user_id FROM Users WHERE name = 'John Doe'), (SELECT movie_id FROM Movies WHERE title = 'Pulp Fiction')),
    ((SELECT user_id FROM Users WHERE name = 'John Doe'), (SELECT movie_id FROM Movies WHERE title = 'Um Sonho de Liberdade')),
    ((SELECT user_id FROM Users WHERE name = 'John Doe'), (SELECT movie_id FROM Movies WHERE title = 'Batman: O Cavaleiro das Trevas')),
    ((SELECT user_id FROM Users WHERE name = 'John Doe'), (SELECT movie_id FROM Movies WHERE title = 'Forrest Gump')),
    ((SELECT user_id FROM Users WHERE name = 'John Doe'), (SELECT movie_id FROM Movies WHERE title = 'A Origem')),
    ((SELECT user_id FROM Users WHERE name = 'John Doe'), (SELECT movie_id FROM Movies WHERE title = 'Clube da Luta')),
    ((SELECT user_id FROM Users WHERE name = 'John Doe'), (SELECT movie_id FROM Movies WHERE title = 'O Senhor dos Anéis: O Retorno do Rei')),
    ((SELECT user_id FROM Users WHERE name = 'John Doe'), (SELECT movie_id FROM Movies WHERE title = 'O Poderoso Chefão')),
    ((SELECT user_id FROM Users WHERE name = 'John Doe'), (SELECT movie_id FROM Movies WHERE title = 'O Rei Leão'));