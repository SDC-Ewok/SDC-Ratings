const express = require('express');
const controller = require('./controller');
const client = require('./database');

const app = express();

app.use(express.json())
// app.use(express.static('client/dist'));
app.get('/reviews', controller.get)
app.get('/reviews/meta', controller.getMeta)
app.put('/reviews/:review_id/helpful', controller.putHelpful)
app.put('/reviews/:review_id/report', controller.putReported)
// app.post('/review', controller.post)

app.listen(3000, () => {
  console.log("Sever is now listening at port 3000");
})
client.connect()