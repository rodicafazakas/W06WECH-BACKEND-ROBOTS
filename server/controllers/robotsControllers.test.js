const Robot = require("../../database/models/Robot");
const {getRobots, getRobotById} = require("./robotsControllers");

describe("Given a getRobots function", () => {
  describe("When it receives an object response", () => {
    test("Then it should invoke its json method", async () => {
      const robots =  {
        id: 1,
        name: "R2-D2",
        image: "https://media.istockphoto.com/photos/-picture-id500962582?s=612x612",
        features: {
          speed: 4,
          strength: 9,
          creationDate: 1977,
        }
      }
      Robot.find = jest.fn().mockResolvedValue(robots);
      const res = {
        json: jest.fn(),
      }

      await getRobots(null, res);

      expect(Robot.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(robots);
    })
  })
});

describe("Given a getRobotById function", () => {
  describe("When it receives a request with an id of 2, a response object and a next function", () => {
    test("Then it should invoke Robot.findById with a 2", async() => {
      const idRobot = 2;
      Robot.findById = jest.fn().mockResolvedValue({});
      const req = {
        params: {
          idRobot
        }
      }
      const res = {
        json: jest.fn()
      }
      const next = () => {}

      await getRobotById(req, res, next);

      expect(Robot.findById).toHaveBeenCalledWith(idRobot);

    })
  })
})