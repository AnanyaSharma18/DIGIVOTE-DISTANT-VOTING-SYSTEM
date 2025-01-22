package main

import (
    "encoding/json"
    "fmt"
    "github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type VoteCastingContract struct {
    contractapi.Contract
}

type Vote struct {
    VoterID string `json:"voterId"`
    CandidateID string `json:"candidateId"`
    VoteHash string `json:"voteHash"`
}

func (c *VoteCastingContract) CastVote(ctx contractapi.TransactionContextInterface, voterID string, candidateID string, voteHash string) error {
    // Check if the voter has already voted
    hasVoted, err := ctx.GetStub().GetState(voterID)
    if err != nil {
        return fmt.Errorf("failed to read from world state: %v", err)
    }
    if hasVoted != nil {
        return fmt.Errorf("voter has already cast a vote")
    }

    // Create a new vote
    vote := Vote{
        VoterID: voterID,
        CandidateID: candidateID,
        VoteHash: voteHash,
    }

    // Serialize the vote to JSON
    voteJSON, err := json.Marshal(vote)
    if err != nil {
        return fmt.Errorf("failed to marshal vote: %v", err)
    }

    // Store the vote in the world state
    err = ctx.GetStub().PutState(voterID, voteJSON)
    if err != nil {
        return fmt.Errorf("failed to put vote in world state: %v", err)
    }

    return nil
}

func (c *VoteCastingContract) GetVote(ctx contractapi.TransactionContextInterface, voterID string) (*Vote, error) {
    voteJSON, err := ctx.GetStub().GetState(voterID)
    if err != nil {
        return nil, fmt.Errorf("failed to read from world state: %v", err)
    }
    if voteJSON == nil {
        return nil, fmt.Errorf("no vote found for voter ID: %s", voterID)
    }

    var vote Vote
    err = json.Unmarshal(voteJSON, &vote)
    if err != nil {
        return nil, fmt.Errorf("failed to unmarshal vote: %v", err)
    }

    return &vote, nil
}

func main() {
    chaincode, err := contractapi.NewChaincode(new(VoteCastingContract))
    if err != nil {
        fmt.Printf("Error create VoteCastingContract chaincode: %v", err)
        return
    }

    if err := chaincode.Start(); err != nil {
        fmt.Printf("Error starting VoteCastingContract chaincode: %v", err)
    }
}