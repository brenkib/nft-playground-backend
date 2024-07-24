import { ethers, upgrades } from 'hardhat'
import { expect } from 'chai'

describe("BrenkibNFT", async function() {
    it('should mint after upgrade', async () => {
        const [owner] = await ethers.getSigners();

        const BrenkibNFT = await ethers.getContractFactory("BrenkibNFTUpgradable", owner);
        const BrenkibNFT2 = await ethers.getContractFactory("BrenkibNFTUpgradable2", owner);

        const instance = await upgrades.deployProxy(BrenkibNFT, [owner.address]);


        await instance.safeMint(owner.address, "tokenURI123");

        let balance = await instance.balanceOf(owner.address);

        expect(balance).to.equal(1);

        const upgraded = await upgrades.upgradeProxy(await instance.getAddress(), BrenkibNFT2);

        expect(await upgraded.balanceOf(owner.address)).to.equal(1);

        expect(await upgraded.demoUpgradable()).to.equal("UPGRADED");
    });
});