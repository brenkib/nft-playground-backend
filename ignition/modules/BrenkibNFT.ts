import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'
import { vars } from 'hardhat/config'

const ACCOUNT = vars.get("ACCOUNT");
const BrenkibNFTModule = buildModule("BrenkibNFTModule", (m) => {
    const nftContract = m.contract("BrenkibNFT", [ACCOUNT]);
    return { nftContract };
});

module.exports = BrenkibNFTModule;