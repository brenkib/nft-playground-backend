import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import { HardhatUserConfig, vars } from 'hardhat/config';

import "./tasks/upgrade";
import "./tasks/mint";
import "./tasks/deploy-proxy";

const INFURA_API_KEY = vars.get("INFURA_API_KEY");
const accounts = vars.has("PRIVATE_KEY") ? [vars.get("PRIVATE_KEY")] : [];

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: accounts,
    }
  }
};

export default config;
