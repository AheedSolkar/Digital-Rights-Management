import Web3 from "web3";
import DRM from "../contracts/DRM.json"; // Import ABI

let web3;
let contract;
let accounts;

// Manually set your deployed contract address
const contractAddress = "0xCDA1b64C44f7FB6e5246912640F2325d64002Ed4";

const initWeb3 = async () => {
  if (window.ethereum) {
    try {
      web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });

      accounts = await web3.eth.getAccounts();
      console.log("Connected Account:", accounts[0]);

      // Ensure Web3 is connected to the correct network
      const networkId = await web3.eth.net.getId();
      console.log("Network ID:", networkId);

      // Load contract with manually provided address
      contract = new web3.eth.Contract(DRM.abi, contractAddress);
      console.log("Contract Loaded Successfully at:", contractAddress);
    } catch (error) {
      console.error("Error connecting to Web3:", error);
      alert("Failed to connect with MetaMask. Please try again.");
    }
  } else {
    alert("MetaMask is not installed. Please install it!");
  }
};

// ✅ Correct export of web3, contract, accounts, and initWeb3
export { web3, contract, accounts, initWeb3 };
