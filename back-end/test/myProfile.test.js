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


  describe("Activity API", () => {
    it("should return an array of the activity that has 3 elements with 4 specific properties", (done) => {
      chai
        .request(app)
        .get("/myProfile/activities")
        .end((err, res) => {
          expect(res.body).to.be.an("array");
  
          res.body.forEach((item, index) => {
            expect(item).to.include.keys(
              "review",
              "rating",
              "songName",
              "artistName",
            );
            if (index === 0) {
              expect(item.review).to.deep.equal("Love this song! My favorite! Pretend I came up with some more positive comments!");
              expect(item.rating).to.deep.equal(9);
              expect(item.songName).to.deep.equal("Hurts Me");
              expect(item.artistName).to.deep.equal("Lana Del Rey");
            }
            if (index === 1) {
                expect(item.review).to.deep.equal("This song sucks. Overrated. Cannot open Tiktok wo hearing it this is so overplayed.");
              expect(item.rating).to.deep.equal(2);
                expect(item.songName).to.deep.equal("Somebody Else");
                expect(item.artistName).to.deep.equal("Doja Cat");
            }
            if (index === 2) {
                expect(item.review).to.deep.equal("This song is good");
              expect(item.rating).to.deep.equal(6);
                expect(item.songName).to.deep.equal("Heavenly");
                expect(item.artistName).to.deep.equal("Weekend");
            }
          });
          done();
        });
    });
  });