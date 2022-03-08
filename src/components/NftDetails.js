import { useRecoilValueLoadable } from "recoil";
import config from "../config";
import {
  allMintedTokensState,
  myMintedTokensState,
  nftDetailsSelector,
} from "../state";
import { imageUrl, thumbUrl } from "../utils/UrlHelper";
import NftAttributes from "./NftAttributes";

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
        <div className="row">
          <div className="col-sm-7">
            <img src={thumbUrl(tokenId)}></img>
          </div>
          <div className="col-sm-5">
            <div className="row justify-content-between">
              <div className="col-sm-5">
                <hgroup>
                  <h2>{nftDetails.meta.name}</h2>
                  <h3>
                    Rank: {nftDetails.rarity.rank} / {config.totalNumMints}
                  </h3>
                </hgroup>
              </div>
              <div className="col-sm-5">
                <a
                  href={imageUrl(tokenId)}
                  role="button"
                  target={"_blank"}
                  className="outline"
                >
                  Download in HD
                </a>
              </div>
            </div>
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
