import Web3 from 'web3';
export const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000';

export const GREEN = 'success';
export const RED = 'danger';

export const DECIMALS = (10**18);

// Shortcut to avoid passing around 
// web3 connection
export const ether = (wei) => {
  if(wei) {
    return(wei / DECIMALS); // 18 decimal places
  }
};

// Same as ether
export const tokens = ether;

// connect to a wallet like metamask
export const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Acccounts now exposed
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        try{
        const provider = new Web3.providers.HttpProvider(
          "http://localhost:9545"
        );
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
      } catch (error){
        window.alert('Please install MetaMask')
        window.location.assign("https://metamask.io/")
      }
      }
    });
  });
};

export const formatBalance = (balance) => {
  // 4 decimal places
  const precision = 10000;
  balance = ether(balance);
  // Use 4 decimal places
  balance = Math
  .round(balance * precision) / precision;

  return balance;
};