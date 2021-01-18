CREATE TABLE chat_messages (
  id SERIAL PRIMARY KEY,
  messages TEXT,
  user_id INTEGER NOT NULL REFERENCES users(id),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- INSERT INTO chat_messages (id, messages, user_id) VALUES (1, "test chat message!", 2);


