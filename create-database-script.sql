ttsbegin;

CREATE TABLE users (
    id                  serial primary key,
    name                varchar(50) NOT NULL,
    rank                integer DEFAULT 2100,

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

ttsCommit;