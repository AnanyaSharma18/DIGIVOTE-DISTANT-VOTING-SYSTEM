package main

import (
    "encoding/json"
    "fmt"
    "github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type VoteTallyingContract struct {
    contractapi.Contract
}

type Vote struct {
    CandidateID string `json:"candidateId"`
    VoterID     string `json:"voterId"`
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

func (c *VoteTallyingContract) GetResults(ctx contractapi.TransactionContextInterface, electionID string) (string, error) {
    results, err := c.TallyVotes(ctx, electionID)
    if err != nil {
        return "", err
    }

    resultsJSON, err := json.Marshal(results)
    if err != nil {
        return "", fmt.Errorf("failed to marshal results: %v", err)
    }

    return string(resultsJSON), nil
}

func main() {
    chaincode, err := contractapi.NewChaincode(new(VoteTallyingContract))
    if err != nil {
        fmt.Printf("Error create VoteTallyingContract chaincode: %v", err)
        return
    }

    if err := chaincode.Start(); err != nil {
        fmt.Printf("Error starting VoteTallyingContract chaincode: %v", err)
    }
}