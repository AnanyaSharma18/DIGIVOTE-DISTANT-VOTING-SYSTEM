package main

import (
    "encoding/json"
    "fmt"
    "github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// Voter structure
type Voter struct {
    ID          string `json:"id"`
    Name        string `json:"name"`
    Email       string `json:"email"`
    IsRegistered bool  `json:"isRegistered"`
}

// VoterRegistrationContract is the contract for voter registration
type VoterRegistrationContract struct {
    contractapi.Contract
}

// AddVoter adds a new voter to the world state
func (c *VoterRegistrationContract) AddVoter(ctx contractapi.TransactionContextInterface, id string, name string, email string) error {
    exists, err := c.VoterExists(ctx, id)
    if err != nil {
        return err
    }
    if exists {
        return fmt.Errorf("voter with ID %s already exists", id)
    }

    voter := Voter{
        ID:           id,
        Name:         name,
        Email:        email,
        IsRegistered: true,
    }

    voterJSON, err := json.Marshal(voter)
    if err != nil {
        return err
    }

    return ctx.GetStub().PutState(id, voterJSON)
}

// VoterExists checks if a voter exists in the world state
func (c *VoterRegistrationContract) VoterExists(ctx contractapi.TransactionContextInterface, id string) (bool, error) {
    voterJSON, err := ctx.GetStub().GetState(id)
    if err != nil {
        return false, err
    }
    return voterJSON != nil, nil
}

// AuthenticateVoter authenticates a voter by checking if they exist
func (c *VoterRegistrationContract) AuthenticateVoter(ctx contractapi.TransactionContextInterface, id string) (bool, error) {
    exists, err := c.VoterExists(ctx, id)
    if err != nil {
        return false, err
    }
    return exists, nil
}

// GetVoterStatus retrieves the status of a voter
func (c *VoterRegistrationContract) GetVoterStatus(ctx contractapi.TransactionContextInterface, id string) (*Voter, error) {
    voterJSON, err := ctx.GetStub().GetState(id)
    if err != nil {
        return nil, err
    }
    if voterJSON == nil {
        return nil, fmt.Errorf("voter with ID %s does not exist", id)
    }

    var voter Voter
    err = json.Unmarshal(voterJSON, &voter)
    if err != nil {
        return nil, err
    }

    return &voter, nil
}

// main function to start the chaincode
func main() {
    chaincode, err := contractapi.NewChaincode(new(VoterRegistrationContract))
    if err != nil {
        fmt.Printf("Error creating VoterRegistrationContract chaincode: %v", err)
        return
    }

    if err := chaincode.Start(); err != nil {
        fmt.Printf("Error starting VoterRegistrationContract chaincode: %v", err)
    }
}
