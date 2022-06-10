DROP DATABASE IF EXISTS ratingsreviews WITH (FORCE);
CREATE DATABASE ratingsreviews;

\c ratingsreviews;
DROP TABLE IF EXISTS characteristics_reviews;
DROP TABLE IF EXISTS characteristics;
DROP TABLE IF EXISTS reviews_photos;
DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
  id INT UNIQUE PRIMARY KEY NOT NULL,
  product_id INTEGER NOT NULL,
  rating INTEGER NOT NULL,
  date BIGINT NOT NULL,
  summary VARCHAR(200) NULL DEFAULT NULL,
  body VARCHAR(1000) NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN DEFAULT FALSE,
  reviewer_name VARCHAR(60) NULL DEFAULT NULL,
  reviewer_email VARCHAR(60) NULL DEFAULT NULL,
  response VARCHAR(1000) NULL DEFAULT NULL,
  helpfulness INTEGER NULL DEFAULT NULL
);

CREATE TABLE reviews_photos (
  id INT UNIQUE PRIMARY KEY NOT NULL,
  review_id INTEGER NOT NULL,
  url VARCHAR(1024) NOT NULL,
  CONSTRAINT fk_reviews_photos_reviews FOREIGN KEY (review_id) REFERENCES reviews(id)
);


CREATE TABLE characteristics (
  id INT UNIQUE PRIMARY KEY NOT NULL,
  product_id INTEGER NOT NULL,
  name VARCHAR(60) NOT NULL
);

CREATE TABLE characteristics_reviews (
  id INT UNIQUE PRIMARY KEY NOT NULL,
  characteristic_id INTEGER NOT NULL,
  review_id INTEGER NOT NULL,
  value INTEGER NULL DEFAULT NULL,
  CONSTRAINT fk_review FOREIGN KEY(review_id) REFERENCES reviews (id),
  CONSTRAINT fk_characteristics FOREIGN KEY(characteristic_id) REFERENCES characteristics (id)
);

COPY reviews FROM '/Users/alexisstone/Desktop/reviewsdata/reviews.csv' DELIMITER ',' CSV HEADER;
COPY reviews_photos FROM '/Users/alexisstone/Desktop/reviewsdata/reviews_photos.csv' DELIMITER ',' CSV HEADER;
COPY characteristics FROM '/Users/alexisstone/Desktop/reviewsdata/characteristics.csv' DELIMITER ',' CSV HEADER;
COPY characteristics_reviews FROM '/Users/alexisstone/Desktop/reviewsdata/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;

ALTER TABLE reviews ADD COLUMN temp_date TIMESTAMP WITHOUT TIME ZONE NULL;
UPDATE reviews SET temp_date = to_timestamp(date/1000)::TIMESTAMP;
ALTER TABLE reviews ALTER COLUMN date TYPE TIMESTAMP WITHOUT TIME ZONE USING temp_date;
ALTER TABLE reviews DROP COLUMN temp_date;