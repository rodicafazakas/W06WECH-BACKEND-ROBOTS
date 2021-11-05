const express = require('express');
const Robot = require('../../database/models/Robot');

const router = express.Router();

router.get('/', async (req, res) => {
  const robots = await Robot.find({});
  res.json(robots);
});

module.exports = router;
