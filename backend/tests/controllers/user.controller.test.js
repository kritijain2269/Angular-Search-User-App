const chai = require("chai");
const expect = chai.expect;
const jwt = require("jsonwebtoken");
const app = require("../../app");


describe("user controller", function() {
  it("should return all users list", function() {
    const token = jwt.sign({ name: "testUser" }, "secret_key", {
      expiresIn: "1h"
    });
    chai
      .request(app)
      .get("/users")
      .set("Authorization", "Bearer " + token)
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body).to.have.length.above(1);
      });
  });

  it("should return a list of users based on search term", function() {
    const token = jwt.sign({ name: "testUser" }, "secret_key", {
      expiresIn: "1h"
    });
    chai
      .request(app)
      .get("/user/a")
      .set("Authorization", "Bearer " + token)
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body).to.have.lengthOf(1);
      });
  });
});
