import { keplrState, keplrMessageState } from "./state";
import { useRecoilValue } from "recoil";

function MintButton() {
  const keplrMessage = useRecoilValue(keplrMessageState);
  return (
    <a id="mintButton" href="#" role="button" className="secondary">
      {keplrMessage}
    </a>
  );
}

export default MintButton;
