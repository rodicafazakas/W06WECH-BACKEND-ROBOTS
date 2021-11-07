const express = require('express');
const { getRobots, getRobotById, deleteRobotById} = require("../controllers/robotsControllers");

const router = express.Router();

router.get('/', getRobots);

router.get("/:idRobot", getRobotById);

router.delete("/delete/:idRobot", deleteRobotById)

module.exports = router;
