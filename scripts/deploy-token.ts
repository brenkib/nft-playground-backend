import hre, { network } from 'hardhat'

async function main() {
    if (network.name === "hardhat") {
        console.warn(
            "You are trying to deploy a contract to the Hardhat Network, which " +
            "gets automatically created and destroyed every time. Use the Hardhat" +
            " option '--network localhost'"
        );
    }

    const [owner] = await hre.ethers.getSigners();
    const BrenkibERC20 = await hre.ethers.getContractFactory("BrenkibERC20", owner);
    const token = await BrenkibERC20.deploy(owner);
    await token.waitForDeployment();
    console.log(`Contract Address: ${token.target}`);

    // Check that owner got init 100 supply
    const balance = await token.balanceOf(owner.address);
    console.log(`Balance: ${balance}`);
}

main().catch(console.error);