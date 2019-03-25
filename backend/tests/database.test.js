const chai = require("chai");
const expect = chai.expect;
const User = require('../models/user');
const sinon = require('sinon');

describe("database : get all users list", function() {
  this.timeout(0);
  it("database : should return all users list", function(done) {
    var UserMock = sinon.mock(User);
    var expectedResult = { status: true, userList: [] };
    UserMock.expects("find").yields(null, expectedResult);
    User.find(function(err, result) {
      UserMock.verify();
      UserMock.restore();
      expect(result.status).to.be.true;
      done();
    });
  });

    // Test will pass if we fail to get a user
    it("database : should return error", function(done){
      var UserMock = sinon.mock(User);
      var expectedResult = {status: false, error: "Something went wrong"};
      UserMock.expects('find').yields(expectedResult, null);
      User.find(function (err, result) {
          UserMock.verify();
          UserMock.restore();
          expect(err.status).to.not.be.true;
          done();
      });
  });
});

describe("database : get searched user list", function() {
  it("database : should return users list based on search term", function(done) {
    var UserMock = sinon.mock(User);
    var expectedResult = { status: true, userList: [{name : 'ABC'}] };
    UserMock.expects("find").yields(null, expectedResult);
    User.find({name : 'A'}, function(err, result) {
      UserMock.verify();
      UserMock.restore();
      expect(result.status).to.be.true;
      expect(result.userList.length).to.be.equal(1);
      done();
    });
  });

    // Test will pass if we fail to get a user
    it("database : should return error", function(done){
      var UserMock = sinon.mock(User);
      var expectedResult = {status: false, error: "Something went wrong"};
      UserMock.expects('find').yields(expectedResult, null);
      User.find(function (err, result) {
          UserMock.verify();
          UserMock.restore();
          expect(err.status).to.not.be.true;
          done();
      });
  });
});
