const models = require('../models')

module.exports = {
  getTest: function (req, res) {
    models.getTest((err, data) => {
      if (err) {
        res.status(404).send(err)
      } else {
        res.status(200).send(data)
      }
    })
  },
  get: function (req, res) {
    models.get(req.query, (err, data) => {
      if (err) {
        res.status(404).send(err)
      } else {
        res.status(200).send(data)
      }
    })
  },
  // getMeta: function (req, res) {
  //   models.getMeta((err, data) => {
  //     if (err) {
  //       res.status(404).send(err)
  //     } else {
  //       res.status(200).send(data)
  //     }
  //   })
  // },
  putHelpful: function (req, res) {

    models.putHelpful(req.body.id, (err, data) => {
      if (err) {
        res.status(404).send(err)
      } else {
        res.status(200).send(data)
      }
    })
  },
  putReported: function (req, res) {
    models.putReported(req.body.id, (err, data) => {
      if (err) {
        res.status(404).send(err)
      } else {
        res.status(200).send(data)
      }
    })
  },
  // post: function (req, res) {

  // },
}