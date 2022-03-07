import { Link, useParams } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import NftDetails from "../components/NftDetails";
import { allMintedTokensState, myMintedTokensState } from "../state";
import "./Gallery.css";

function endalaList(tokenIds) {
  return tokenIds.map((item, index) => (
    <li key={item}>
      <Link to={`/nft/${item}`}>Endala #{item}</Link>
    </li>
  ));
}
function MyEndalas() {
  let params = useParams();
  const allMintedTokens = useRecoilValueLoadable(allMintedTokensState);
  const myMintedTokens = useRecoilValueLoadable(myMintedTokensState);
  const myTokens = myMintedTokens.valueMaybe() || [];

  let currentTokenId;
  if (params.tokenId) {
    currentTokenId = params.tokenId;
  } else if (
    Array.isArray(allMintedTokens.valueMaybe()) &&
    allMintedTokens.valueMaybe()[0]
  ) {
    currentTokenId = allMintedTokens.valueMaybe()[0];
  } else {
    currentTokenId = 1;
  }

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
        <div className="mainCol">
          <NftDetails tokenId={currentTokenId}></NftDetails>
        </div>
      </div>
    </div>
  );
}

export default MyEndalas;
