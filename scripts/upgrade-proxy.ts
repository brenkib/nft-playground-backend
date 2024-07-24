import hre, { ethers, network, upgrades } from 'hardhat'
import { vars } from 'hardhat/config'


const ACCOUNT = vars.get("ACCOUNT");
const INSTANCE_ADDRESS = vars.get("INSTANCE_ADDRESS");

async function main() {
    if (network.name === "hardhat") {
        console.warn(
            "You are trying to deploy a contract to the Hardhat Network, which " +
            "gets automatically created and destroyed every time. Use the Hardhat" +
            " option '--network localhost'"
        );
    }

    // you should get this after deploying proxy script
    if (!INSTANCE_ADDRESS) {
        throw new Error("No INSTANCE_ADDRESS is set for this script");
    }

    const [owner] = await hre.ethers.getSigners();

    const BrenkibNFT2 = await ethers.getContractFactory("BrenkibNFTUpgradable2", owner);
    const upgraded = await upgrades.upgradeProxy(INSTANCE_ADDRESS, BrenkibNFT2);
    await upgraded.waitForDeployment();

    console.log("BrenkibNFT deployed to same proxy:", await upgraded.getAddress());

    const balance = await upgraded.balanceOf(ACCOUNT);
    console.log(`Balance after upgrade: ${balance}`);
}

main().catch(console.error);