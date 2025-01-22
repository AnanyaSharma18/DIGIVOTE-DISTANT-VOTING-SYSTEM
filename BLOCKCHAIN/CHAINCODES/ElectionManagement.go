package main

import (
    "encoding/json"
    "fmt"
    "github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type Election struct {
    ID        string   `json:"id"`
    Name      string   `json:"name"`
    Candidates []string `json:"candidates"`
    StartTime string   `json:"startTime"`
    EndTime   string   `json:"endTime"`
}

type ElectionManagementContract struct {
    contractapi.Contract
}

func (e *ElectionManagementContract) ManageElection(ctx contractapi.TransactionContextInterface, action string, electionID string, name string, candidates []string, startTime string, endTime string) error {
    switch action {
    case "create":
        return e.CreateElection(ctx, electionID, name, candidates, startTime, endTime)
    case "update":
        return e.UpdateElection(ctx, electionID, name, candidates, startTime, endTime)
    case "delete":
        return e.DeleteElection(ctx, electionID)
    default:
        return fmt.Errorf("invalid action: %s", action)
    }
}

func (e *ElectionManagementContract) CreateElection(ctx contractapi.TransactionContextInterface, electionID string, name string, candidates []string, startTime string, endTime string) error {
    election := Election{
        ID:        electionID,
        Name:      name,
        Candidates: candidates,
        StartTime: startTime,
        EndTime:   endTime,
    }

    electionJSON, err := json.Marshal(election)
    if err != nil {
        return err
    }

    return ctx.GetStub().PutState(electionID, electionJSON)
}

func (e *ElectionManagementContract) UpdateElection(ctx contractapi.TransactionContextInterface, electionID string, name string, candidates []string, startTime string, endTime string) error {
    electionJSON, err := ctx.GetStub().GetState(electionID)
    if err != nil || electionJSON == nil {
        return fmt.Errorf("election not found: %s", electionID)
    }

    election := Election{}
    err = json.Unmarshal(electionJSON, &election)
    if err != nil {
        return err
    }

    election.Name = name
    election.Candidates = candidates
    election.StartTime = startTime
    election.EndTime = endTime

    updatedElectionJSON, err := json.Marshal(election)
    if err != nil {
        return err
    }

    return ctx.GetStub().PutState(electionID, updatedElectionJSON)
}

func (e *ElectionManagementContract) DeleteElection(ctx contractapi.TransactionContextInterface, electionID string) error {
    return ctx.GetStub().DelState(electionID)
}

func (e *ElectionManagementContract) GetElectionDetails(ctx contractapi.TransactionContextInterface, electionID string) (*Election, error) {
    electionJSON, err := ctx.GetStub().GetState(electionID)
    if err != nil || electionJSON == nil {
        return nil, fmt.Errorf("election not found: %s", electionID)
    }

    election := Election{}
    err = json.Unmarshal(electionJSON, &election)
    if err != nil {
        return nil, err
    }

    return &election, nil
}

func main() {
    electionManagementContract := new(ElectionManagementContract)
    contractapi.SmartContractMain(electionManagementContract)
}