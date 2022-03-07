import { useRecoilValueLoadable } from "recoil";
import { allMintedTokensState } from "../state";
import MiniThumbList from "./MiniThumbList";
import config from "../config";

function LatestMints() {
  const allMintedTokens = useRecoilValueLoadable(allMintedTokensState);
  const tokenIds = allMintedTokens.valueMaybe() || [];
  const latestTokenIds = [...tokenIds]
    .sort((a, b) => parseInt(b) - parseInt(a))
    .slice(0, config.numLatest);
  return (
    <div className="container">
      <h2>Latest Mints</h2>
      <div className="grid">
        <MiniThumbList tokenIds={latestTokenIds}></MiniThumbList>
      </div>
    </div>
  );
}
export default LatestMints;
