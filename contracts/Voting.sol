// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Voting {
    
    address public Organization ;

    struct Candidate {
        string name;
        uint256 voteCount;
    }

      mapping(address => bool) public hasVoted;
      Candidate[] public candidates;
      uint256 public votingStart;
      uint256 public votingEnd;

    constructor( string[] memory _candidateNames, uint256 _durationInMinutes)  {
        Organization = msg.sender;
        for (uint i = 0; i < _candidateNames.length; i++) {
            candidates.push(Candidate(_candidateNames[i],0));
            
            }
             votingStart = block.timestamp;
              votingEnd = block.timestamp + (_durationInMinutes * 1 minutes);

  
        }

  function vote(string memory name) public  {
    require(hasVoted[msg.sender] == false);
    for (uint i = 0; i < candidates.length; i++) {
      
    }
       
  }

  function getAllCandidates() public view returns(Candidate[] memory) {
     return candidates;
}

function getVotingStatus() public view  returns(bool) {
  return(block.timestamp >= votingStart && block.timestamp < votingEnd);
}


function getRemainingTime() public view  returns(uint) {
   require(block.timestamp >= votingStart);
   if (block.timestamp >= votingEnd) {
      return 0;
   }
   return votingEnd - block.timestamp;
}

}