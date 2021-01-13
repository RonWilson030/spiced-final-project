DROP TABLE IF EXISTS friendships

CREATE TABLE friendships(
  id SERIAL PRIMARY KEY,
  sender_id INT REFERENCES users(id) NOT NULL,
  recipient_id INT REFERENCES users(id) NOT NULL,
  accepted BOOLEAN DEFAULT false
);

-- INSERT INTO friendships (sender_id, recipient_id) VALUES (1, 2) RETURNING sender_id, recipient_id, accepted;

-- SELECT * FROM friendships WHERE (recipient_id=$1 AND sender_id=$2) OR (recipient_id=$2 AND sender_id=$1)