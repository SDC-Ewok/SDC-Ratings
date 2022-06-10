const db = require('../database')

module.exports = {
  // SELECT reviews.id AS review_id, reviews.rating, reviews.summary, reviews.recommend, reviews.response, reviews.body, reviews.date, reviews.reviewer_name, reviews.helpfulness,
  //       (SELECT COALESCE(JSON_AGG(JSON_BUILD_OBJECT('id', id, 'url', url)),'[]')
  //       FROM reviews_photos
  //       WHERE review_id = reviews.id) AS photos
  //     FROM reviews
  //     WHERE product_id = ${ obj.product_id }
  //     AND reported = FALSE
  //     ${ sorter }
  //     LIMIT ${ obj.count }

  //      `SELECT JSON_BUILD_OBJECT(
  // 'product_id', 30344,
  // 'page', 0,
  // 'count', 5,
  // 'results', (SELECT JSON_AGG(JSON_BUILD_OBJECT(
  //   'review_id', id,
  //   'rating', rating,
  //   'summary', summary,
  //   'recommend', recommend,
  //   'response', response,
  //   'body', body,
  //   'date', date,
  //   'reviewer_name', reviewer_name,
  //   'helpfulness', helpfulness,
  //   'photos', (SELECT COALESCE(JSON_AGG(JSON_BUILD_OBJECT('id', id, 'url', url)),'[]')
  //             FROM reviews_photos
  //             WHERE review_id = reviews.id)
  // ))
  // FROM reviews
  // WHERE product_id = 30344
  // AND reported = FALSE
  // ))
  //     `
  get: function (obj, callback) {
    let sorter = !obj.sort || obj.sort === 'relevant' || obj.sort === 'helpful' ? 'ORDER BY helpfulness DESC' : 'ORDER BY date DESC'
    console.log(sorter)
    db.query(`
        SELECT reviews.id AS review_id, reviews.rating, reviews.summary, reviews.recommend, reviews.response, reviews.body, reviews.date, reviews.reviewer_name, reviews.helpfulness,
        (SELECT COALESCE(JSON_AGG(JSON_BUILD_OBJECT('id', id, 'url', url)),'[]')
        FROM reviews_photos
        WHERE review_id = reviews.id) AS photos
      FROM reviews
      WHERE product_id = ${obj.product_id}
      AND reported = FALSE
      ORDER BY ${obj.sort} DESC
      LIMIT ${obj.count}
      `
      , (err, data) => {
        if (err) {
          console.log(err)
        } else {
          callback(err, {
            product_id: obj.product_id,
            page: obj.page,
            count: obj.count,
            result: data.rows
          })
        }
      })
  },

  getMeta: function (id, callback) {
    db.query(`
    SELECT
      ${id} AS product_id,
      (SELECT JSON_OBJECT_AGG(rating, rateCount)
          FROM (SELECT rating, COUNT(*) AS rateCount
          FROM reviews
          WHERE product_id = ${id}
          GROUP BY rating ) AS x
      ) AS ratings,
      (SELECT JSON_OBJECT_AGG(recommend, recCount)
          FROM (SELECT recommend, COUNT(*) AS recCount
          FROM reviews
          WHERE product_id = ${id}
          GROUP BY recommend ) AS x
      ) AS recommended,
      (SELECT JSON_OBJECT_AGG(name, JSON_BUILD_OBJECT('id', characteristic_id, 'value', avgVal))
        FROM(SELECT name,characteristic_id, AVG(value) AS avgVal
        FROM characteristics_reviews
        INNER JOIN characteristics c ON c.id=characteristics_reviews.characteristic_id
        WHERE product_id = ${id}
        GROUP BY name,characteristic_id) AS x
      ) AS characteristics
    `, (err, data) => {
      if (err) {
        console.log(err)
      } else {
        callback(err, data)
      }
    })
  },
  putHelpful: function (id, callback) {
    db.query(`
    UPDATE reviews
    SET helpfulness = helpfulness + 1
    WHERE id = ${id}
     `, (err, data) => {
      if (err) {
        console.log(err)
      } else {
        callback(err, data.rows)
      }
    })
  },
  putReported: function (id, callback) {
    db.query(`
    UPDATE reviews
    SET reported = true
    WHERE id = ${id}
     `, (err, data) => {
      if (err) {
        console.log(err)
      } else {
        callback(err, data.rows)
      }
    })
  },
  post: function (obj) {
    let photos = [];
    if (obj.photos !== undefined) {
      for (let i = 0; i < obj.photos.length; i++) {
        photos.push({ url: req.photos });
      }
    }
  },
}