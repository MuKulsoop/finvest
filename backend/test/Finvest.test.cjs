const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Finvest Contract - createProject", function () {
  let finvest;
  let owner;

  const contractAddress = "0x0Cd118073a8ff6026Ae465621664b277E32E2843";

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    
    // Get the contract ABI from artifacts
    const Finvest = await ethers.getContractFactory("Finvest");
    finvest = Finvest.attach(contractAddress);
  });

  it("Should create a project correctly", async function () {
    const milestones = [
      {
        title: "Testing 1",
        amountRequired: ethers.parseEther("1.0"),
        recipient: owner.address,
        isCompleted: false,
      },
      {
        title: "Testing 2",
        amountRequired: ethers.parseEther("2.0"),
        recipient: owner.address,
        isCompleted: false,
      },
    ];

    const totalAmount = ethers.parseEther("3.0");
    const tx = await finvest.createProject(totalAmount, milestones);
    await tx.wait(); // Wait for transaction to be mined

    const projectId = 4; // Update to the actual ID if necessary
    try {
      const project = await finvest.getProject(projectId);
      console.log(project)
      
      expect(project.totalAmount).to.equal(totalAmount);
      expect(project.isActive).to.be.true;
      expect((await finvest.getMilestone(projectId, 0)).title).to.equal("Testing 1");
      expect((await finvest.getMilestone(projectId, 1)).title).to.equal("Testing 2");
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  });
});
