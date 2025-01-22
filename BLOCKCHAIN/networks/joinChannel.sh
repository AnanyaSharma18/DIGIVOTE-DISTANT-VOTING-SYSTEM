#!/bin/bash

# This script allows peers to join the created channel in the Hyperledger Fabric network.

CHANNEL_NAME=$1
PEER=$2
ORG=$3

if [ -z "$CHANNEL_NAME" ] || [ -z "$PEER" ] || [ -z "$ORG" ]; then
  echo "Usage: ./joinChannel.sh <channel_name> <peer> <org>"
  exit 1
fi

# Set the environment variables for the peer
export CORE_PEER_LOCALMSPID="${ORG}MSP"
export CORE_PEER_MSPCONFIGPATH="../crypto-config/peerOrganizations/${ORG}/users/Admin@${ORG}/msp"
export CORE_PEER_ADDRESS="${PEER}.${ORG}.example.com:7051"

# Join the channel
peer channel join -b ${CHANNEL_NAME}.block

if [ $? -ne 0 ]; then
  echo "Failed to join peer to the channel"
  exit 1
fi

echo "Peer ${PEER} of organization ${ORG} has joined the channel ${CHANNEL_NAME}"