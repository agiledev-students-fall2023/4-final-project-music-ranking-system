const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

const expect = chai.expect;
chai.use(chaiHttp);

describe("my profile  API", () => {
    it("should return an array of the top songs that has 4 elements with 3 specific properties", (done) => {

      // chai.request(app)
      //        .get("/myProfile/")
      //       .end((err, res) => {
      //           //expect(res).to.have.status(200);
      //           //expect(res.body).to.have.property("userId", "user2");
      //           expect(res.body).to.have.property("topSongs").to.be.an("array");
      //           expect(res.body).to.have.property("activity").to.be.an("array");
                
      //           expect(res.body.topSongs).to.have.lengthOf.at.least(4);
      //           res.body.topSongs.forEach((song) => {
      //               expect(song).to.have.property("songName").to.be.a("string");
      //               expect(song).to.have.property("albumCover").to.be.a("string");
      //               expect(song).to.have.property("artistName").to.be.a("string");
      //           });

      //           expect(res.body.activity).to.have.lengthOf.at.least(4);
      //           res.body.activity.forEach((activity) => {
      //               expect(activity).to.have.property("review").to.be.a("string");
      //               expect(activity).to.have.property("rating").to.be.a("number");
      //               expect(activity).to.have.property("songName").to.be.a("string");
      //               expect(song).to.have.property("artistName").to.be.a("string");
      //           });
      //           done();
      //       });
      
      chai
        .request(app)
        .get("/myProfile/")
        .end((err, res) => {
          console.log("Response Body:", res.body);
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");

          expect(res.body).to.have.property("topSongs").to.be.an("array");
          expect(res.body.topSongs).to.have.lengthOf.at.least(4);
  
          res.body.topSongs.forEach((song) => {
            expect(song).to.be.an("object");
            expect(song).to.include.keys("songName", "albumCover", "artistName");
          });
  
          expect(res.body).to.have.property("activity").to.be.an("array");
          expect(res.body.activity).to.have.lengthOf.at.least(4);
  
          res.body.activity.forEach((activity) => {
            expect(activity).to.be.an("object");
            expect(activity).to.include.keys("review", "rating", "songName", "artistName");
          });
  
          // res.body.topSongs.forEach((song) => {
          //   expect(song).to.include.keys(
          //     "songName",
          //     "albumCover",
          //     "artistName",
          //   );
          //   if (index === 0) {
          //     expect(song.songName).to.deep.equal("Born To Die");
          //     expect(song.albumCover).to.deep.equal("https://picsum.photos/200");
          //     expect(song.artistName).to.deep.equal("Lana Del Rey");
          //   }
          //   if (index === 1) {
          //       expect(song.songName).to.deep.equal("Candy");
          //       expect(song.albumCover).to.deep.equal("https://picsum.photos/200");
          //       expect(song.artistName).to.deep.equal("Doja Cat");
          //   }
          //   if (index === 2) {
          //       expect(song.songName).to.deep.equal("Heartless");
          //       expect(song.albumCover).to.deep.equal("https://picsum.photos/200");
          //       expect(song.artistName).to.deep.equal("Weekend");
          //   }
          //   if (index === 3) {
          //       expect(song.songName).to.deep.equal("Bad Liar");
          //       expect(song.albumCover).to.deep.equal("https://picsum.photos/200");
          //       expect(song.artistName).to.deep.equal("Selena Gomez");
          //   }
          // });
          done();
        });
    });
  });


  // describe("Top Songs API", () => {
  //   it("should return an array of the top songs that has 4 elements with 3 specific properties", (done) => {
  //     chai
  //       .request(app)
  //       .get("/myProfile/")
  //       .end((err, res) => {
  //         console.log("Response Body:", res.body);
  //         expect(res.body).to.be.an("object");
  
  //         res.body.forEach((item, index) => {
  //           expect(item).to.include.keys(
  //             "songName",
  //             "albumCover",
  //             "artistName",
  //           );
  //           if (index === 0) {
  //             expect(item.songName).to.deep.equal("Born To Die");
  //             expect(item.albumCover).to.deep.equal("https://picsum.photos/200");
  //             expect(item.artistName).to.deep.equal("Lana Del Rey");
  //           }
  //           if (index === 1) {
  //               expect(item.songName).to.deep.equal("Candy");
  //               expect(item.albumCover).to.deep.equal("https://picsum.photos/200");
  //               expect(item.artistName).to.deep.equal("Doja Cat");
  //           }
  //           if (index === 2) {
  //               expect(item.songName).to.deep.equal("Heartless");
  //               expect(item.albumCover).to.deep.equal("https://picsum.photos/200");
  //               expect(item.artistName).to.deep.equal("Weekend");
  //           }
  //           if (index === 3) {
  //               expect(item.songName).to.deep.equal("Bad Liar");
  //               expect(item.albumCover).to.deep.equal("https://picsum.photos/200");
  //               expect(item.artistName).to.deep.equal("Selena Gomez");
  //           }
  //         });
  //         done();
  //       });
  //   });
  // });