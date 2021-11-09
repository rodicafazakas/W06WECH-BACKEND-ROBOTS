require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../../database/models/User");
const {loginUser} = require("./usersControllers");
const bcrypt =require("bcrypt");

jest.mock("../../database/models/User");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("Given a loginUser action", ()=> {
  describe("When it receives wrong username", ()=>{
    test("Then it should invoke the next function", async ()=>{
      User.findOne = jest.fn().mockedResolvedValue(null);
      const req = {
        body: {
          username: "luis",
          password: "luis"
        }
      }
      const next=jest.fn();
      const expectedError = new Error("Wrong credentials");
      expectedError.code=401;

      await loginUser(req, null, next) {

      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code)
      }
    })
  })

  describe("When it receives a right username and a wrong password", ()=>{
    test("Then it should invoke the next function with a 401 error", async ()=> {
      User.findOne = jest.fn().mockResolvedValue({
        username: "luis",
        password: "luis"
      });
      bcrypt.compare = jest.fn();
      const req={
        body: {
          name: "luis",
          password: "luis"
        }
      }
      const res = null;
      const next = jest.fn();
      const expectedError =new Error("Wrong credentials");
      expectedError.code =401;

      await loginUser(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty("message", expectedError.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code;
    })
  })

  describe("When it receives right username and password", ()=>{
    test("Then it should invoke the res.json with an object with the token inside", async ()=>{
      
      User.findOne = jest.fn().mockResolvedValue({
        name: "luis",
        password:"luis"
      });
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      const req={
        body: {
          name: "luis",
          password: "luis"
        }
      }
      const res = {
        json: jest.fn(),
      }
      const expectedToken ="papaya";
      jwt.sign = jest.fn().mockReturnValue(expectedToken);

      const expectedResponse = {
        token: expectedToken,
      }
      await loginUser(req, res);

      expect(jest.json).toHaveBeenCalledWith(expectedResponse);

    })
  })
})