package main

import (
    "encoding/json"
    "fmt"
    "github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// Vote struct
type Vote struct {
    VoterID     string `json:"voterId"`
    CandidateID string `json:"candidateId"`
    ElectionID  string `json:"electionId"`  // Added ElectionID for tallying
    VoteHash    string `json:"voteHash"`
}

// Election struct
type Election struct {
    ID         string   `json:"id"`
    Name       string   `json:"name"`
    Candidates []string `json:"candidates"`
    StartTime  string   `json:"startTime"`
    EndTime    string   `json:"endTime"`
}

// Voter struct
type Voter struct {
    ID    string `json:"id"`
    Name  string `json:"name"`
    Email string `json:"email"`
}

// ElectionManagementContract
type ElectionManagementContract struct {
    contractapi.Contract
}

func (e *ElectionManagementContract) CreateElection(ctx contractapi.TransactionContextInterface, electionID string, name string, candidates []string, startTime string, endTime string) error {
    election := Election{
        ID:         electionID,
        Name:       name,
        Candidates: candidates,
        StartTime:  startTime,
        EndTime:    endTime,
    }

    electionJSON, err := json.Marshal(election)
    if err != nil {
        return err
    }

    return ctx.GetStub().PutState(electionID, electionJSON)
}

func (e *ElectionManagementContract) GetElection(ctx contractapi.TransactionContextInterface, electionID string) (*Election, error) {
    electionJSON, err := ctx.GetStub().GetState(electionID)
    if err != nil || electionJSON == nil {
        return nil, fmt.Errorf("election not found")
    }
    
    var election Election
    err = json.Unmarshal(electionJSON, &election)
    if err != nil {
        return nil, err
    }
    return &election, nil
}

// VoteCastingContract
type VoteCastingContract struct {
    contractapi.Contract
}

func (c *VoteCastingContract) CastVote(ctx contractapi.TransactionContextInterface, voterID string, candidateID string, electionID string, voteHash string) error {
    existingVote, err := ctx.GetStub().GetState(voterID)
    if err != nil {
        return fmt.Errorf("error reading state: %v", err)
    }
    if existingVote != nil {
        return fmt.Errorf("voter has already cast a vote")
    }

    vote := Vote{
        VoterID:     voterID,
        CandidateID: candidateID,
        ElectionID:  electionID,
        VoteHash:    voteHash,
    }

    voteJSON, err := json.Marshal(vote)
    if err != nil {
        return fmt.Errorf("failed to marshal vote: %v", err)
    }

    return ctx.GetStub().PutState(voterID, voteJSON)
}

func (c *VoteCastingContract) GetVote(ctx contractapi.TransactionContextInterface, voterID string) (*Vote, error) {
    voteJSON, err := ctx.GetStub().GetState(voterID)
    if err != nil || voteJSON == nil {
        return nil, fmt.Errorf("vote not found")
    }
    
    var vote Vote
    err = json.Unmarshal(voteJSON, &vote)
    if err != nil {
        return nil, err
    }
    return &vote, nil
}

// VoterRegistrationContract
type VoterRegistrationContract struct {
    contractapi.Contract
}

func (c *VoterRegistrationContract) AddVoter(ctx contractapi.TransactionContextInterface, id string, name string, email string) error {
    exists, err := ctx.GetStub().GetState(id)
    if err != nil || exists != nil {
        return fmt.Errorf("voter already exists or error reading state")
    }

    voter := Voter{ID: id, Name: name, Email: email}
    voterJSON, err := json.Marshal(voter)
    if err != nil {
        return err
    }

    return ctx.GetStub().PutState(id, voterJSON)
}

func (c *VoterRegistrationContract) GetVoter(ctx contractapi.TransactionContextInterface, id string) (*Voter, error) {
    voterJSON, err := ctx.GetStub().GetState(id)
    if err != nil || voterJSON == nil {
        return nil, fmt.Errorf("voter not found")
    }
    
    var voter Voter
    err = json.Unmarshal(voterJSON, &voter)
    if err != nil {
        return nil, err
    }
    return &voter, nil
}

// VoteTallyingContract
type VoteTallyingContract struct {
    contractapi.Contract
}

func (c *VoteTallyingContract) TallyVotes(ctx contractapi.TransactionContextInterface, electionID string) (map[string]int, error) {
    results := make(map[string]int)
    
    queryString := fmt.Sprintf(`{"selector":{"electionId":"%s"}}`, electionID)
    resultsIterator, err := ctx.GetStub().GetQueryResult(queryString)
    if err != nil {
        return nil, fmt.Errorf("failed to get votes: %v", err)
    }
    defer resultsIterator.Close()

    for resultsIterator.HasNext() {
        queryResponse, err := resultsIterator.Next()
        if err != nil {
            return nil, fmt.Errorf("failed to iterate results: %v", err)
        }

        var vote Vote
        err = json.Unmarshal(queryResponse.Value, &vote)
        if err != nil {
            return nil, fmt.Errorf("failed to unmarshal vote: %v", err)
        }

        results[vote.CandidateID]++
    }
    return results, nil
}

// Main function to start the chaincode
func main() {
    chaincode, err := contractapi.NewChaincode(
        new(ElectionManagementContract),
        new(VoteCastingContract),
        new(VoterRegistrationContract),
        new(VoteTallyingContract),
    )
    if err != nil {
        fmt.Printf("Error creating chaincode: %v\n", err)
        return
    }

    if err := chaincode.Start(); err != nil {
        fmt.Printf("Error starting chaincode: %v\n", err)
    }
}
