// import React, { useState } from "react";
// import axios from "axios";

// function UploadAsset() {
//   const [file, setFile] = useState(null);
//   const [ipfsHash, setIpfsHash] = useState("");

//   const uploadToIPFS = async () => {
//     if (!file) {
//       alert("Please select a file to upload!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     const pinataApiKey = "8b22a4cc90e2fbac9668";
//     const pinataSecretApiKey = "fc038409515d3dc9353099cacdd98d778f7b32bf2ce938bc1c4ae1023818bd43";

//     try {
//       const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           "pinata_api_key": pinataApiKey,
//           "pinata_secret_api_key": pinataSecretApiKey,
//         },
//       });

//       setIpfsHash(response.data.IpfsHash);
//       alert(`File uploaded! IPFS Hash: ${response.data.IpfsHash}`);
//     } catch (error) {
//       console.error("IPFS upload error:", error);
//       alert("Upload failed!");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Upload File to IPFS</h2>
//       <input type="file" className="form-control mb-2" onChange={(e) => setFile(e.target.files[0])} />
//       <button className="btn btn-primary" onClick={uploadToIPFS}>Upload</button>
//       {ipfsHash && <p className="mt-2">IPFS Hash: {ipfsHash}</p>}
//     </div>
//   );
// }

// export default UploadAsset;


import React, { useState } from "react";
import axios from "axios";

const UploadAsset = ({ setIpfsHash }) => {
  const [file, setFile] = useState(null);

  const uploadToIPFS = async () => {
    if (!file) {
      alert("Please select a file to upload!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "pinata_api_key": "8b22a4cc90e2fbac9668",
          "pinata_secret_api_key": "fc038409515d3dc9353099cacdd98d778f7b32bf2ce938bc1c4ae1023818bd43",
        },
      });

      setIpfsHash(response.data.IpfsHash);
      alert(`Uploaded to IPFS!\nHash: ${response.data.IpfsHash}`);
    } catch (error) {
      console.error("IPFS upload error:", error);
      alert("Upload failed!");
    }
  };

  return (
    <div className="container mt-3">
      <h2>Upload File to IPFS</h2>
      <input type="file" className="form-control mb-2" onChange={(e) => setFile(e.target.files[0])} />
      <button className="btn btn-secondary" onClick={uploadToIPFS}>Upload</button>
    </div>
  );
};

export default UploadAsset;
