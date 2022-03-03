module.exports = {
  // Testnet values
  testnet: {
    rpcEndpoint: "https://rpc.big-bang-1.stargaze-apis.com",
    restEndpoint: "https://rest.big-bang-1.stargaze-apis.com",
    chainId: "big-bang-1",
    // Custom values here
    sg721: "stars1uwakrjs8c0mhak9zz3kush2mnsfvweyqm4re70q4rk4msm7hjsnslcr07p", // UPDATE ME to your testnet contract
    minter: "stars1jc4gk0ua02kvrpggat77r25226h6hg5rrfwlywu7zclkdscjwlhqd56hmm", // UPDATE ME to your testnet contract
    mintPriceStars: 200, // UPDATE ME to Your Mint Price
    totalNumMints: 641, // UPDATE ME to Your total mints
    thumbFiletype: ".jpg", // UPDATE ME to Your total mints
    metadataType: ".json", // UPDATE ME to Your total mints
    rarityType: ".json", // UPDATE ME to Your total mints
    fileUrlThumbnails: "https://files.endala.xyz/testnet/thumbnails", // I am hosting cached versions on S3 because its much faster (but this could also be an IPFS url)
    fileUrlMetadata: "https://files.endala.xyz/testnet/metadata",
    fileUrlRarities: "https://files.endala.xyz/testnet/rarities",
  },
  // Production Values
  production: {
    rpc: "https://rpc-stargaze.keplr.app",
    rest: "https://lcd-stargaze.keplr.app",
    chainId: "stargaze-1",
    // Custom values here
    sg721: "stars1...", // UPDATE ME to your production contract
    minter: "stars1...", // UPDATE ME to your production contract
    mintPriceStars: 200, // UPDATE ME to Your Mint Price
    totalNumMints: 641, // UPDATE ME to Your total mints
    thumbFiletype: ".jpg",
    metadataType: ".json",
    rarityType: ".json", // UPDATE ME to Your total mints
    fileUrlThumbnails: "https://files.endala.xyz/main/thumbnails",
    fileUrlMetadata: "https://files.endala.xyz/main/metadata",
    fileUrlRarities: "https://files.endala.xyz/main/rarities",
  },
  useTestnet: true, // Set to false on production
};
