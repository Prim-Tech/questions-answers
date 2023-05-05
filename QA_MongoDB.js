const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Questions = new Schema({
  questions_id: {
    type: Number,
    unique: true,
  },
  product_id: {
    type: Number,
    unique: true,
  },
  question_body: String,
  question_date: String,
  asker_name: String,
  question_helpfulness: Number,
  reported: Boolean,
  email: String,
});

const Answers = new Schema({
  answers_id: {
    type: Number,
    unique: true,
  },
  questions_id: {
    type: Number,
    unique: true,
  },
  body: String,
  date: String,
  answerer_name: String,
  helpfulness: Number,
  email: String,
});

const Photos = new Schema({
  photo_id: {
    type: Number,
    unique: true,
  },
  url: String,
});
