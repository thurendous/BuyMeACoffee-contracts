// These are the most used part in any of the Dapps

// Wallet connection logic
const isWalletConnected = async () => {
    try {
        const { ethereum } = window

        const accounts = await ethereum.request({ method: 'eth_accounts' })
        console.log('accounts: ', accounts)

        if (accounts.length > 0) {
            const account = accounts[0]
            console.log('wallet is connected! ' + account)
        } else {
            console.log(
                "make sure MetaMask is connected. If you don't have one download and then start again!"
            )
        }
    } catch (error) {
        console.log('error: ', error)
    }
}

const connectWallet = async () => {
    try {
        const { ethereum } = window

        if (!ethereum) {
            console.log('please install MetaMask')
        }

        const accounts = await ethereum.request({
            method: 'eth_requestAccounts',
        })

        setCurrentAccount(accounts[0])
    } catch (error) {
        console.log(error)
    }
}
