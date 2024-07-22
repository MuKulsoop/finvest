// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Finvest {
    struct Milestone {
        string description;
        uint256 amount;
        bool completed;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }

    struct Startup {
        string name;
        address payable founder;
        uint256 totalMilestones;
        mapping(uint256 => Milestone) milestones;
    }

    address public admin;
    uint256 public totalStartups;
    mapping(uint256 => Startup) public startups;
    mapping(address => uint256) public investments;
    uint256 public totalInvestors;
    address[] public investorList;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action.");
        _;
    }

    modifier onlyInvestor() {
        require(investments[msg.sender] > 0, "Only investors can perform this action.");
        _;
    }

    modifier startupExists(uint256 _startupId) {
        require(_startupId < totalStartups, "Startup does not exist.");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function registerStartup(string memory _name, address payable _founder) public onlyAdmin {
        Startup storage newStartup = startups[totalStartups];
        newStartup.name = _name;
        newStartup.founder = _founder;
        newStartup.totalMilestones = 0;
        totalStartups++;
    }

    function addMilestone(uint256 _startupId, string memory _description, uint256 _amount) public onlyAdmin startupExists(_startupId) {
        Startup storage startup = startups[_startupId];
        Milestone storage newMilestone = startup.milestones[startup.totalMilestones];
        newMilestone.description = _description;
        newMilestone.amount = _amount;
        newMilestone.completed = false;
        newMilestone.approvalCount = 0;
        startup.totalMilestones++;
    }

    function invest() public payable {
        require(msg.value > 0, "Investment must be greater than 0.");
        if (investments[msg.sender] == 0) {
            totalInvestors++;
            investorList.push(msg.sender);
        }
        investments[msg.sender] += msg.value;
    }

    function approveMilestone(uint256 _startupId, uint256 _milestoneId) public onlyInvestor startupExists(_startupId) {
        Startup storage startup = startups[_startupId];
        Milestone storage milestone = startup.milestones[_milestoneId];
        require(!milestone.completed, "Milestone is already completed.");
        require(!milestone.approvals[msg.sender], "You have already approved this milestone.");

        milestone.approvals[msg.sender] = true;
        milestone.approvalCount++;
    }

    function finalizeMilestone(uint256 _startupId, uint256 _milestoneId) public onlyAdmin startupExists(_startupId) {
        Startup storage startup = startups[_startupId];
        Milestone storage milestone = startup.milestones[_milestoneId];
        require(milestone.approvalCount > totalInvestors / 2, "Milestone approval count is insufficient.");
        require(!milestone.completed, "Milestone is already completed.");

        startup.founder.transfer(milestone.amount);
        milestone.completed = true;
    }

    function withdraw(uint256 _amount) public onlyInvestor {
        require(investments[msg.sender] >= _amount, "Insufficient funds.");
        investments[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
    }

    function getSummary() public view returns (uint256, uint256, uint256, address) {
        return (
            address(this).balance,
            totalStartups,
            totalInvestors,
            admin
        );
    }

    function getInvestors() public view returns (address[] memory) {
        return investorList;
    }
    
    function getStartupDetails(uint256 _startupId) public view startupExists(_startupId) returns (string memory, address, uint256) {
        Startup storage startup = startups[_startupId];
        return (
            startup.name,
            startup.founder,
            startup.totalMilestones
        );
    }

    function getMilestoneDetails(uint256 _startupId, uint256 _milestoneId) public view startupExists(_startupId) returns (string memory, uint256, uint256, bool) {
        Startup storage startup = startups[_startupId];
        Milestone storage milestone = startup.milestones[_milestoneId];
        return (
            milestone.description,
            milestone.amount,
            milestone.approvalCount,
            milestone.completed
        );
    }

    function getInvestmentAmount(address _investor) public view returns (uint256) {
        return investments[_investor];
    }
}
