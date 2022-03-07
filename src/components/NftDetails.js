import { useRecoilValueLoadable } from "recoil";
import { nftDetailsSelector } from "../state";
import NftAttributes from "./NftAttributes";
import {
  thumbUrl,
  miniUrl,
  metaUrl,
  rarityUrl,
  allRaritiesUrl,
  imageUrl,
} from "../utils/UrlHelper";
import config from "../config";
import { allMintedTokensState, myMintedTokensState } from "../state";

function NftDetails({ tokenId }) {
  const nftDetailsLoadable = useRecoilValueLoadable(
    nftDetailsSelector(tokenId)
  );
  const allMintedTokens = useRecoilValueLoadable(allMintedTokensState);
  const myMintedTokens = useRecoilValueLoadable(myMintedTokensState);

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
      <article>
        <div className="img-container">
          <div className="img-preview">
            <img src={thumbUrl(tokenId)}></img>
          </div>
          <div className="img-properties">
            <hgroup>
              <h2>{nftDetails.meta.name}</h2>
              <h3>
                Rank: {nftDetails.rarity.rank} / {config.totalNumMints}
              </h3>
            </hgroup>
            <NftAttributes nftRarity={nftDetails.rarity}></NftAttributes>
            {nftNotMintedMsg}
            <a href={imageUrl(tokenId)} role="button" target={"_blank"}>
              Download in HD
            </a>
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
