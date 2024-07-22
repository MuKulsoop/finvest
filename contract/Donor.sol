// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Finvest {
    struct Request {
        address payable recipient;
        uint256 amount;
        uint256 approvalCount;
        bool completed;
        mapping(address => bool) approvals;
    }

    address public admin;
    uint256 public totalRequests;
    mapping(uint256 => Request) public requests;
    mapping(address => uint256) public donations;
    mapping(address => bool) public voters;
    uint256 public totalDonors;
    address[] public donorList;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action.");
        _;
    }

    modifier onlyDonors() {
        require(donations[msg.sender] > 0, "Only donors can perform this action.");
        _;
    }

    modifier requestExists(uint256 _requestId) {
        require(_requestId < totalRequests, "Request does not exist.");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function donate() public payable {
        require(msg.value > 0, "Donation must be greater than 0.");
        if (donations[msg.sender] == 0) {
            totalDonors++;
            donorList.push(msg.sender);
        }
        donations[msg.sender] += msg.value;
    }

    function createRequest(address payable _recipient, uint256 _amount) public onlyAdmin {
        Request storage newRequest = requests[totalRequests];
        newRequest.recipient = _recipient;
        newRequest.amount = _amount;
        newRequest.completed = false;
        newRequest.approvalCount = 0;

        totalRequests++;
    }

    function approveRequest(uint256 _requestId) public onlyDonors requestExists(_requestId) {
        Request storage request = requests[_requestId];
        require(!request.completed, "Request is already completed.");
        require(!request.approvals[msg.sender], "You have already approved this request.");

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint256 _requestId) public onlyAdmin requestExists(_requestId) {
        Request storage request = requests[_requestId];
        require(request.approvalCount > totalDonors / 2, "Request approval count is insufficient.");
        require(!request.completed, "Request is already completed.");

        request.recipient.transfer(request.amount);
        request.completed = true;
    }

    function getSummary() public view returns (uint256, uint256, uint256, address) {
        return (
            address(this).balance,
            totalRequests,
            totalDonors,
            admin
        );
    }

    function getDonors() public view returns (address[] memory) {
        return donorList;
    }
    
    function getRequestDetails(uint256 _requestId) public view requestExists(_requestId) returns (address, uint256, uint256, bool) {
        Request storage request = requests[_requestId];
        return (
            request.recipient,
            request.amount,
            request.approvalCount,
            request.completed
        );
    }

    function getDonationAmount(address _donor) public view returns (uint256) {
        return donations[_donor];
    }
}
