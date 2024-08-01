import hre, { network } from 'hardhat'
import { vars } from 'hardhat/config'


const ACCOUNT = vars.get("ACCOUNT");
// Address of deployed BrenkibERC20 token
const ERC20Token = "0x6ccA6E0943277780da2D9C0bb7e863B6Dbf36B05";
const TOKEN_URI = vars.get("TOKEN_URI");

import contract from '../artifacts/contracts/BrenkibERC20.sol/BrenkibERC20.json'
const erc20ABI = contract ? contract.abi : [];

async function main() {
    if (network.name === "hardhat") {
        console.warn(
            "You are trying to deploy a contract to the Hardhat Network, which " +
            "gets automatically created and destroyed every time. Use the Hardhat" +
            " option '--network localhost'"
        );
    }

    const [owner] = await hre.ethers.getSigners();
    const BrenkibNFT_2 = await hre.ethers.getContractFactory("BrenkibNFT_2", owner);
    const contract = await BrenkibNFT_2.deploy(owner, ERC20Token, 10);
    await contract.waitForDeployment();
    console.log(`Contract Address: ${contract.target}`);

    /* Next part is for testing purposes */

   /* // Give NFTContract allowance to spend ERC20 token
    // Create a contract instance
    const erc20Contract = new hre.ethers.Contract(ERC20Token, erc20ABI, owner);
    const decimals = Number(await erc20Contract.decimals());
    // Approve the NFT contract to spend the maximum amount of ERC20 tokens for our owner
    const tx = await erc20Contract.approve(contract.target, 100 * Math.pow(10, decimals));
    console.log(`Approved NFT contract with transaction hash: ${tx?.hash}`);
    // Mint 1 nft at the start
    await contract.safeMint(ACCOUNT, TOKEN_URI);
    const balance = await contract.balanceOf(ACCOUNT);
    console.log(`Balance: ${balance}`);

    // Check owner ERC20 token balance
    // Check that owner got init 100 supply
    const erc20Balance = await erc20Contract.balanceOf(owner.address);
    console.log(`Balance ERC20: ${erc20Balance}`);*/
}

main().catch(console.error);