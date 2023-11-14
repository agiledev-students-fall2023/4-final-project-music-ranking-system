const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

const expect = chai.expect;
chai.use(chaiHttp);

  describe("Top Songs API", () => {
    it("should return an array of the top songs that has 4 elements with 3 specific properties", (done) => {
      chai
        .request(app)
        .get("/myProfile/songs")
        .end((err, res) => {
          expect(res.body).to.be.an("array");
  
          res.body.forEach((item, index) => {
            expect(item).to.include.keys(
              "songName",
              "albumCover",
              "artistName",
            );
            if (index === 0) {
              expect(item.songName).to.deep.equal("Born To Die");
              expect(item.albumCover).to.deep.equal("https://picsum.photos/200");
              expect(item.artistName).to.deep.equal("Lana Del Rey");
            }
            if (index === 1) {
                expect(item.songName).to.deep.equal("Candy");
                expect(item.albumCover).to.deep.equal("https://picsum.photos/200");
                expect(item.artistName).to.deep.equal("Doja Cat");
            }
            if (index === 2) {
                expect(item.songName).to.deep.equal("Heartless");
                expect(item.albumCover).to.deep.equal("https://picsum.photos/200");
                expect(item.artistName).to.deep.equal("Weekend");
            }
            if (index === 3) {
                expect(item.songName).to.deep.equal("Bad Liar");
                expect(item.albumCover).to.deep.equal("https://picsum.photos/200");
                expect(item.artistName).to.deep.equal("Selena Gomez");
            }
          });
          done();
        });
    });
  });