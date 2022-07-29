CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT false NOT NULL
);

CREATE TABLE IF NOT EXISTS chats (
    chat_id SERIAL PRIMARY KEY,
    title TEXT,
    creator_id INT NOT NULL REFERENCES users(user_id),
    create_date TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc') NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
  message_id SERIAL PRIMARY KEY,
  creator_id INT NOT NULL REFERENCES users(user_id),
  content TEXT NOT NULL,
  create_dt TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc') NOT NULL,
  chat_id INT NOT NULL REFERENCES chats(chat_id)
);

CREATE TABLE IF NOT EXISTS user_chats (
  user_id INT NOT NULL REFERENCES users(user_id),
  chat_id INT NOT NULL REFERENCES chats(chat_id)
);
