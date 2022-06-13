



(SELECT JSON_AGG(JSON_BUILD_OBJECT(
  'review_id', id,
  'rating', rating,
  'summary', summary,
  'recommend', recommend,
  'response', response,
  'body', body,
  'date', date,
  'reviewer_name', reviewer_name,
  'helpfulness', helpfulness,
  'photos', (SELECT JSON_AGG(JSON_BUILD_OBJECT('id', id, 'url', url))
        FROM reviews_photos
        WHERE review_id = reviews.id)
)))
FROM reviews
WHERE product_id = 30344


//Testing


SELECT
      ${ obj.product_id } AS product_id,
  ${ obj.count } AS count,
    ${ obj.page } AS page,
      (SELECT
          JSON_AGG(
        JSON_BUILD_OBJECT(
          'review_id', id,
          'rating', rating,
          'summary', summary,
          'recommend', recommend,
          'response', response,
          'body', body,
          'date', date,
          'reviewer_name', reviewer_name,
          'helpfulness', helpfulness,
          'photos', (
          SELECT
                  COALESCE(
            JSON_AGG(
              JSON_BUILD_OBJECT(
                'id', id,
                'url', url
              )
            )
            , '[]')
                FROM reviews_photos
                WHERE review_id = reviews.id
        )
      )
          )
        ) AS results
        FROM reviews
        WHERE product_id = ${ obj.product_id }
        AND reported = FALSE
        GROUP BY reviews.date
        ${ sorter }
        LIMIT ${ obj.count }
        OFFSET ${ (obj.page - 1) * obj.count }


//
`
      SELECT
      ${obj.product_id} AS product_id,
      ${obj.count} AS count,
      ${obj.page} AS page,
      (SELECT JSON_AGG(JSON_BUILD_OBJECT(
        'review_id', id,
        'rating', rating,
        'summary', summary,
        'recommend', recommend,
        'response', response,
        'body', body,
        'date', date,
        'reviewer_name', reviewer_name,
        'helpfulness', helpfulness,
        'photos', (SELECT COALESCE(JSON_AGG(JSON_BUILD_OBJECT('id', id, 'url', url)),'[]')
              FROM reviews_photos
              WHERE review_id = reviews.id)

      ))
      ) AS results
      FROM reviews
      WHERE product_id = ${obj.product_id}
      AND reported = FALSE
      GROUP BY reviews.id
        ORDER BY ${obj.sort} DESC
        LIMIT ${obj.count}
        OFFSET ${(obj.page - 1) * obj.count}
      `





      SELECT JSON_OBJECT_AGG(rating, ratingCount)
FROM(SELECT rating, count(*) AS ratingCount FROM reviews WHERE product_id = 30344);




SELECT reviews.id AS review_id, reviews.rating, reviews.summary, reviews.recommend, reviews.response, reviews.body, reviews.date, reviews.reviewer_name, reviews.helpfulness,
  (SELECT COALESCE(JSON_AGG(JSON_BUILD_OBJECT('id', id, 'url', url)), '[]')
        FROM reviews_photos
        WHERE review_id = reviews.id) AS photos
      FROM reviews
      WHERE product_id = 30344
      AND reported = FALSE
      ORDER BY date DESC
      LIMIT 5


  explain analyze SELECT JSON_AGG(JSON_BUILD_OBJECT(
    'review_id', id,
    'rating', rating,
    'summary', summary,
    'recommend', recommend,
    'response', response,
    'body', body,
    'date', date,
    'reviewer_name', reviewer_name,
    'helpfulness', helpfulness,
    'photos', (SELECT COALESCE(JSON_AGG(JSON_BUILD_OBJECT('id', id, 'url', url)), '[]')
              FROM reviews_photos
              WHERE review_id = reviews.id)

  ))
      FROM reviews
      WHERE product_id = 30344
      AND reported = FALSE
      GROUP BY reviews.id
        ORDER BY date DESC
        LIMIT 5


 explain analyze SELECT
30344 AS product_id,
  (SELECT JSON_OBJECT_AGG(rating, rateCount)
FROM(SELECT rating, COUNT(*) AS rateCount
          FROM reviews
          WHERE product_id = 30344
          GROUP BY rating) AS x
      ) AS ratings,
  (SELECT JSON_OBJECT_AGG(recommend, recCount)
FROM(SELECT recommend, COUNT(*) AS recCount
          FROM reviews
          WHERE product_id = 30344
          GROUP BY recommend) AS x
      ) AS recommended,
  (SELECT JSON_OBJECT_AGG(name, JSON_BUILD_OBJECT('id', characteristic_id, 'value', avgVal))
FROM(SELECT name, characteristic_id, AVG(value) AS avgVal
        FROM characteristics_reviews
        INNER JOIN characteristics c ON c.id = characteristics_reviews.characteristic_id
        WHERE product_id = 30344
        GROUP BY name, characteristic_id) AS x
      ) AS characteristics