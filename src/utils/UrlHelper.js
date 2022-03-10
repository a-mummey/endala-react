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

export {
  thumbUrl,
  miniUrl,
  metaUrl,
  rarityUrl,
  allRaritiesUrl,
  imageUrl,
  siteImageUrl,
};
