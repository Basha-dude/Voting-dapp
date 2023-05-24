
const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");


describe("Voting", function () {
  let voting
  beforeEach(async () => {
      [owner,voter1] = await ethers.getSigners();

    const Voting = await ethers.getContractFactory("Voting");
    voting = await Voting.deploy(["Basha","Rasool","Siddu"],60);

  })
  it("should pass the voting start", async () => {
    const votingStart = await voting.votingStart();
    console.log("voting start in state variable ",votingStart);
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const tolerance = 5; // Tolerance of 5 seconds
  
    expect(votingStart).to.be.within(
      currentTimestamp - tolerance,
      currentTimestamp + tolerance
    );
    console.log("  currentTimestamp - tolerance",  currentTimestamp - tolerance,);
  
  });
   
  it("should pass the voting end", async () => {
    const votingStart = await voting.votingStart();
    const votingDuration = 60; // Duration in minutes
    const votingEnd = votingStart.add(votingDuration * 60); // Convert minutes to seconds
    const tolerance = 5;
    console.log("voting end in state variable",votingEnd);
    expect(await voting.votingEnd()).to.be.within(
      votingEnd.sub(tolerance),
      votingEnd.add(tolerance)
    );
   });
  

    it("should return the owner as Organisation",async () => {
      expect(await voting.owner()).to.eq(owner.address);
    })
      describe('Get all Candidates', () => { 
        it("should return the candidates",async () => {
          const candidates = await voting.getAllVotesOfCandiates();
          expect(candidates.length).to.equal(3);
          expect(candidates[0].name).to.equal('Basha');
          expect(candidates[0].voteCount).to.equal(0);

          expect(candidates[1].name).to.equal('Rasool');
          expect(candidates[1].voteCount).to.equal(0);

          expect(candidates[2].name).to.equal('Siddu');
          expect(candidates[2].voteCount).to.equal(0);
       })
        })

        describe('Vote', () => { 
        
              beforeEach(async () => {
                await voting.vote(0);
              })
              it("should revert a vote",async () => {
             const candidates = await voting.getAllVotesOfCandiates();
             expect(candidates[0].voteCount).to.equal(1);
            })
         

          it("should revert a vote",async () => {
            await expect(voting.vote(0)).to.be.revertedWith("You have already voted.");
         })
         it("should revert a vote",async () => {
          await expect(voting.connect(voter1).vote(5)).to.be.revertedWith("Invalid candidate index.");
       })
       describe('Add Candidate', () => { 
        beforeEach(async () =>{
          await voting.addCandidate("Naseer");
        })
        it("should add a candidate",async () => {
          const candidates = await voting.getAllVotesOfCandiates();
          expect(candidates[3].name).to.equal("Naseer");
          expect(candidates[3].voteCount).to.equal(0);

        })
        it("should revert add candidate",async () => {
          await expect(voting.connect(voter1).addCandidate("Naseer")).to.be.reverted;
       })

        })

        describe('Get voting status', () => { 
          it("should show the voting status",async () => {
            const votingDuration = 60;
            const votingStart = await voting.votingStart(); 
            const votingEnd = votingStart.add(votingDuration * 60)
            const VotingStatus = await voting.getVotingStatus();
            console.log("voting start",votingStart);
            console.log(VotingStatus);
            console.log("voting end",votingEnd);
            expect(VotingStatus).to.eq(true);
          })
         
        })
        describe('Get remaining Time', () => { 
          it("should return the remaining time",async () => {
            const votingDuration = 60;
            const votingStart = await voting.votingStart();
            console.log("voting start in reaming ",votingStart);
            const votingEnd = votingStart.add(votingDuration * 60);
            const currentTimestamp = Math.floor(Date.now() / 1000);
            const remainingTime = await voting.getRemainingTime();
              expect(await voting.getRemainingTime()).to.eq(remainingTime)
          })
         })
      
  })
})



