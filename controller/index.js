const models = require('../models')

module.exports = {
  get: function (req, res) {
    console.log(req.query)
    let page = req.query.page || 1;
    let count = req.query.count || 5;
    let sort = req.query.sort || 'recommend';
    let product_id = req.query.product_id;
    models.get({ page, count, sort, product_id }, (err, data) => {
      if (err) {
        res.status(404).send(err)
      } else {
        res.status(200).send(data)
      }
    })
  },
  getMeta: function (req, res) {
    models.getMeta(req.query.id, (err, data) => {
      if (err) {
        res.status(404).send(err)
      } else {
        res.status(200).send(data)
      }
    })
  },
  putHelpful: function (req, res) {
    models.putHelpful(req.params.review_id, (err, data) => {
      if (err) {
        res.status(404).send(err)
      } else {
        res.status(200).send(data)
      }
    })
  },
  putReported: function (req, res) {
    models.putReported(req.params.review_id, (err, data) => {
      if (err) {
        res.status(404).send(err)
      } else {
        res.status(200).send(data)
      }
    })
  },
  post: function (req, res) {
    models.post(req.body, (err, data) => {
      if (err) {
        res.status(404).send(err)
      } else {
        res.status(200).send(data)
      }
    })
  },
}