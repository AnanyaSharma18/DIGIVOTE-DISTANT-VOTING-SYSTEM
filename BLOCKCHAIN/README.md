# Blockchain Voting Platform

## Features

- **Voter Registration and Authentication**: Secure mechanisms for voter registration and authentication, preventing duplicate registrations and ensuring privacy.
- **Vote Casting**: Secure vote casting with anonymization and tamper-proof mechanisms.
- **Vote Verification and Tallying**: Real-time vote verification and secure tallying processes that protect voter anonymity.
- **Election Management**: Tools for election administrators to create and manage elections, including candidate lists and timelines.

## Project Structure

The project is organized as follows:

```
blockchain-voting-platform
├── chaincode
│   └── digivote.go
├── scripts
│   ├── deployChaincode.sh
│   └── invokeChaincode.sh
├── config
│   ├── configtx.yaml
│   └── crypto-config.yaml
├── network
│   ├── docker-compose.yaml
│   ├── createChannel.sh
│   └── joinChannel.sh
├── package.json
├── go.mod
└── README.md
```

### Chaincode (`digivote.go`)

The core logic of the blockchain voting platform is encapsulated in the `digivote.go` chaincode. This Go file defines several key structures and contracts:

- **Structures**:
  - `Vote`: Represents a vote with attributes like `VoterID`, `CandidateID`, `ElectionID`, and `VoteHash`.
  - `Election`: Represents an election with attributes such as `ID`, `Name`, `Candidates`, `StartTime`, and `EndTime`.
  - `Voter`: Represents a voter with attributes like `ID`, `Name`, and `Email`.

- **Contracts**:
  - `ElectionManagementContract`: Handles the creation and retrieval of elections.
  - `VoteCastingContract`: Manages vote casting and retrieval, ensuring that each voter can only cast one vote per election and updating vote tallies securely.
  - `VoterRegistrationContract`: Manages the addition and retrieval of voter information, preventing duplicate registrations.
  - `VoteTallyingContract`: Provides functionality to tally votes for a given election.

## Usage

- **Voter Registration**: Voters can register using the `AddVoter` function in the `VoterRegistrationContract`, providing their unique ID, name, and email.
- **Election Creation**: Election administrators can create new elections using the `CreateElection` function in the `ElectionManagementContract`, specifying details like election ID, name, list of candidates, and the election timeframe.
- **Vote Casting**: Registered voters can cast their votes using the `CastVote` function in the `VoteCastingContract`, ensuring that each voter votes only once per election.
- **Vote Tallying**: After the election concludes, administrators can tally the votes using the `TallyVotes` function in the `VoteTallyingContract` to determine the outcome.

## Deployment on Azure Virtual Machine

The blockchain voting platform is deployed on an Azure Virtual Machine (VM). Azure VMs provide scalable, on-demand computing resources in the cloud, allowing users to run applications and services as if they were on a physical server.

### Azure Virtual Machine Overview

An Azure Virtual Machine is a computing resource that emulates a physical computer's capabilities in a virtualized environment. It includes CPU, memory, storage, and networking resources, enabling users to deploy and manage applications without the need for physical hardware. Azure VMs support various operating systems, including Windows and Linux distributions.

### Deployment Steps

1. **Provisioning the Azure VM**: Create a new virtual machine instance on Azure, selecting the appropriate size and operating system to meet the requirements of the blockchain voting platform.
2. **Environment Setup**: Install necessary dependencies such as Go (for compiling the chaincode), Docker (for containerization), and Hyperledger Fabric binaries.
3. **Code Deployment**: Transfer the blockchain voting platform's codebase to the Azure VM.
4. **Network Configuration**: Use the scripts provided (`createChannel.sh`, `joinChannel.sh`) to set up the blockchain network.
5. **Chaincode Deployment**: Deploy the `digivote.go` chaincode using the `deployChaincode.sh` script, which installs and instantiates the chaincode on the network.
6. **Application Interaction**: Utilize the `invokeChaincode.sh` script and other client applications to interact with the deployed blockchain network, facilitating voter registration, vote casting, and result tallying.

By leveraging Azure's scalable infrastructure, the blockchain voting platform can handle varying loads, ensuring reliability and availability during critical voting periods.
### Cryptographic Hash Generation

To ensure the integrity and security of votes, the platform generates a SHA-256 cryptographic hash for each vote. This hash is stored on the blockchain, making it immutable and tamper-proof.
