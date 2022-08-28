// require('@nomicfoundation/hardhat-toolbox')
// hardhat.config.js

require('@nomiclabs/hardhat-ethers')
require('@nomiclabs/hardhat-waffle')
require('dotenv').config()

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const GOERLI_URL = process.env.GOERLI_URL
const RINKEBY_URL = process.env.RINKEBY_URL
const PRI_KEE = process.env.PRI_KEE
// console.log(PRIVATE_KEE !== undefined && PRIVATE_KEE !== '')
// console.log(GOERLI_URL !== undefined && GOERLI_URL !== '')

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: '0.8.4',
    networks: {
        rinkeby: {
            url: RINKEBY_URL,
            accounts: [PRI_KEE],
        },
        georli: {
            url: GOERLI_URL,
            accounts: [PRI_KEE],
        },
    },
}
