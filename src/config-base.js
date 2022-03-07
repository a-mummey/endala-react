module.exports = {
  // Testnet values
  testnet: {
    rpcEndpoint: "https://rpc.big-bang-1.stargaze-apis.com/",
    restEndpoint: "https://rest.big-bang-1.stargaze-apis.com/",
    chainId: "big-bang-1",
    // Custom values here
    sg721: "stars1us64srkst6ageruatsd3w4x0ulftcngmkp73nqnve3zzflh4w03qv4k7n5", // UPDATE ME to your testnet contract
    minter: "stars1carltzthz02mc7rlpa97yhedrr4j5g3e4c3jz3wxenmjuuvxlttsknrsk2", // UPDATE ME to your testnet contract
    mintPriceStars: 250, // UPDATE ME to Your Mint Price
    totalNumMints: 641, // UPDATE ME to Your total mints
    imageFiletype: ".png",
    thumbFiletype: ".png",
    metadataType: ".json",
    rarityType: ".json",
    fileBase: "https://files.endala.xyz/",
    fileUrlImages: "https://files.endala.xyz/nft/images", // I am hosting cached versions on S3 because its much faster
    fileUrlThumbnails: "https://files.endala.xyz/nft/thumbnails",
    fileUrlMiniThumbs: "https://files.endala.xyz/nft/mini",
    fileUrlMetadata: "https://files.endala.xyz/testnet/metadata",
    fileUrlRarities: "https://files.endala.xyz/nft/rarities",
  },
  // Production Values
  production: {
    rpc: "https://rpc-stargaze.keplr.app",
    rest: "https://lcd-stargaze.keplr.app",
    chainId: "stargaze-1",
    // Custom values here
    sg721: "stars1us64srkst6ageruatsd3w4x0ulftcngmkp73nqnve3zzflh4w03qv4k7n5", // UPDATE ME to your production contract
    minter: "stars1carltzthz02mc7rlpa97yhedrr4j5g3e4c3jz3wxenmjuuvxlttsknrsk2", // UPDATE ME to your production contract
    mintPriceStars: 250, // UPDATE ME to Your Mint Price
    totalNumMints: 641, // UPDATE ME to Your total mints
    imageFiletype: ".png",
    thumbFiletype: ".png",
    metadataType: ".json",
    rarityType: ".json",
    fileBase: "https://files.endala.xyz/",
    fileUrlImages: "https://files.endala.xyz/nft/images", // I am hosting cached versions on S3 because its much faster
    fileUrlThumbnails: "https://files.endala.xyz/nft/thumbnails",
    fileUrlMiniThumbs: "https://files.endala.xyz/nft/mini",
    fileUrlMetadata: "https://files.endala.xyz/nft/metadata",
    fileUrlRarities: "https://files.endala.xyz/nft/rarities",
  },
  global: {
    testnet: true, // Set to false on Production
    debug: true,
    numHeroImages: 6,
    numLatest: 18,
    numGallery: 18,
  },
};
