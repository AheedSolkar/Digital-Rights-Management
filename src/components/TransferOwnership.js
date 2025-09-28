import React, { useState } from "react";
import { web3, contract } from "../utils/web3";

function TransferOwnership() {
  const [assetId, setAssetId] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [account, setAccount] = useState("");

  const transferOwnership = async () => {
    if (!assetId || !newOwner) {
      alert("Enter Asset ID and New Owner Address!");
      return;
    }
    try {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      await contract.methods.transferOwnership(assetId, newOwner).send({ from: accounts[0], gas: 3000000 });
      alert("Ownership Transferred Successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Transaction failed!");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Transfer Ownership</h2>
      <input type="text" className="form-control mb-2" placeholder="Asset ID" onChange={(e) => setAssetId(e.target.value)} />
      <input type="text" className="form-control mb-2" placeholder="New Owner Address" onChange={(e) => setNewOwner(e.target.value)} />
      <button className="btn btn-success" onClick={transferOwnership}>Transfer Ownership</button>
    </div>
  );
}

export default TransferOwnership;
