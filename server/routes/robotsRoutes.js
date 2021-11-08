const express = require('express');
const { getRobots, getRobotById, createRobot, deleteRobotById} = require("../controllers/robotsControllers");
const {auth} = require("../auth"); 


const router = express.Router();

router.get('/', getRobots);

router.get("/:idRobot", getRobotById);

router.post("/create", createRobot);

router.delete("/delete/:idRobot", deleteRobotById);

module.exports = router;
