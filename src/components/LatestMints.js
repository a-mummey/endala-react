import { useRecoilValueLoadable } from "recoil";
import { allMintedTokensState } from "../state";
import MiniThumbList from "./MiniThumbList";
import config from "../config";
import { Link } from "react-router-dom";

function LatestMints() {
  const allMintedTokens = useRecoilValueLoadable(allMintedTokensState);
  const tokenIds = allMintedTokens.valueMaybe() || [];
  const latestTokenIds = [...tokenIds]
    .sort((a, b) => parseInt(b) - parseInt(a))
    .slice(0, config.numLatest);
  const seeMore =
    tokenIds.length > config.numLatest ? (
      <Link to={`/gallery`}>See More &gt;</Link>
    ) : (
      <></>
    );
  if (tokenIds.length) {
    return (
      <div className="container">
        <h2>Latest Mints</h2>
        <div className="grid">
          <MiniThumbList tokenIds={latestTokenIds}></MiniThumbList>
        </div>
        <nav className="pagination">
          <ul>
            <li>{seeMore}</li>
          </ul>
        </nav>
      </div>
    );
  } else return <></>;
}
export default LatestMints;
