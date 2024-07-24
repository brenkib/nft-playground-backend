import { task, vars } from 'hardhat/config'
import contract from '../artifacts/contracts/BrenkibNFT.sol/BrenkibNFT.json'
import { ethers } from 'ethers'

const ABI = contract ? contract.abi : [];
const CONTRACT_OWNER_PRIVATE_KEY = vars.get('PRIVATE_KEY')
const INFURA_API_KEY = vars.get('INFURA_API_KEY')

task('mint', 'Mints new NFT to an account')
    .addParam('account', 'The account which will receive NFT')
    .addParam('tokenURI', 'The metadata URI of the token, that will be added to blockchain')
    .addParam('contract', 'The Deployed NFT Contract address')
    .setAction(async (taskArgs) => {
        const provider = new ethers.InfuraProvider('sepolia', INFURA_API_KEY);
        const wallet = new ethers.Wallet(CONTRACT_OWNER_PRIVATE_KEY);
        const signer = wallet.connect(provider);
        const nft = new ethers.Contract(taskArgs.contract, ABI, signer);

        nft.safeMint(taskArgs.account, taskArgs.tokenURI)
            .then((tx) => tx.wait(5))
            .then((receipt) =>
                console.log(
                    `Confirmed! Your transaction receipt is: ${receipt.transactionHash}`
                )
            )
            .catch((e) => console.log('Something went wrong', e))
    })
