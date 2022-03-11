import { useRecoilValueLoadable } from "recoil";
import config from "../config";
import { nftDetailsSelector, sortedMintedTokensSelector } from "../state";
import { imageUrl, thumbUrl } from "../utils/UrlHelper";
import GalleryNav from "./GalleryNav";
import NftAttributes from "./NftAttributes";
import "./NftDetails.scss";

function NftDetails({ tokenId }) {
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
    return (
      <article className="nftDetails">
        <header>
          <hgroup>
            <h2>{nftDetails.meta.name}</h2>
            <h3>
              Rank: {nftDetails.rarity.rank} / {config.totalNumMints}
            </h3>
          </hgroup>
          <GalleryNav
            tokenId={tokenId}
            allTokens={allMintedTokens.valueMaybe()}
          ></GalleryNav>
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
