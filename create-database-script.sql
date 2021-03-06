ttsbegin;

CREATE TABLE users (
    id                  serial primary key,
    name                varchar(50) NOT NULL,
    rating                integer DEFAULT 2100,

    UNIQUE(name)
);

INSERT INTO users (name) values 
    ('Лена'),
    ('Данила'),
    ('Юра'),
    ('Денис'),
    ('Вика'),
    ('Рост'),
    ('Михаил'),
    ('Андрей'),
    ('Никита')
;

CREATE TYPE playerrole AS ENUM ('Нечто', 'Зараженный', 'Мирный');

CREATE TABLE games (
    gameid              serial primary key
);

CREATE TABLE gameplayers (
    gameid              integer references games(gameid) NOT NULL,
    playerid            integer references users(id) NOT NULL,
    ratingchange        integer,
    playerrole          playerrole,
    isalive             boolean
);

ttsCommit;