#!/bin/bash

# This script creates a channel in the Hyperledger Fabric network.

CHANNEL_NAME=mychannel
DELAY=3
MAX_RETRY=5
ORDERER_CA=../config/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

function createChannel() {
    peer channel create -o orderer.example.com:7050 -c $CHANNEL_NAME --ordererTLSHostnameOverride orderer.example.com --outputCreateChannelTx ./channel.tx --tls --cafile $ORDERER_CA
}

createChannel

# Wait for the channel to be created
sleep $DELAY

# Join all peers to the channel
for peer in peer0.org1.example.com peer0.org2.example.com; do
    peer channel join -b $CHANNEL_NAME.block
done

echo "Channel '$CHANNEL_NAME' created and peers joined."