import { Link, useParams } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import NftDetails from "../components/NftDetails";
import {
  currentAccountSelector,
  nftDetailsSelector,
  allMintedTokensState,
  myMintedTokensState,
} from "../state";
import "./MyEndalas.css";

function endalaList(tokenIds) {
  return tokenIds.map((item, index) => (
    <li key={item}>
      <Link to={`/my-endalas/${item}`}>Endala #{item}</Link>
    </li>
  ));
}
function MyEndalas() {
  let params = useParams();
  const allMintedTokens = useRecoilValueLoadable(allMintedTokensState);
  const myMintedTokens = useRecoilValueLoadable(myMintedTokensState);

  const myTokens = myMintedTokens.valueMaybe() || [];

  let currentTokenId = null;
  if (params.tokenId && myTokens.includes(params.tokenId)) {
    currentTokenId = params.tokenId;
  } else if (myTokens.length) {
    currentTokenId = myTokens[0];
  }
  const nftDetailsLoadable = useRecoilValueLoadable(
    nftDetailsSelector(currentTokenId)
  );
  if (currentTokenId) {
    const nftDetails = nftDetailsLoadable
      .map((d) => <NftDetails nftDetails={d}></NftDetails>)
      .valueMaybe() || <></>;

    return (
      <div className="container-fluid">
        <div className="endalas-container">
          <div className="leftCol">
            <aside>
              <nav>
                <ul>{endalaList(myTokens)}</ul>
              </nav>
            </aside>
          </div>
          <div className="mainCol">{nftDetails}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <article>
          <h2>Still Looking For Your Endalas...</h2>
        </article>
      </div>
    );
  }
}

export default MyEndalas;
