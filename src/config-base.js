module.exports = {
  // Testnet values
  testnet: {
    rpcEndpoint: "https://rpc.big-bang-1.stargaze-apis.com/",
    restEndpoint: "https://rest.big-bang-1.stargaze-apis.com/",
    chainId: "big-bang-1",
    // Custom values here
    sg721: "stars1r9kw5n9wcmtc6y22vgg5ztcy7wftannls74vzk607w077v6n80us0x0uem", // UPDATE ME to your testnet contract
    minter: "stars14hllf05avqtngvefmphmd7kn3mgg2qdqzakm5haz3ftsy59tfwxsa38awf", // UPDATE ME to your testnet contract
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
    siteImages: "https://files.endala.xyz/site-images",
  },
  // Production Values
  production: {
    rpc: "https://rpc-stargaze.keplr.app",
    //https://rpc.stargaze-apis.com/
    rest: "https://lcd-stargaze.keplr.app",
    chainId: "stargaze-1",
    // Custom values here
    sg721: "stars1r9kw5n9wcmtc6y22vgg5ztcy7wftannls74vzk607w077v6n80us0x0uem", // UPDATE ME to your production contract
    minter: "stars14hllf05avqtngvefmphmd7kn3mgg2qdqzakm5haz3ftsy59tfwxsa38awf", // UPDATE ME to your production contract
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
    siteImages: "https://files.endala.xyz/site-images",
  },
  global: {
    testnet: true, // Set to false on Production
    showTestnetMsg: false,
    debug: true,
    numHeroImages: 6,
    numLatest: 18,
    numGallery: 18,
  },
};
