const mongoose = require('mongoose');

const ratingsreviews = mongoose.Schema({
  id: int,
  rating: int,
  summary: int,
  body: char,
  date: int,
  recommended: boolean,
  helpgulness: int,
  response: [
    {
      id: int,
      body: char,
    }
  ],
  username: char,
  photos: [
    {
      id: int,
      url: char,
    }
  ],
  characteristics: [{
    lable: char,
    value: int,
  }]
});