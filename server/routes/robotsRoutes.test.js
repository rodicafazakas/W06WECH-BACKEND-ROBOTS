require("dotenv").config();
const supertest = require("supertest");
const debug = require("debug")("robots:testing:robotsRoutes");
const chalk = require("chalk");
const mongoose = require("mongoose");

const {app, initializeServer} = require("..");
const connectDB = require("../../database/index");
const Robot = require("../../database/models/Robot");

const request = supertest(app);

let server;
let token;

// jest.setTimeout(10000);

beforeAll( async () => {
  await connectDB(process.env.MONGODB_TEST_STRING);
  server = await initializeServer(process.env.SERVER_PORT_TEST);
});

beforeEach( async () => {
  debug(chalk.yellow("Before each test"));
  const {body} =  await request
    .post("/users/login")
    .send({username: "luis", password: "luisin"})
    .expect(200);
  token = body.token;
  await Robot.deleteMany({});
  await Robot.create({
    _id: "618aab9eae0f1220eb7b9d92", 
    __v: 0,
    name: "R2D2",
    image: "https://media.istockphoto.com/photos/-picture-id500962582?s=612x612",
    features: {
      speed: 5,
      strength: 10,
      creation_date: "1980-10-6"
    }
  });
  await Robot.create({
    _id: "618bdb942bc5ad961e70b514",
    __v: 0,
    name: "testRobot",
    image: "https://media.istockphoto.com/photos/-picture-id500962582?s=612x612",
    features: {
      speed: 7,
      strength: 10,
      creation_date: "1980-10-05"
    }
  });
});

afterAll( (done) => {
	server.close( async ()=> {
    await mongoose.connection.close();
    done();
  });
})

describe("Given a /robots router ", () => {
  describe("When a GET request arrives without token", () => {
		test("Then it should respond with a 401 error", async () => {
			await request.get("/robots").expect(401);	
		});
	});

	describe("When a GET request to robots arrives", ()=>{
		test("Then it should respond with an array of robots and a 200 status", async () => {
			const { body } = await request
        .get("/robots")
				.set("Authorization", `Bearer ${token}`)
				.expect(200);

			expect(body).toHaveLength(2);
			expect(body).toContainEqual( { 
        id: "618aab9eae0f1220eb7b9d92", 
        name: "R2D2",
        image: "https://media.istockphoto.com/photos/-picture-id500962582?s=612x612",
        features: {
          speed: 5,
          strength: 10,
          creation_date: "1980-10-05T23:00:00.000Z"
        }});		
		  });
	  });

  describe("When it gets a POST request to /robots/create with a new robot", () => {
    test("Then it should respond with the new robot and a 201 status", async () => {
      debug(chalk.yellow("POST TESTS"));
      const { body } = await request
        .post("/robots/create")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Rodney",
          image: "https://media.istockphoto.com/photos/-picture-id500962582?s=612x612",
          features: {
            speed: 8,
            strength: 10,
            creation_date: "1980-10-05T23:00:00.000Z"
          }
        })
        .expect(201);
  
      expect(body).toHaveProperty("name", "Rodney");
    })
  });

  describe("When it gets a DELETE request to /robots/delete/idRoot with an existing id", () => {
    test("Then it should send a response with the id of the respective robot and a 200 status", async () => {
      debug(chalk.yellow("DELETE TESTS"));
      const robotToDelete = {
        _id: "618bdb942bc5ad961e70b514",
        __v: 0,
        name: "testRobot",
        image: "",
        features: {
          speed: 7,
          strength: 10,
          creation_date: "1980-10-05"
        }
      };
      const {body} = await request
        .delete("/roots/delete/618bdb942bc5ad961e70b514")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      console.log(body);
      expect(body).toEqual({id: robotToDelete._id});  
    })
  })


  describe("When it gets a PUT request to /robots/update with an existent object", () => {
    test("Then it should send a response with the updated oject and a 200 status", async () => {
      debug(chalk.yellow("PUT TESTS"))
      const {body} = await request
        .put("robots/update")
        .set("Authorization", `Bearer ${token}`)
        .send({
          _id: "618aab9eae0f1220eb7b9d92", 
          __v: 0,
          name: "R2D2 updated",
          image: "https://media.istockphoto.com/photos/-picture-id500962582?s=612x612",
          features: {
            speed: 10,
            strength: 10,
            creation_date: "1980-10-6"
          }
        })
        .expect(200);

      expect(body).toHaveProperty("name", "R2D2 updated");
    });
  });
});  



  