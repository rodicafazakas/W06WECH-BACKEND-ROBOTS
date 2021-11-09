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

beforeAll( async () => {
  await connectDB(process.env.MONGODB_TEST_STRING);
  server = await initializeServer(process.env.SERVER_PORT_TEST);
}

);

beforeEach( async () => {
  const {body} =  await request
    .post("/users/login")
    .send({username: "luis", password: "luisin"})
    .expect(200);
  token = body.token;
  await Robot.deleteMany();
  await Robot.create({
    _id: "618aab9eae0f1220eb7b9d92", 
    name: "R2D2",
    image: "https://media.istockphoto.com/photos/-picture-id500962582?s=612x612",
    features: {
      speed: 5,
      strength: 10,
      creation_date: "1980-10-6"
    }
  });
});

afterAll(async () => {
	await mongoose.connection.close();
	await server.close();
})

describe("Given a /robots router ", ()=>{
	describe("When a GET request to robots arrives", ()=>{
		test("Then it should respond with an array of robots and a 200 status", async () => {
			const {body} = await request
        .get("/robots")
				.set("Authorization", `Bearer ${token}`)
				.expect(200);

			expect(body).toHaveLength(1);
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
	  })
});  