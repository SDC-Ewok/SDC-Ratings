



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