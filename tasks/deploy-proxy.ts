import { task, vars } from 'hardhat/config'

task('deploy-proxy', 'Upgrade proxy proxy')
    .setAction(async (taskArgs, hre) => {
        const [owner] = await hre.ethers.getSigners();
        const BrenkibNFT = await hre.ethers.getContractFactory("BrenkibNFTUpgradable", owner);
        const instance = await hre.upgrades.deployProxy(BrenkibNFT, [owner.address]);
        await instance.waitForDeployment();

        console.log(`Proxy Address: ${instance.target}`);
    })
