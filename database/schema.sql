DROP DATABASE IF EXISTS ratingsreviews;
CREATE DATABASE ratingsreviews;

\c ratingsreviews;
DROP TABLE IF EXISTS characteristics_reviews;
DROP TABLE IF EXISTS characteristics;
DROP TABLE IF EXISTS reviews_photos;
DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
  id INTEGER NOT NULL UNIQUE,
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
  helpfulness INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE reviews_photos (
  id INTEGER NOT NULL UNIQUE,
  review_id INTEGER NOT NULL,
  url VARCHAR(1024) NOT NULL,
  PRIMARY KEY (id)
  FOREIGN KEY (review_id) REFERENCES reviews(id)
);

CREATE TABLE characteristics (
  id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  name VARCHAR(60) NOT NULL,
  PRIMARY KEY (id)
  FOREIGN KEY (product_id) REFERENCES reviews(product_id)
);

CREATE TABLE characteristics_reviews (
  id INTEGER NOT NULL,
  characteristic_id INTEGER NOT NULL,
  review_id INTEGER NOT NULL,
  value DECIMAL NULL DEFAULT NULL,
  PRIMARY KEY (id)
  FOREIGN KEY (characteristic_id) REFERENCES reviews(product_id)
  FOREIGN KEY (review_id) REFERENCES reviews(id)
);

COPY reviews FROM '/Users/alexisstone/Desktop/reviewsdata/reviews.csv' DELIMITER ',' CSV HEADER;
COPY reviews_photos FROM '/Users/alexisstone/Desktop/reviewsdata/reviews_photos.csv' DELIMITER ',' CSV HEADER;
COPY characteristics FROM '/Users/alexisstone/Desktop/reviewsdata/characteristics.csv' DELIMITER ',' CSV HEADER;
COPY characteristics_reviews FROM '/Users/alexisstone/Desktop/reviewsdata/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;