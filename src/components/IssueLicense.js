import React, { useState } from "react";
import { web3, contract } from "../utils/web3";

function IssueLicense() {
  const [assetId, setAssetId] = useState("");
  const [account, setAccount] = useState("");

  const issueLicense = async () => {
    if (!assetId) {
      alert("Enter an Asset ID!");
      return;
    }
    try {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      await contract.methods.issueLicense(assetId, accounts[0]).send({ from: accounts[0], gas: 3000000 });
      alert("License Issued Successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Transaction failed!");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Issue License</h2>
      <input type="text" className="form-control mb-2" placeholder="Asset ID" onChange={(e) => setAssetId(e.target.value)} />
      <button className="btn btn-warning" onClick={issueLicense}>Issue License</button>
    </div>
  );
}

export default IssueLicense;
