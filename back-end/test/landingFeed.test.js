const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const axios = require("axios");
const expect = chai.expect;
chai.use(chaiHttp);

describe("Landing Feed", () => {
    afterEach(() => {
        sinon.restore();
    });

    it("should retrieve data from the external API", (done) => {
        const mock_response = {data: [{prop: "value"}]};
        const getStub = sinon.stub(axios, "get").resolves(mock_response);

        chai.request(app)
        .get("/landingFeed/retrieve")
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("array"); 
            expect(res.body).to.deep.equal(mock_response.data);
            expect(getStub.calledOnce).to.be.true;
            done();
        });
    });

    it("should handle errors from the external API", (done) => {
        const err_response = new Error("Internal Server Error");
        const getStub = sinon.stub(axios, "get").rejects(err_response);

        chai.request(app)
        .get("/landingFeed/retrieve")
        .end((err, res) => {
            expect(res).to.have.status(500);
            expect(res.body).to.deep.equal({ error: "Internal Server Error" });
            expect(getStub.calledOnce).to.be.true;
            done();
        });
    });
});
