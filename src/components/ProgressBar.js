import { useRecoilValue } from "recoil";
import config from "../config";
import { mintedCountState } from "../state";

function ProgressBar() {
  const mintedCount = useRecoilValue(mintedCountState);
  const mintedCountVal = mintedCount === "?" ? 0 : mintedCount;
  const totalMints = config.totalNumMints;
  return (
    <div className="progress-header">
      Endalas Minted: {mintedCount} / {totalMints}
      <progress
        id="mint-progress-bar"
        value={mintedCountVal}
        max={totalMints}
      ></progress>
    </div>
  );
}

export default ProgressBar;
