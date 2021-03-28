DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS articles_categories;

CREATE TABLE users
(
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  avatar VARCHAR(255)
);

CREATE TABLE articles
(
  id BIGSERIAL PRIMARY KEY NOT NULL,
  user_id BIGINT NOT NULL,
  title VARCHAR(255) NOT NULL,
  photo VARCHAR(255),
  date DATE DEFAULT CURRENT_DATE,
  announce VARCHAR(255) NOT NULL,
  text TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE comments
(
  id BIGSERIAL PRIMARY KEY NOT NULL,
  user_id BIGINT NOT NULL,
  article_id BIGINT NOT NULL,
  datetime TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  text TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (article_id) REFERENCES articles(id)
);

CREATE TABLE categories
(
  id bigserial PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL
);

CREATE TABLE articles_categories(
 article_id BIGINT NOT NULL,
 category_id BIGINT NOT NULL,
 PRIMARY KEY (article_id, category_id),
 FOREIGN KEY (article_id) REFERENCES articles(id),
 FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE INDEX ON articles (lower(title));
