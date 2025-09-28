import React, { useState, useEffect } from "react";
import { web3, contract, initWeb3 } from "../utils/web3";
import UploadAsset from "./UploadAsset";

const RegisterAsset = () => {
  const [account, setAccount] = useState("");
  const [assetName, setAssetName] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");

  useEffect(() => {
    async function loadBlockchainData() {
      await initWeb3();
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    }
    loadBlockchainData();
  }, []);

  const registerAsset = async () => {
    if (!assetName || !ipfsHash) {
      alert("Enter Asset Name and Upload a File!");
      return;
    }

    try {
      await contract.methods.registerAsset(assetName, ipfsHash).send({ from: account, gas: 3000000 });
      alert("Asset Registered!");
    } catch (error) {
      console.error("Error:", error);
      alert("Transaction failed!");
    }
  };

  return (
    <div className="container mt-3">
      <h2>Register Digital Asset</h2>
      <UploadAsset setIpfsHash={setIpfsHash} />
      <br />
      <input type="text" className="form-control mb-2" placeholder="Asset Name" onChange={(e) => setAssetName(e.target.value)} />
      <button className="btn btn-primary" onClick={registerAsset}>Register Asset</button>
    </div>
  );
};

export default RegisterAsset;
