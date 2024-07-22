import hre, { network } from 'hardhat'
// @ts-ignore
import BrenkibNFTModule from '../ignition/modules/BrenkibNFT'
import { vars } from 'hardhat/config'


const ACCOUNT = vars.get("ACCOUNT");
const TOKEN_URI = vars.get("TOKEN_URI");

async function main() {
    if (network.name === "hardhat") {
        console.warn(
            "You are trying to deploy a contract to the Hardhat Network, which " +
            "gets automatically created and destroyed every time. Use the Hardhat" +
            " option '--network localhost'"
        );
    }

    const [owner] = await hre.ethers.getSigners();
    const BrenkibNFT = await hre.ethers.getContractFactory("BrenkibNFT", owner);
    const contract = await BrenkibNFT.deploy(owner, { gasLimit: 1500000 });
    await contract.waitForDeployment();
    console.log(`Contract Address: ${contract.target}`);

    // Mint 1 nft at the start
    await contract.safeMint(ACCOUNT, TOKEN_URI);
    const balance = await contract.balanceOf(ACCOUNT);
    console.log(`Balance: ${balance}`);
}

main().catch(console.error);