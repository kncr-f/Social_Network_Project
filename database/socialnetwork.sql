DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS reset_codes;
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS chat_messages;

CREATE TABLE users (
    id              SERIAL PRIMARY KEY,
    first           VARCHAR(255) NOT NULL CHECK (first != ''),
    last            VARCHAR(255) NOT NULL CHECK (last != ''),
    email           VARCHAR(255) NOT NULL UNIQUE,
    password        VARCHAR(255) NOT NULL,
    profile_pic     VARCHAR,
    bio_text        VARCHAR,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


  CREATE TABLE reset_codes(
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL,
    code VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE friendships(
    id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL,
    recipient_id INT NOT NULL,
    accepted BOOLEAN
  );

  CREATE UNIQUE INDEX ON friendships (least(sender_id, recipient_id), greatest(sender_id,recipient_id));

  CREATE TABLE chat_messages(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    message_text VARCHAR,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP

  );