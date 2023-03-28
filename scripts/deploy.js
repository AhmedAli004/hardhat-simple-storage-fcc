//imports
const { ethers, run, network } = require("hardhat")

//async main 
async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploying contract .........")
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()  
  console.log(`Deployed contract to: ${simpleStorage.address}`)

  //what happen when we deploy to our hardhat network?
  //console.log(network.config)
  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for 6 blocks to mine") 
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])
  }
  const currentValue = await simpleStorage.retrieve()
  console.log(`Current Value is: ${currentValue}`)

  //Update the current Value
  const transactionResponse = await simpleStorage.store(7)
  await transactionResponse.wait(1)
  const updatedValue = await simpleStorage.retrieve()
  console.log(`Updated Value is: ${updatedValue}`)
}

//verification
async function verify(contractAddress, args) {
  console.log("Verifying ...........")
  try {
      await run("verify:verify", {
        address: contractAddress,
        constractArguments: args,
      })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("ALready Verified")
    } else {
      console.log(e)
    }
  }

}
//main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });