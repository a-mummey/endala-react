module.exports = {
  // Testnet values
  testnet: {
    rpcEndpoint: "https://rpc.big-bang-1.stargaze-apis.com/",
    restEndpoint: "https://rest.big-bang-1.stargaze-apis.com/",
    chainId: "big-bang-1",
    // Custom values here
    sg721: "stars19w7nrfanq6jj7ejp9jglae5c2734ud3zmmkazwcekqxzucwjd32sep8yp9", // UPDATE ME to your testnet contract
    minter: "stars1kh5e4wajfkv822esuhtsn6veak02085neh2m6flfmujeht2nmztshzy257", // UPDATE ME to your testnet contract
    mintPriceStars: 250, // UPDATE ME to Your Mint Price
    totalNumMints: 641, // UPDATE ME to Your total mints
    thumbFiletype: ".jpg", // UPDATE ME to Your total mints
    metadataType: ".json", // UPDATE ME to Your total mints
    rarityType: ".json", // UPDATE ME to Your total mints
    fileBase: "https://files.endala.xyz/",
    fileUrlThumbnails: "https://files.endala.xyz/nft/thumbnails", // I am hosting cached versions on S3 because its much faster
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
    sg721: "stars19w7nrfanq6jj7ejp9jglae5c2734ud3zmmkazwcekqxzucwjd32sep8yp9", // UPDATE ME to your production contract
    minter: "stars1kh5e4wajfkv822esuhtsn6veak02085neh2m6flfmujeht2nmztshzy257", // UPDATE ME to your production contract
    mintPriceStars: 250, // UPDATE ME to Your Mint Price
    totalNumMints: 641, // UPDATE ME to Your total mints
    thumbFiletype: ".jpg", // UPDATE ME to Your total mints
    metadataType: ".json", // UPDATE ME to Your total mints
    rarityType: ".json", // UPDATE ME to Your total mints
    fileBase: "https://files.endala.xyz/",
    fileUrlThumbnails: "https://files.endala.xyz/nft/thumbnails",
    fileUrlMiniThumbs: "https://files.endala.xyz/nft/mini",
    fileUrlMetadata: "https://files.endala.xyz/nft/metadata",
    fileUrlRarities: "https://files.endala.xyz/nft/rarities",
  },
  global: {
    testnet: true, // Set to false on Production
    debug: true,
  },
};
