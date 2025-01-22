#!/bin/bash

# Set the environment variables
export PATH=$PATH:$PWD/../bin
export FABRIC_CFG_PATH=$PWD/../config

# Define the chaincode name and version
CHAINCODE_NAME="votingChaincode"
CHAINCODE_VERSION="1.0"

# Package the chaincode
peer lifecycle chaincode package ${CHAINCODE_NAME}.tar.gz --path ../chaincode --lang golang --label ${CHAINCODE_NAME}_${CHAINCODE_VERSION}

# Install the chaincode on peers
peer lifecycle chaincode install ${CHAINCODE_NAME}.tar.gz

# Query the installed chaincode
peer lifecycle chaincode queryinstalled

# Approve the chaincode for the organization
peer lifecycle chaincode approveformyorg --channelID mychannel --name ${CHAINCODE_NAME} --version ${CHAINCODE_VERSION} --sequence 1 --init-required --signature-policy "AND('Org1MSP.peer', 'Org2MSP.peer')"

# Check the approval status
peer lifecycle chaincode checkcommitreadiness --channelID mychannel --name ${CHAINCODE_NAME} --version ${CHAINCODE_VERSION} --sequence 1 --output json

# Commit the chaincode to the channel
peer lifecycle chaincode commit -o orderer.example.com:7050 --channelID mychannel --name ${CHAINCODE_NAME} --version ${CHAINCODE_VERSION} --sequence 1 --init-required

# Query the committed chaincode
peer lifecycle chaincode querycommitted --channelID mychannel --name ${CHAINCODE_NAME}