const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../app");
const expect = chai.expect;

chai.use(chaiHttp);

describe("home_page", function() {
  it("should return a jwt token when app loads", function() {
    chai
      .request(app)
      .get("/")
      .end((error, response) => {
        if (error) {
          console.log(error);
        }
        expect(response).to.have.status(200);
        expect(response.body).to.have.property("token");
      });
  });
});
