const debug = require('debug')("robots:robotsController");
const chalk = require("chalk");

const Robot = require('../../database/models/Robot');

const getRobots = async (req, res) => {
  const robots = await Robot.find({});
  res.json(robots);
};

const getRobotById = async (req, res, next) => {
  const {idRobot} = req.params;
  try {
    const searchedRobot = await Robot.findById(idRobot);
    if (searchedRobot) {
      res.json(searchedRobot);
    } else {
      const error = new Error("Robot not found");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    next(error);
  }
};

const createRobot = async (req, res, next) => {
  try {
    const robot = req.body;
    const newRobot = await Robot.create(robot);
    res.status(201).json(newRobot);
  } catch (error) {
    error.code = 400;
    next(error);
  }
};


const updateRobot = async (req, res, next) => {
  const robot = req.body;
  try {
    const updatedRobot = await Robot.findByIdAndUpdate(robot.id, robot, { new: true });
    res.json(updatedRobot);
  } catch {
    const error = new Error("Robot not found");
    error.code = 404;
    next(error);
  };
};

const deleteRobotById = async (req, res, next) => {
  debug(chalk.yellow(req.params));
  const { idRobot } = req.params;

  try {
    const robotToDelete= await Robot.findByIdAndDelete(idRobot);
    if (robotToDelete) {
      res.json(robotToDelete);
    } else {
      const error = new Error("Robot not found");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    next(error);
  }

} 

module.exports = {
  getRobots,
  getRobotById,
  createRobot,
  updateRobot,
  deleteRobotById
};