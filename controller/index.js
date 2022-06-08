const models = require('../models')

module.exports = {
  get: function (req, res) {
    models.get((err, data) => {
      if (err) {
        res.status(404).send(err)
      } else {
        res.status(200).send(data)
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