import { Link } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { myMintedTokensState } from "../state";
import { miniUrl } from "../utils/UrlHelper";
import "./MiniThumb.css";

function MiniThumb({ tokenId }) {
  const myMintedTokens = useRecoilValueLoadable(myMintedTokensState);
  const isMyMint = (myMintedTokens.valueMaybe() || []).includes(tokenId);
  const myMintIdentifier = isMyMint ? (
    <strong title="You minted this Endala">⦿</strong>
  ) : (
    <></>
  );
  return (
    <figure>
      <Link to={`/nft/${tokenId}`} className="miniThumb">
        <img src={miniUrl(tokenId)} alt={`Endala #${tokenId}`}></img>
      </Link>
      <figcaption>
        <Link to={`/nft/${tokenId}`}>Endala #{tokenId}</Link>
        {myMintIdentifier}
      </figcaption>
    </figure>
  );
}

export default MiniThumb;
