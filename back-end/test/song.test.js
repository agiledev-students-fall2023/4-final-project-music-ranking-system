const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const assert = require("assert");

const expect = chai.expect;
chai.use(chaiHttp);

describe("POST request to /song/:songArtist/:songTitle/save", () => {
  it("should respond with an HTTP 200 status code and a new post object in the response body, currently with any input", (done) => {
    chai
      .request(app)
      .post("/song/songArtist/songTitle/save")
      .send({user: "username", rating: 5, review: "testing review..."})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a("object");
        expect(res.body.user).to.be.a("string")
        expect(res.body.rating).to.be.a("number")
        expect(res.body.review).to.be.a("string")
        done();
      });
  });
});

// describe("GET request to /song/:songArtist/:songTitle", () => {
//     it("should respond with an HTTP 200 status code and a song object in the response body, currently with any input", (done) => {
//         chai
//           .request(app)
//           .get("/song/songArtist/songTitle")
//           .end((err, res) => {
//             expect(res).to.have.status(200);
//             // expect(res).to.be.json;
//             // expect(res.body).to.be.a("object");
//             done();
//           });
//       });
// });
