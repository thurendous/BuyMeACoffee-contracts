// scripts/withdraw.js

const hre = require('hardhat')
const abi = require('../artifacts/contracts/OmaenoBuyMeACoffee.sol/OmaenoBuyMeACoffee.json')

async function getBalance(address) {
    const balanceBigInt = await hre.waffle.provider.getBalance(address)
    return hre.ethers.utils.formatEther(balanceBigInt)
}

async function main() {
    // Get the contract that has been deployed to Goerli.
    const contractAddress = '0xC25091F6a43030f6bCA1A04d937B15027D30c7b6' // georli
    const contractABI = abi.abi

    // Get the node connection and wallet connection.
    // const provider = new hre.ethers.providers.AlchemyProvider(
    //     'rinkeby',
    //     process.env.RINKEBY_API_KEY
    // )

    // Ensure that signer is the SAME address as the original contract deployer,
    // or else this script will fail with an error.
    // const signer = new hre.ethers.Wallet(process.env.PRI_KEE, provider)
    const [signer] = await hre.ethers.getSigners()

    // Instantiate connected contract.
    const buyMeACoffee = new hre.ethers.Contract(
        contractAddress,
        contractABI,
        signer
    )

    // Check starting balances.
    console.log(
        'current balance of owner: ',
        await getBalance(signer.address),
        'ETH'
    )
    const contractBalance = await getBalance(buyMeACoffee.address)
    console.log(
        'current balance of contract: ',
        await getBalance(buyMeACoffee.address),
        'ETH'
    )

    // Withdraw funds if there are funds to withdraw.
    if (contractBalance !== '0.0') {
        console.log('withdrawing funds..')
        const withdrawTxn = await buyMeACoffee.withdrawTips()
        await withdrawTxn.wait()
    } else {
        console.log('no funds to withdraw!')
    }

    // Check ending balance.
    console.log(
        'current balance of owner: ',
        await getBalance(signer.address),
        'ETH'
    )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
