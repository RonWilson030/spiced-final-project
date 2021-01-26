CREATE TABLE shopping_list (
  id SERIAL PRIMARY KEY,
  item TEXT,
  user_id INTEGER NOT NULL REFERENCES users(id)
);