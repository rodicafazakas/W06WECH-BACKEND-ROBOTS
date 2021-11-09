const express = require('express');
const { getRobots, getRobotById, createRobot, deleteRobotById} = require("../controllers/robotsControllers");


const router = express.Router();
const auth = require("../auth");

router.get('/', getRobots);

router.get("/:idRobot", getRobotById);

router.post("/create", createRobot);

router.delete("/delete/:idRobot", auth, deleteRobotById);

module.exports = router;
