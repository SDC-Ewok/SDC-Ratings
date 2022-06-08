const db = require('../database')

module.exports = {
  get: function (callback) {
    db.query('select * from reviews limit 5', (err, data) => {
      if (err) {
        console.log(err)
      } else {
        callback(err, data.rows)
      }
    })
  },
  // getMeta: function (req, res) {

  // },
  // putHelpful: function (req, res) {

  // },
  // putReported: function (req, res) {

  // },
  // post: function (req, res) {

  // },
}