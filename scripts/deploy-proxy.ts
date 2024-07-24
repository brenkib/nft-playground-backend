import hre, { ethers, network, upgrades } from 'hardhat'
import { vars } from 'hardhat/config'


const ACCOUNT = vars.get("ACCOUNT");


async function main() {
    if (network.name === "hardhat") {
        console.warn(
            "You are trying to deploy a contract to the Hardhat Network, which " +
            "gets automatically created and destroyed every time. Use the Hardhat" +
            " option '--network localhost'"
        );
    }

    // you should get this after deploying proxy script
    const INSTANCE_ADDRESS = getInstanceArg();

    const [owner] = await hre.ethers.getSigners();

    const BrenkibNFT2 = await ethers.getContractFactory("BrenkibNFTUpgradable2", owner);
    const upgraded = await upgrades.upgradeProxy(INSTANCE_ADDRESS, BrenkibNFT2);
    await upgraded.waitForDeployment();

    console.log("BrenkibNFT deployed to same proxy:", await upgraded.getAddress());

    const balance = await upgraded.balanceOf(ACCOUNT);
    console.log(`Balance after upgrade: ${balance}`);
}

const getInstanceArg = () => {
    // Checks for --instance and if it has a value
    const customIndex = process.argv.indexOf('--instance');
    let customValue;

    if (customIndex > -1) {
        // Retrieve the value after --custom
        customValue = process.argv[customIndex + 1];
    }

    if (!customValue) {
        throw new Error(`Invalid instance address`);
    }
    return customValue;
}

main().catch(console.error);