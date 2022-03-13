import config from "../config";

const thumbUrl = (tokenId) =>
  `${config.fileUrlThumbnails}/${tokenId}${config.thumbFiletype}`;
const imageUrl = (tokenId) =>
  `${config.fileUrlImages}/${tokenId}${config.imageFiletype}`;
const miniUrl = (tokenId) =>
  `${config.fileUrlMiniThumbs}/${tokenId}${config.thumbFiletype}`;
const metaUrl = (tokenId) =>
  `${config.fileUrlMetadata}/${tokenId}${config.metadataType}`;
const rarityUrl = (tokenId) =>
  `${config.fileUrlRarities}/${tokenId}${config.rarityType}`;
const allRaritiesUrl = () =>
  `${config.fileUrlRarities}/rarities${config.rarityType}`;

const siteImageUrl = (image) => `${config.siteImages}/${image}`;
const stargazeMedia = (tokenId) =>
  `${config.stargazeZone}/media/${config.sg721}/${tokenId}`;
const stargazeProfile = (accountId) =>
  `${config.stargazeZone}/profile/${accountId}`;

const shortAddress = (str) => {
  if (str.length > 35) {
    return str.substr(0, 10) + "…" + str.substr(str.length - 10, str.length);
  }
  return str;
};

export {
  thumbUrl,
  miniUrl,
  metaUrl,
  rarityUrl,
  allRaritiesUrl,
  imageUrl,
  siteImageUrl,
  stargazeMedia,
  stargazeProfile,
  shortAddress,
};
