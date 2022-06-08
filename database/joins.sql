\c ratingsreviews;

DROP TABLE IF EXISTS photosData;
CREATE TABLE photosData as
SELECT reviews_photos.review_id, JSON_AGG(JSON_BUILD_OBJECT('id',id,'url', url)) as photos
FROM reviews_photos
GROUP BY reviews_photos.review_id;

-- DROP TABLE IF EXISTS reviewData CASCADE;
DROP TABLE IF EXISTS reviewData;
DROP TABLE IF EXISTS meta;

CREATE TABLE reviewData AS
SELECT reviews.id AS review_id,reviews.product_id, reviews.rating, reviews.reported, reviews.summary, reviews.recommend, reviews.response, reviews.body, reviews.date, reviews.reviewer_name, reviews.helpfulness, photosData.photos
FROM reviews
LEFT JOIN photosData ON reviews.id = photosData.review_id
ORDER BY reviews.id;

DROP TABLE IF EXISTS meta;
CREATE TABLE meta as
SELECT JSON_AGG(JSON_BUILD_OBJECT('id',characteristic_id,'value', url)) as char_name
WHERE
FROM characteristics,characteristics_reviews
GROUP BY char_name;