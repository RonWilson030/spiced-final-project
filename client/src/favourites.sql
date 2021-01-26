DROP TABLE IF EXISTS favourites;

CREATE TABLE favourites(
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) NOT NULL,
  recipe_id INT REFERENCES recipes(id) NOT NULL
);