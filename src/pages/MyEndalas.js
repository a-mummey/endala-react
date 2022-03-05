import { Link, useParams } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import NftDetails from "../NftDetails";
import { myTokensSelector, nftDetailsSelector } from "../state";
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
  const myTokensState = useRecoilValueLoadable(myTokensSelector);
  const myTokens =
    myTokensState.state === "hasValue" ? myTokensState.contents : [];

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
    const nftDetails =
      nftDetailsLoadable.state == "hasValue" ? (
        <NftDetails nftDetails={nftDetailsLoadable.contents}></NftDetails>
      ) : (
        <></>
      );
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
