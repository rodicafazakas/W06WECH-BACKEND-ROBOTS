const Robot = require("../../database/models/Robot");
const {getRobots, 
       getRobotById, 
       deleteRobotById } = require("./robotsControllers");

jest.mock("../../database/models/Robot");

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

  describe("When Robot.findById rejects", () => {
    test("Then it should invoke the next functio with the error rejected", async() => {
      const error = {};
      Robot.findById = jest.fn().mockRejectedValue(error);
      const req = {
        params: {
          idRobot: 0,
        }
      };
      const res = {};
      const next = jest.fn(); 

      await getRobotById(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error).toHaveProperty("code");
      expect(error.code).toBe(400);
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

describe("Given a deleteRobotById", () => {
  describe("When it receives a request with an id of 2, a response object and a next function", () => {
    test("Then it should invoke Robot.findByIdAndDelete with a 2", async() => {
      const idRobot = 2;
      Robot.findByIdAndDelete = jest.fn().mockResolvedValue({});
      const req = {
        params: {
          idRobot,
        },
      };
      const res = {
        json: jest.fn()
      };
      const next = () => {}; 

      await deleteRobotById (req, res, next);
      expect(Robot.findByIdAndDelete).toHaveBeenCalledWith(idRobot);
    })
  } )
})


describe("Given an updateRobot function", ()=>{
  describe("When a it receives a non existent robot", ()=>{
		test("Then it should respond with a 404 error", async () => {
      Robot.findByIdAndUpdate = jest.fn().mockResolvedValue(null);
			const req = {
        body: {
          id: "618805d2694b6329b6088d58", 
        }
      };
      const next = jest.fn();
      const expectedError = {
        code: 404,
        message: "Robot not found",
      };

      updateRobot(req, null, next);

			expect(next).toHaveBeenCalledWith(expectedError);
	});


  describe("When a it receives an existent robot", ()=>{
		test("Then it should respond with the updated robot", async () => {
      const updatedRobot = {
        id: "618aab9eae0f1220eb7b9d92", 
        name: "R2D2",
        image: "https://media.istockphoto.com/photos/-picture-id500962582?s=612x612",
        features: {
          speed: 5,
          strength: 10,
          creation_date: "1980-10-05T23:00:00.000Z"
        }
      };
      Robot.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedRobot);
      const req = {
        body: {
          id: "618805d2694b6329b6088d59", 
        }
      };
      const res= {
        json: jest.fn();
      }
			
      updateRobot(req, res);

      expect(res.json).toHabeenCalled();
	  });
  });  
});