const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

const expect = chai.expect;
chai.use(chaiHttp);

describe("Search API", () => {
  it("should return an array of 3 elements with specific properties", (done) => {
    chai
      .request(app)
      .get("/search/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array").with.lengthOf(3);

        res.body.forEach((item, index) => {
          expect(item).to.include.keys(
            "artist",
            "cover",
            "id",
            "rating",
            "review",
            "song"
          );
          if (index === 0) {
            expect(item.artist).to.equal("Taylor Swift");
            expect(item.cover).to.equal("https://picsum.photos/id/13/200/300");
            expect(item.id).to.equal(1);
            expect(item.rating).to.equal(10);
            expect(item.review).to.equal("This is review 1");
            expect(item.song).to.equal("Song 1");
          }
          if (index === 1) {
            expect(item.artist).to.equal("Eminem");
            expect(item.cover).to.equal("https://picsum.photos/id/20/200/300");
            expect(item.id).to.equal(2);
            expect(item.rating).to.equal(9);
            expect(item.review).to.equal("This is review 2");
            expect(item.song).to.equal("Song 2");
          }
          if (index === 2) {
            expect(item.artist).to.equal("Drake");
            expect(item.cover).to.equal("https://picsum.photos/id/30/200/300");
            expect(item.id).to.equal(3);
            expect(item.rating).to.equal(8);
            expect(item.review).to.equal("This is review 3");
            expect(item.song).to.equal("Song 3");
          }
        });
        done();
      });
  });
  it("should handle API errors and return 500 status", (done) => {
    const axiosMock = require("axios-mock-adapter");
    const mock = new axiosMock(require("axios"));
    mock
      .onGet("https://api.mockaroo.com/api/d8caa150?count=3&key=9b1fc5d0")
      .reply(500, { error: "Internal Server Error" });

    chai
      .request(app)
      .get("/search/")
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.deep.equal({ error: "Internal Server Error" });

        mock.restore();
        done();
      });
  });
});
