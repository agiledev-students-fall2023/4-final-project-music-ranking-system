const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

const expect = chai.expect;
chai.use(chaiHttp);

describe("Other User API", () => {
    it('should retrieve user by ID', (done) => {
        chai.request(app)
            .get("/other-user/user2")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property("userId", "user2");
                expect(res.body).to.have.property("topSongs").to.be.an("array");
                expect(res.body).to.have.property("activity").to.be.an("array");
                
                expect(res.body.topSongs).to.have.lengthOf.at.least(4);
                res.body.topSongs.forEach((song) => {
                    expect(song).to.have.property("songName").to.be.a("string");
                    expect(song).to.have.property("artistName").to.be.a("string");
                    expect(song).to.have.property("albumCover").to.be.a("string");
                });

                expect(res.body.activity).to.have.lengthOf.at.least(3);
                res.body.activity.forEach((activity) => {
                    expect(activity).to.have.property("review").to.be.a("string");
                    expect(activity).to.have.property("rating").to.be.a("number");
                    expect(activity).to.have.property("songName").to.be.a("string");
                });
                done();
            });
    });
});