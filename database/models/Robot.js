const { Schema, model } = require('mongoose');

const robotSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  features: {
    speed: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
    },
    strength: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
    },
    creation_date: {
      type: Date,
      required: true,
    },
  },
});

const Robot = model('Robot', robotSchema);

module.exports = Robot;
