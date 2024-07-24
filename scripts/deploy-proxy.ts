import hre, { ethers, network, upgrades } from 'hardhat'
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
    const BrenkibNFT = await ethers.getContractFactory("BrenkibNFTUpgradable", owner);
    const instance = await upgrades.deployProxy(BrenkibNFT, [owner.address]);
    await instance.waitForDeployment();

    console.log(`Proxy Address: ${instance.target}`);

    // Mint 1 nft at the start
    await instance.safeMint(ACCOUNT, TOKEN_URI);
    const balance = await instance.balanceOf(ACCOUNT);
    console.log(`Balance: ${balance}`);
}

main().catch(console.error);