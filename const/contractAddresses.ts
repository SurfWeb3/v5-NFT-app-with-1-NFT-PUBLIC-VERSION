import { Sepolia } from "@thirdweb-dev/chains";

// 1. Set up the network your smart contracts are deployed to.
export const NETWORK = Sepolia;

// 2. The address of the marketplace V3 smart contract.
// Deploy your own: https://thirdweb.com/thirdweb.eth/MarketplaceV3
export const MARKETPLACE_ADDRESS = "0xD8Fb95821C95241008acb3460C8966a9ca3cC652";

// 3. The address of your NFT collection smart contract.
export const NFT_COLLECTION_ADDRESS = "0xE881b8400268D2c77fa0411c5fC4C5B7b0407DcB";

// (Optional) Set up the URL of where users can view transactions on
// For example, below, we use Mumbai.polygonscan to view transactions on the Mumbai testnet.
export const ETHERSCAN_URL = "https://sepolia.etherscan.io";

// List of authorized wallet addresses that can access the sell feature
export const AUTHORIZED_ADDRESSES: string[] = [
  // Replace with actual addresses: "0x1234567890123456789012345678901234567890",
  // Add more addresses as needed
  "0xc548Ac07F05cE4F0E8f653203411C15F25309fEf",

  "0x81948B66C408887c7705B10542ceF3063aA0a4B8",

  "0x8E468Aac3B36EfFe3CC2E24C14b17c9E619D2C26",

  "0x3D881AbC4f50E1a2FB0a3151d2bE3fb577166477",
];
