 const Token = artifacts.require("Token");
 const Exchange = artifacts.require("Exchange");

 module.exports = async function(
 	deployer, _network, accounts) {

   await deployer.deploy(Token);

   const feeAccount = accounts[0];
   const feePermille = 5; 

   await deployer.deploy(
   	Exchange,
   	feeAccount,
   	feePermille
   )
 };
