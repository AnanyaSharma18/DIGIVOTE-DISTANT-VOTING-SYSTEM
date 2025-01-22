#!/bin/bash

# This script invokes chaincode functions on the Hyperledger Fabric network.

# Usage: ./invokeChaincode.sh <function_name> <args>

# Check if the correct number of arguments is provided
if [ "$#" -lt 1 ]; then
    echo "Usage: $0 <function_name> [args...]"
    exit 1
fi

FUNCTION_NAME=$1
shift
ARGS="$@"

# Set environment variables for the chaincode
export CORE_PEER_ADDRESS=peer0.org1.example.com:7051
export CORE_PEER_LOCALMSPID=Org1MSP
export CORE_PEER_MSPCONFIGPATH=../crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp

# Invoke the chaincode
peer chaincode invoke -o orderer.example.com:7050 -C mychannel -n votingChaincode -c "{\"function\":\"$FUNCTION_NAME\", \"Args\":[$ARGS]}"

# Check the result of the invocation
if [ $? -ne 0 ]; then
    echo "Chaincode invocation failed."
    exit 1
fi

echo "Chaincode invocation successful."