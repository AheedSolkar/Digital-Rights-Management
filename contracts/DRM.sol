// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract DRM {
    struct DigitalAsset {
        uint256 id;
        string name;
        string ipfsHash;  // Store file hash for verification
        address owner;
        bool isLicensed;
        address licensee;
    }

    mapping(uint256 => DigitalAsset) public assets;
    mapping(address => uint256[]) public userAssets;
    uint256 public assetCounter;

    event AssetRegistered(uint256 assetId, string name, string ipfsHash, address owner);
    event LicenseIssued(uint256 assetId, address licensee);
    event OwnershipTransferred(uint256 assetId, address oldOwner, address newOwner);

    // Register a new digital asset
    function registerAsset(string memory _name, string memory _ipfsHash) public {
        require(bytes(_ipfsHash).length > 0, "IPFS hash cannot be empty");
        
        assetCounter++;
        assets[assetCounter] = DigitalAsset(assetCounter, _name, _ipfsHash, msg.sender, false, address(0));
        userAssets[msg.sender].push(assetCounter);

        emit AssetRegistered(assetCounter, _name, _ipfsHash, msg.sender);
    }

    // Issue a license for the asset
    function issueLicense(uint256 _assetId, address _licensee) public {
        require(msg.sender == assets[_assetId].owner, "Only owner can issue licenses");
        require(!assets[_assetId].isLicensed, "Already licensed");

        assets[_assetId].isLicensed = true;
        assets[_assetId].licensee = _licensee;

        emit LicenseIssued(_assetId, _licensee);
    }

    // Transfer ownership of the asset
    function transferOwnership(uint256 _assetId, address _newOwner) public {
        require(msg.sender == assets[_assetId].owner, "Only owner can transfer");
        
        address oldOwner = assets[_assetId].owner;
        assets[_assetId].owner = _newOwner;
        assets[_assetId].isLicensed = false; // Reset license upon transfer
        assets[_assetId].licensee = address(0); // Clear licensee info
        
        emit OwnershipTransferred(_assetId, oldOwner, _newOwner);
    }

    // Get asset details
    function getAsset(uint256 _assetId) public view returns (
        string memory, string memory, address, bool, address
    ) {
        DigitalAsset memory asset = assets[_assetId];
        return (asset.name, asset.ipfsHash, asset.owner, asset.isLicensed, asset.licensee);
    }

    // Get list of assets owned by a user
    function getUserAssets(address _user) public view returns (uint256[] memory) {
        return userAssets[_user];
    }
}
