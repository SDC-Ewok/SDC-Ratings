const db = require('../database')

module.exports = {
  getTest: function (callback) {
    db.query(`
    SELECT reviews.rating AS rating,
    count(reviews.rating) AS total
    FROM reviews
    WHERE product_id = 65660
    GROUP BY rating;
    `, (err, data) => {
      if (err) {
        console.log(err)
      } else {
        callback(err, data.rows)
      }
    })
  },
  get: function (obj, callback) {
    let sorter = !obj.sort || obj.sort === 'relevant' || obj.sort === 'helpful' ? 'ORDER BY helpfulness DESC' : 'ORDER BY date DESC'
    console.log(sorter)
    db.query(
      `SELECT review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness, photos
      FROM reviewData
      WHERE product_id=${obj.product_id}
      AND reported = FALSE
      ${sorter}
      LIMIT ${obj.count}
      `
      , (err, data) => {
        if (err) {
          console.log(err)
        } else {
          callback(err, {
            product: obj.product_id,
            page: obj.page,
            count: obj.count,
            results: data.rows
          })
        }
      })
  },
  // getMeta: function (req, res) {
  //   db.query('select * from characteristics_reviews limit 5', (err, data) => {
  //     if (err) {
  //       console.log(err)
  //     } else {
  //       callback(err, data.rows)
  //     }
  //   })
  // },
  putHelpful: function (id, callback) {
    db.query(`
    UPDATE reviewData
    SET helpfullness = helpfulness + 1
    WHERE review_id = ${id}
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
    UPDATE reviewData
    SET reported = true
    WHERE review_id = ${id}
     `, (err, data) => {
      if (err) {
        console.log(err)
      } else {
        callback(err, data.rows)
      }
    })
  },
  // post: function (req, res) {

  // },
}