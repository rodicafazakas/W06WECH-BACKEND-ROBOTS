const Robot = require('../../database/models/Robot');

const getRobots = async (req, res) => {
  const robots = await Robot.find({});
  res.json(robots);
};

const getRobotById = async (req, res, next) => {
  const {idRobot} = req.params;
  try {
    const searchedRobot = Robot.findById(idRobot);
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
}

const deleteRobotById = async (req, res, next) => {
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
  deleteRobotById,
};