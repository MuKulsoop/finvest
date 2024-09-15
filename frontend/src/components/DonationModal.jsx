import { useState, useContext, useEffect } from "react";
import { usdToEth, ethToUsd } from "../utils/conversion";
import { WalletContext } from "@/context/WalletContext";
import { ethers } from "ethers";
import FinvestABI from '../utils/FinvestABI.json';

const CONTRACT_ADDRESS = '0x0cd118073a8ff6026ae465621664b277e32e2843';

const DonationModal = ({ isOpen, onClose, projectId }) => {
    const [amountUSD, setAmountUSD] = useState("");
    const [amountETH, setAmountETH] = useState("");
    const { walletAddress, connectWallet, signer } = useContext(WalletContext);

    useEffect(() => {
        
        const handleClickOutside = (event) => {
            if (event.target.className.includes('modal')) {
                onClose(); // Close the modal if clicked outside of modal content
            }
        };

        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen, onClose]);

    const handleUSDChange = (e) => {
        const usd = e.target.value;
        setAmountUSD(usd);
        setAmountETH(usdToEth(usd));
    };

    const handleETHChange = (e) => {
        const eth = e.target.value;
        setAmountETH(eth);
        setAmountUSD(ethToUsd(eth));
    };

    const handleSubmit = () => {
        if (amountUSD > 0) {
            handleDonate(amountETH, amountUSD);
        }
    };

    const handleDonate = async (amountETH, amountUSD) => {
        try {
            console.log("Transacting ...")
            if (!walletAddress || !signer) {
                await connectWallet();
            }
    
            const contract = new ethers.Contract(CONTRACT_ADDRESS, FinvestABI, signer);
            const amountInWei = ethers.utils.parseEther(amountETH);
    
            // Contribute to the project
            const tx = await contract.contribute(projectId, { value: amountInWei });
            const receipt = await tx.wait();
    
            if (receipt.status === 1) {
                console.log("Transaction successful:", receipt.transactionHash);
                
                // Capture the tokenId from the event logs
                // const events = receipt.logs.filter(log => log.address === CONTRACT_ADDRESS);
                // const tokenId = parseInt(ethers.utils.defaultAbiCoder.decode(["uint"], events[0].data)[0]);
    
                await saveTransactionToBackend(receipt.transactionHash, amountETH, amountUSD);
            } else {
                console.error("Transaction failed");
            }
    
            onClose(); // Close the modal after successful donation
        } catch (error) {
            console.error("Error in donation:", error);
        }
    };
    

    const saveTransactionToBackend = async (transactionHash, amountETH, amountUSD) => {
        try {
            const response = await fetch("http://localhost:8000/transactions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    project: projectId, // Project ID should be passed
                    contributor: walletAddress, // Contributor's wallet address
                    amount: amountETH,
                    transactionHash,
                    network: "Ethereum",
                    status: "confirmed", // Update based on actual transaction status
                }),
                credentials: 'include'
            });
    
            const data = await response.json();
            console.log("Transaction recorded in backend:", data);
        } catch (error) {
            console.error("Error saving transaction to backend:", error);
        }
    };
    
    
    

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`} style={modalStyles}>
            <div className="modal-content" style={modalContentStyles}>
                <h2>Donate to Project</h2>
                <label>
                    Amount in USD:
                    <input
                        type="number"
                        value={amountUSD}
                        onChange={handleUSDChange}
                        style={inputStyles}
                    />
                </label>
                <label>
                    Amount in ETH:
                    <input
                        type="number"
                        value={amountETH}
                        onChange={handleETHChange}
                        style={inputStyles}
                    />
                </label>
                <button onClick={handleSubmit} style={buttonStyles}>Donate</button>
                <button onClick={onClose} style={buttonStyles}>Cancel</button>
            </div>
        </div>
    );
};

export default DonationModal;

const modalStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

const modalContentStyles = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    width: '300px',
};

const inputStyles = {
    width: '100%',
    padding: '8px',
    margin: '10px 0',
};

const buttonStyles = {
    padding: '10px',
    margin: '10px 5px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};
