module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Ganache RPC Server
      port: 7545,            // Default Ganache port
      network_id: "5777",       // Match any network ID
    },
  },
  compilers: {
    solc: {
      version: "0.8.2", // Ensure this matches your Solidity version
    },
  },
};