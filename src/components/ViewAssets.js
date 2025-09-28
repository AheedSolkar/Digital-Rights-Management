import React, { useEffect, useState } from "react";
import { contract, initWeb3 } from "../utils/web3";
import "bootstrap/dist/css/bootstrap.min.css";

function ViewAssets() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAssets() {
      await initWeb3();
      if (!contract) return;

      setLoading(true);

      try {
        const assetCount = await contract.methods.assetCounter().call();
        const assetList = [];

        for (let i = 1; i <= assetCount; i++) {
          const asset = await contract.methods.getAsset(i).call();
          assetList.push({
            id: i,
            name: asset[0],
            ipfsHash: asset[1],
            owner: asset[2],
            isLicensed: asset[3],
            licensee: asset[4],
          });
        }

        setAssets(assetList);
      } catch (err) {
        console.error("Error fetching assets:", err);
      }

      setLoading(false);
    }

    fetchAssets();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Registered Digital Assets</h2>
      {loading ? (
        <p>Loading assets...</p>
      ) : assets.length === 0 ? (
        <p>No assets registered yet.</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>IPFS Hash</th>
              <th>Owner</th>
              <th>Licensed</th>
              <th>Licensee</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id}>
                <td>{asset.id}</td>
                <td>{asset.name}</td>
                <td>
                  <a
                    href={`https://ipfs.io/ipfs/${asset.ipfsHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {asset.ipfsHash.substring(0, 10)}...
                  </a>
                </td>
                <td>{asset.owner}</td>
                <td>{asset.isLicensed ? "Yes" : "No"}</td>
                <td>
                  {asset.licensee !== "0x0000000000000000000000000000000000000000"
                    ? asset.licensee
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewAssets;
