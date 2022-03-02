const configBase = {
  // Testnet values
  testnet: {
    rpcEndpoint: "https://rpc.big-bang-1.stargaze-apis.com/",
    restEndpoint: "https://rest.big-bang-1.stargaze-apis.com/",
    chainId: "big-bang-1",
    // Custom values here
    sg721: "stars1uwakrjs8c0mhak9zz3kush2mnsfvweyqm4re70q4rk4msm7hjsnslcr07p", // UPDATE ME to your testnet contract
    minter: "stars1jc4gk0ua02kvrpggat77r25226h6hg5rrfwlywu7zclkdscjwlhqd56hmm", // UPDATE ME to your testnet contract
    mintPriceStars: 200, // UPDATE ME to Your Mint Price
    totalNumMints: 641, // UPDATE ME to Your total mints
    thumbFiletype: ".jpg",
    fileUrlThumbnails: "http://files.endala.xyz/testnet/thumbnails", // I am hosting cached versions on S3 because its much faster
    fileUrlMetadata: "http://files.endala.xyz/testnet/metadata",
    fileUrlRarities: "http://files.endala.xyz/testnet/rarities",
  },
  // Production Values
  production: {
    rpc: "https://rpc-stargaze.keplr.app",
    rest: "https://lcd-stargaze.keplr.app",
    chainId: "stargaze-1",
    // Custom values here
    sg721: "stars1uwakrjs8c0mhak9zz3kush2mnsfvweyqm4re70q4rk4msm7hjsnslcr07p", // UPDATE ME to your production contract
    minter: "stars1jc4gk0ua02kvrpggat77r25226h6hg5rrfwlywu7zclkdscjwlhqd56hmm", // UPDATE ME to your production contract
    mintPriceStars: 200, // UPDATE ME to Your Mint Price
    totalNumMints: 641, // UPDATE ME to Your total mints
    fileUrlThumbnails: "http://files.endala.xyz/testnet/thumbnails",
    fileUrlMetadata: "http://files.endala.xyz/testnet/metadata",
    fileUrlRarities: "http://files.endala.xyz/testnet/rarities",
  },
  useTestnet: true, // Set to false on production
};

const config = configBase.useTestnet
  ? configBase.testnet
  : configBase.production;
config.testnet = configBase.useTestnet;
Object.freeze(config);

export default config;
