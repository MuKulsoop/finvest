// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Finvest is ERC721, Ownable {
    // Project and Milestone Data Structures
    struct Milestone {
        string title;
        uint amountRequired;
        address payable recipient;
        bool isCompleted;
    }

    struct Project {
        uint totalAmount;
        uint amountRaised;
        bool isActive;
        Milestone[] milestones;
        mapping(address => uint) contributions;
        address[] contributors;
    }

    uint public projectCount;
    mapping(uint => Project) public projects;
    uint public tokenIdCounter;

    // Events
    event ProjectCreated(uint projectId);
    event ContributionMade(uint projectId, address contributor, uint amount);
    event NFTMinted(address recipient, uint tokenId);
    event WithdrawalMade(uint projectId, address contributor, uint amount);
    event FundsTransferred(uint projectId, uint milestoneIndex);

    constructor(address initialOwner) ERC721("FinvestNFT", "FNFT") Ownable(initialOwner) {}

    // Create a new project with milestones
    function createProject(uint totalAmount, Milestone[] memory milestones) external onlyOwner {
        require(totalAmount > 0, "Total amount must be greater than zero");
        require(milestones.length > 0, "At least one milestone required");

        Project storage newProject = projects[projectCount];
        newProject.totalAmount = totalAmount;
        newProject.isActive = true;

        for (uint i = 0; i < milestones.length; i++) {
            newProject.milestones.push(milestones[i]);
        }

        emit ProjectCreated(projectCount);
        projectCount++;
    }

    // Contribute to a project and mint an NFT
    function contribute(uint projectId) external payable {
        require(msg.value > 0, "Contribution must be greater than zero");
        Project storage project = projects[projectId];
        require(project.isActive, "Project is not active");

        project.amountRaised += msg.value;
        project.contributions[msg.sender] += msg.value;
        if (project.contributions[msg.sender] == msg.value) {
            project.contributors.push(msg.sender);
        }

        // Mint an NFT for the contributor
        uint tokenId = tokenIdCounter;
        _mint(msg.sender, tokenId);
        tokenIdCounter++;

        emit ContributionMade(projectId, msg.sender, msg.value);
        emit NFTMinted(msg.sender, tokenId);
    }

    // Withdraw 90% of the contribution
    function withdraw(uint projectId) external {
        Project storage project = projects[projectId];
        require(project.isActive, "Project is not active");
        uint contribution = project.contributions[msg.sender];
        require(contribution > 0, "No contribution to withdraw");

        uint refundAmount = (contribution * 90) / 100;
        project.amountRaised -= contribution;
        project.contributions[msg.sender] = 0;

        payable(msg.sender).transfer(refundAmount);

        emit WithdrawalMade(projectId, msg.sender, refundAmount);
    }

    // Transfer funds to a milestone recipient after successful off-chain voting
    function transferFunds(uint projectId, uint milestoneIndex) external onlyOwner {
        Project storage project = projects[projectId];
        require(project.isActive, "Project is not active");
        require(milestoneIndex < project.milestones.length, "Invalid milestone index");
        Milestone storage milestone = project.milestones[milestoneIndex];
        require(!milestone.isCompleted, "Milestone already completed");
        require(project.amountRaised >= milestone.amountRequired, "Insufficient funds for milestone");

        // Transfer funds to the milestone recipient
        milestone.recipient.transfer(milestone.amountRequired);
        milestone.isCompleted = true;

        emit FundsTransferred(projectId, milestoneIndex);

        // Deactivate the project if all milestones are completed
        if (milestoneIndex == project.milestones.length - 1) {
            project.isActive = false;
        }
    }

    // Check if an address holds an NFT to validate voting rights
    function hasNFT(address contributor) external view returns (bool) {
        return balanceOf(contributor) > 0;
    }

    // Read functions for retrieving project and contribution information

    // Get project details
    function getProject(uint projectId) external view returns (
        uint totalAmount,
        uint amountRaised,
        bool isActive,
        uint milestoneCount
    ) {
        Project storage project = projects[projectId];
        return (
            project.totalAmount,
            project.amountRaised,
            project.isActive,
            project.milestones.length
        );
    }

    // Get milestone details for a specific project
    function getMilestone(uint projectId, uint milestoneIndex) external view returns (
        string memory title,
        uint amountRequired,
        address recipient,
        bool isCompleted
    ) {
        Project storage project = projects[projectId];
        Milestone storage milestone = project.milestones[milestoneIndex];
        return (
            milestone.title,
            milestone.amountRequired,
            milestone.recipient,
            milestone.isCompleted
        );
    }

    // Get total number of contributors for a project
    function getContributorCount(uint projectId) external view returns (uint) {
        return projects[projectId].contributors.length;
    }

    // Get contribution amount by a specific address for a project
    function getContribution(uint projectId, address contributor) external view returns (uint) {
        return projects[projectId].contributions[contributor];
    }

    // Get the list of contributors for a project
    function getContributors(uint projectId) external view returns (address[] memory) {
        return projects[projectId].contributors;
    }
}
