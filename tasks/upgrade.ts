import { task } from 'hardhat/config'

task('upgrade-proxy', 'Upgrade proxy proxy')
    .addParam('instance', 'The instance of a proxy contract')
    .setAction(async (taskArgs, hre) => {
        // you should get this after deploying proxy script
        if (!taskArgs.instance) {
            throw new Error("No INSTANCE_ADDRESS is set for this script");
        }

        const [owner] = await hre.ethers.getSigners();

        const BrenkibNFT2 = await hre.ethers.getContractFactory("BrenkibNFTUpgradable2", owner);
        const upgraded = await hre.upgrades.upgradeProxy(taskArgs.instance, BrenkibNFT2);
        await upgraded.waitForDeployment();

        console.log("BrenkibNFT deployed to same proxy:", await upgraded.getAddress());
    })
