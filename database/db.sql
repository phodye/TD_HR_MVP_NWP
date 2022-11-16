DROP TABLE IF EXISTS Users cascade;

-- CREATE TABLE Users (
--   id SERIAL,
--   username VARCHAR(60) NOT NULL,
--   pass VARCHAR(60) NOT NULL,
--   PRIMARY KEY (id)
-- );

DROP TABLE IF EXISTS Topscores cascade;

CREATE TABLE Topscores (
  id SERIAL,
  username VARCHAR(60) NOT NULL,
  topscore BIGINT NOT NULL,
  -- user_reference INTEGER NOT NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ALTER TABLE Topscores ADD FOREIGN KEY (user_reference) REFERENCES Users (id);