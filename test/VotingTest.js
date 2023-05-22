
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting", function () {
  let voting
  beforeEach(async () => {
      [owner] = await ethers.getSigners();

    const Voting = await ethers.getContractFactory("Voting");
    voting = await Voting.deploy(["Basha","Rasool","Siddu"],60);

  })
  it("should pass the voting start", async () => {
    const votingStart = await voting.votingStart();
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const tolerance = 5; // Tolerance of 5 seconds
  
    expect(votingStart).to.be.within(
      currentTimestamp - tolerance,
      currentTimestamp + tolerance
    );
  });
  
    it("should return the owner as Organisation",async () => {
      expect(await voting.Organization()).to.eq(owner.address);
    })
      describe('Get all Candidates', () => { 
        it("should return the candidates",async () => {
          const candidates = await voting.getAllCandidates();
          expect(candidates.length).to.equal(3);
          expect(candidates[0].name).to.equal('Basha');
          expect(candidates[0].voteCount).to.equal(0);

          expect(candidates[1].name).to.equal('Rasool');
          expect(candidates[1].voteCount).to.equal(0);

          expect(candidates[2].name).to.equal('Siddu');
          expect(candidates[2].voteCount).to.equal(0);

        })
        
       })
  })



