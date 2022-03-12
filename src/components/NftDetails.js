import { useRecoilValueLoadable } from "recoil";
import config from "../config";
import {
  nftDetailsSelector,
  sortedMintedTokensSelector,
  tokenInfoSelector,
} from "../state";
import { imageUrl, thumbUrl } from "../utils/UrlHelper";
import GalleryNav from "./GalleryNav";
import NftAttributes from "./NftAttributes";
import "./NftDetails.scss";
import { stargazeMedia, stargazeProfile } from "../utils/UrlHelper";
import { FaExternalLinkAlt, FaTrophy } from "react-icons/fa";

function NftDetails({ tokenId }) {
  const tokenInfo =
    useRecoilValueLoadable(tokenInfoSelector(tokenId)).valueMaybe() || {};

  console.log(tokenInfo);
  const nftDetailsLoadable = useRecoilValueLoadable(
    nftDetailsSelector(tokenId)
  );
  const allMintedTokens = useRecoilValueLoadable(sortedMintedTokensSelector);

  if (tokenId) {
    const defaultNftDetails = {
      meta: {
        name: `Endala #${tokenId}`,
      },
      rarity: { rank: "?" },
    };
    let isMinted = null;
    if (Array.isArray(allMintedTokens.valueMaybe())) {
      isMinted = allMintedTokens.valueMaybe().includes(tokenId);
    }
    const nftDetails =
      isMinted === true && nftDetailsLoadable.valueMaybe()
        ? nftDetailsLoadable.valueMaybe()
        : defaultNftDetails;

    const nftNotMintedMsg =
      isMinted === false ? <h3>This Endala hasn't been minted yet</h3> : <></>;

    const trophy =
      nftDetails.rarity.rank <= 10 ? <FaTrophy title="Top 10 Endala" /> : <></>;

    const ownedBy = tokenInfo.access ? (
      <p className="owner">
        <small>Owner: {tokenInfo.access.owner}</small>
      </p>
    ) : (
      <></>
    );

    return (
      <article className="nftDetails">
        <header>
          <hgroup>
            <h2>{nftDetails.meta.name}</h2>
            <h3>
              Rarity: {nftDetails.rarity.rank} / {config.totalNumMints} {trophy}
            </h3>
          </hgroup>
          <div className="gallery-nav-wrapper">
            <a
              href={stargazeMedia(tokenId)}
              rel="noreferrer"
              target={"_blank"}
              title={`View Endala #${tokenId} on Stargaze`}
            >
              View On Stargaze <FaExternalLinkAlt />
            </a>
            <GalleryNav
              tokenId={tokenId}
              allTokens={allMintedTokens.valueMaybe()}
            ></GalleryNav>
          </div>
        </header>
        <div className="row">
          <div className="col-sm-7">
            <a
              href={imageUrl(tokenId)}
              target={"_blank"}
              rel="noreferrer"
              title="View High Definition Image"
            >
              <img src={thumbUrl(tokenId)} alt={nftDetails.meta.name}></img>
            </a>
            <div className="download">
              <a
                href={imageUrl(tokenId)}
                role="button"
                target={"_blank"}
                rel="noreferrer"
                className="outline"
              >
                Download in HD
              </a>
            </div>
          </div>
          <div className="col-sm-5">
            <NftAttributes nftRarity={nftDetails.rarity}></NftAttributes>
            {nftNotMintedMsg}
          </div>
        </div>
        {ownedBy}
      </article>
    );
  } else {
    return (
      <article>
        <h2>Loading Endalas...</h2>
      </article>
    );
  }
}
export default NftDetails;
