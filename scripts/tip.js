// scripts/deploy.js

const hre = require('hardhat')
const abi = require('../artifacts/contracts/OmaenoBuyMeACoffee.sol/OmaenoBuyMeACoffee.json')

// Returns the Ether balance of a given address.
async function getBalance(address) {
    const balanceBigInt = await hre.waffle.provider.getBalance(address)
    return hre.ethers.utils.formatEther(balanceBigInt)
}

// Logs the memos stored on-chain from coffee purchases.
async function printMemos(memos) {
    for (const memo of memos) {
        const timestamp = memo.timestamp
        const tipper = memo.name
        const tipperAddress = memo.from
        const message = memo.message
        console.log(
            `At ${timestamp}, ${tipper} (${tipperAddress}) said: "${message}"`
        )
    }
}

async function main() {
    // Get the contract that has been deployed to Goerli.
    const contractAddress = '0xC25091F6a43030f6bCA1A04d937B15027D30c7b6' // georli
    const contractABI = abi.abi

    // Get the node connection and wallet connection.
    // const provider = new hre.ethers.providers.AlchemyProvider(
    //     'goerli',
    //     process.env.GOERLI_API_KEY
    // )

    // Ensure that signer is the SAME address as the original contract deployer,
    // or else this script will fail with an error.
    // const signer = new hre.ethers.Wallet(process.env.PRIVATE_KEE, provider)
    const [signer] = await hre.ethers.getSigners()

    // Instantiate connected contract.
    const buyMeACoffee = new hre.ethers.Contract(
        contractAddress,
        contractABI,
        signer
    )

    const provider = ethers.getDefaultProvider('rinkeby')
    console.log('---1')
    // console.log(provider)
    console.log('before: ', await getBalance(buyMeACoffee.address))
    const withdrawTxn = await buyMeACoffee.buyCoffee(
        'fromM',
        "OMAE! You're the best! Keep doing it!",
        {
            value: hre.ethers.utils.parseEther('0.01'),
        }
    )
    await withdrawTxn.wait()
    console.log('after: ', await getBalance(buyMeACoffee.address))

    console.log('== memos ==')
    const memos = await buyMeACoffee.getMemos()
    printMemos(memos)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
