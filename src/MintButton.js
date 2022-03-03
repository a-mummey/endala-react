import "./MintButton.css";
import { keplrState } from "./state";
import { useRecoilStat, useSetRecoilState, useRecoilValue } from "recoil";

const mintStates = {
  loaded: {
    label: "Mint",
    disabled: false,
  },
  loading: {
    label: "Loading...",
    disabled: true,
  },
  minting: {
    label: "Minting...",
    disabled: true,
  },
  error: {
    label: "Error",
    disabled: true,
  },
};

function MintButton() {
  const kState = useRecoilValue(keplrState);
  const setKeplrState = useSetRecoilState(keplrState);
  // const [kState, setKeplrState] = useRecoilState(keplrState);
  const buttonState = mintStates[kState] || mintStates.loading;
  const mint = () => setKeplrState("minting");

  return (
    <button
      className="mintButton"
      role="button"
      disabled={buttonState.disabled}
      onClick={mint}
    >
      {buttonState.label}
    </button>
  );
}

export default MintButton;
