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
  const { token } = req.query;
  
  if (token !== process.env.ACCESS_TOKEN) {
    const error = new Error("Unauthorized");
    error.code = 401;
    next(error);
  }

  try {
    const robot = req.body;
    const newRobot = await Robot.create(robot);
    res.json(newRobot);
  } catch (error) {
    error.code = 400;
    next(error);
  }
};


const deleteRobotById = async (req, res, next) => {
  debug(chalk.yellow(req.params));
  const { token } = req.query;
  const { idRobot } = req.params;

  if (token !== process.env.ACCESS_TOKEN) {
    const error = new Error("Unauthorized");
    error.code = 401;
    next(error);
  }

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
  deleteRobotById,
};